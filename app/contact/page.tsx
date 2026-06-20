import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { ContactForm } from "@/components/ContactForm";
import { createMetadata, seoMap, organizationSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = createMetadata(seoMap.contact);

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${siteConfig.url}/contact`,
  name: "Contact — Muhammad Umar Malik",
  description:
    "Get in touch to discuss your website, automation, or UI/UX project. Response within 24 hours.",
  url: `${siteConfig.url}/contact`,
  mainEntity: { "@id": `${siteConfig.url}/#organization` },
};

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", href: "/" },
              { name: "Contact", href: "/contact" },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="px-6 pb-16 pt-36 md:px-12 lg:px-20 lg:pt-48">
        <div className="mx-auto max-w-screen-2xl">
          <p className="mono mb-4 text-sm uppercase text-accent">Contact</p>
          <h1 className="max-w-3xl font-display text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
            Let&apos;s Build Something Together.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-text-secondary">
            Tell me about your business and what you&apos;re trying to fix. I&apos;ll get back to
            you within 24 hours.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-screen-2xl grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <ContactForm />

          {/* Info */}
          <div className="flex flex-col gap-10">
            <div className="rounded-2xl border border-border bg-bg-card p-8">
              <h2 className="mb-6 font-display text-2xl font-bold">Prefer to Talk Directly?</h2>
              <p className="mb-6 leading-7 text-text-secondary">
                Book a free 30-minute discovery call. We&apos;ll talk about your business, your
                goals, and whether we&apos;re a good fit.
              </p>
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center gap-2.5 rounded-full border border-border px-8 text-sm font-semibold text-text-primary transition-all duration-200 hover:border-accent hover:bg-accent/5 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Schedule a Call
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </a>
            </div>

            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <p className="text-text-secondary">Based in Pakistan — Working Globally</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <p className="text-text-secondary">Response time: Within 24 hours</p>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <p className="text-text-secondary">
                  Available via: Email · WhatsApp · Video Call
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-text-secondary transition-colors hover:text-text-primary"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
