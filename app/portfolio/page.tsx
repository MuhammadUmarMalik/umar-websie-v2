import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PortfolioGrid } from "@/sections/PortfolioGrid";
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
        <div className="mx-auto max-w-320">
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
        <div className="mx-auto max-w-320">
          <PortfolioGrid />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-320 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Have a Project in Mind?
            </h2>
            <p className="mt-3 text-text-secondary">Let&apos;s talk about it.</p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex h-12 shrink-0 items-center gap-2.5 rounded-full bg-accent px-8 text-sm font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_28px_color-mix(in_srgb,var(--accent)_40%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Contact Me
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  );
}
