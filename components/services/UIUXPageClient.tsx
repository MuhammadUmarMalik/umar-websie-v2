"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Palette,
  LayoutDashboard,
  MousePointerClick,
  Smartphone,
  Eye,
  Grid3x3,
  Layers,
  PenTool,
  Users,
  TrendingDown,
} from "lucide-react";
import CTABanner from "@/sections/CTABanner";

const PAIN_POINTS = [
  {
    icon: TrendingDown,
    title: "High bounce rate",
    description:
      "Visitors land, feel uncertain, and leave in seconds. Usually the headline is vague, the layout is cluttered, or there's no obvious next step — so they don't take one.",
  },
  {
    icon: LayoutDashboard,
    title: "Confusing user flow",
    description:
      "If users have to think about where to click next, the design failed. Good UX makes the right path feel obvious — without a single instruction.",
  },
  {
    icon: Users,
    title: "Weak trust signals",
    description:
      "Inconsistent fonts, low-quality images, broken layouts on mobile — they all signal 'unprofessional.' Visitors make a trust judgement in under 3 seconds.",
  },
  {
    icon: MousePointerClick,
    title: "CTAs that don't convert",
    description:
      "A button that says 'Submit' or 'Learn More' leaves money on the table. Strong CTAs with the right placement, copy, and contrast can double click-through rates.",
  },
];

const DELIVERABLES = [
  {
    icon: PenTool,
    label: "Figma wireframes",
    detail: "Low-fidelity wireframes that map out page structure and user flow before any visual design.",
  },
  {
    icon: Palette,
    label: "Full visual UI design",
    detail: "High-fidelity desktop and mobile mockups with typography, color, spacing, and component details.",
  },
  {
    icon: Smartphone,
    label: "Mobile-first layouts",
    detail: "Every screen designed for mobile first — then adapted for tablet and desktop breakpoints.",
  },
  {
    icon: Grid3x3,
    label: "Design system",
    detail: "Reusable component library: buttons, forms, cards, typography scale, and color tokens in Figma.",
  },
  {
    icon: Eye,
    label: "Interactive prototype",
    detail: "Clickable Figma prototype so you can experience the flow before the first line of code.",
  },
  {
    icon: Layers,
    label: "Developer handoff",
    detail: "Annotated Figma file with spacing, colors, fonts, states, and export-ready assets.",
  },
  {
    icon: MousePointerClick,
    label: "Conversion-focused CTAs",
    detail: "Button copy, placement, size, and contrast reviewed for maximum click-through at every decision point.",
  },
  {
    icon: Users,
    label: "Accessibility review",
    detail: "Color contrast ratios, focus states, ARIA labels, and semantic structure checked against WCAG 2.1 AA.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Audit & understand",
    description:
      "I review your existing site or app for UX issues — confusing navigation, weak hierarchy, unclear CTAs, mobile problems. I also review 2–3 competitor interfaces to understand what the market standard looks like.",
  },
  {
    step: "02",
    title: "Wireframes",
    description:
      "Before any colour or visual design, I build low-fidelity wireframes in Figma. These define page structure, information hierarchy, and user flow. You review and approve before we move forward.",
  },
  {
    step: "03",
    title: "Visual design",
    description:
      "Full high-fidelity UI design — typography, colour, components, imagery direction, spacing, and states — for every screen, desktop and mobile. Designed to match your brand or establish a new one.",
  },
  {
    step: "04",
    title: "Interactive prototype",
    description:
      "The designs are connected into a clickable prototype so you can walk through the full user journey. This is where we catch flow issues before development starts — saving significant rework time.",
  },
  {
    step: "05",
    title: "Design handoff",
    description:
      "The Figma file is fully annotated with spacing values, colour tokens, font sizes, and interaction notes. All assets are export-ready. Developers can build directly from the file without guessing.",
  },
];

const TYPES = [
  { label: "Marketing websites", description: "Homepage, about, services, pricing — designed to convert visitors into enquiries." },
  { label: "Landing pages", description: "Single-purpose pages for ad campaigns, product launches, or lead generation." },
  { label: "SaaS dashboards", description: "Complex data UIs designed for clarity — tables, charts, filters, and navigation that make sense." },
  { label: "E-commerce flows", description: "Product pages, cart, and checkout — designed to remove friction and increase completion." },
  { label: "Mobile apps", description: "iOS and Android screen designs with native patterns and gesture-friendly layouts." },
  { label: "Brand identity", description: "Logo, colour palette, typography, and design tokens for a consistent visual system." },
];

