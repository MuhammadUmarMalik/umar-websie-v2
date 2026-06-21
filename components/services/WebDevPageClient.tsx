"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Gauge,
  Smartphone,
  MousePointerClick,
  Search,
  BarChart3,
  FileCode2,
  Globe,
  Zap,
  ShieldCheck,
} from "lucide-react";
import CTABanner from "@/sections/CTABanner";

const PAIN_POINTS = [
  {
    icon: Gauge,
    title: "Slow load time",
    description:
      "A 1-second delay in page load causes a 7% drop in conversions. If your site scores below 70 on PageSpeed, it's costing you both leads and Google rankings.",
  },
  {
    icon: Smartphone,
    title: "Broken mobile experience",
    description:
      "Over 60% of web traffic is mobile. If your layout breaks, overlaps, or forces users to pinch-zoom, most of them leave in under 10 seconds.",
  },
  {
    icon: MousePointerClick,
    title: "No clear lead path",
    description:
      "Visitors shouldn't have to search for your phone number or contact form. If there's no obvious next step, they leave without reaching out.",
  },
  {
    icon: Search,
    title: "Invisible on Google",
    description:
      "Without on-page SEO, structured data, and Core Web Vitals, your site won't appear for the searches your customers are running every day.",
  },
];

const DELIVERABLES = [
  { icon: FileCode2, label: "Custom responsive design", detail: "Designed for your brand, built for every screen size." },
  { icon: Zap, label: "Next.js / React / WordPress", detail: "The right tech for your content, team, and scale." },
  { icon: Search, label: "On-page SEO setup", detail: "Titles, meta descriptions, structured data, and sitemap." },
  { icon: Gauge, label: "Core Web Vitals optimization", detail: "LCP, FID, and CLS tuned so Google ranks you higher." },
  { icon: MousePointerClick, label: "Lead capture forms", detail: "Contact, booking, and enquiry forms with email alerts." },
  { icon: BarChart3, label: "Google Analytics 4", detail: "Full event tracking so you see what's working." },
  { icon: Globe, label: "Open Graph + Twitter Cards", detail: "Proper social preview images so every share looks sharp." },
  { icon: ShieldCheck, label: "Security & accessibility", detail: "HTTPS, WCAG-compliant markup, and clean semantic HTML." },
];

const TECH = [
  "Next.js 14",
  "React 18",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Supabase",
  "WordPress",
  "Shopify",
  "Vercel",
];

const PROCESS = [
  {
    step: "01",
    title: "Business audit",
    description:
      "I review your existing site, analytics, PageSpeed scores, and competitor presence. I identify exactly what is broken and why — before touching any code.",
  },
  {
    step: "02",
    title: "Competitor research",
    description:
      "I study the top 3–5 sites in your market: what they rank for, how they structure their pages, and where you have a clear gap to exploit.",
  },
  {
    step: "03",
    title: "Figma design",
    description:
      "You see the full interface design before any development starts. You review it, request changes, and sign off. No surprises at launch.",
  },
  {
    step: "04",
    title: "Production build",
    description:
      "Clean, semantic, maintainable code. Responsive across all breakpoints. Fast by default — images optimized, fonts lazy-loaded, code split.",
  },
  {
    step: "05",
    title: "Test & handover",
    description:
      "Cross-browser and cross-device QA. Core Web Vitals measured and confirmed. Full handover with credentials, docs, and a walkthrough.",
  },
];

