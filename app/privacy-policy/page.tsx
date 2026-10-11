import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { breadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How umarmalik-dev.com collects, uses, and protects personal data submitted through the contact form and analytics tools.",
  alternates: { canonical: `${siteConfig.url}/privacy-policy` },
};

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border/60 py-8 first:border-t-0">
      <h2 className="font-display text-xl font-bold text-text-primary sm:text-2xl">{heading}</h2>
      <div className="mt-3 space-y-4 text-base leading-7 text-text-secondary">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-6 text-base text-text-secondary">
            Last updated: 14 September 2026.
          </p>

          <div className="mt-12">
            <Section heading="Who we are">
              <p>
                This website is operated by Muhammad Umar Malik (a freelance software engineer and
                designer), and is reachable at {siteConfig.email}. This policy explains what
                personal data is collected, why, and how it is handled.
              </p>
            </Section>

            <Section heading="What we collect">
              <p>
                <strong>Contact form.</strong> When you use the contact form, we collect the details
                you choose to provide: your name, email address, country, project type, preferred
                deadline, how you found us, and the content of your message. We also capture the
                page you submitted from and your IP address, which we use only to rate-limit form
                submissions and block spam.
              </p>
              <p>
                <strong>Analytics.</strong> To understand how the site is used, we run Vercel
                Analytics, PostHog, Google Analytics, and Google Tag Manager. These services collect
                aggregated usage data such as pages visited, approximate location, device type, and
                referral source. They may set cookies in your browser.
              </p>
            </Section>

            <Section heading="Why and how we use it">
              <p>
                The information you submit through the contact form is used to respond to your
                enquiry, scope work, and prepare a proposal. It is stored in a Google Sheet behind a
                Google Apps Script endpoint and delivered to our inbox, and may also trigger an
                email notification to our inbox via SMTP.
              </p>
              <p>We do not sell, rent, or trade your personal data to anyone.</p>
            </Section>

            <Section heading="Third parties we share data with">
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  <strong>Google (Apps Script / Sheets)</strong> — stores contact form submissions.
                </li>
                <li>
                  <strong>Email (SMTP)</strong> — sends the email notification of your form
                  submission (self-hosted SMTP, e.g. Gmail or Brevo free tier).
                </li>
                <li>
                  <strong>Vercel</strong> — hosts this website and provides infrastructure and edge
                  logs.
                </li>
                <li>
                  <strong>PostHog, Google Analytics, LinkedIn</strong> — analytics and advertising
                  measurement.
                </li>
              </ul>
            </Section>

            <Section heading="How long we keep it">
              <p>
                Contact submissions are retained as long as needed to manage your enquiry and the
                resulting project, after which they are deleted. Analytics data is governed by each
                provider&apos;s retention policy.
              </p>
            </Section>

            <Section heading="Your rights">
              <p>
                You may ask us to access, correct, or delete the personal data we hold about you, or
                to stop processing it. Email {siteConfig.email} with your request and we will
                respond within a reasonable time. You can also opt out of analytics cookies in your
                browser settings or via the settings offered by each analytics provider.
              </p>
            </Section>

            <Section heading="Changes to this policy">
              <p>
                We may update this policy as the site evolves. The date above shows the most recent
                revision, and continued use of the site after changes are posted counts as
                acceptance of the revised policy.
              </p>
            </Section>
          </div>
        </div>
      </section>
    </main>
  );
}