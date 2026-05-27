"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";

gsap.registerPlugin(ScrollTrigger);

export default function HistorySection() {
  const { history } = useSiteContent();
  const containerRef = useRef<HTMLElement>(null);
  const rightSectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const leftTextsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Hide all texts except the first one initially
    gsap.set(leftTextsRef.current.slice(1), { opacity: 0, y: 50 });
    gsap.set(leftTextsRef.current[0], { opacity: 1, y: 0 });

    let currentIndex = 0;

    const updateText = (newIndex: number, direction: number) => {
      if (currentIndex === newIndex) return;

      // Stop any ongoing animations on the texts
      gsap.killTweensOf(leftTextsRef.current);

      // Instantly hide all texts except the current and new to prevent overlap bugs
      leftTextsRef.current.forEach((el, idx) => {
        if (idx !== currentIndex && idx !== newIndex) {
          gsap.set(el, { opacity: 0 });
        }
      });

      // Animate OUT current text
      gsap.to(leftTextsRef.current[currentIndex], {
        opacity: 0,
        y: direction === 1 ? -50 : 50,
        duration: 0.4,
        ease: "power2.in",
      });

      // Animate IN new text
      gsap.fromTo(
        leftTextsRef.current[newIndex],
        { opacity: 0, y: direction === 1 ? 50 : -50 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.1 }
      );

      currentIndex = newIndex;
    };

    rightSectionsRef.current.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 60%", // when the top of the photo reaches 60% of viewport
        end: "bottom 60%",
        onEnter: () => updateText(i, 1),
        onEnterBack: () => updateText(i, -1),
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500">
      {/* Desktop/Tablet Split Layout */}
      <div className="hidden md:flex w-full">
        {/* Left: Sticky Text Area */}
        <div className="w-[45%] h-screen sticky top-0 flex flex-col justify-center pl-12 lg:pl-24 z-20 pointer-events-none">
          <div className="relative w-full h-[40vh]">
            {history.map((item, i) => (
              <div
                key={item.id}
                ref={(el) => { leftTextsRef.current[i] = el; }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="flex items-end gap-6 mb-4">
                  <span className="text-[var(--primary-green)] text-2xl font-medium font-mono">{item.id}</span>
                  <div className="h-px w-16 bg-black/20 dark:bg-white/20 mb-3" />
                </div>
                <h2 className="text-5xl lg:text-7xl xl:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-6 drop-shadow-2xl">
                  {item.title}
                </h2>
                <h3 className="text-[var(--primary-green)] font-semibold text-xl md:text-2xl mb-2 tracking-wide">
                  {item.subtitle}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-xl max-w-lg xl:max-w-xl whitespace-normal leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Scrolling Photos */}
        <div className="w-[55%] flex flex-col z-10 relative">
          {history.map((item, i) => (
            <div
              key={i}
              ref={(el) => { rightSectionsRef.current[i] = el; }}
              className="h-screen w-full flex items-center justify-center p-12 lg:pr-32"
            >
              <div className="relative w-full max-w-xl h-[70vh] rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Layout (Stacked) */}
      <div className="flex md:hidden flex-col w-full px-6 py-24 gap-32">
        {history.map((item, i) => (
          <div key={i} className="flex flex-col gap-8">
            <div className="flex items-end gap-4">
              <span className="text-[var(--primary-green)] text-xl font-medium font-mono">{item.id}</span>
              <div className="h-px w-8 bg-black/20 dark:bg-white/20 mb-3" />
            </div>
            <h2 className="text-5xl font-black tracking-tighter uppercase leading-none drop-shadow-xl">
              {item.title}
            </h2>
            <div className="relative w-full h-[50vh] rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-[var(--primary-green)] font-semibold text-xl mb-2 tracking-wide">
                {item.subtitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
