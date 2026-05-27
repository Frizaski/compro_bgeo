"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileText, ImageUp, LayoutDashboard, LogOut, Plus, Printer, RotateCcw, Save, Trash2 } from "lucide-react";
import { logoutCms } from "@/app/cms/actions";
import {
  publishDefaultContent,
  saveFaq,
  saveHistory,
  saveProjects,
  saveServices,
  saveSettings,
  saveTeam,
  uploadAsset,
  type SaveResult,
} from "@/app/cms/content-actions";
import { saveInvoice as saveInvoiceRecord } from "@/app/cms/invoice-actions";
import type { Invoice, InvoiceItem } from "@/data/invoices";
import type { FAQItem, HistoryItem, ServiceItem, SiteContent, TeamMember } from "@/data/site-content";
import type { Project } from "@/data/projects";

type DashboardTab = "content" | "invoice";

export default function CmsDashboard({
  adminName,
  initialContent,
  initialInvoices,
}: {
  adminName: string;
  initialContent: SiteContent;
  initialInvoices: Invoice[];
}) {
  const [tab, setTab] = useState<DashboardTab>("content");

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500">
      <header className="cms-no-print sticky top-0 z-40 border-b border-black/10 bg-[var(--background)]/90 px-6 py-5 backdrop-blur-xl dark:border-white/10 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <Image
              src="/assets/logo/Text_Logo_Bgeo.png"
              alt="BGEO"
              width={138}
              height={42}
              className="h-8 w-auto object-contain"
              priority
            />
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Content & Billing Studio / {adminName}
            </p>
          </div>
          <div className="flex items-center gap-2 pr-14 sm:pr-16">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm transition hover:border-[var(--primary-blue)] dark:border-white/10 sm:inline-flex"
            >
              Open site <ArrowUpRight size={15} />
            </Link>
            <form action={logoutCms}>
              <button suppressHydrationWarning type="submit" className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2.5 text-sm font-medium transition hover:border-red-400 hover:text-red-500 dark:border-white/10" aria-label="Log out">
                <LogOut size={18} />
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="cms-no-print mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8 md:px-10 lg:flex-row">
        <nav className="flex shrink-0 gap-2 lg:w-56 lg:flex-col">
          <DashboardButton active={tab === "content"} onClick={() => setTab("content")} icon={<LayoutDashboard size={18} />}>
            Website Content
          </DashboardButton>
          <DashboardButton active={tab === "invoice"} onClick={() => setTab("invoice")} icon={<FileText size={18} />}>
            Invoices
          </DashboardButton>
        </nav>
        <div className="min-w-0 flex-1">
          {tab === "content" ? <ContentManager initialContent={initialContent} /> : <InvoiceManager initialInvoices={initialInvoices} />}
        </div>
      </div>
    </main>
  );
}

