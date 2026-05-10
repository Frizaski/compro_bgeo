"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import TextCursor from "./TextCursor";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const word3Ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
          [word1Ref.current, word2Ref.current, word3Ref.current],
          { y: 150, opacity: 0, rotate: 10 },
          { y: 0, opacity: 1, rotate: -8, duration: 1.2, stagger: 0.15 }
        );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
    >
      <TextCursor 
        text="BGEO" 
        spacing={80} 
        followMouseDirection={true} 
        randomFloat={true} 
        exitDuration={0.3} 
        removalInterval={20} 
        maxPoints={10} 
      />

      <div className="z-10 text-center px-4 w-full flex flex-col items-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase flex flex-wrap gap-4 md:gap-8 justify-center">
          <span className="block overflow-hidden pt-12 pb-8 px-8 -mt-12 -mx-8">
            <span ref={word1Ref} className="block text-black dark:text-white drop-shadow-xl transform origin-bottom-left">
              Build
            </span>
          </span>
          <span className="block overflow-hidden pt-12 pb-8 px-8 -mt-12 -mx-8">
            <span ref={word2Ref} className="block text-black dark:text-white drop-shadow-xl transform origin-bottom-left">
              With
            </span>
          </span>
          <span className="block overflow-hidden pt-12 pb-8 px-8 -mt-12 -mx-8">
            <span ref={word3Ref} className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-blue)] drop-shadow-xl transform origin-bottom-left">
              BGEO.
            </span>
          </span>
        </h1>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span className="text-sm uppercase tracking-widest text-gray-400">Scroll</span>
        <div className="h-10 w-[1px] bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
