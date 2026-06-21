import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Clock, Lock, MessageCircle } from "lucide-react";
import CTABanner from "@/sections/CTABanner";
import { FAQAccordion } from "@/components/FAQAccordion";
import { addOns, pricingPackages, siteConfig } from "@/lib/constants";
import { createMetadata, seoMap, pricingSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = createMetadata(seoMap.pricing);

const guarantees = [
  { icon: Clock, text: "On-time delivery, always" },
  { icon: Lock, text: "You own everything" },
  { icon: MessageCircle, text: "Direct access to me" },
];

export default function PricingPage() {
  return (
    <main className="bg-bg-primary text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", href: "/" },
              { name: "Pricing", href: "/pricing" },
            ])
          ),
        }}
      />
      {/* Hero */}
      <section className="px-6 pb-16 pt-36 md:px-12 lg:px-20 lg:pt-48">
        <div className="mx-auto max-w-320">
          <p className="mono mb-4 text-sm uppercase tracking-widest text-accent">Pricing</p>
          <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Simple. Transparent.
            <br className="hidden md:block" /> No Surprises.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-text-secondary">
            Every plan is built around results — not just deliverables. Pick the tier that fits your
            stage, or let&apos;s scope something custom.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="px-6 pb-8 pt-4 md:px-12 lg:px-20">
        <div className="mx-auto max-w-320">
          <div className="grid gap-6 md:grid-cols-3">
            {pricingPackages.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-8 transition-shadow duration-200 ${
                  plan.featured
                    ? "border-accent bg-bg-card shadow-gold"
                    : "border-border bg-bg-card hover:border-accent/40"
                }`}
              >
                {/* Featured badge — pill above card */}
                {plan.featured && (
                  <span className="mono absolute -top-3.5 left-6 rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-wider text-bg-primary">
                    {plan.badge}
                  </span>
                )}

                {/* Plan header */}
                <div className={plan.featured ? "mt-4" : ""}>
                  {!plan.featured && (
                    <span className="mono mb-3 block text-xs uppercase tracking-widest text-text-secondary">
                      {plan.badge}
                    </span>
                  )}
                  <p className="font-display text-2xl font-bold text-text-primary">{plan.name}</p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">{plan.description}</p>

                  {/* Price — note stacked above number */}
                  <div className="mt-6">
                    {plan.priceNote ? (
                      <span className="mono block text-xs uppercase tracking-wider text-text-secondary">
                        {plan.priceNote}
                      </span>
                    ) : (
                      <span className="mono block text-xs uppercase tracking-wider text-text-secondary opacity-0 select-none">
                        &nbsp;
                      </span>
                    )}
                    <span
                      className={`font-display text-5xl font-bold leading-tight ${
                        plan.featured ? "text-accent" : "text-text-primary"
                      }`}
                    >
                      {plan.price}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-6 h-px bg-border" />

                {/* Features */}
                <ul className="flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={plan.price === "Let's talk" ? siteConfig.calendlyUrl : "/contact"}
                  target={plan.price === "Let's talk" ? "_blank" : undefined}
                  rel={plan.price === "Let's talk" ? "noopener noreferrer" : undefined}
                  className={`group mt-8 flex h-12 w-full items-center justify-center gap-2.5 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                    plan.featured
                      ? "bg-accent text-accent-foreground hover:bg-accent-hover hover:shadow-[0_0_24px_color-mix(in_srgb,var(--accent)_35%,transparent)]"
                      : "border border-border text-text-secondary hover:border-accent hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {plan.price === "Let's talk" ? "Book a Call" : "Get Started"}
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </div>
            ))}
          </div>

          {/* Included in every plan */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-border bg-bg-card px-6 py-4">
            <span className="mono text-xs uppercase tracking-widest text-text-secondary">
              Every plan includes
            </span>
            <span className="hidden text-border md:block" aria-hidden>
              ·
            </span>
            {guarantees.map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-2 text-sm text-text-secondary">
                <Icon className="size-3.5 text-accent" aria-hidden />
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="border-t border-border px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-320">
          <p className="mono mb-2 text-sm uppercase tracking-widest text-accent">Add-Ons</p>
          <h2 className="mb-10 font-display text-3xl font-bold md:text-4xl">
            Extras You Can Add To Any Plan
          </h2>
          <div className="overflow-hidden rounded-xl border border-border">
            {addOns.map((addon, i) => (
              <div
                key={addon.name}
                className={`flex items-center justify-between gap-6 px-6 py-5 transition-colors duration-150 hover:bg-surface ${
                  i < addOns.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="min-w-0">
                  <span className="font-medium text-text-primary">{addon.name}</span>
                  {addon.description && (
                    <p className="mt-0.5 text-sm leading-6 text-text-secondary">
                      {addon.description}
                    </p>
                  )}
                </div>
                <span className="mono shrink-0 text-sm font-semibold text-accent">
                  {addon.price}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-text-secondary">
            Pricing varies by scope.{" "}
            <Link href="/contact" className="text-accent underline-offset-4 transition-colors duration-200 hover:text-accent-hover hover:underline">
              Get a quote →
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-320">
          <div className="grid gap-12 md:grid-cols-[280px_1fr]">
            {/* Left: heading */}
            <div className="md:sticky md:top-28 md:self-start">
              <p className="mono mb-2 text-sm uppercase tracking-widest text-accent">FAQ</p>
              <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
                Common
                <br />
                Questions
              </h2>
              <p className="mt-4 text-sm leading-7 text-text-secondary">
                Still have a question?{" "}
                <Link href="/contact" className="text-accent underline-offset-4 transition-colors duration-200 hover:text-accent-hover hover:underline">
                  Send me a message →
                </Link>
              </p>
            </div>

            {/* Right: accordion */}
            <FAQAccordion />
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
