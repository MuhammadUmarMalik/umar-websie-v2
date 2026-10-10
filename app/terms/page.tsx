import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { breadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern use of umarmalik-dev.com and engagement with freelance web design, UI/UX, and automation services.",
  alternates: { canonical: `${siteConfig.url}/terms` },
};

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Terms of Service", href: "/terms" },
];

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border/60 py-8 first:border-t-0">
      <h2 className="font-display text-xl font-bold text-text-primary sm:text-2xl">{heading}</h2>
      <div className="mt-3 space-y-4 text-base leading-7 text-text-secondary">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <main className="bg-bg-primary text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(CRUMBS)) }}
      />
      <section className="px-4 pb-24 pt-28 sm:px-6 sm:pt-32 md:px-12 lg:px-20 lg:pt-48 2xl:px-28">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs items={CRUMBS} />
          <p className="mono mb-4 text-sm uppercase tracking-widest text-accent">Legal</p>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Terms of Service
          </h1>
          <p className="mt-6 text-base text-text-secondary">
            Last updated: 14 September 2026.
          </p>

          <div className="mt-12">
            <Section heading="Use of this website">
              <p>
                By using umarmalik-dev.com you agree to these terms. The content on this site is
                provided for general information about our services and is not professional advice.
                You may not use the site in a way that disrupts it, attempts unauthorised access, or
                violates applicable law.
              </p>
            </Section>

            <Section heading="Quotes and proposals">
              <p>
                Prices shown on the site are indicative starting points. A final price, scope,
                timeline, and deliverables are agreed in a written proposal before any project work
                begins. A proposal is not a binding contract until both parties accept it.
              </p>
            </Section>

            <Section heading="Scope and revisions">
              <p>
                Each project is completed to the scope agreed in the proposal. Requests outside that
                scope are quoted separately. Reasonable revisions are included per the proposal;
                further rounds are charged at the agreed hourly or fixed rate.
              </p>
            </Section>

            <Section heading="Payment">
              <p>
                Payment terms are set out in each proposal and typically require a deposit before
                work starts and the balance on completion. Invoices are due as stated; late work may
                be paused until payment is received.
              </p>
            </Section>

            <Section heading="Intellectual property">
              <p>
                Once the final invoice is paid, you own the finished deliverables created for your
                project. We retain the right to display completed work in our portfolio unless we
                agree otherwise in writing. Third-party tools, templates, and content remain the
                property of their respective owners.
              </p>
            </Section>

            <Section heading="Limitation of liability">
              <p>
                Work is delivered on an &ldquo;as is&rdquo; basis without warranties beyond those
                agreed in writing. To the fullest extent permitted by law, the maximum liability for
                any claim arising from a project is the total amount paid for that project. We are
                not liable for indirect or consequential losses, including lost revenue or data.
              </p>
            </Section>

            <Section heading="Contact">
              <p>
                Questions about these terms can be sent to {siteConfig.email}. See also our{" "}
                <a
                  href="/privacy-policy"
                  className="text-accent underline underline-offset-4 transition-colors hover:text-accent-hover"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </Section>
          </div>
        </div>
      </section>
    </main>
  );
}