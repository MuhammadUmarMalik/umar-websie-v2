import type { Metadata } from "next";
import { createMetadata, seoMap, faqSchema, breadcrumbSchema, servicesListSchema } from "@/lib/seo";
import ServicesPageClient from "@/components/services/ServicesPageClient";

export const metadata: Metadata = createMetadata(seoMap.services);

const SERVICE_FAQS = [
  {
    question: "What services do you offer?",
    answer:
      "Website development (Next.js, React, WordPress), business automation (n8n, Make, AI workflows), and UI/UX design (Figma wireframes, full UI, interactive prototypes).",
  },
  {
    question: "How do I know which service I need?",
    answer:
      "Book a free discovery call and I'll audit what's actually hurting your business and recommend the right fix. No overselling.",
  },
  {
    question: "Do you work with existing websites or only build new ones?",
    answer:
      "Both. I regularly audit and fix existing sites — speed issues, broken layouts, poor conversion paths — without a full rebuild.",
  },
  {
    question: "What does a project cost?",
    answer:
      "Website projects start from $499 (Starter) and $999 (Growth). Automation and design projects are scoped per requirements.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesListSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(SERVICE_FAQS)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", href: "/" },
              { name: "Services", href: "/services" },
            ])
          ),
        }}
      />
      <ServicesPageClient />
    </>
  );
}
