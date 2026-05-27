export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  image: string;
  technologies: string[];
  summary: string;
  color: string;
}

export const projects: Project[] = [
  {
    slug: "cs-corp-company-profile",
    title: "CS Corp Company Profile Website",
    category: "Website",
    year: "2024",
    image: "/assets/thumbnails/1.png",
    technologies: ["React", "JavaScript", "CSS"],
    summary: "A polished company profile experience designed to communicate the brand clearly and build credibility online.",
    color: "from-[#02CE13]/20 to-transparent",
  },
  {
    slug: "operational-patrolling-system",
    title: "Operational Patrolling System (OPS)",
    category: "Mobile Application",
    year: "2023",
    image: "/assets/thumbnails/2.png",
    technologies: ["Flutter", "Firebase", "QR Technology"],
    summary: "An operational monitoring system that helps field teams document patrol activity efficiently and reliably.",
    color: "from-[#356EE7]/20 to-transparent",
  },
  {
    slug: "fotokan-photobooth",
    title: "FotoKAN Photobooth Website",
    category: "Website",
    year: "2023",
    image: "/assets/thumbnails/3.png",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    summary: "A playful digital storefront for a photobooth brand, created to make discovery and booking feel effortless.",
    color: "from-[#02CE13]/20 to-[#356EE7]/20",
  },
  {
    slug: "alumni-ipb-jakarta",
    title: "Alumni IPB Jakarta Website",
    category: "Community Platform Website",
    year: "2024",
    image: "/assets/thumbnails/4.png",
    technologies: ["React", "Vite", "CSS"],
    summary: "A community-focused platform that presents programs, identity, and information for an alumni network.",
    color: "from-[#356EE7]/20 to-transparent",
  },
];
