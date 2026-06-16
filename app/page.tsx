import HeroSection from "@/sections/HeroSection";
import Project from "@/sections/projectShowcase";
import ServicesRevealSection from "@/sections/ServicesRevealSection";
import TestimonialsSection from "@/sections/TestimonialsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesRevealSection />
      <TestimonialsSection />
      <Project/>
    </>
  );
}
