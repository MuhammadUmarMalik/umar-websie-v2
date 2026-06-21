"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Gauge,
  Palette,
  Workflow,
  CheckCircle2,
  MousePointerClick,
  Smartphone,
  Bot,
  LayoutDashboard,
} from "lucide-react";
import CTABanner from "@/sections/CTABanner";
import { siteConfig } from "@/lib/constants";

const SERVICES = [
  {
    num: "01",
    icon: Gauge,
    title: "Website Development",
    href: "/website-development",
    tagline: "Fast, responsive, conversion-ready websites",
    description:
      "Your website is your 24/7 salesperson. I build fast, clean, SEO-ready websites in Next.js, React, and WordPress — designed to earn trust and turn visitors into leads.",
    deliverables: [
      "Custom responsive design",
      "Next.js / WordPress / Shopify",
      "On-page SEO + Core Web Vitals",
      "Contact forms & lead capture",
      "Google Analytics 4 setup",
      "7–21 day delivery",
    ],
  },
  {
    num: "02",
    icon: Workflow,
    title: "Business Automation",
    href: "/business-automation",
    tagline: "Cut manual work with smart workflows",
    description:
      "I connect your tools and automate repetitive tasks — form submissions, CRM updates, email and WhatsApp alerts, invoices, reports — using n8n, Make, and the OpenAI API.",
    deliverables: [
      "n8n / Make workflow builds",
      "Form-to-CRM automations",
      "Email & WhatsApp triggers",
      "AI reply draft generation",
      "Weekly automated reports",
      "Fully documented handover",
    ],
  },
  {
    num: "03",
    icon: Palette,
    title: "UI/UX Design",
    href: "/ui-ux-design",
    tagline: "Interfaces that guide visitors to act",
    description:
      "Confused visitors don't convert. I design clean, intuitive interfaces in Figma — websites, landing pages, SaaS dashboards — with clear user flows, strong CTAs, and mobile-first layouts.",
    deliverables: [
      "Figma wireframes & full UI",
      "Mobile-first responsive layouts",
      "Conversion-focused user flows",
      "Design system & component set",
      "Interactive prototype",
      "Developer-ready handoff",
    ],
  },
];

const PAIN_POINTS = [
  { icon: Gauge, label: "Slow website", text: "Pages that lose visitors before they read a word." },
  { icon: Smartphone, label: "Broken mobile", text: "Layouts that collapse trust on phones." },
  { icon: MousePointerClick, label: "Zero leads", text: "No clear path from visitor to enquiry." },
  { icon: LayoutDashboard, label: "Confusing UI", text: "Visitors leave because they can't find what they need." },
  { icon: Bot, label: "Manual repetition", text: "Hours of copy-paste and status updates every week." },
  { icon: CheckCircle2, label: "Checkout friction", text: "Form issues and unclear steps that block sales." },
];

const FAQS = [
  {
    q: "What services do you offer?",
    a: "Website development (Next.js, React, WordPress), business automation (n8n, Make, AI workflows), and UI/UX design (Figma wireframes, full UI, interactive prototypes). Each can be scoped independently or combined.",
  },
  {
    q: "How do I know which service I need?",
    a: "Book a free discovery call and I'll audit what's actually hurting your business — slow load times, weak layout, manual tasks — and recommend the right fix. No overselling.",
  },
  {
    q: "Do you work with existing websites?",
    a: "Yes. I regularly fix existing sites — speed issues, broken layouts, poor conversion paths — without a full rebuild. Sometimes a targeted fix is all you need.",
  },
  {
    q: "What does a project cost?",
    a: "Website projects start from $499 (Starter) and $999 (Growth). Automation and design projects are scoped per requirements. See the Pricing page for full details.",
  },
];

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-border py-6"
    >
      <h3 className="text-base font-semibold text-text-primary">{q}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{a}</p>
    </motion.div>
  );
}

