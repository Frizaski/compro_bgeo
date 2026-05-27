import { projects, type Project } from "@/data/projects";

export interface HistoryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  desc: string;
}

export interface ServiceItem {
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  instagram: string;
  portfolio: string;
  linkedin: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SiteContent {
  hero: {
    wordOne: string;
    wordTwo: string;
    wordThree: string;
    cursorText: string;
  };
  about: {
    label: string;
    heading: string;
    paragraphOne: string;
    paragraphTwo: string;
  };
  visionText: string;
  history: HistoryItem[];
  services: ServiceItem[];
  projects: Project[];
  team: TeamMember[];
  faq: FAQItem[];
  contact: {
    email: string;
    phoneLabel: string;
    phoneHref: string;
    instagram: string;
    linkedin: string;
  };
}

export const defaultSiteContent: SiteContent = {
  hero: {
    wordOne: "Build",
    wordTwo: "With",
    wordThree: "BGEO.",
    cursorText: "BGEO",
  },
  about: {
    label: "About BGEO",
    heading: "We build digital experiences that drive growth.",
    paragraphOne:
      "Founded from a passion for technology and creativity, BGEO focuses on building impactful digital experiences through website development, system development, and UI/UX design.",
    paragraphTwo:
      "Our team collaborates to transform ideas into modern, functional, and scalable solutions tailored to every client's needs.",
  },
  visionText: "NEXT BIG MOVE WITH BGEO AND BUILD BEYOND LIMITS",
  history: [
    {
      id: "01",
      title: "The Beginning",
      subtitle: "Where It All Started",
      image: "/assets/journey/1.jpeg",
      desc: "BGEO started from a simple collaboration between team members who worked on a company profile website project for a client.",
    },
    {
      id: "02",
      title: "Building the Identity",
      subtitle: "Creating BGEO",
      image: "/assets/journey/2.jpeg",
      desc: "To look more professional and structured as a team, we created the name BGEO inspired by DGeo, a startup founded by one of our member's family.",
    },
    {
      id: "03",
      title: "Bigger Opportunities",
      subtitle: "Developing OPS",
      image: "/assets/journey/3.jpeg",
      desc: "We began working on a larger-scale project called OPS (Operational Patrolling System), a monitoring system for operational staff such as security and cleaning services.",
    },
    {
      id: "04",
      title: "Entering the Startup",
      subtitle: "Joining Startup School",
      image: "/assets/journey/4.jpeg",
      desc: "Seeing the opportunity to grow further, we joined IPB CDA Entrepreneurship Program through Startup School to strengthen our business and startup foundation.",
    },
    {
      id: "05",
      title: "Beyond the Future",
      subtitle: "Growing Beyond Limits",
      image: "/assets/journey/5.jpeg",
      desc: "Today, BGEO is growing into a serious digital startup focused on building impactful digital solutions and scalable technology for the future.",
    },
  ],
  services: [
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
    },
  ],
  projects,
  team: [
    {
      name: "Cahya Ilham",
      role: "Project Manager",
      bio: "Leading projects with strategy and effective execution.",
      image: "/assets/member/Cahya.jpeg",
      instagram: "https://www.instagram.com/chyilhm/?hl=en",
      portfolio: "#",
      linkedin: "#",
    },
    {
      name: "Faris Fadhil",
      role: "Mobile & Back-End Developer",
      bio: "Building scalable systems and seamless mobile experiences.",
      image: "/assets/member/Fadhil.jpg",
      instagram: "https://www.instagram.com/m_fdhillll/?hl=en",
      portfolio: "#",
      linkedin: "#",
    },
    {
      name: "Rafi Alexander",
      role: "Front-End Developer",
      bio: "Crafting responsive and interactive web interfaces.",
      image: "/assets/member/Alex.jpg",
      instagram: "https://www.instagram.com/alexanderafi_/?hl=en",
      portfolio: "https://portofolio-alex-sigma.vercel.app/",
      linkedin: "#",
    },
    {
      name: "Frizaski Al Fath",
      role: "UI/UX Designer",
      bio: "Designing modern and intuitive digital experiences.",
      image: "/assets/member/Frizaski.jpg",
      instagram: "https://www.instagram.com/frizaskii/?hl=en",
      portfolio: "https://portfoliofrizaski.vercel.app/",
      linkedin: "#",
    },
  ],
  faq: [
    {
      question: "How much does it cost to create a website?",
      answer: "The cost depends on the complexity, features, and scale of your project. We offer customized packages tailored to your specific needs and budget constraints.",
    },
    {
      question: "How long does it take to create a website?",
      answer: "A standard company profile typically takes 2-4 weeks, while complex web applications may take several months. We will provide a detailed timeline during our initial consultation.",
    },
    {
      question: "Can hosting be included?",
      answer: "Yes, we provide end-to-end solutions including reliable cloud hosting, domain registration, and ongoing server maintenance if required.",
    },
    {
      question: "Are there any additional costs for revisions?",
      answer: "Our standard contracts include a set number of revision rounds. Any major structural changes requested after the approval phase may incur additional costs, which we will always communicate upfront.",
    },
    {
      question: "How do I order?",
      answer: "You can reach out to us directly via our email or contact number below. We'll set up a brief discovery call to understand your needs and send you a formal proposal.",
    },
  ],
  contact: {
    email: "bgeodev@gmail.com",
    phoneLabel: "(+62) 895 3232 89181",
    phoneHref: "+62895323289181",
    instagram: "https://instagram.com/bgeodev",
    linkedin: "#",
  },
};
