import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import HistorySection from "@/components/HistorySection";
import VisionSection from "@/components/VisionSection";
import HorizontalScrollServices from "@/components/HorizontalScrollServices";
import Projects from "@/components/Projects";
import ScrollVelocity from "@/components/ScrollVelocity";
import TeamSection from "@/components/TeamSection";
import InstagramFeed from "@/components/InstagramFeed";
import FAQSection from "@/components/FAQSection";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Hero />
      <AboutSection />
      <HistorySection />
      <VisionSection />
      <HorizontalScrollServices />
      <Projects />
      
      <div className="py-24 overflow-hidden">
        <ScrollVelocity
          texts={['Beyond Geo Beyond Limits', 'Scroll Down']} 
          velocity={50} 
          className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-blue)] mx-4"
        />
      </div>

      <TeamSection />
      <InstagramFeed />
      <FAQSection />
      <ContactFooter />
    </main>
  );
}
