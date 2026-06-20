import CTABanner from "@/sections/CTABanner";
import HeroSection from "@/sections/HeroSection";
import PricingSection from "@/sections/PricingSection";
import ProcessSection from "@/sections/ProcessSection";
import Project from "@/sections/projectShowcase";
import ServicesRevealSection from "@/sections/ServicesRevealSection";
import StatsSection from "@/sections/StatsSection";
import TestimonialsSection from "@/sections/TestimonialsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesRevealSection />
      <ProcessSection />
      <StatsSection />
      <Project />
      <TestimonialsSection />
  
      <CTABanner />
    </>
  );
}
