import Link from "next/link";
import { FAQAccordion } from "@/components/FAQAccordion";

/**
 * Visible counterpart to the `faqSchema()` JSON-LD.
 *
 * The home page emitted FAQPage markup with no FAQ anywhere on the page, which
 * is a structured-data policy violation regardless of how good the answers are.
 * Layout mirrors the /pricing FAQ block so the two read as one system.
 */
export default function FAQSection() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="border-t border-border px-4 py-14 sm:px-6 sm:py-16 md:px-12 lg:px-20 2xl:px-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[280px_1fr]">
          {/* Left: heading */}
          <div className="md:sticky md:top-28 md:self-start">
            <p className="mono mb-2 text-sm uppercase tracking-widest text-accent">FAQ</p>
            <h2
              id="faq-heading"
              className="font-display text-3xl font-bold leading-tight md:text-4xl"
            >
              Frequently Asked
              <br />
              Questions
            </h2>
            <p className="mt-4 text-sm leading-7 text-text-secondary">
              Still have a question?{" "}
              <Link
                href="/contact"
                className="text-accent underline-offset-4 transition-colors duration-200 hover:text-accent-hover hover:underline"
              >
                Send me a message →
              </Link>
            </p>
          </div>

          {/* Right: accordion */}
          <FAQAccordion />
        </div>
      </div>
    </section>
  );
}
