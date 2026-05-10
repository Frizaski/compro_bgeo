"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Web Development",
    description: "Modern and responsive websites designed to strengthen your digital presence and business growth.",
  },
  {
    title: "System Development",
    description: "Custom digital systems tailored to streamline operations and improve business efficiency.",
  },
  {
    title: "UI/UX Design",
    description: "Clean, intuitive, and engaging user experiences crafted for modern digital products.",
  },
  {
    title: "Digital Solutions",
    description: "Innovative technology solutions that help businesses adapt and grow in the digital era.",
  },
  {
    title: "Hosting & Maintenance",
    description: "Reliable hosting and maintenance services to keep your digital assets running smoothly.",
  }
];

export default function HorizontalScrollServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Entry Animation for Typography
      gsap.fromTo(
        [".title-part", ".title-logo", ".subtitle-part"],
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const getScrollAmount = () => {
        if (!scrollWrapperRef.current) return 0;
        return scrollWrapperRef.current.scrollWidth - window.innerWidth;
      };

      const tween = gsap.to(scrollWrapperRef.current, {
        x: () => -getScrollAmount(),
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative w-full bg-[var(--background)]">
      <section className="h-screen w-full overflow-hidden flex items-center">
        <div ref={scrollWrapperRef} className="flex w-max h-full items-center">
          
          {/* Slide 1: The Massive Typography */}
          <div className="w-screen h-full flex flex-col items-center justify-center shrink-0 relative z-10">
          <div className="flex flex-col items-center uppercase font-black tracking-tighter leading-[0.75] text-[15vw] md:text-[10rem] lg:text-[12rem] text-black dark:text-white">
            <span className="relative z-0 title-part">WHAT</span>
            
            {/* Overlapping logo container */}
            <div className="h-[25vw] md:h-[14rem] lg:h-[16rem] w-[25vw] md:w-[14rem] lg:w-[16rem] -my-[8vw] md:-my-[4rem] lg:-my-[5rem] relative z-20 flex items-center justify-center title-logo">
              <img 
                src="/assets/logo/Logo_Bgeo.png" 
                alt="BGEO" 
                className="w-full h-full object-contain" 
              />
            </div>
            
            <div className="relative flex items-end z-0 title-part">
               <div className="absolute right-[100%] mr-4 md:mr-12 bottom-4 md:bottom-8 text-lg md:text-3xl lg:text-4xl font-medium tracking-normal normal-case text-gray-500 dark:text-gray-400 whitespace-nowrap font-sans leading-none subtitle-part">
                 Our Services
               </div>
               <span>DOES</span>
            </div>
          </div>
        </div>

        {/* Slide 2+ : The Service Cards */}
        <div className="flex h-full items-center pr-12 md:pr-24">
          {services.map((service, index) => {
            return (
              <div
                key={index}
                className="service-card w-[85vw] sm:w-[50vw] md:w-[35vw] lg:w-[28vw] h-[60vh] flex-shrink-0 pr-8"
              >
                <div className="h-full w-full rounded-3xl bg-white dark:bg-white/5 border border-black/15 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-none backdrop-blur-md p-8 md:p-10 flex flex-col justify-between hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-500 group">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-blue)]">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="mt-6 md:mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </section>
    </div>
  );
}
