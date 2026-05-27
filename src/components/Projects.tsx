"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSiteContent } from "@/hooks/useSiteContent";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const { projects } = useSiteContent();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".project-item");

      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 lg:px-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-blue)]">Projects</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl">
              A selection of our recent work across various industries, showcasing our commitment to excellence and innovation.
            </p>
          </div>
          <Link href="/projects" className="flex items-center gap-2 border border-black/20 dark:border-white/20 px-6 py-3 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
            View All Work <ArrowUpRight size={20} />
          </Link>
        </div>

        <div className="flex flex-col gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-item group relative overflow-hidden rounded-3xl border border-black/15 dark:border-white/10 bg-white dark:bg-white/5 shadow-xl shadow-black/5 dark:shadow-none backdrop-blur-sm cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-10 z-10">
                
                {/* Project Image */}
                <div className="relative w-full md:w-[280px] h-[200px] md:h-[160px] rounded-2xl overflow-hidden shrink-0 shadow-lg border border-black/5 dark:border-white/5">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 768px) 280px, 100vw"
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--primary-green)] group-hover:to-[var(--primary-blue)]">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">{project.category}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 text-sm rounded-full bg-black/5 dark:bg-white/10 text-gray-500 dark:text-gray-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Meta & Button */}
                <div className="flex items-center justify-between md:justify-end gap-8 shrink-0 md:pl-4">
                  <span className="text-2xl font-light text-gray-600 dark:text-gray-500">{project.year}</span>
                  
                  <div className="h-16 w-16 shrink-0 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300 transform group-hover:-rotate-45">
                    <ArrowUpRight size={28} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
