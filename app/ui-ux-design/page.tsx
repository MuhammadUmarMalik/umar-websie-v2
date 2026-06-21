import type { Metadata } from "next";
import {
  createMetadata,
  seoMap,
  faqSchema,
  breadcrumbSchema,
  serviceSchema,
} from "@/lib/seo";
import UIUXPageClient from "@/components/services/UIUXPageClient";

export const metadata: Metadata = createMetadata(seoMap.uiUxDesign);

const SERVICE_FAQS = [
  {
    question: "What is UI/UX design and why does it matter?",
    answer:
      "UI (User Interface) is how a website or app looks — colours, typography, layout, components. UX (User Experience) is how it feels to use — navigation flow, clarity, speed, and ease of finding information. Good UI/UX directly impacts conversions, bounce rate, and customer trust.",
  },
  {
    question: "Do I get to see the design before you build anything?",
    answer:
      "Always. Design comes first. You review wireframes, then full UI mockups, then an interactive prototype — all before any development starts. Nothing is built until you've approved what it looks like.",
  },
  {
    question: "What tools do you design in?",
    answer:
      "Figma. It's the industry standard for UI/UX design — collaborative, web-based, and the best tool for developer handoff. You'll get full access to the Figma file and can share it with your team.",
  },
  {
    question: "Can you design for an existing brand I already have?",
    answer:
      "Yes. If you have a logo, colour palette, or brand guide, I design within those guidelines. If your branding is inconsistent or outdated, I can refresh it as part of the project.",
  },
  {
    question: "Will the design work on mobile too?",
    answer:
      "Yes — mobile-first is the default. I design for the smallest screen first, then adapt for tablet and desktop. Every component is checked for touch targets and readability on small screens.",
  },
  {
    question: "What if I only need design, not development?",
    answer:
      "That's fine. I deliver a complete Figma file ready for your developers to build from — annotated with spacing, colours, fonts, and all states. Handoff includes a walkthrough so nothing is left ambiguous.",
  },
];

export default function UIUXDesignPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: "UI/UX Design",
              description:
                "Clean, conversion-focused UI/UX design for websites, landing pages, SaaS dashboards, and mobile apps. Delivered in Figma with wireframes, full visual design, interactive prototype, and developer-ready handoff.",
              path: "/ui-ux-design",
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(SERVICE_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", href: "/" },
              { name: "Services", href: "/services" },
              { name: "UI/UX Design", href: "/ui-ux-design" },
            ])
          ),
        }}
      />
      <UIUXPageClient />
    </>
  );
}