function DashboardButton({
  active,
  children,
  icon,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      suppressHydrationWarning
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
        active
          ? "bg-[var(--foreground)] text-[var(--background)]"
          : "border border-black/10 hover:border-[var(--primary-blue)] dark:border-white/10"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function ContentManager({ initialContent }: { initialContent: SiteContent }) {
  const [content, setContent] = useState(initialContent);
  const [message, setMessage] = useState("");

  function updateHero(field: keyof SiteContent["hero"], value: string) {
    setContent((current) => ({ ...current, hero: { ...current.hero, [field]: value } }));
  }

  function updateAbout(field: keyof SiteContent["about"], value: string) {
    setContent((current) => ({ ...current, about: { ...current.about, [field]: value } }));
  }

  function updateContact(field: keyof SiteContent["contact"], value: string) {
    setContent((current) => ({ ...current, contact: { ...current.contact, [field]: value } }));
  }

  async function saveMainContent() {
    const result = await saveSettings(content);
    setMessage(result.error ? `Save failed: ${result.error}` : "Main content saved to Supabase.");
  }

  async function publishDefaults() {
    const result = await publishDefaultContent();
    if (result.error) {
      setMessage(`Publish failed: ${result.error}`);
      return;
    }

    setMessage("Default content published to Supabase. Refresh to load saved rows.");
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-3xl font-bold">Website Content</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Changes are stored in Supabase and served to the public website after you save.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            suppressHydrationWarning
            type="button"
            onClick={publishDefaults}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 text-sm font-medium transition hover:border-[var(--primary-blue)] dark:border-white/10"
          >
            <RotateCcw size={15} />
            Publish defaults
          </button>
          <button
            suppressHydrationWarning
            type="button"
            onClick={saveMainContent}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-medium text-[var(--background)]"
          >
            <Save size={15} />
            Save main content
          </button>
        </div>
      </div>
      {message && <p className="rounded-xl bg-black/5 px-4 py-3 text-sm dark:bg-white/10">{message}</p>}

      <Panel title="Hero">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="First word" value={content.hero.wordOne} onChange={(value) => updateHero("wordOne", value)} />
          <TextField label="Second word" value={content.hero.wordTwo} onChange={(value) => updateHero("wordTwo", value)} />
          <TextField label="Highlighted word" value={content.hero.wordThree} onChange={(value) => updateHero("wordThree", value)} />
          <TextField label="Cursor trail text" value={content.hero.cursorText} onChange={(value) => updateHero("cursorText", value)} />
        </div>
      </Panel>

      <Panel title="About & Vision">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Section label" value={content.about.label} onChange={(value) => updateAbout("label", value)} />
          <TextField label="Vision statement" value={content.visionText} onChange={(value) => setContent((current) => ({ ...current, visionText: value }))} />
          <TextField label="About heading" value={content.about.heading} onChange={(value) => updateAbout("heading", value)} className="md:col-span-2" />
          <TextArea label="Paragraph 1" value={content.about.paragraphOne} onChange={(value) => updateAbout("paragraphOne", value)} />
          <TextArea label="Paragraph 2" value={content.about.paragraphTwo} onChange={(value) => updateAbout("paragraphTwo", value)} />
        </div>
      </Panel>

      <Panel title="Contact">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Email" value={content.contact.email} onChange={(value) => updateContact("email", value)} />
          <TextField label="Phone display" value={content.contact.phoneLabel} onChange={(value) => updateContact("phoneLabel", value)} />
          <TextField label="Phone link value" value={content.contact.phoneHref} onChange={(value) => updateContact("phoneHref", value)} />
          <TextField label="Instagram URL" value={content.contact.instagram} onChange={(value) => updateContact("instagram", value)} />
          <TextField label="LinkedIn URL" value={content.contact.linkedin} onChange={(value) => updateContact("linkedin", value)} className="md:col-span-2" />
        </div>
      </Panel>

      <HistoryEditor
        value={content.history}
        onChange={(history) => setContent((current) => ({ ...current, history }))}
      />
      <ServicesEditor
        value={content.services}
        onChange={(services) => setContent((current) => ({ ...current, services }))}
      />
      <ProjectsEditor
        value={content.projects}
        onChange={(projects) => setContent((current) => ({ ...current, projects }))}
      />
      <TeamEditor
        value={content.team}
        onChange={(team) => setContent((current) => ({ ...current, team }))}
      />
      <FaqEditor
        value={content.faq}
        onChange={(faq) => setContent((current) => ({ ...current, faq }))}
      />
    </section>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-white/5 md:p-6">
      <h3 className="mb-5 text-lg font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{label}</span>
      <input
        suppressHydrationWarning
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[var(--primary-blue)] dark:border-white/15"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{label}</span>
      <textarea
        suppressHydrationWarning
        value={value}
        rows={4}
        onChange={(event) => onChange(event.target.value)}
        className="w-full resize-y rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[var(--primary-blue)] dark:border-white/15"
      />
    </label>
  );
}

function HistoryEditor({ value, onChange }: { value: HistoryItem[]; onChange: (value: HistoryItem[]) => void }) {
  const [message, setMessage] = useState("");

  async function handleSave() {
    setMessage(await saveMessage(saveHistory(value), "Journey saved to Supabase."));
  }

  return (
    <CollectionPanel
      title="Journey Timeline"
      description="Kelola milestone perjalanan BGEO dan gambar yang tampil di section journey."
      message={message}
      onAdd={() => onChange([...value, { id: String(value.length + 1).padStart(2, "0"), title: "", subtitle: "", desc: "", image: "" }])}
      onSave={handleSave}
    >
      {value.map((item, index) => (
        <ItemCard key={index} label={`Milestone ${index + 1}`} onRemove={() => onChange(removeItem(value, index))}>
          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Number label" value={item.id} onChange={(fieldValue) => onChange(updateItem(value, index, { id: fieldValue }))} />
            <TextField label="Title" value={item.title} onChange={(fieldValue) => onChange(updateItem(value, index, { title: fieldValue }))} />
            <TextField label="Subtitle" value={item.subtitle} onChange={(fieldValue) => onChange(updateItem(value, index, { subtitle: fieldValue }))} />
            <ImageField folder="history" value={item.image} onChange={(fieldValue) => onChange(updateItem(value, index, { image: fieldValue }))} />
            <div className="md:col-span-2">
              <TextArea label="Description" value={item.desc} onChange={(fieldValue) => onChange(updateItem(value, index, { desc: fieldValue }))} />
            </div>
          </div>
        </ItemCard>
      ))}
    </CollectionPanel>
  );
}

function ServicesEditor({ value, onChange }: { value: ServiceItem[]; onChange: (value: ServiceItem[]) => void }) {
  const [message, setMessage] = useState("");

  async function handleSave() {
    setMessage(await saveMessage(saveServices(value), "Services saved to Supabase."));
  }

  return (
    <CollectionPanel
      title="Services"
      description="Daftar layanan yang muncul pada horizontal services section."
      message={message}
      onAdd={() => onChange([...value, { title: "", description: "" }])}
      onSave={handleSave}
    >
      {value.map((service, index) => (
        <ItemCard key={index} label={`Service ${index + 1}`} onRemove={() => onChange(removeItem(value, index))}>
          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Title" value={service.title} onChange={(fieldValue) => onChange(updateItem(value, index, { title: fieldValue }))} />
            <TextArea label="Description" value={service.description} onChange={(fieldValue) => onChange(updateItem(value, index, { description: fieldValue }))} />
          </div>
        </ItemCard>
      ))}
    </CollectionPanel>
  );
}

function ProjectsEditor({ value, onChange }: { value: Project[]; onChange: (value: Project[]) => void }) {
  const [message, setMessage] = useState("");

  async function handleSave() {
    setMessage(await saveMessage(saveProjects(value), "Projects saved to Supabase."));
  }

  return (
    <CollectionPanel
      title="Projects"
      description="Project yang tampil pada showcase homepage dan halaman All Projects."
      message={message}
      onAdd={() => onChange([...value, {
        slug: `new-project-${value.length + 1}`,
        title: "",
        category: "Website",
        year: String(new Date().getFullYear()),
        image: "",
        technologies: [],
        summary: "",
        color: "from-[#02CE13]/20 to-transparent",
      }])}
      onSave={handleSave}
    >
      {value.map((project, index) => (
        <ItemCard key={index} label={project.title || `Project ${index + 1}`} onRemove={() => onChange(removeItem(value, index))}>
          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Title" value={project.title} onChange={(fieldValue) => onChange(updateItem(value, index, { title: fieldValue }))} />
            <TextField label="Slug" value={project.slug} onChange={(fieldValue) => onChange(updateItem(value, index, { slug: fieldValue }))} />
            <TextField label="Category" value={project.category} onChange={(fieldValue) => onChange(updateItem(value, index, { category: fieldValue }))} />
            <TextField label="Year" value={project.year} onChange={(fieldValue) => onChange(updateItem(value, index, { year: fieldValue }))} />
            <TextField
              label="Technologies (pisahkan dengan koma)"
              value={project.technologies.join(", ")}
              onChange={(fieldValue) => onChange(updateItem(value, index, { technologies: splitTags(fieldValue) }))}
            />
            <TextField label="Accent gradient class" value={project.color} onChange={(fieldValue) => onChange(updateItem(value, index, { color: fieldValue }))} />
            <div className="md:col-span-2">
              <ImageField folder="projects" value={project.image} onChange={(fieldValue) => onChange(updateItem(value, index, { image: fieldValue }))} />
            </div>
            <div className="md:col-span-2">
              <TextArea label="Summary" value={project.summary} onChange={(fieldValue) => onChange(updateItem(value, index, { summary: fieldValue }))} />
            </div>
          </div>
        </ItemCard>
      ))}
    </CollectionPanel>
  );
}

function TeamEditor({ value, onChange }: { value: TeamMember[]; onChange: (value: TeamMember[]) => void }) {
  const [message, setMessage] = useState("");

  async function handleSave() {
    setMessage(await saveMessage(saveTeam(value), "Team saved to Supabase."));
  }

  return (
    <CollectionPanel
      title="Team"
      description="Profil tim, foto, dan tautan sosial yang ditampilkan pada website."
      message={message}
      onAdd={() => onChange([...value, { name: "", role: "", bio: "", image: "", instagram: "#", portfolio: "#", linkedin: "#" }])}
      onSave={handleSave}
    >
      {value.map((member, index) => (
        <ItemCard key={index} label={member.name || `Member ${index + 1}`} onRemove={() => onChange(removeItem(value, index))}>
          <div className="grid gap-4 md:grid-cols-2">
            <TextField label="Name" value={member.name} onChange={(fieldValue) => onChange(updateItem(value, index, { name: fieldValue }))} />
            <TextField label="Role" value={member.role} onChange={(fieldValue) => onChange(updateItem(value, index, { role: fieldValue }))} />
            <ImageField folder="team" value={member.image} onChange={(fieldValue) => onChange(updateItem(value, index, { image: fieldValue }))} />
            <TextField label="Instagram URL" value={member.instagram} onChange={(fieldValue) => onChange(updateItem(value, index, { instagram: fieldValue }))} />
            <TextField label="Portfolio URL" value={member.portfolio} onChange={(fieldValue) => onChange(updateItem(value, index, { portfolio: fieldValue }))} />
            <TextField label="LinkedIn URL" value={member.linkedin} onChange={(fieldValue) => onChange(updateItem(value, index, { linkedin: fieldValue }))} />
            <div className="md:col-span-2">
              <TextArea label="Bio" value={member.bio} onChange={(fieldValue) => onChange(updateItem(value, index, { bio: fieldValue }))} />
            </div>
          </div>
        </ItemCard>
      ))}
    </CollectionPanel>
  );
}

function FaqEditor({ value, onChange }: { value: FAQItem[]; onChange: (value: FAQItem[]) => void }) {
  const [message, setMessage] = useState("");

  async function handleSave() {
    setMessage(await saveMessage(saveFaq(value), "FAQ saved to Supabase."));
  }

  return (
    <CollectionPanel
      title="FAQ"
      description="Pertanyaan dan jawaban yang tampil pada bagian FAQ."
      message={message}
      onAdd={() => onChange([...value, { question: "", answer: "" }])}
      onSave={handleSave}
    >
      {value.map((item, index) => (
        <ItemCard key={index} label={`Question ${index + 1}`} onRemove={() => onChange(removeItem(value, index))}>
          <div className="space-y-4">
            <TextField label="Question" value={item.question} onChange={(fieldValue) => onChange(updateItem(value, index, { question: fieldValue }))} />
            <TextArea label="Answer" value={item.answer} onChange={(fieldValue) => onChange(updateItem(value, index, { answer: fieldValue }))} />
          </div>
        </ItemCard>
      ))}
    </CollectionPanel>
  );
}

function CollectionPanel({
  title,
  description,
  message,
  onAdd,
  onSave,
  children,
}: {
  title: string;
  description: string;
  message: string;
  onAdd: () => void;
  onSave: () => void;
  children: React.ReactNode;
}) {
  return (
    <Panel title={title}>
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <p className="max-w-xl text-sm text-gray-600 dark:text-gray-400">{description}</p>
        <div className="flex shrink-0 gap-2">
          <button suppressHydrationWarning type="button" onClick={onAdd} className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm dark:border-white/10">
            <Plus size={15} /> Add
          </button>
          <button suppressHydrationWarning type="button" onClick={onSave} className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-4 py-2 text-sm text-[var(--background)]">
            <Save size={15} /> Save
          </button>
        </div>
      </div>
      {message && <p className="mb-4 rounded-xl bg-black/5 px-4 py-3 text-sm dark:bg-white/10">{message}</p>}
      <div className="space-y-4">{children}</div>
    </Panel>
  );
}

function ItemCard({ label, onRemove, children }: { label: string; onRemove: () => void; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-black/20">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="truncate text-sm font-semibold">{label}</p>
        <button suppressHydrationWarning type="button" onClick={onRemove} className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs text-gray-500 transition hover:bg-red-500/10 hover:text-red-500">
          <Trash2 size={13} /> Remove
        </button>
      </div>
      {children}
    </section>
  );
}

function ImageField({
  folder,
  value,
  onChange,
}: {
  folder: "history" | "projects" | "team";
  value: string;
  onChange: (value: string) => void;
}) {
  const [message, setMessage] = useState("");

  async function handleUpload(formData: FormData) {
    formData.set("folder", folder);
    const result = await uploadAsset(formData);

    if (!result.url) {
      setMessage(result.error ?? "Upload failed.");
      return;
    }

    onChange(result.url);
    setMessage("Image uploaded and URL applied. Save this section to publish it.");
  }

  return (
    <div className="space-y-3">
      <TextField label="Image URL" value={value} onChange={onChange} />
      <form action={handleUpload} className="flex flex-wrap items-center gap-2">
        <input suppressHydrationWarning type="file" name="file" accept="image/*" required className="min-w-0 flex-1 rounded-xl border border-black/10 px-3 py-2 text-xs dark:border-white/15" />
        <button suppressHydrationWarning type="submit" className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-xs dark:border-white/10">
          <ImageUp size={14} /> Upload
        </button>
      </form>
      {message && <p className="text-xs text-gray-500 dark:text-gray-400">{message}</p>}
    </div>
  );
}

async function saveMessage(resultPromise: Promise<SaveResult>, successMessage: string) {
  const result = await resultPromise;
  return result.error ? `Save failed: ${result.error}` : successMessage;
}

function updateItem<T>(items: T[], index: number, changes: Partial<T>) {
  return items.map((item, itemIndex) => itemIndex === index ? { ...item, ...changes } : item);
}

function removeItem<T>(items: T[], index: number) {
  return items.filter((_, itemIndex) => itemIndex !== index);
}

function splitTags(value: string) {
  return value.split(",").map((tag) => tag.trim()).filter(Boolean);
}

function InvoiceManager({ initialInvoices }: { initialInvoices: Invoice[] }) {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [draft, setDraft] = useState<Invoice>(() => createBlankInvoice(nextInvoiceNumber(initialInvoices.length + 1)));
  const [message, setMessage] = useState("");

  const subtotal = draft.items.reduce((total, item) => total + item.quantity * item.rate, 0);
  const tax = subtotal * (draft.taxPercent / 100);
  const total = subtotal + tax - draft.discount;

  function setInvoiceField<K extends keyof Invoice>(field: K, value: Invoice[K]) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function setItemField<K extends keyof InvoiceItem>(index: number, field: K, value: InvoiceItem[K]) {
    setDraft((current) => ({
      ...current,
      items: current.items.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item),
    }));
  }

  function startNewInvoice() {
    setDraft(createBlankInvoice(nextInvoiceNumber(invoices.length + 1)));
  }

  async function saveInvoice() {
    const invoice = draft.number.trim() ? draft : { ...draft, number: nextInvoiceNumber(invoices.length + 1) };
    const result = await saveInvoiceRecord(invoice);

    if (!result.invoice) {
      setMessage(`Save failed: ${result.error ?? "Unknown error."}`);
      return;
    }

    const saved = result.invoice;
    setInvoices((current) => [saved, ...current.filter((savedInvoice) => savedInvoice.id !== saved.id)]);
    setDraft(saved);
    setMessage("Invoice saved to Supabase.");
  }

  return (
    <section>
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-3xl font-bold">Invoice Generator</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Calculate totals automatically, store invoices in Supabase, then print or export as PDF.</p>
        </div>
        <div className="flex gap-2">
          <button suppressHydrationWarning type="button" onClick={startNewInvoice} className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 text-sm dark:border-white/10">
            <Plus size={15} /> New
          </button>
          <button suppressHydrationWarning type="button" onClick={saveInvoice} className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm text-[var(--background)]">
            <Save size={15} /> Save
          </button>
        </div>
      </div>
      {message && <p className="mb-6 rounded-xl bg-black/5 px-4 py-3 text-sm dark:bg-white/10">{message}</p>}

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          <Panel title="Invoice Details">
            <div className="grid gap-4 md:grid-cols-3">
              <TextField label="Invoice number" value={draft.number} onChange={(value) => setInvoiceField("number", value)} />
              <DateField label="Issue date" value={draft.issueDate} onChange={(value) => setInvoiceField("issueDate", value)} />
              <DateField label="Due date" value={draft.dueDate} onChange={(value) => setInvoiceField("dueDate", value)} />
            </div>
          </Panel>

          <Panel title="Bill To">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="Client name" value={draft.clientName} onChange={(value) => setInvoiceField("clientName", value)} />
              <TextField label="Client email" value={draft.clientEmail} onChange={(value) => setInvoiceField("clientEmail", value)} />
              <div className="md:col-span-2">
                <TextArea label="Client address" value={draft.clientAddress} onChange={(value) => setInvoiceField("clientAddress", value)} />
              </div>
            </div>
          </Panel>

          <Panel title="Line Items">
            <div className="space-y-4">
              {draft.items.map((item, index) => (
                <div key={item.id} className="grid items-end gap-3 rounded-xl border border-black/5 p-3 dark:border-white/10 md:grid-cols-[1fr_90px_150px_42px]">
                  <TextField label="Description" value={item.description} onChange={(value) => setItemField(index, "description", value)} />
                  <NumberField label="Qty" value={item.quantity} onChange={(value) => setItemField(index, "quantity", value)} />
                  <NumberField label="Rate (IDR)" value={item.rate} onChange={(value) => setItemField(index, "rate", value)} />
                  <button
                    suppressHydrationWarning
                    type="button"
                    onClick={() => setInvoiceField("items", draft.items.filter((_, itemIndex) => itemIndex !== index))}
                    className="mb-1 flex h-11 items-center justify-center rounded-lg text-gray-400 hover:text-red-500"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button
                suppressHydrationWarning
                type="button"
                onClick={() => setInvoiceField("items", [...draft.items, createInvoiceItem(draft.items.length + 1)])}
                className="inline-flex items-center gap-2 rounded-full border border-dashed border-black/20 px-5 py-2 text-sm dark:border-white/20"
              >
                <Plus size={15} /> Add item
              </button>
            </div>
          </Panel>

          <Panel title="Adjustments & Notes">
            <div className="grid gap-4 md:grid-cols-2">
              <NumberField label="Tax (%)" value={draft.taxPercent} onChange={(value) => setInvoiceField("taxPercent", value)} />
              <NumberField label="Discount (IDR)" value={draft.discount} onChange={(value) => setInvoiceField("discount", value)} />
              <div className="md:col-span-2">
                <TextArea label="Payment notes" value={draft.notes} onChange={(value) => setInvoiceField("notes", value)} />
              </div>
            </div>
          </Panel>

          {invoices.length > 0 && (
            <Panel title="Saved Invoices">
              <div className="space-y-2">
                {invoices.map((invoice) => (
                  <button
                    suppressHydrationWarning
                    key={invoice.id}
                    type="button"
                    onClick={() => setDraft(invoice)}
                    className="flex w-full items-center justify-between rounded-xl border border-black/5 px-4 py-3 text-left text-sm transition hover:border-[var(--primary-blue)] dark:border-white/10"
                  >
                    <span className="font-semibold">{invoice.number}</span>
                    <span className="text-gray-500">{invoice.clientName || "Unnamed client"}</span>
                  </button>
                ))}
              </div>
            </Panel>
          )}
        </div>

        <div>
          <InvoicePreview invoice={draft} subtotal={subtotal} tax={tax} total={total} />
          <button
            suppressHydrationWarning
            type="button"
            onClick={() => window.print()}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-blue)] px-6 py-3.5 font-semibold text-white"
          >
            <Printer size={17} /> Print / Save PDF
          </button>
        </div>
      </div>
    </section>
  );
}

function DateField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{label}</span>
      <input
        suppressHydrationWarning
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--primary-blue)] dark:border-white/15"
      />
    </label>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{label}</span>
      <input
        suppressHydrationWarning
        type="number"
        min="0"
        value={value}
        onChange={(event) => onChange(Number(event.target.value) || 0)}
        className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-[var(--primary-blue)] dark:border-white/15"
      />
    </label>
  );
}

