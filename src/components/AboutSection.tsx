"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Parallax effect for the decorative element
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text reveal
      const texts = gsap.utils.toArray(".about-text");
      texts.forEach((text: any) => {
        gsap.fromTo(
          text,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: text,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative min-h-screen flex items-center justify-center py-24 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Decorative Parallax Element */}
      <div
        ref={imageRef}
        className="absolute right-0 top-0 w-1/2 h-[120%] bg-gradient-to-bl from-[var(--primary-blue)]/10 to-[var(--primary-green)]/5 rounded-l-[100px] blur-3xl -z-10"
      />

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div ref={textRef}>
          <h2 className="text-sm font-bold tracking-widest uppercase text-[var(--primary-green)] mb-4 about-text">
            About BGEO
          </h2>
          <h3 className="text-4xl md:text-5xl font-semibold mb-8 leading-tight about-text">
            We build digital experiences that drive growth.
          </h3>
          <p className="text-gray-400 text-lg mb-6 about-text">
            Founded from a passion for technology and creativity,
            BGEO focuses on building impactful digital experiences
            through website development, system development, and UI/UX design.
          </p>
          <p className="text-gray-400 text-lg about-text">
            Our team collaborates to transform ideas into modern,
            functional, and scalable solutions tailored to every
            client’s needs.
          </p>
        </div>

        <div className="relative h-[500px] w-full about-text flex items-center justify-center p-8 md:p-16">
          <Image
            src="/assets/logo/Logo_Bgeo.png"
            alt="BGEO Logo"
            fill
            className="object-contain p-4 md:p-8 drop-shadow-[0_20px_50px_rgba(2,206,19,0.3)]"
            priority
          />
        </div>
      </div>
    </section>
  );
}
