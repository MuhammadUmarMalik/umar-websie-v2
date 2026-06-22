import type { Metadata } from "next";
import { PortfolioGrid } from "@/sections/PortfolioGrid";
import CTABanner from "@/sections/CTABanner";
import { createMetadata, seoMap, portfolioSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = createMetadata(seoMap.portfolio);

export default function PortfolioPage() {
  return (
    <main className="bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", href: "/" },
              { name: "Portfolio", href: "/portfolio" },
            ])
          ),
        }}
      />
      {/* Hero */}
      <section className="px-6 pb-16 pt-36 md:px-12 lg:px-20 lg:pt-48">
        <div className="mx-auto max-w-7xl">
          <p className="mono mb-4 text-sm uppercase text-accent">My Work</p>
          <h1 className="max-w-3xl font-display text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
            Real Projects. Real Results.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-text-secondary">
            Every project here started with a real business problem. Here&apos;s how I solved them.
          </p>
        </div>
      </section>

      {/* Filterable grid */}
      <section className="px-6 py-8 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <PortfolioGrid />
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