export default function ServicesPageClient() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="px-6 pt-32 pb-20 md:px-10 lg:px-14 lg:pt-40">
        <div className="mx-auto max-w-[1280px]">
          <FadeUp>
            <span className="mono text-xs uppercase tracking-widest text-accent">
              Services
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="mt-4 font-display text-5xl font-bold italic leading-[1.05] tracking-tight text-text-primary md:text-6xl lg:text-7xl">
              Services Built Around
              <br />
              <span className="not-italic text-accent">Your Business Problem.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              Not every business needs a full rebuild. I start by finding what's actually
              costing you — leads, time, trust — then fix it with the right solution.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={siteConfig.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg-primary transition-all hover:bg-accent-hover"
              >
                Book a Free Call
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/pricing"
                className="flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-text-primary transition-all hover:border-accent hover:text-accent"
              >
                See Pricing
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Pain points ── */}
      <section className="px-6 py-16 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1280px]">
          <FadeUp>
            <span className="mono text-xs uppercase tracking-widest text-text-secondary">
              Common problems I fix
            </span>
          </FadeUp>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {PAIN_POINTS.map((p, i) => (
              <FadeUp key={p.label} delay={i * 0.06} className="h-full">
                <div className="h-full flex flex-col gap-3 rounded-xl border border-border bg-bg-card p-4">
                  <p.icon className="size-5 text-accent" aria-hidden />
                  <p className="text-sm font-semibold text-text-primary">{p.label}</p>
                  <p className="text-xs leading-relaxed text-text-secondary">{p.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service cards ── */}
      <section className="px-6 py-20 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1280px]">
          <FadeUp>
            <span className="mono text-xs uppercase tracking-widest text-text-secondary">
              What I do
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold italic text-text-primary md:text-5xl">
              Three Core Services
            </h2>
          </FadeUp>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {SERVICES.map((svc, i) => (
              <FadeUp key={svc.title} delay={i * 0.1} className="h-full">
                <div className="group flex h-full flex-col rounded-2xl border border-border bg-bg-card p-8 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_40px_color-mix(in_srgb,var(--accent)_6%,transparent)]">
                  <div className="flex items-start justify-between">
                    <svc.icon className="size-7 text-accent" aria-hidden />
                    <span className="mono text-xs text-text-secondary">{svc.num}</span>
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-bold italic text-text-primary">
                    {svc.title}
                  </h2>
                  <p className="mono mt-1 text-xs text-accent">{svc.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                    {svc.description}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {svc.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-xs text-text-secondary">
                        <CheckCircle2 className="size-3.5 shrink-0 text-accent" aria-hidden />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <Link
                      href={svc.href}
                      className="group/btn flex items-center gap-2 text-sm font-semibold text-text-primary transition-all hover:text-accent hover:gap-3"
                    >
                      Learn more
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why me ── */}
      <section className="px-6 py-20 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1280px]">
          <div className="rounded-2xl border border-border bg-bg-card p-8 md:p-12 lg:p-14">
            <FadeUp>
              <span className="mono text-xs uppercase tracking-widest text-text-secondary">
                Why work with me
              </span>
              <h2 className="mt-3 font-display text-4xl font-bold italic text-text-primary md:text-5xl">
                Business-First. Then Code.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
                Most developers build what you ask for. I find what you actually need first — then build it right.
              </p>
            </FadeUp>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { num: "30+", label: "Projects delivered" },
                { num: "20+", label: "Businesses helped" },
                { num: "98%", label: "Client satisfaction" },
                { num: "3×", label: "Avg. performance improvement" },
              ].map((s, i) => (
                <FadeUp key={s.label} delay={i * 0.08} className="h-full">
                  <div className="h-full rounded-xl border border-border bg-surface p-5">
                    <p className="font-display text-4xl font-bold italic text-accent">{s.num}</p>
                    <p className="mono mt-1 text-xs text-text-secondary">{s.label}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 py-20 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1280px] lg:grid lg:grid-cols-[1fr_2fr] lg:gap-16">
          <FadeUp>
            <span className="mono text-xs uppercase tracking-widest text-text-secondary">FAQ</span>
            <h2 className="mt-3 font-display text-4xl font-bold italic text-text-primary md:text-5xl">
              Common Questions
            </h2>
          </FadeUp>
          <div>
            {FAQS.map((f, i) => (
              <FAQItem key={f.q} q={f.q} a={f.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
