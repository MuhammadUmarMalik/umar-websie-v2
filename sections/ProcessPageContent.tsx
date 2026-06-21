"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import CTABanner from "@/sections/CTABanner";

// ─── Data ──────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    number: "01",
    phase: "Discovery",
    question: "What's actually costing you?",
    title: "Find the Problem",
    description:
      "Before a single pixel moves or a line of code is written, I dig into your business. Site audit, funnel analysis, competitive scan. Most clients don't know exactly what's losing them leads and revenue — I find it.",
    deliverables: [
      "Full site audit report",
      "Funnel & conversion analysis",
      "Competitive landscape overview",
      "Prioritised problem list",
    ],
  },
  {
    number: "02",
    phase: "Strategy",
    question: "What's the smartest path forward?",
    title: "Research & Plan",
    description:
      "With problems mapped, I build a precise plan. What to fix, what to build, and in what order. Strategy rooted in market data and real user behaviour — not trends or assumptions.",
    deliverables: [
      "Market & competitor research",
      "Solution architecture roadmap",
      "Tech stack recommendation",
      "Project timeline & milestones",
    ],
  },
  {
    number: "03",
    phase: "Design",
    question: "Does this look and feel right to you?",
    title: "Design First",
    description:
      "You see the complete interface before a single line of code is written. Full client approval at this stage means no expensive surprises later. Everything is aligned before we build.",
    deliverables: [
      "Wireframes & user flow maps",
      "High-fidelity UI mockups",
      "Mobile & desktop layouts",
      "Component design system",
    ],
  },
  {
    number: "04",
    phase: "Development",
    question: "Is this built to last?",
    title: "Build & Develop",
    description:
      "Approved designs become production-grade code. Clean, documented, fast, and built to scale from day one. No shortcuts that accumulate into technical debt six months later.",
    deliverables: [
      "Production-ready codebase",
      "Performance optimisation",
      "SEO technical foundations",
      "CMS or backend integration",
    ],
  },
  {
    number: "05",
    phase: "Launch",
    question: "Is everything working right?",
    title: "Test & Ship",
    description:
      "Nothing ships until it's tested thoroughly. Cross-device QA, performance audits, zero-downtime deployment — and a full handover with documentation you can actually use.",
    deliverables: [
      "Cross-device QA report",
      "Performance & accessibility audit",
      "Deployment & go-live support",
      "Full handover documentation",
    ],
  },
];

const PRINCIPLES = [
  {
    label: "Clarity over cleverness",
    text: "Every decision is explainable. If I can't tell you why I made a choice, I won't make it.",
  },
  {
    label: "Problems before solutions",
    text: "I diagnose before I prescribe. Tools are always secondary to understanding the real problem.",
  },
  {
    label: "Your approval gates progress",
    text: "You don't get surprised. Sign-off happens at every stage that matters.",
  },
  {
    label: "You own everything",
    text: "After I'm done, you own the code, designs, and all assets. Fully documented, fully accessible.",
  },
];

const FAQS = [
  {
    q: "How long does a full project take?",
    a: "Most projects run 12–22 days end-to-end. Discovery and strategy take 2–4 days, design 3–5 days, development 5–10 days depending on scope, and launch 2–3 days. I'll give you a precise timeline after the discovery call.",
  },
  {
    q: "What if I don't like the design?",
    a: "We iterate until you do. Step 3 (Design First) exists so we align completely before building. You get revision rounds built into the process — nothing gets built until you've approved it.",
  },
  {
    q: "How much do I need to be involved?",
    a: "Lightly. I need your input at three key points: end of discovery (confirming the problem), design approval, and pre-launch sign-off. Between those, I work independently and update you with clear progress summaries.",
  },
  {
    q: "What do I receive at the end?",
    a: "Everything. Source code, design files, credentials, CMS access, and full documentation. You own 100% of everything built. No vendor lock-in, no ongoing dependency on me unless you choose it.",
  },
  {
    q: "Do you work on fixed price or hourly?",
    a: "Fixed price, always. You know the cost before we start — no surprises, no scope creep charges without discussion. The discovery call establishes scope and we agree on a number before any work begins.",
  },
];

// ─── Step Section ─────────────────────────────────────────────────────────────