function InvoicePreview({
  invoice,
  subtotal,
  tax,
  total,
}: {
  invoice: Invoice;
  subtotal: number;
  tax: number;
  total: number;
}) {
  return (
    <article className="invoice-print rounded-2xl border border-black/10 bg-white p-7 text-slate-950 shadow-lg dark:border-white/10 md:p-8">
      <div className="flex justify-between gap-4 border-b border-slate-200 pb-7">
        <div>
          <Image
            src="/assets/logo/Text_Logo_Bgeo.png"
            alt="BGEO"
            width={142}
            height={44}
            className="h-8 w-auto object-contain"
          />
          <p className="mt-2 text-xs text-slate-500">Digital Development Studio</p>
        </div>
        <div className="text-right">
          <h3 className="text-2xl font-bold uppercase">Invoice</h3>
          <p className="mt-2 text-sm text-slate-500">{invoice.number || "Draft"}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 py-7 text-sm">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Bill To</p>
          <p className="mt-3 font-semibold">{invoice.clientName || "Client name"}</p>
          <p className="mt-1 whitespace-pre-line text-slate-500">{invoice.clientAddress || "Client address"}</p>
          <p className="mt-1 text-slate-500">{invoice.clientEmail}</p>
        </div>
        <div className="text-right">
          <p><span className="text-slate-400">Issued:</span> {invoice.issueDate || "-"}</p>
          <p className="mt-2"><span className="text-slate-400">Due:</span> {invoice.dueDate || "-"}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Service</th>
              <th className="px-3 py-3 text-right">Qty</th>
              <th className="px-4 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <tr key={item.id} className="border-t border-slate-100">
                <td className="px-4 py-3">{item.description || "Service item"}</td>
                <td className="px-3 py-3 text-right">{item.quantity}</td>
                <td className="px-4 py-3 text-right">{formatCurrency(item.quantity * item.rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ml-auto mt-7 w-64 space-y-3 text-sm">
        <SummaryLine label="Subtotal" value={subtotal} />
        <SummaryLine label={`Tax (${invoice.taxPercent}%)`} value={tax} />
        <SummaryLine label="Discount" value={-invoice.discount} />
        <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-bold">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      {invoice.notes && (
        <div className="mt-9 border-t border-slate-200 pt-5 text-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Notes</p>
          <p className="mt-2 whitespace-pre-line text-slate-600">{invoice.notes}</p>
        </div>
      )}
    </article>
  );
}

function SummaryLine({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between text-slate-600">
      <span>{label}</span>
      <span>{formatCurrency(value)}</span>
    </div>
  );
}

function createInvoiceItem(index: number): InvoiceItem {
  return {
    id: `line-${index}`,
    description: "",
    quantity: 1,
    rate: 0,
  };
}

function createBlankInvoice(number: string): Invoice {
  return {
    id: "",
    number,
    issueDate: "",
    dueDate: "",
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    notes: "Payment can be made via the agreed transfer method. Thank you for working with BGEO.",
    taxPercent: 0,
    discount: 0,
    items: [createInvoiceItem(1)],
  };
}

function nextInvoiceNumber(sequence: number) {
  return `INV-BGEO-${String(sequence).padStart(4, "0")}`;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}