const FAQS = [
  {
    q: "What is UI/UX design and why does it matter?",
    a: "UI (User Interface) is how a website or app looks — colours, typography, layout, components. UX (User Experience) is how it feels to use — navigation flow, clarity, speed, and ease of finding information. Good UI/UX directly impacts conversions, bounce rate, and customer trust.",
  },
  {
    q: "Do I get to see the design before you build anything?",
    a: "Always. Design comes first. You review wireframes, then full UI mockups, then an interactive prototype — all before any development starts. Nothing is built until you've approved what it looks like.",
  },
  {
    q: "What tools do you design in?",
    a: "Figma. It's the industry standard for UI/UX design — collaborative, web-based, and the best tool for developer handoff. You'll get full access to the Figma file and can share it with your team.",
  },
  {
    q: "Can you design for an existing brand I already have?",
    a: "Yes. If you have a logo, colour palette, or brand guide, I design within those guidelines. If your branding is inconsistent or outdated, I can refresh it as part of the project.",
  },
  {
    q: "Will the design work on mobile too?",
    a: "Yes — mobile-first is the default. I design for the smallest screen first, then adapt for tablet and desktop. Every component is checked for touch targets and readability on small screens.",
  },
  {
    q: "What if I only need design, not development?",
    a: "That's fine. I deliver a complete Figma file ready for your developers to build from — annotated with spacing, colours, fonts, and all states. Handoff includes a walkthrough so nothing is left ambiguous.",
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

export default function UIUXPageClient() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="px-4 pt-28 pb-14 sm:px-6 sm:pt-32 sm:pb-16 md:px-10 lg:px-14 lg:pt-40 2xl:px-20">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <nav aria-label="Breadcrumb">
              <ol className="mono flex items-center gap-2 text-xs text-text-secondary">
                <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link href="/services" className="hover:text-accent transition-colors">Services</Link></li>
                <li aria-hidden>/</li>
                <li className="text-text-primary">UI/UX Design</li>
              </ol>
            </nav>
          </FadeUp>
          <FadeUp delay={0.05}>
            <span className="mono mt-6 block text-xs uppercase tracking-widest text-accent">
              Service — UI/UX Design
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="mt-4 font-display text-4xl font-bold italic leading-[1.05] tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl">
              Design That Guides Visitors
              <br />
              <span className="not-italic text-accent">to Take Action.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              Confused visitors don&apos;t convert. I design clean, intuitive interfaces —
              websites, landing pages, SaaS dashboards — with clear user flows, strong CTAs,
              and mobile-first layouts. In Figma. Designed first. Built second.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg-primary transition-all hover:bg-accent-hover"
              >
                Start a Design Project
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
          <FadeUp delay={0.4}>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Figma design", "Wireframes", "UI components", "Interactive prototype", "Mobile-first", "Dev handoff"].map((b) => (
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

      {/* ── Pain points ── */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 md:px-10 lg:px-14 2xl:px-20">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <span className="mono text-xs uppercase tracking-widest text-text-secondary">
              Why design matters
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold italic text-text-primary md:text-5xl">
              Bad Design Costs Money
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
              Poor UI/UX doesn&apos;t just look unprofessional — it actively drives visitors away
              and kills conversions. Here&apos;s where design failures hurt most.
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

      {/* ── What I design ── */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 md:px-10 lg:px-14 2xl:px-20">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <span className="mono text-xs uppercase tracking-widest text-text-secondary">
              Project types
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold italic text-text-primary md:text-5xl">
              What I Design
            </h2>
          </FadeUp>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TYPES.map((t, i) => (
              <FadeUp key={t.label} delay={i * 0.07} className="h-full">
                <div className="h-full flex flex-col gap-3 rounded-xl border border-border bg-bg-card p-5">
                  <p className="text-sm font-semibold text-text-primary">{t.label}</p>
                  <p className="text-xs leading-relaxed text-text-secondary">{t.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deliverables ── */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 md:px-10 lg:px-14 2xl:px-20">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <span className="mono text-xs uppercase tracking-widest text-text-secondary">
              Deliverables
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold italic text-text-primary md:text-5xl">
              Everything in the Package
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
              Every UI/UX design project is fully documented and ready for your development team to build from.
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
      <section className="px-4 py-14 sm:px-6 sm:py-16 md:px-10 lg:px-14 2xl:px-20">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <span className="mono text-xs uppercase tracking-widest text-text-secondary">
              Design process
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold italic text-text-primary md:text-5xl">
              From Audit to Handoff
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
              A structured design process that eliminates guesswork — you see everything before it&apos;s built.
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

      {/* ── Principle callout ── */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 md:px-10 lg:px-14 2xl:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-border bg-bg-card p-8 md:p-12">
            <FadeUp>
              <span className="mono text-xs uppercase tracking-widest text-text-secondary">
                Design philosophy
              </span>
              <blockquote className="mt-4 font-display text-3xl font-bold italic leading-snug text-text-primary md:text-4xl">
                &ldquo;Good design is invisible. You only notice it when it&apos;s missing.&rdquo;
              </blockquote>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary">
                The goal of every UI I design is to make the right action obvious — without instructions.
                Clear hierarchy, consistent spacing, contrast that guides the eye, and CTAs that feel
                natural rather than forced. Every decision has a reason.
              </p>
            </FadeUp>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                { label: "Mobile-first", text: "Designed for the smallest screen. Adapted up." },
                { label: "Conversion-first", text: "Every element serves the goal of getting users to act." },
                { label: "Handoff-ready", text: "Annotated Figma files developers can build from directly." },
              ].map((p, i) => (
                <FadeUp key={p.label} delay={i * 0.08} className="h-full">
                  <div className="h-full rounded-xl border border-border bg-surface p-5">
                    <p className="text-sm font-semibold text-accent">{p.label}</p>
                    <p className="mono mt-2 text-xs text-text-secondary">{p.text}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 md:px-10 lg:px-14 2xl:px-20">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[1fr_2fr] lg:gap-16">
          <FadeUp>
            <span className="mono text-xs uppercase tracking-widest text-text-secondary">FAQ</span>
            <h2 className="mt-3 font-display text-4xl font-bold italic text-text-primary md:text-5xl">
              UI/UX Design Questions
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              Answers to the most common questions before starting a design project.
            </p>
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
