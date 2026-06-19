import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { FAQAccordion } from "@/components/FAQAccordion";
import { addOns, pricingPackages } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing — Simple & Transparent",
  description: "No surprises. Choose a plan that fits your business and budget.",
};

export default function PricingPage() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <section className="px-6 pb-16 pt-36 md:px-12 lg:px-20 lg:pt-48">
        <div className="mx-auto max-w-320">
          <p className="mono mb-4 text-sm uppercase text-accent">Pricing</p>
          <h1 className="max-w-3xl font-display text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
            Simple. Transparent. No Surprises.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-text-secondary">
            Choose what fits your business. Every plan is built around results — not just
            deliverables.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-320">
          <div className="grid gap-6 md:grid-cols-3">
            {pricingPackages.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-8 ${
                  plan.featured ? "border-accent bg-bg-card" : "border-border bg-bg-card"
                }`}
              >
                {plan.featured && (
                  <span className="mono absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs uppercase text-bg-primary">
                    {plan.badge}
                  </span>
                )}
                {!plan.featured && (
                  <span className="mono mb-4 block text-xs uppercase text-text-secondary">
                    {plan.badge}
                  </span>
                )}
                <div className={plan.featured ? "mt-4" : ""}>
                  <p className="font-display text-2xl font-bold">{plan.name}</p>
                  <div className="mt-4 flex items-end gap-2">
                    {plan.priceNote && (
                      <span className="mono mb-1 text-xs uppercase text-text-secondary">
                        {plan.priceNote}
                      </span>
                    )}
                    <span className="font-display text-4xl font-bold text-accent">
                      {plan.price}
                    </span>
                  </div>
                </div>

                <ul className="mt-8 flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`mt-10 inline-flex h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold transition duration-200 ${
                    plan.featured
                      ? "bg-accent text-bg-primary hover:bg-accent-hover"
                      : "border border-border text-text-primary hover:border-accent hover:text-accent"
                  }`}
                >
                  {plan.price === "Let's talk" ? "Book a Call" : "Get Started"}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="border-t border-border px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-320">
          <p className="mono mb-2 text-sm uppercase text-accent">Add-Ons</p>
          <h2 className="mb-10 font-display text-3xl font-bold md:text-4xl">
            Extras You Can Add To Any Plan
          </h2>
          <div className="overflow-hidden rounded-xl border border-border">
            {addOns.map((addon, i) => (
              <div
                key={addon.name}
                className={`flex items-center justify-between px-6 py-4 ${
                  i < addOns.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <span className="text-text-primary">{addon.name}</span>
                <span className="mono text-sm text-accent">{addon.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-320">
          <p className="mono mb-2 text-sm uppercase text-accent">FAQ</p>
          <h2 className="mb-10 font-display text-3xl font-bold md:text-4xl">Common Questions</h2>
          <FAQAccordion />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-320 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Not Sure Which Plan Fits?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-text-secondary">
            Let&apos;s have a quick call and I&apos;ll tell you exactly what your business needs —
            no obligation.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-bg-primary transition duration-200 hover:bg-accent-hover"
          >
            Book a Free Call
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  );
}