const FAQS = [
  {
    q: "How long does a website project take?",
    a: "Starter websites (up to 5 pages) take 7–10 business days. Growth packages (up to 10 pages with CMS) take 14–21 days. Timelines are agreed in writing before work starts.",
  },
  {
    q: "Do you build with WordPress or custom code?",
    a: "Both. Next.js and React for performance-critical or complex sites. WordPress or Shopify where non-technical clients need to manage content themselves. I recommend the right tool for your situation.",
  },
  {
    q: "Will my new website rank on Google?",
    a: "I implement on-page SEO on every page: optimized title tags, meta descriptions, structured data (JSON-LD), semantic HTML, sitemap.xml, and robots.txt. Combined with fast load times and Core Web Vitals, your site will be properly set up to rank.",
  },
  {
    q: "Can I update the content myself after launch?",
    a: "Yes. For WordPress or Shopify builds you can edit everything via the admin panel. For Next.js projects I can integrate a headless CMS like Sanity so your team can update content without touching code.",
  },
  {
    q: "Do I own everything after the project?",
    a: "100%. You own the source code, domain, hosting account, and all credentials. No lock-in, no ongoing fees owed to me unless you choose a support plan.",
  },
  {
    q: "What if I already have a website — can you fix it instead of rebuilding?",
    a: "Absolutely. I regularly audit and repair existing sites — slow load times, broken mobile layouts, poor conversion paths, outdated design. Sometimes a targeted fix is all you need.",
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

export default function WebDevPageClient() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="px-6 pt-32 pb-20 md:px-10 lg:px-14 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <nav aria-label="Breadcrumb">
              <ol className="mono flex items-center gap-2 text-xs text-text-secondary">
                <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link href="/services" className="hover:text-accent transition-colors">Services</Link></li>
                <li aria-hidden>/</li>
                <li className="text-text-primary">Website Development</li>
              </ol>
            </nav>
          </FadeUp>
          <FadeUp delay={0.05}>
            <span className="mono mt-6 block text-xs uppercase tracking-widest text-accent">
              Service — Website Development
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="mt-4 font-display text-5xl font-bold italic leading-[1.05] tracking-tight text-text-primary md:text-6xl lg:text-7xl">
              Websites That Earn Trust
              <br />
              <span className="not-italic text-accent">and Generate Leads.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              A fast, responsive, conversion-focused website built in Next.js, React, or
              WordPress — designed first, tested thoroughly, and handed over with full
              documentation. Starting from $499.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg-primary transition-all hover:bg-accent-hover"
              >
                Start a Project
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

          {/* Quick badges */}
          <FadeUp delay={0.4}>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Next.js & React", "WordPress & Shopify", "On-page SEO", "Core Web Vitals", "Responsive design", "7–21 day delivery"].map((b) => (
                <span
                  key={b}
                  className="mono rounded-full border border-border px-3 py-1 text-xs text-text-secondary"
                >
                  {b}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Problems it solves ── */}
      <section className="px-6 py-20 md:px-10 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <span className="mono text-xs uppercase tracking-widest text-text-secondary">
              Problems I fix
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold italic text-text-primary md:text-5xl">
              What&apos;s Hurting Your Website
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
              Most small business websites fail for one of four reasons. Here&apos;s how I address each one.
            </p>
          </FadeUp>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {PAIN_POINTS.map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.08} className="h-full">
                <div className="h-full flex gap-5 rounded-2xl border border-border bg-bg-card p-6">
                  <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-surface">
                    <p.icon className="size-5 text-accent" aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{p.description}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's included ── */}
      <section className="px-6 py-20 md:px-10 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <span className="mono text-xs uppercase tracking-widest text-text-secondary">
              Deliverables
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold italic text-text-primary md:text-5xl">
              Everything Included
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
              Every website project covers design, build, optimization, and handover — no hidden extras.
            </p>
          </FadeUp>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DELIVERABLES.map((d, i) => (
              <FadeUp key={d.label} delay={i * 0.06} className="h-full">
                <div className="h-full flex flex-col gap-3 rounded-xl border border-border bg-bg-card p-5">
                  <d.icon className="size-5 text-accent" aria-hidden />
                  <p className="text-sm font-semibold text-text-primary">{d.label}</p>
                  <p className="text-xs leading-relaxed text-text-secondary">{d.detail}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="px-6 py-20 md:px-10 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <span className="mono text-xs uppercase tracking-widest text-text-secondary">
              Process
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold italic text-text-primary md:text-5xl">
              From Problem to Launch
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
              Five steps. No guesswork. You see the design before I build it.
            </p>
          </FadeUp>
          <div className="mt-12 space-y-4">
            {PROCESS.map((step, i) => (
              <FadeUp key={step.step} delay={i * 0.08}>
                <div className="flex gap-6 rounded-2xl border border-border bg-bg-card p-6 md:p-8">
                  <span className="mono shrink-0 text-2xl font-bold text-accent opacity-60">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="font-semibold text-text-primary">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech stack ── */}
      <section className="px-6 py-16 md:px-10 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <span className="mono text-xs uppercase tracking-widest text-text-secondary">
              Tech stack
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold italic text-text-primary md:text-4xl">
              Tools I Build With
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="mt-6 flex flex-wrap gap-2">
              {TECH.map((t) => (
                <span
                  key={t}
                  className="mono rounded-full border border-border bg-bg-card px-4 py-2 text-xs text-text-secondary"
                >
                  {t}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Results strip ── */}
      <section className="px-6 py-16 md:px-10 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-border bg-bg-card p-8 md:p-12">
            <FadeUp>
              <span className="mono text-xs uppercase tracking-widest text-text-secondary">
                Results
              </span>
              <h2 className="mt-3 font-display text-4xl font-bold italic text-text-primary md:text-5xl">
                What You Can Expect
              </h2>
            </FadeUp>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { value: "90+", label: "Lighthouse score target" },
                { value: "< 1.5s", label: "First Contentful Paint goal" },
                { value: "3×", label: "Avg. performance improvement" },
                { value: "7–21d", label: "Typical delivery window" },
              ].map((s, i) => (
                <FadeUp key={s.label} delay={i * 0.08} className="h-full">
                  <div className="h-full rounded-xl border border-border bg-surface p-5">
                    <p className="font-display text-4xl font-bold italic text-accent">{s.value}</p>
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
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[1fr_2fr] lg:gap-16">
          <FadeUp>
            <span className="mono text-xs uppercase tracking-widest text-text-secondary">FAQ</span>
            <h2 className="mt-3 font-display text-4xl font-bold italic text-text-primary md:text-5xl">
              Website Development Questions
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              Everything you need to know before starting a website project.
            </p>
          </FadeUp>
          <div>
            {FAQS.map((f, i) => (
              <FAQItem key={f.q} q={f.q} a={f.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABanner />
    </main>
  );
}
