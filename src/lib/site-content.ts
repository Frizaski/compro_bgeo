import { defaultSiteContent, type SiteContent } from "@/data/site-content";
import type { Project } from "@/data/projects";
import { createClient } from "@/lib/supabase/server";

type SettingsRow = {
  hero_word_one: string | null;
  hero_word_two: string | null;
  hero_word_three: string | null;
  cursor_text: string | null;
  about_label: string | null;
  about_heading: string | null;
  about_paragraph_one: string | null;
  about_paragraph_two: string | null;
  vision_text: string | null;
  contact_email: string | null;
  contact_phone_label: string | null;
  contact_phone_href: string | null;
  contact_instagram: string | null;
  contact_linkedin: string | null;
};

type ProjectRow = {
  slug: string;
  title: string;
  category: string;
  project_year: number | string;
  image_url: string;
  technologies: string[] | null;
  summary: string;
  accent_gradient: string | null;
};

function rowsOrDefault<T>(rows: T[] | null | undefined, fallback: T[]) {
  return rows?.length ? rows : fallback;
}

export async function getSiteContent(): Promise<SiteContent> {
  const supabase = await createClient();
  const [settingsResult, historyResult, servicesResult, projectsResult, teamResult, faqResult] = await Promise.all([
    supabase.from("site_settings").select("*").limit(1).maybeSingle(),
    supabase.from("history_items").select("*").eq("is_published", true).order("sort_order"),
    supabase.from("services").select("*").eq("is_published", true).order("sort_order"),
    supabase.from("projects").select("*").eq("is_published", true).order("sort_order"),
    supabase.from("team_members").select("*").eq("is_published", true).order("sort_order"),
    supabase.from("faq_items").select("*").eq("is_published", true).order("sort_order"),
  ]);

  const settings = settingsResult.data as SettingsRow | null;
  const history = historyResult.data?.map((item) => ({
    id: item.number_label,
    title: item.title,
    subtitle: item.subtitle,
    image: item.image_url,
    desc: item.description,
  }));
  const services = servicesResult.data?.map((item) => ({
    title: item.title,
    description: item.description,
  }));
  const projects = (projectsResult.data as ProjectRow[] | null)?.map((project): Project => ({
    slug: project.slug,
    title: project.title,
    category: project.category,
    year: String(project.project_year),
    image: project.image_url,
    technologies: project.technologies ?? [],
    summary: project.summary,
    color: project.accent_gradient ?? "from-[var(--primary-green)]/20 to-transparent",
  }));
  const team = teamResult.data?.map((member) => ({
    name: member.name,
    role: member.role,
    bio: member.bio,
    image: member.image_url,
    instagram: member.instagram_url,
    portfolio: member.portfolio_url,
    linkedin: member.linkedin_url,
  }));
  const faq = faqResult.data?.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

  return {
    hero: {
      wordOne: settings?.hero_word_one ?? defaultSiteContent.hero.wordOne,
      wordTwo: settings?.hero_word_two ?? defaultSiteContent.hero.wordTwo,
      wordThree: settings?.hero_word_three ?? defaultSiteContent.hero.wordThree,
      cursorText: settings?.cursor_text ?? defaultSiteContent.hero.cursorText,
    },
    about: {
      label: settings?.about_label ?? defaultSiteContent.about.label,
      heading: settings?.about_heading ?? defaultSiteContent.about.heading,
      paragraphOne: settings?.about_paragraph_one ?? defaultSiteContent.about.paragraphOne,
      paragraphTwo: settings?.about_paragraph_two ?? defaultSiteContent.about.paragraphTwo,
    },
    visionText: settings?.vision_text ?? defaultSiteContent.visionText,
    history: rowsOrDefault(history, defaultSiteContent.history),
    services: rowsOrDefault(services, defaultSiteContent.services),
    projects: rowsOrDefault(projects, defaultSiteContent.projects),
    team: rowsOrDefault(team, defaultSiteContent.team),
    faq: rowsOrDefault(faq, defaultSiteContent.faq),
    contact: {
      email: settings?.contact_email ?? defaultSiteContent.contact.email,
      phoneLabel: settings?.contact_phone_label ?? defaultSiteContent.contact.phoneLabel,
      phoneHref: settings?.contact_phone_href ?? defaultSiteContent.contact.phoneHref,
      instagram: settings?.contact_instagram ?? defaultSiteContent.contact.instagram,
      linkedin: settings?.contact_linkedin ?? defaultSiteContent.contact.linkedin,
    },
  };
}
