"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactFooter() {
  const containerRef = useRef<HTMLElement>(null);
  const getInRef = useRef<HTMLDivElement>(null);
  const touchRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // Pin for 2x screen height
          scrub: 1,
          pin: true,
        },
      });

      // 1. Slide text apart and fade out slightly
      tl.to(getInRef.current, { x: "-50vw", opacity: 0, duration: 1, ease: "power2.inOut" }, 0);
      tl.to(touchRef.current, { x: "50vw", opacity: 0, duration: 1, ease: "power2.inOut" }, 0);

      // 2. Fade in and scale up the gallery photos in the background
      tl.fromTo(
        galleryRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
        0
      );

      // 3. Fade in and float up the actual contact information at the center
      tl.fromTo(
        contactRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        0.5 // Start halfway through the animation
      );
    },
    { scope: containerRef }
  );

  return (
    <footer
      ref={containerRef}
      className="relative h-screen w-full bg-[#050505] text-white overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background Gallery (Reveals on scroll) */}
      <div ref={galleryRef} className="absolute inset-0 z-0 opacity-0 pointer-events-none">
        <div className="absolute top-[5%] left-[5%] w-[25vw] h-[35vh] rounded-2xl overflow-hidden transform -rotate-6 shadow-2xl border border-white/10">
          <img
            src="/assets/contact/1.jpeg"
            alt="Gallery"
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
        </div>
        <div className="absolute top-[15%] right-[8%] w-[22vw] h-[40vh] rounded-2xl overflow-hidden transform rotate-3 shadow-2xl border border-white/10">
          <img
            src="/assets/contact/2.jpeg"
            alt="Gallery"
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
        </div>
        <div className="absolute bottom-[5%] left-[25%] w-[35vw] h-[30vh] rounded-2xl overflow-hidden transform rotate-2 shadow-2xl border border-white/10">
          <img
            src="/assets/contact/3.jpeg"
            alt="Gallery"
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
        </div>
        <div className="absolute bottom-[10%] right-[20%] w-[20vw] h-[25vh] rounded-2xl overflow-hidden transform -rotate-3 shadow-2xl border border-white/10">
          <img
            src="/assets/contact/4.jpeg"
            alt="Gallery"
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
        </div>
      </div>

      {/* Giant Sliding Text */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center pointer-events-none w-full">
        <div ref={getInRef} className="flex justify-start w-full pl-[10vw]">
          <h1 className="text-[14vw] md:text-[10vw] leading-[0.9] font-black tracking-tighter uppercase text-white drop-shadow-2xl">
            GET IN
          </h1>
        </div>
        <div ref={touchRef} className="flex justify-end w-full pr-[10vw] mt-[2vw]">
          <h1 className="text-[14vw] md:text-[10vw] leading-[0.9] font-black tracking-tighter uppercase text-white drop-shadow-2xl">
            TOUCH
          </h1>
        </div>
      </div>

      {/* Contact Info (Revealed at the end) */}
      <div
        ref={contactRef}
        className="relative z-20 flex flex-col items-center justify-center h-full w-full px-6 text-white pt-10"
      >
        <div className="flex flex-col items-center gap-8 md:gap-12 w-full max-w-4xl">
          <div className="w-full flex justify-center border-b border-white/20 pb-6">
            <a
              href="mailto:hello@bgeo.com"
              className="text-4xl md:text-6xl lg:text-7xl font-light hover:text-[var(--primary-green)] transition-colors flex items-center gap-4"
            >
              <span className="text-2xl md:text-4xl">→</span> bgeodev@gmail.com
            </a>
          </div>

          <div className="w-full flex justify-center border-b border-white/20 pb-6">
            <a
              href="tel:+628123456789"
              className="text-4xl md:text-6xl lg:text-7xl font-light hover:text-[var(--primary-blue)] transition-colors"
            >
              (+62) 895 3232 89181
            </a>
          </div>

          <div className="flex w-full justify-between px-4 md:px-12 text-lg md:text-2xl font-light mt-4">
            <a
              href="https://instagram.com/bgeodev"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-[var(--primary-green)] transition-colors"
            >
              <span>→</span> instagram
            </a>
            <a
              href="#"
              className="flex items-center gap-2 hover:text-[var(--primary-blue)] transition-colors"
            >
              <span>→</span> linkedin
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="absolute bottom-6 left-0 w-full px-8 md:px-12 flex justify-between items-center text-xs md:text-sm text-gray-500 z-30">
        <span>Created by BGEO.</span>
        <span>© {new Date().getFullYear()}.</span>
      </div>
    </footer>
  );
}
