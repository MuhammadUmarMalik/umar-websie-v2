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
      <section className="px-4 pb-12 pt-28 sm:px-6 sm:pt-32 md:px-12 lg:px-20 lg:pt-48 2xl:px-28">
        <div className="mx-auto max-w-7xl">
          <p className="mono mb-4 text-sm uppercase text-accent">My Work</p>
          <h1 className="max-w-3xl font-display text-3xl font-bold leading-none sm:text-4xl md:text-6xl lg:text-7xl 2xl:text-8xl">
            Real Projects. Real Results.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-text-secondary">
            Every project here started with a real business problem. Here&apos;s how I solved them.
          </p>
        </div>
      </section>

      {/* Filterable grid */}
      <section className="px-4 py-6 sm:px-6 md:px-12 lg:px-20 2xl:px-28">
        <div className="mx-auto max-w-7xl">
          <PortfolioGrid />
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
