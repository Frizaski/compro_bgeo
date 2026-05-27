"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Briefcase, Globe } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

gsap.registerPlugin(ScrollTrigger);

export default function TeamSection() {
  const { team } = useSiteContent();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".team-card");

      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 lg:px-24 bg-[var(--background)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[var(--primary-green)]/5 to-transparent -z-10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-blue)] mb-4">
            The Minds Behind Beyond Geo
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold mb-6">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-blue)]">Team</span>
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            A team of passionate developers, designers, and problem solvers committed to building modern digital solutions and creating impactful experiences through technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="team-card group flex flex-col bg-white dark:bg-white/5 border border-black/15 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-none backdrop-blur-sm rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-white/5 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="h-64 w-full relative overflow-hidden bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                />
              </div>

              <div className="p-8 flex flex-col flex-1">
                <h4 className="text-2xl font-bold mb-1 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--primary-green)] group-hover:to-[var(--primary-blue)]">{member.name}</h4>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-blue)] font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 flex-1">{member.bio}</p>

                <div className="flex gap-4 mt-6 pt-6 border-t border-black/10 dark:border-white/10">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--primary-blue)] transition-colors">
                    <Briefcase size={20} />
                  </a>
                  <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href={member.portfolio} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--primary-green)] transition-colors">
                    <Globe size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
