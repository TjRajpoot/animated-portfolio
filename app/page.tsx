import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import TextRevealHero from "@/components/TextRevealHero";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import HorizontalScrollWrapper from "@/components/HorizontalScrollWrapper";

/**
 * Main Page — Tanuj Singh Portfolio
 *
 * Flow: TextRevealHero → About → Projects (WebGL 3D + HTML overlay)
 *       → Skills + Education (horizontal scroll) → Contact → Footer
 */
export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <TextRevealHero />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <HorizontalScrollWrapper>
          <EducationSection />
          <ContactSection />
        </HorizontalScrollWrapper>
      </main>
      <Footer />
    </SmoothScroll>
  );
}