import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/lib/constants";

const featuredProject = caseStudies[0];

export default function PortfolioPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="px-6 py-24 md:px-12 lg:px-20 lg:py-32">
        <div className="mx-auto max-w-320">
          <p className="mono text-sm uppercase text-accent">Portfolio</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold leading-[0.95] md:text-7xl">
            Real Projects. Real Results.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
            Every project here started with a real business problem. Here is how
            I solved the featured one.
          </p>
        </div>
      </section>

      <section
        id="featured-project"
        className="scroll-mt-24 px-6 pb-24 md:px-12 lg:px-20 lg:pb-32"
      >
        <div className="mx-auto grid max-w-320 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative min-h-[520px] overflow-hidden rounded-[28px] border border-border bg-bg-card">
            <Image
              src="/rice-erp.png"
              alt={featuredProject.title}
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/75 to-transparent" />
          </div>

          <article className="rounded-[28px] border border-border bg-bg-card p-6 md:p-8">
            <p className="mono text-sm uppercase text-accent">
              Featured project
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
              {featuredProject.title}
            </h2>
            <div className="mt-8 grid gap-5">
              <div>
                <p className="mono text-xs uppercase text-text-secondary">
                  Problem
                </p>
                <p className="mt-2 leading-7">{featuredProject.problem}</p>
              </div>
              <div>
                <p className="mono text-xs uppercase text-text-secondary">
                  Solution
                </p>
                <p className="mt-2 leading-7">{featuredProject.solution}</p>
              </div>
              <div>
                <p className="mono text-xs uppercase text-text-secondary">
                  Result
                </p>
                <p className="mt-2 leading-7">{featuredProject.result}</p>
              </div>
            </div>
            <p className="mono mt-8 text-sm uppercase text-text-secondary">
              {featuredProject.tech}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-bg-primary transition duration-200 hover:bg-accent-hover"
            >
              Build something like this
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}
