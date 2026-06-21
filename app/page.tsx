import type { Metadata } from "next";
import CTABanner from "@/sections/CTABanner";
import HeroSection from "@/sections/HeroSection";
import PainPointsSection from "@/sections/PainPointsSection";
import ProcessSection from "@/sections/ProcessSection";
import Project from "@/sections/projectShowcase";
import ServicesRevealSection from "@/sections/ServicesRevealSection";
import StatsSection from "@/sections/StatsSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import {
  websiteSchema,
  personSchema,
  organizationSchema,
  faqSchema,
  servicesListSchema,
  createMetadata,
  seoMap,
} from "@/lib/seo";

export const metadata: Metadata = createMetadata(seoMap.home);

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesListSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema()) }}
      />
      <HeroSection />
      <ServicesRevealSection />
      <PainPointsSection />
      <ProcessSection />
      <StatsSection />
      <Project />
      <TestimonialsSection />
      <CTABanner />
    </>
  );
}
