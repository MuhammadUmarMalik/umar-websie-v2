"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Find the Problem",
    description:
      "Site audit, funnel review, competitive scan. I find exactly what's losing you leads before touching code.",
    tag: "Discovery",
    items: ["Site audit", "Funnel review", "Competitive scan"],
  },
  {
    number: "02",
    title: "Research & Plan",
    description:
      "Competitor analysis and a focused strategy. What to fix, what to build, and why it'll work.",
    tag: "Strategy",
    items: ["Market research", "Strategy mapping", "Roadmap planning"],
  },
  {
    number: "03",
    title: "Design First",
    description:
      "You approve the full interface before a single line of code is written. No surprises.",
    tag: "Design",
    items: ["Wireframes", "UI mockups", "Client approval"],
  },
  {
    number: "04",
    title: "Build & Develop",
    description:
      "Clean, production grade code. Responsive, fast, and built to scale from day one.",
    tag: "Development",
    items: ["Production code", "Responsive design", "Performance first"],
  },
  {
    number: "05",
    title: "Test & Ship",
    description:
      "Cross device testing, zero downtime launch, and complete handover with post launch support.",
    tag: "Launch",
    items: ["Cross device QA", "Zero downtime deploy", "Full handover"],
  },
];

function StepItem({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isOdd = index % 2 !== 0;

  return (
    <div ref={ref} className="group relative">
      {/* Sweeping divider line */}
      <div className="relative h-px overflow-hidden" style={{ background: "var(--border)" }}>
        <motion.div
          initial={{ x: "-101%" }}
          animate={inView ? { x: "0%" } : {}}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="absolute inset-0"
          style={{ background: "rgba(214,251,97,0.3)" }}
        />
      </div>

      <div className="relative overflow-hidden py-10 md:py-18 lg:py-24">
        {/* Giant watermark number — bleeds off opposite side from main text */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 2.2, ease: "easeOut", delay: 0.15 }}
          aria-hidden
          className="font-display pointer-events-none absolute top-1/2 translate-y-[-52%] select-none font-bold leading-none transition-all duration-700 ease-out group-hover:opacity-(--num-hover-opacity)"
          style={{
            fontSize: "clamp(110px, 20vw, 310px)",
            color: "rgba(240,237,230,0.032)",
            ["--num-hover-opacity" as string]: "0.075",
            ...(isOdd
              ? { left: "-0.15em" }
              : { right: "-0.15em" }),
          }}
        >
          {step.number}
        </motion.span>

        {/* Row: main content + detail items */}
        <div
          className={`relative flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16 xl:gap-24 ${
            isOdd ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Main text block */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            {/* Tag row */}
            <div className="mb-5 flex items-center gap-3">
              <span
                className="inline-block h-px transition-all duration-500 group-hover:w-8"
                style={{ width: "24px", background: "var(--accent)" }}
              />
              <span
                className="mono text-xs uppercase tracking-[0.18em]"
                style={{ color: "var(--accent)" }}
              >
                {step.tag}
              </span>
              <span className="mono text-xs" style={{ color: "var(--text-secondary)", opacity: 0.35 }}>
                {step.number} / 05
              </span>
            </div>

            {/* Title */}
            <h3
              className="font-display mb-6 font-bold leading-[1.04] transition-colors duration-500 group-hover:text-accent"
              style={{
                fontSize: "clamp(30px, 4.5vw, 62px)",
                color: "var(--text-primary)",
              }}
            >
              {step.title}
            </h3>

            {/* Description */}
            <p
              className="max-w-sm text-sm leading-[1.95] md:max-w-md"
              style={{ color: "var(--text-secondary)" }}
            >
              {step.description}
            </p>
          </motion.div>

          {/* Detail items */}
          <div className={`flex flex-col lg:w-52 xl:w-60 ${isOdd ? "lg:items-end" : ""}`}>
            {step.items.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: isOdd ? -20 : 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.65,
                  delay: 0.32 + i * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group/item flex cursor-default items-center gap-3 py-3.5 ${
                  isOdd ? "flex-row-reverse" : ""
                }`}
                style={{
                  borderBottom: i < step.items.length - 1
                    ? "1px solid var(--border)"
                    : "none",
                }}
                suppressHydrationWarning
              >
                <span
                  className="flex-none transition-all duration-500 group-hover/item:opacity-100"
                  style={{
                    display: "inline-block",
                    height: "1px",
                    width: "12px",
                    background: "var(--accent)",
                    opacity: 0.35,
                    transition: "width 0.4s ease, opacity 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.width = "22px";
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.width = "12px";
                    (e.currentTarget as HTMLElement).style.opacity = "0.35";
                  }}
                />
                <span
                  className="text-xs transition-colors duration-300 group-hover/item:text-text-primary"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start 85%", "end 55%"],
  });

  const spineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const spineOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0.4]);

  return (
    <section
      ref={sectionRef}
      className="relative px-4 py-20 sm:px-6 sm:py-24 md:px-10 lg:px-14 lg:py-36 2xl:px-20 2xl:py-44"
    >
      <div>
        {/* Header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col gap-4 sm:mb-16 md:mb-24 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={headingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mono mb-4 text-xs uppercase tracking-[0.22em]"
              style={{ color: "var(--accent)" }}
              suppressHydrationWarning
            >
              Process
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold leading-[1.02]"
              style={{
                fontSize: "clamp(40px, 7vw, 80px)",
                color: "var(--text-primary)",
              }}
              suppressHydrationWarning
            >
              How I Work
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-55 text-sm leading-[1.9] md:pb-1 md:text-right"
            style={{ color: "var(--text-secondary)" }}
            suppressHydrationWarning
          >
            Five clear steps.
            <br />
            No guesswork, no delays,
            <br />
            no surprises.
          </motion.p>
        </motion.div>

        {/* Steps area with vertical scroll-progress spine */}
        <div className="relative flex gap-10 md:gap-14">
          {/* Spine */}
          <div className="relative hidden w-px flex-none md:block" style={{ background: "var(--border)" }}>
            <motion.div
              className="absolute top-0 w-full origin-top"
              style={{
                height: spineHeight,
                opacity: spineOpacity,
                background: "var(--accent)",
              }}
            />
            {/* Step dot markers */}
            {steps.map((_, i) => {
              const pct = `${(i / (steps.length - 1)) * 100}%`;
              return (
                <motion.div
                  key={i}
                  className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ top: pct, background: "var(--border)" }}
                  initial={{ scale: 0 }}
                  animate={headingInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.4, ease: "backOut" }}
                  suppressHydrationWarning
                />
              );
            })}
          </div>

          {/* Steps list */}
          <div ref={stepsRef} className="min-w-0 flex-1">
            {steps.map((step, i) => (
              <StepItem key={step.number} step={step} index={i} />
            ))}

            {/* Final bottom rule */}
            <div className="h-px w-full" style={{ background: "var(--border)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
