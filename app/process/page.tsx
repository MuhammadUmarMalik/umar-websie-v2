import type { Metadata } from "next";
import ProcessPageContent from "@/sections/ProcessPageContent";
import { createMetadata, seoMap, howToSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = createMetadata(seoMap.process);

export default function ProcessPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", href: "/" },
              { name: "Process", href: "/process" },
            ])
          ),
        }}
      />
      <ProcessPageContent />
    </>
  );
}
