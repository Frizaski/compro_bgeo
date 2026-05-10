"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function VisionSection() {
  const container = useRef<HTMLDivElement>(null);

  const text = "NEXT BIG MOVE WITH BGEO AND BUILD BEYOND LIMITS";
  const words = text.split(" ");

  useGSAP(
    () => {
      // Scroll triggered word reveal
      const wordElements = gsap.utils.toArray(".reveal-word");

      gsap.to(wordElements, {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=150%", // Pin and scroll for 1.5x viewport height
          scrub: 1,
          pin: true,
        },
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative w-full bg-[var(--background)]">
      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">

        {/* Animated Text Container */}
        <div className="z-10 px-4 md:px-12 w-full max-w-5xl mx-auto flex items-center justify-center">
          <h2 className="text-center font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[1.2] md:leading-[1.1] text-black dark:text-white flex flex-wrap justify-center items-center gap-y-2 md:gap-y-4">
            {words.map((word, i) => {
              if (word === "BGEO") {
                return (
                  <span key={i} className="inline-block mx-2 md:mx-3 transform hover:scale-105 transition-transform duration-300">
                    <span className="reveal-word opacity-20 inline-block px-4 md:px-6 py-1 md:py-1.5 bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-blue)] text-white transform -rotate-3 rounded-xl shadow-xl border-2 md:border-4 border-[var(--background)]">
                      {word}
                    </span>
                  </span>
                );
              }
              return (
                <span
                  key={i}
                  className="reveal-word opacity-20 inline-block mr-2 md:mr-4"
                >
                  {word}
                </span>
              );
            })}
          </h2>
        </div>

      </div>
    </section>
  );
}
