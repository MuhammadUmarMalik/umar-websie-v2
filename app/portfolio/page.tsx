import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PortfolioGrid } from "@/sections/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolio — Muhammad Umar Malik",
  description:
    "Real projects. Real results. See how I've helped businesses grow with better websites and automation.",
};

export default function PortfolioPage() {
  return (
    <main className="bg-background text-foreground">
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
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-bg-primary transition duration-200 hover:bg-accent-hover"
          >
            Contact Me
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  );
}