function StepSection({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative group">
      {/* Animated top divider */}
      <div className="relative h-px overflow-hidden" style={{ background: "var(--border)" }}>
        <motion.div
          initial={{ x: "-101%" }}
          animate={inView ? { x: "0%" } : {}}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
          style={{ background: "rgba(214,251,97,0.22)" }}
        />
      </div>

      <div className="relative overflow-hidden px-6 py-20 md:px-10 lg:px-14 lg:py-28">
        {/* Watermark number */}
        <motion.span
          aria-hidden
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 2.4, ease: "easeOut", delay: 0.1 }}
          className="pointer-events-none absolute select-none font-display font-bold leading-none transition-opacity duration-700 group-hover:opacity-[0.07]"
          style={{
            fontSize: "clamp(150px, 28vw, 420px)",
            color: "rgba(240,237,230,0.028)",
            top: "50%",
            [isEven ? "right" : "left"]: "-0.08em",
            transform: "translateY(-52%)",
          }}
        >
          {step.number}
        </motion.span>

        <div className="relative mx-auto max-w-7xl">
          <div
            className={`grid gap-12 lg:grid-cols-[1fr_380px] lg:items-start xl:gap-24 ${
              isEven ? "" : "lg:grid-cols-[380px_1fr]"
            }`}
          >
            {/* Main text column */}
            <div className={isEven ? "" : "lg:order-2"}>
              {/* Phase label */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mb-6 flex items-center gap-4"
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "28px",
                    height: "1px",
                    background: "var(--accent)",
                    transition: "width 0.5s ease",
                  }}
                  className="group-hover:w-10!"
                />
                <span
                  className="mono text-xs uppercase tracking-[0.2em]"
                  style={{ color: "var(--accent)" }}
                >
                  {step.phase}
                </span>
                <span
                  className="mono text-xs"
                  style={{ color: "var(--text-secondary)", opacity: 0.35 }}
                >
                  {step.number} / 05
                </span>
              </motion.div>

              {/* Question */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="font-display mb-3 italic leading-snug"
                style={{
                  fontSize: "clamp(15px, 1.6vw, 20px)",
                  color: "var(--text-secondary)",
                }}
              >
                &ldquo;{step.question}&rdquo;
              </motion.p>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold leading-none transition-colors duration-500 group-hover:text-accent"
                style={{
                  fontSize: "clamp(46px, 6.5vw, 90px)",
                  color: "var(--text-primary)",
                }}
              >
                {step.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 max-w-lg text-[15px] leading-loose"
                style={{ color: "var(--text-secondary)" }}
              >
                {step.description}
              </motion.p>
            </div>

            {/* Deliverables card */}
            <div className={`lg:pt-14 ${isEven ? "" : "lg:order-1"}`}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border p-6 xl:p-7"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border)",
                }}
              >
                <p
                  className="mono mb-5 text-xs uppercase tracking-[0.18em]"
                  style={{ color: "var(--accent)" }}
                >
                  Deliverables
                </p>
                <ul className="space-y-3.5">
                  {step.deliverables.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: 10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 0.38 + i * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex items-start gap-3 text-sm leading-[1.6]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span
                        className="mt-1.5 flex-none rounded-full"
                        style={{
                          display: "inline-block",
                          width: "5px",
                          height: "5px",
                          background: "var(--accent)",
                          opacity: 0.75,
                        }}
                      />
                      {item}
                    </motion.li>
                  ))}
                </ul>

              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

