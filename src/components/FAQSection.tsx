"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const FAQ_DATA = [
  {
    question: "How much does it cost to create a website?",
    answer: "The cost depends on the complexity, features, and scale of your project. We offer customized packages tailored to your specific needs and budget constraints."
  },
  {
    question: "How long does it take to create a website?",
    answer: "A standard company profile typically takes 2-4 weeks, while complex web applications may take several months. We will provide a detailed timeline during our initial consultation."
  },
  {
    question: "Can hosting be included?",
    answer: "Yes, we provide end-to-end solutions including reliable cloud hosting, domain registration, and ongoing server maintenance if required."
  },
  {
    question: "Are there any additional costs for revisions?",
    answer: "Our standard contracts include a set number of revision rounds. Any major structural changes requested after the approval phase may incur additional costs, which we will always communicate upfront."
  },
  {
    question: "How do I order?",
    answer: "You can reach out to us directly via our email or contact number below. We'll set up a brief discovery call to understand your needs and send you a formal proposal."
  }
];

export default function FAQSection() {
  const containerRef = useRef<HTMLElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const word3Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  useGSAP(() => {
    // Sliding title animation
    gsap.fromTo(
      [word1Ref.current, word2Ref.current, word3Ref.current, descRef.current],
      { 
        x: "50vw", // Start off to the right
        opacity: 0 
      },
      {
        x: 0, // End at normal position
        opacity: 1,
        stagger: 0.15, // Animate one by one
        ease: "none", // Scrub should use none or very simple ease
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // Animation starts when section top hits viewport bottom
          end: "top 20%",      // Animation ends when section top is 20% from the viewport top
          scrub: 1,            // Smooth scrubbing
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="w-full bg-[var(--background)] py-32 px-6 md:px-12 lg:px-24 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        
        {/* Left Side: Animated Title */}
        <div className="w-full lg:w-5/12 flex flex-col justify-start relative">
          {/* The sticky wrapper ensures the title stays in view if the FAQ list is very long */}
          <div className="lg:sticky lg:top-32">
            <h2 className="text-6xl md:text-7xl lg:text-[5rem] font-black tracking-tighter uppercase leading-[0.9] text-black dark:text-white drop-shadow-xl flex flex-col items-start">
              <span ref={word1Ref} className="block">Your</span>
              <span ref={word2Ref} className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-blue)]">Questions,</span>
              <span ref={word3Ref} className="block">Answered.</span>
            </h2>
            <p ref={descRef} className="mt-8 text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-sm">
              Find answers to the most common questions about working with BGEO.
            </p>
          </div>
        </div>

        {/* Right Side: Accordion */}
        <div className="w-full lg:w-7/12 flex flex-col gap-4 z-10">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className={`border-b transition-colors duration-300 ${isOpen ? 'border-[var(--primary-green)]' : 'border-black/10 dark:border-white/10'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
                >
                  <h3 className={`text-xl md:text-2xl font-semibold pr-8 transition-colors duration-300 ${isOpen ? 'text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-blue)]' : 'text-black dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--primary-green)] group-hover:to-[var(--primary-blue)]'}`}>
                    {item.question}
                  </h3>
                  
                  {/* Plus/Minus Icon */}
                  <div className="relative w-6 h-6 flex-shrink-0 flex items-center justify-center">
                    <span className={`absolute w-full h-[2px] rounded-full transition-colors duration-300 ${isOpen ? 'bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-blue)]' : 'bg-black dark:bg-white'}`} />
                    <span 
                      className={`absolute w-[2px] h-full rounded-full transition-all duration-300 ease-in-out ${isOpen ? 'rotate-90 scale-0 bg-gradient-to-t from-[var(--primary-green)] to-[var(--primary-blue)]' : 'rotate-0 scale-100 bg-black dark:bg-white'}`} 
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
