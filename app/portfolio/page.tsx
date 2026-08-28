import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PortfolioGrid } from "@/sections/PortfolioGrid";
import CTABanner from "@/sections/CTABanner";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { caseStudies } from "@/lib/constants";
import { createMetadata, seoMap, portfolioSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = createMetadata(seoMap.portfolio);

// Single source of truth for both the visible trail and the JSON-LD.
const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
];

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
          __html: JSON.stringify(breadcrumbSchema(CRUMBS)),
        }}
      />
      {/* Hero */}
      <section className="px-4 pb-12 pt-28 sm:px-6 sm:pt-32 md:px-12 lg:px-20 lg:pt-48 2xl:px-28">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={CRUMBS} />
          <p className="mono mb-4 text-sm uppercase text-accent">My Work</p>
          <h1 className="max-w-3xl font-display text-3xl font-bold leading-none sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl">
            Web Development &amp; Automation Portfolio
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-text-secondary">
            Real projects, real results. Every one started with a business problem — here&apos;s
            how I solved them.
          </p>
        </div>
      </section>

      {/* Case studies — the full write-ups, above the grid because they are the
          pages that rank and convert. The grid below is the wider sample. */}
      <section
        aria-labelledby="case-studies-heading"
        className="px-4 py-10 sm:px-6 md:px-12 lg:px-20 2xl:px-28"
      >
        <div className="mx-auto max-w-7xl">
          <h2
            id="case-studies-heading"
            className="font-display text-2xl font-bold sm:text-3xl"
          >
            Case Studies
          </h2>
          <p className="mt-3 max-w-xl leading-8 text-text-secondary">
            The full breakdown — the problem, what I built, and what changed.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs) => (
              <article
                key={cs.slug}
                className="group relative flex h-full flex-col rounded-2xl border border-border bg-bg-card p-8 transition-colors duration-200 hover:border-accent/40"
              >
                <p className="mono mb-3 text-xs uppercase tracking-widest text-accent">
                  {cs.service}
                </p>
                <h3 className="font-display text-2xl font-bold leading-tight">
                  <Link
                    href={`/portfolio/${cs.slug}`}
                    className="transition-colors duration-200 after:absolute after:inset-0 hover:text-accent"
                  >
                    {cs.title}
                  </Link>
                </h3>
                <p className="mt-4 flex-1 leading-7 text-text-secondary">{cs.problem}</p>
                <p className="mono mt-6 flex items-center gap-2 text-sm text-accent">
                  Read the case study
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Filterable grid */}
      <section aria-labelledby="all-work-heading" className="px-4 py-6 sm:px-6 md:px-12 lg:px-20 2xl:px-28">
        <div className="mx-auto max-w-7xl">
          <h2 id="all-work-heading" className="mb-8 font-display text-2xl font-bold sm:text-3xl">
            All Work
          </h2>
          <PortfolioGrid />
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
