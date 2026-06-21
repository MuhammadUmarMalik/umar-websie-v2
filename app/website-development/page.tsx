import type { Metadata } from "next";
import {
  createMetadata,
  seoMap,
  faqSchema,
  breadcrumbSchema,
  serviceSchema,
} from "@/lib/seo";
import WebDevPageClient from "@/components/services/WebDevPageClient";

export const metadata: Metadata = createMetadata(seoMap.websiteDevelopment);

const SERVICE_FAQS = [
  {
    question: "How long does a website project take?",
    answer:
      "Starter websites (up to 5 pages) take 7–10 business days. Growth packages (up to 10 pages with CMS) take 14–21 days. Timelines are agreed in writing before work starts.",
  },
  {
    question: "Do you build with WordPress or custom code?",
    answer:
      "Both. Next.js and React for performance-critical or complex sites. WordPress or Shopify where non-technical clients need to manage content themselves.",
  },
  {
    question: "Will my new website rank on Google?",
    answer:
      "I implement on-page SEO on every page: optimized title tags, meta descriptions, structured data (JSON-LD), semantic HTML, sitemap.xml, and robots.txt. Combined with fast load times and Core Web Vitals, your site will be properly set up to rank.",
  },
  {
    question: "Can I update the content myself after launch?",
    answer:
      "Yes. For WordPress or Shopify builds you can edit everything via the admin panel. For Next.js projects I can integrate a headless CMS like Sanity so your team can update content without touching code.",
  },
  {
    question: "Do I own everything after the project?",
    answer:
      "100%. You own the source code, domain, hosting account, and all credentials. No lock-in, no ongoing fees owed to me unless you choose a support plan.",
  },
  {
    question: "What if I already have a website — can you fix it instead of rebuilding?",
    answer:
      "Absolutely. I regularly audit and repair existing sites — slow load times, broken mobile layouts, poor conversion paths, outdated design. Sometimes a targeted fix is all you need.",
  },
];

export default function WebsiteDevelopmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: "Website Development",
              description:
                "Fast, responsive, conversion-focused website development in Next.js, React, and WordPress for small businesses. Includes custom design, on-page SEO, Core Web Vitals optimization, lead capture forms, and Google Analytics 4 setup.",
              path: "/website-development",
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
              { name: "Website Development", href: "/website-development" },
            ])
          ),
        }}
      />
      <WebDevPageClient />
    </>
  );
}
