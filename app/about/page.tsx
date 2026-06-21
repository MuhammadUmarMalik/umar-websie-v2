import type { Metadata } from "next";
import { createMetadata, seoMap, personSchema, breadcrumbSchema } from "@/lib/seo";
import AboutPageClient from "@/components/about/AboutPageClient";

export const metadata: Metadata = createMetadata(seoMap.about);

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", href: "/" },
              { name: "About", href: "/about" },
            ])
          ),
        }}
      />
      <AboutPageClient />
    </>
  );
}
