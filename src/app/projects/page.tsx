import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import AllProjectsShowcase from "@/components/AllProjectsShowcase";
import { SiteContentProvider } from "@/hooks/useSiteContent";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Projects | BGEO DEV",
  description: "Explore digital products, websites, and systems built by BGEO.",
};

export default async function ProjectsPage() {
  const content = await getSiteContent();

  return (
    <SiteContentProvider content={content}>
      <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500">
      <header className="relative z-10 flex items-center justify-between px-6 py-7 md:px-12 lg:px-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/55 px-5 py-3 text-sm font-semibold backdrop-blur-md transition-colors hover:border-[var(--primary-green)] dark:border-white/10 dark:bg-white/5"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
        <span className="hidden text-xs font-bold uppercase tracking-[0.35em] text-gray-500 dark:text-gray-400 sm:block">
          BGEO / Selected Work
        </span>
      </header>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-16 text-center md:px-12 md:pb-20 md:pt-24">
        <h1 className="text-5xl font-black uppercase tracking-[-0.06em] sm:text-7xl lg:text-8xl">
          Work that moves
          <span className="block bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-blue)] bg-clip-text text-transparent">
            ideas forward.
          </span>
        </h1>
      </section>

      <div className="relative z-10">
        <AllProjectsShowcase />
      </div>

      <footer className="relative z-10 border-t border-black/10 px-6 py-16 dark:border-white/10 md:px-12 lg:px-24">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">
              Start a project
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Build something with BGEO.</h2>
          </div>
          <a
            href={`mailto:${content.contact.email}`}
            className="inline-flex items-center gap-3 rounded-full bg-[var(--foreground)] px-7 py-4 font-semibold text-[var(--background)] transition-transform hover:-translate-y-1"
          >
            Contact Us
            <ArrowUpRight size={19} />
          </a>
        </div>
      </footer>
      </main>
    </SiteContentProvider>
  );
}
