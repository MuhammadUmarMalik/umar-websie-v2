import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { pricingPackages, siteConfig } from "@/lib/constants";

export default function PricingSection() {
  return (
    <section className="relative w-full bg-background px-4 py-16 text-foreground sm:px-6 sm:py-20 md:px-10 lg:px-14 lg:py-32 2xl:px-20 2xl:py-40">
      {/* Section header */}
      <div className="mx-auto max-w-135 text-center">
        <div className="flex justify-center">
          <div className="mono rounded-lg border border-accent/40 bg-accent/10 px-4 py-1 text-xs uppercase text-accent shadow-[0_0_28px_color-mix(in_srgb,var(--accent)_45%,transparent)]">
            Pricing
          </div>
        </div>
        <h2 className="mt-5 font-display text-4xl font-bold leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl">
          Simple. Transparent.
        </h2>
        <p className="mt-5 opacity-75">
          No retainer traps. No surprise invoices. Pick the plan that fits where your business is
          right now.
        </p>
      </div>

      {/* Pricing cards */}
      <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:gap-5 lg:grid-cols-3 2xl:max-w-6xl">
        {pricingPackages.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col rounded-2xl border p-7 transition-all duration-200 ${
              plan.featured
                ? "border-accent bg-bg-card shadow-gold"
                : "border-border bg-bg-card hover:border-accent/40"
            }`}
          >
            {/* Featured pill */}
            {plan.featured && (
              <span className="mono absolute -top-3.5 left-6 rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-wider text-bg-primary">
                {plan.badge}
              </span>
            )}

            <div className={plan.featured ? "mt-3" : ""}>
              {!plan.featured && (
                <span className="mono mb-2 block text-xs uppercase tracking-widest text-text-secondary opacity-70">
                  {plan.badge}
                </span>
              )}

              <p className="font-display text-xl font-bold text-text-primary">{plan.name}</p>
              <p className="mt-1.5 text-sm leading-6 text-text-secondary">{plan.description}</p>

              {/* Price */}
              <div className="mt-5">
                {plan.priceNote ? (
                  <span className="mono block text-xs uppercase tracking-wider text-text-secondary">
                    {plan.priceNote}
                  </span>
                ) : (
                  <span className="mono block select-none text-xs opacity-0">_</span>
                )}
                <span
                  className={`font-display text-4xl font-bold leading-tight ${
                    plan.featured ? "text-accent" : "text-text-primary"
                  }`}
                >
                  {plan.price}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="my-5 h-px bg-border" />

            {/* Top 4 features only — keep the card compact */}
            <ul className="flex flex-1 flex-col gap-2.5">
              {plan.features.slice(0, 4).map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden />
                  <span className="text-text-secondary">{feature}</span>
                </li>
              ))}
              {plan.features.length > 4 && (
                <li className="mono pt-1 text-xs text-text-secondary opacity-60">
                  + {plan.features.length - 4} more included
                </li>
              )}
            </ul>

            {/* CTA */}
            <Link
              href={plan.price === "Let's talk" ? siteConfig.calendlyUrl : "/contact"}
              target={plan.price === "Let's talk" ? "_blank" : undefined}
              rel={plan.price === "Let's talk" ? "noopener noreferrer" : undefined}
              className={`group mt-7 flex h-12 w-full items-center justify-center gap-2.5 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                plan.featured
                  ? "bg-accent text-white hover:bg-accent-hover hover:text-white hover:shadow-[0_0_24px_color-mix(in_srgb,var(--accent)_35%,transparent)]"
                  : "border border-border text-text-secondary hover:border-accent hover:bg-accent hover:text-white"
              }`}
            >
              {plan.price === "Let's talk" ? "Book a Call" : "Get Started"}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        ))}
      </div>

      {/* Footer row */}
      <p className="mt-8 text-center text-sm text-text-secondary opacity-70">
        Need something specific?{" "}
        <Link
          href="/pricing"
          className="text-accent opacity-100 underline-offset-4 hover:underline"
        >
          See full pricing & add-ons →
        </Link>
      </p>
    </section>
  );
}