function FaqItem({
  faq,
  index,
  openIndex,
  onToggle,
}: {
  faq: { q: string; a: string };
  index: number;
  openIndex: number | null;
  onToggle: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const isOpen = openIndex === index;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <button
        type="button"
        onClick={() => onToggle(index)}
        className="group/faq flex w-full items-start justify-between gap-6 py-6 text-left"
        aria-expanded={isOpen}
      >
        <span
          className="text-[15px] font-semibold leading-snug transition-colors duration-300"
          style={{ color: isOpen ? "var(--accent)" : "var(--text-primary)" }}
        >
          {faq.q}
        </span>
        <span
          className="mono mt-0.5 flex-none text-lg leading-none transition-all duration-300"
          style={{
            color: "var(--accent)",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            display: "inline-block",
          }}
          aria-hidden
        >
          +
        </span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: "hidden" }}
      >
        <p
          className="pb-6 text-[15px] leading-[1.9]"
          style={{ color: "var(--text-secondary)" }}
        >
          {faq.a}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function ProcessPageContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const principlesRef = useRef<HTMLDivElement>(null);
  const principlesInView = useInView(principlesRef, { once: true, margin: "-80px" });
  const faqHeadRef = useRef<HTMLDivElement>(null);
  const faqHeadInView = useInView(faqHeadRef, { once: true, margin: "-60px" });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-background text-foreground">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="px-6 pb-20 pt-36 md:px-10 lg:px-14 lg:pb-28 lg:pt-52">
        <div ref={heroRef} className="mx-auto max-w-7xl">
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 flex items-center gap-3"
          >
            <span
              style={{
                display: "inline-block",
                width: "32px",
                height: "1px",
                background: "var(--accent)",
              }}
            />
            <span
              className="mono text-xs uppercase tracking-[0.22em]"
              style={{ color: "var(--accent)" }}
            >
              How I Work
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 90, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
              className="font-display font-bold leading-[0.95]"
              style={{
                fontSize: "clamp(58px, 9.5vw, 136px)",
                color: "var(--text-primary)",
              }}
            >
              Five Steps.
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 90, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
              className="font-display font-bold italic leading-[0.95]"
              style={{
                fontSize: "clamp(58px, 9.5vw, 136px)",
                color: "var(--accent)",
              }}
            >
              Zero Guesswork.
            </motion.h1>
          </div>

          {/* Subtitle + phase pills grid */}
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-lg text-[17px] leading-[1.9]"
              style={{ color: "var(--text-secondary)" }}
            >
              A structured, repeatable process that removes the chaos from
              projects. You know exactly what&apos;s happening, what comes next,
              and what you&apos;ll receive at every stage.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-2 lg:justify-end"
            >
              {STEPS.map((step, i) => (
                <motion.span
                  key={step.number}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.52 + i * 0.06 }}
                  className="mono inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[11px] uppercase tracking-[0.12em]"
                  style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
                >
                  <span style={{ color: "var(--accent)" }}>{step.number}</span>
                  {step.phase}
                </motion.span>
              ))}
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── Step Sections ─────────────────────────────────────────────────── */}
      <div>
        {STEPS.map((step, i) => (
          <StepSection key={step.number} step={step} index={i} />
        ))}
        <div className="h-px" style={{ background: "var(--border)" }} />
      </div>

      {/* ── Principles ────────────────────────────────────────────────────── */}
      <section
        ref={principlesRef}
        className="border-t px-6 py-24 md:px-10 lg:px-14 lg:py-32"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={principlesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <p
              className="mono mb-3 text-xs uppercase tracking-[0.22em]"
              style={{ color: "var(--accent)" }}
            >
              Philosophy
            </p>
            <h2
              className="font-display font-bold leading-[1.04]"
              style={{ fontSize: "clamp(32px, 4.5vw, 60px)", color: "var(--text-primary)" }}
            >
              How I Think About Every Project
            </h2>
          </motion.div>

          <div className="grid gap-px md:grid-cols-2 lg:grid-cols-4" style={{ background: "var(--border)" }}>
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 20 }}
                animate={principlesInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.65,
                  delay: 0.1 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex flex-col gap-4 p-8 transition-colors duration-300 xl:p-10"
                style={{ background: "var(--bg-primary)" }}
              >
                <span
                  className="mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-300"
                  style={{ color: "var(--accent)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="font-display text-xl font-bold leading-snug"
                  style={{ color: "var(--text-primary)" }}
                >
                  {p.label}
                </h3>
                <p
                  className="text-sm leading-[1.85]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {p.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section
        className="border-t px-6 py-24 md:px-10 lg:px-14 lg:py-32"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[340px_1fr] xl:grid-cols-[400px_1fr]">
            {/* Left sticky heading */}
            <motion.div
              ref={faqHeadRef}
              initial={{ opacity: 0, y: 20 }}
              animate={faqHeadInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:sticky lg:top-32 lg:self-start"
            >
              <p
                className="mono mb-3 text-xs uppercase tracking-[0.22em]"
                style={{ color: "var(--accent)" }}
              >
                FAQ
              </p>
              <h2
                className="font-display font-bold leading-[1.04]"
                style={{
                  fontSize: "clamp(32px, 4.5vw, 60px)",
                  color: "var(--text-primary)",
                }}
              >
                Common Questions
              </h2>
              <p
                className="mt-5 text-sm leading-[1.9]"
                style={{ color: "var(--text-secondary)" }}
              >
                About the process, timeline, and what to expect.
              </p>

              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-text-primary transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1"
              >
                Ask something else
                <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </motion.div>

            {/* FAQs */}
            <div className="border-t" style={{ borderColor: "var(--border)" }}>
              {FAQS.map((faq, i) => (
                <FaqItem
                  key={i}
                  faq={faq}
                  index={i}
                  openIndex={openFaq}
                  onToggle={(idx) => setOpenFaq(openFaq === idx ? null : idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
