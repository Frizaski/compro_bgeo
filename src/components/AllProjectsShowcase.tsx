"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState, type MouseEvent } from "react";
import type { Project } from "@/data/projects";
import { useSiteContent } from "@/hooks/useSiteContent";

interface PreviewPosition {
  left: number;
  top: number;
}

export default function AllProjectsShowcase() {
  const { projects } = useSiteContent();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [pointerActive, setPointerActive] = useState(false);
  const [previewPosition, setPreviewPosition] = useState<PreviewPosition>({
    left: 0,
    top: 0,
  });

  const activeProject = activeIndex === null ? null : projects[activeIndex];

  const movePreview = (event: MouseEvent<HTMLButtonElement>) => {
    const previewWidth = 380;
    const previewHeight = 300;
    const gutter = 28;

    setPointerActive(true);
    setPreviewPosition({
      left: Math.max(gutter, Math.min(event.clientX + gutter, window.innerWidth - previewWidth - gutter)),
      top: Math.max(gutter, Math.min(event.clientY - previewHeight / 2, window.innerHeight - previewHeight - gutter)),
    });
  };

  return (
    <section className="relative px-6 pb-24 pt-10 md:px-12 lg:px-24 lg:pb-32" aria-label="Project collection">
      <div className="mx-auto max-w-6xl">
        <div
          className="flex flex-col"
          onMouseLeave={() => {
            setActiveIndex(null);
            setPointerActive(false);
          }}
        >
          {projects.map((project, index) => {
            const isActive = activeIndex === index;

            return (
              <article
                key={project.slug}
                className="group border-t border-black/10 py-6 last:border-b dark:border-white/10 md:py-8"
              >
                <button
                  type="button"
                  className="w-full text-left"
                  onMouseEnter={(event) => {
                    setActiveIndex(index);
                    movePreview(event);
                  }}
                  onMouseMove={movePreview}
                  onFocus={() => {
                    setActiveIndex(index);
                    setPointerActive(false);
                  }}
                  onBlur={() => setActiveIndex(null)}
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  aria-expanded={isActive}
                >
                  <div className="flex items-baseline justify-between gap-5">
                    <span className="hidden shrink-0 text-sm font-medium text-gray-400 md:block">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2
                      className={`flex-1 text-3xl font-medium tracking-tight transition-colors duration-300 sm:text-5xl lg:text-7xl ${
                        isActive
                          ? "text-[var(--foreground)]"
                          : "text-black/30 group-hover:text-black/70 dark:text-white/25 dark:group-hover:text-white/65"
                      }`}
                    >
                      {project.title}
                    </h2>
                    <span
                      className={`shrink-0 text-xs font-semibold uppercase tracking-[0.2em] transition-colors md:text-sm ${
                        isActive
                          ? "text-[var(--primary-green)]"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {project.year}
                    </span>
                  </div>

                  <div
                    className={`grid transition-all duration-500 lg:hidden ${
                      isActive ? "grid-rows-[1fr] pt-7 opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ProjectPreview project={project} />
                    </div>
                  </div>
                </button>
              </article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            key={activeProject.slug}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`pointer-events-none z-30 hidden w-[380px] lg:block ${
              pointerActive ? "fixed" : "absolute right-16 top-1/3"
            }`}
            style={pointerActive ? previewPosition : undefined}
          >
            <ProjectPreview project={activeProject} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-black/10 bg-white p-3 shadow-2xl shadow-black/15 dark:border-white/15 dark:bg-[#111111] dark:shadow-black/60">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
        <Image
          src={project.image}
          alt={`${project.title} cover`}
          fill
          sizes="(min-width: 1024px) 380px, 90vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-black">
          {project.category}
        </span>
      </div>
      <p className="mt-4 px-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2 px-2 pb-2">
        {project.technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-full bg-black/5 px-3 py-1 text-xs text-gray-600 dark:bg-white/10 dark:text-gray-300"
          >
            {technology}
          </span>
        ))}
      </div>
    </div>
  );
}
