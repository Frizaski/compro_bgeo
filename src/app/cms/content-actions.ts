"use server";

import { revalidatePath } from "next/cache";
import { defaultSiteContent, type FAQItem, type HistoryItem, type ServiceItem, type SiteContent, type TeamMember } from "@/data/site-content";
import type { Project } from "@/data/projects";
import { requireCmsAdmin } from "@/lib/cms-auth";
import { createClient } from "@/lib/supabase/server";

export interface SaveResult {
  error?: string;
  url?: string;
}

function databaseError(message: string) {
  if (message.includes("schema cache") || message.includes("Could not find the")) {
    return "Database schema belum sesuai dengan CMS. Jalankan file supabase/cms-schema-sync.sql di Supabase SQL Editor, lalu coba kembali.";
  }

  return message;
}

function refreshPublicContent() {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/cms");
}

async function getAdminClient() {
  await requireCmsAdmin();
  return createClient();
}

async function writeCollection(table: string, rows: Record<string, unknown>[]): Promise<SaveResult> {
  const supabase = await getAdminClient();
  const { error: deleteError } = await supabase
    .from(table)
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (deleteError) {
    return { error: databaseError(deleteError.message) };
  }

  if (rows.length) {
    const { error: insertError } = await supabase.from(table).insert(rows);
    if (insertError) {
      return { error: databaseError(insertError.message) };
    }
  }

  refreshPublicContent();
  return {};
}

export async function saveSettings(content: SiteContent): Promise<SaveResult> {
  const supabase = await getAdminClient();
  const values = {
    hero_word_one: content.hero.wordOne,
    hero_word_two: content.hero.wordTwo,
    hero_word_three: content.hero.wordThree,
    cursor_text: content.hero.cursorText,
    about_label: content.about.label,
    about_heading: content.about.heading,
    about_paragraph_one: content.about.paragraphOne,
    about_paragraph_two: content.about.paragraphTwo,
    vision_text: content.visionText,
    contact_email: content.contact.email,
    contact_phone_label: content.contact.phoneLabel,
    contact_phone_href: content.contact.phoneHref,
    contact_instagram: content.contact.instagram,
    contact_linkedin: content.contact.linkedin,
  };
  const { data: existing, error: findError } = await supabase.from("site_settings").select("id").limit(1).maybeSingle();

  if (findError) {
    return { error: databaseError(findError.message) };
  }

  const mutation = existing
    ? supabase.from("site_settings").update(values).eq("id", existing.id)
    : supabase.from("site_settings").insert(values);
  const { error } = await mutation;

  if (error) {
    return { error: databaseError(error.message) };
  }

  refreshPublicContent();
  return {};
}

export async function saveHistory(history: HistoryItem[]) {
  return writeCollection(
    "history_items",
    history.map((item, index) => ({
      number_label: item.id,
      title: item.title,
      subtitle: item.subtitle,
      description: item.desc,
      image_url: item.image,
      sort_order: index + 1,
      is_published: true,
    })),
  );
}

export async function saveServices(services: ServiceItem[]) {
  return writeCollection(
    "services",
    services.map((service, index) => ({
      title: service.title,
      description: service.description,
      sort_order: index + 1,
      is_published: true,
    })),
  );
}

export async function saveProjects(projects: Project[]) {
  return writeCollection(
    "projects",
    projects.map((project, index) => ({
      slug: project.slug,
      title: project.title,
      category: project.category,
      project_year: Number(project.year),
      image_url: project.image,
      technologies: project.technologies,
      summary: project.summary,
      accent_gradient: project.color,
      sort_order: index + 1,
      is_published: true,
    })),
  );
}

export async function saveTeam(team: TeamMember[]) {
  return writeCollection(
    "team_members",
    team.map((member, index) => ({
      name: member.name,
      role: member.role,
      bio: member.bio,
      image_url: member.image,
      instagram_url: member.instagram,
      portfolio_url: member.portfolio,
      linkedin_url: member.linkedin,
      sort_order: index + 1,
      is_published: true,
    })),
  );
}

export async function saveFaq(faq: FAQItem[]) {
  return writeCollection(
    "faq_items",
    faq.map((item, index) => ({
      question: item.question,
      answer: item.answer,
      sort_order: index + 1,
      is_published: true,
    })),
  );
}

export async function publishDefaultContent(): Promise<SaveResult> {
  const settingResult = await saveSettings(defaultSiteContent);
  if (settingResult.error) return settingResult;

  for (const save of [
    () => saveHistory(defaultSiteContent.history),
    () => saveServices(defaultSiteContent.services),
    () => saveProjects(defaultSiteContent.projects),
    () => saveTeam(defaultSiteContent.team),
    () => saveFaq(defaultSiteContent.faq),
  ]) {
    const result = await save();
    if (result.error) return result;
  }

  return {};
}

export async function uploadAsset(formData: FormData): Promise<SaveResult> {
  const supabase = await getAdminClient();
  const file = formData.get("file");
  const folder = String(formData.get("folder") ?? "projects");
  const allowedFolders = new Set(["logo", "contact", "history", "projects", "team"]);

  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose an image file first." };
  }

  if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
    return { error: "Image must be smaller than 5 MB." };
  }

  if (!allowedFolders.has(folder)) {
    return { error: "Invalid asset folder." };
  }

  const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const baseName = file.name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48) || "asset";
  const path = `${folder}/${Date.now()}-${baseName}.${extension}`;
  const { error } = await supabase.storage.from("website-assets").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    return { error: databaseError(error.message) };
  }

  const { data } = supabase.storage.from("website-assets").getPublicUrl(path);
  return { url: data.publicUrl };
}
