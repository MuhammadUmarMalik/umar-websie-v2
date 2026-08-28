import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import CTABanner from "@/sections/CTABanner";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { caseStudies, getCaseStudy } from "@/lib/constants";
import { createMetadata, caseStudySchema, breadcrumbSchema } from "@/lib/seo";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};

  return createMetadata({
    // The layout template appends " | Muhammad Umar Malik", so the title stays
    // short here and the full headline carries the keywords in the <h1>.
    title: `${cs.title} Case Study`,
    description: `${cs.problem} Here is what I built, and what changed as a result.`,
    path: `/portfolio/${cs.slug}`,
  });
}

/** Maps a case study to the commercial page it should funnel traffic into. */
const SERVICE_HREF: Record<string, string> = {
  "Web app development": "/website-development",
  "Website development": "/website-development",
  "Business automation": "/business-automation",
  "UI/UX design": "/ui-ux-design",
};

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: cs.title, href: `/portfolio/${cs.slug}` },
  ];

  const serviceHref = SERVICE_HREF[cs.service] ?? "/services";
  const related = caseStudies.filter((other) => other.slug !== cs.slug);

  return (
    <main className="bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema(cs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />

      {/* Hero */}
      <section className="px-4 pb-10 pt-28 sm:px-6 sm:pt-32 md:px-12 lg:px-20 lg:pt-48 2xl:px-28">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs items={crumbs} />
          <p className="mono mb-4 text-sm uppercase tracking-widest text-accent">
            {cs.service}
          </p>
          <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            {cs.headline}
          </h1>

          <dl className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
            {[
              { label: "Industry", value: cs.industry },
              { label: "Service", value: cs.service },
              { label: "Timeline", value: cs.timeline },
            ].map((item) => (
              <div key={item.label}>
                <dt className="mono text-xs uppercase tracking-widest text-text-secondary">
                  {item.label}
                </dt>
                <dd className="mt-2 font-semibold">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {cs.image && (
        <section className="px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-28">
          <div className="mx-auto max-w-5xl">
            <Image
              src={cs.image}
              alt={`${cs.title} — ${cs.service} project by Muhammad Umar Malik`}
              width={1200}
              height={675}
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="w-full rounded-2xl border border-border object-cover"
            />
          </div>
        </section>
      )}

      {/* Narrative */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 md:px-12 lg:px-20 2xl:px-28">
        <div className="mx-auto flex max-w-3xl flex-col gap-12">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">The Problem</h2>
            <p className="mt-4 text-lg leading-8 text-text-secondary">{cs.problem}</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">What I Built</h2>
            <p className="mt-4 text-lg leading-8 text-text-secondary">{cs.solution}</p>
            <h3 className="mono mt-8 text-xs uppercase tracking-widest text-text-secondary">
              Stack
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {cs.stack.map((item) => (
                <li
                  key={item}
                  className="mono rounded-full border border-border px-3 py-1 text-xs uppercase text-text-secondary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">The Result</h2>
            <p className="mt-4 text-lg leading-8 text-text-secondary">{cs.result}</p>

            {/* Renders only once real, confirmed numbers exist in `metrics`. */}
            {cs.metrics.length > 0 && (
              <dl className="mt-8 grid gap-6 sm:grid-cols-3">
                {cs.metrics.map((m) => (
                  <div key={m.label} className="rounded-2xl border border-border bg-bg-card p-6">
                    <dt className="mono text-xs uppercase tracking-widest text-text-secondary">
                      {m.label}
                    </dt>
                    <dd className="mt-2 font-display text-2xl font-bold text-accent">{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-bg-card p-8">
            <h2 className="font-display text-2xl font-bold">Need something similar?</h2>
            <p className="mt-3 leading-7 text-text-secondary">
              This project came out of my{" "}
              <Link
                href={serviceHref}
                className="text-accent underline-offset-4 transition-colors duration-200 hover:text-accent-hover hover:underline"
              >
                {cs.service.toLowerCase()}
              </Link>{" "}
              work. Tell me what is slowing your business down and I will scope the fix.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex h-12 items-center gap-2 border border-accent bg-accent px-5 text-sm font-semibold text-bg-primary transition duration-200 hover:bg-accent-hover"
            >
              Book a free discovery call
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-border px-4 py-14 sm:px-6 sm:py-16 md:px-12 lg:px-20 2xl:px-28">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">More case studies</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.map((other) => (
                <Link
                  key={other.slug}
                  href={`/portfolio/${other.slug}`}
                  className="rounded-2xl border border-border bg-bg-card p-6 transition-colors duration-200 hover:border-accent/40"
                >
                  <p className="mono mb-2 text-xs uppercase tracking-widest text-accent">
                    {other.service}
                  </p>
                  <p className="font-display text-xl font-bold">{other.title}</p>
                  <p className="mt-3 leading-7 text-text-secondary">{other.problem}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </main>
  );
}
