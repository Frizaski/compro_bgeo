"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import { Heart, MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Mock data for Instagram posts fallback
const instaPosts = [
  { id: 1, likes: 245, comments: 12, bg: "from-purple-500 to-pink-500", url: "#" },
  { id: 2, likes: 189, comments: 8, bg: "from-blue-400 to-[var(--primary-blue)]", url: "#" },
  { id: 3, likes: 342, comments: 24, bg: "from-[var(--primary-green)] to-emerald-500", url: "#" },
  { id: 4, likes: 156, comments: 5, bg: "from-orange-400 to-red-500", url: "#" },
  { id: 5, likes: 412, comments: 31, bg: "from-yellow-400 to-orange-500", url: "#" },
  { id: 6, likes: 278, comments: 18, bg: "from-indigo-400 to-purple-500", url: "#" },
];

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function InstagramFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [realPosts, setRealPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://api.curator.io/v1/feeds/19e4e4ea-6cc9-4a3b-b5c8-6cdab2227750/posts");
        const data = await res.json();
        if (data && data.posts) {
          setRealPosts(data.posts.slice(0, 8)); // Grab top 8 recent posts
        }
      } catch (error) {
        console.error("Error fetching Instagram posts", error);
      }
    };
    fetchPosts();
  }, []);

  const displayPosts = realPosts.length > 0 ? realPosts : instaPosts;

  useGSAP(
    () => {
      gsap.fromTo(
        ".carousel-container",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-24 overflow-hidden bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4 text-[var(--primary-blue)]">
              <InstagramIcon className="w-8 h-8" />
              <span className="font-bold tracking-widest uppercase text-sm">@bgeodev</span>
            </div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Life at <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-blue)]">BGEO</span>
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-4 max-w-xl">
              Follow our journey on Instagram. Behind the scenes, team events, and our latest digital creations.
            </p>
          </div>
          <a
            href="https://www.instagram.com/bgeodev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-black/15 dark:border-white/20 px-8 py-3 rounded-full hover:bg-[var(--primary-blue)] hover:text-white hover:border-[var(--primary-blue)] transition-all duration-300 font-medium group"
          >
            <InstagramIcon className="w-5 h-5 group-hover:scale-110 transition-transform" /> Follow Us
          </a>
        </div>
      </div>

      <div className="carousel-container flex overflow-hidden group w-full opacity-0">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex animate-slide group-hover:[animation-play-state:paused] shrink-0 gap-4 md:gap-6 pr-4 md:pr-6"
            aria-hidden={i === 2}
          >
            {displayPosts.map((post) => (
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                key={`${i}-${post.id}`}
                className="insta-post relative w-[70vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] shrink-0 aspect-square rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group/post bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 block"
              >
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.text || "Instagram post"}
                    className="absolute inset-0 w-full h-full object-cover group-hover/post:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div
                    className={`absolute inset-0 bg-gradient-to-tr ${post.bg} opacity-80 group-hover/post:scale-110 transition-transform duration-700`}
                  />
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/post:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white backdrop-blur-sm">
                  <div className="flex items-center gap-2 font-bold text-xl translate-y-4 group-hover/post:translate-y-0 transition-transform duration-300">
                    <Heart fill="currentColor" size={24} /> {post.likes}
                  </div>
                  <div className="flex items-center gap-2 font-bold text-xl translate-y-4 group-hover/post:translate-y-0 transition-transform duration-300 delay-75">
                    <MessageCircle fill="currentColor" size={24} /> {post.comments}
                  </div>
                </div>
              </a>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
