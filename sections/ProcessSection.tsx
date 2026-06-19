"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Find the Problem",
    description:
      "Before writing a single line of code, I dig into your business. What's broken? What's being lost? I look at your site, your funnel, your competition."
  },
  {
    number: "02",
    title: "Research & Strategy",
    description:
      "I study your market and your competitors. Then I build a clear plan — what to fix, what to build, and why it'll work."
  },
  {
    number: "03",
    title: "Design First",
    description:
      "You get to see it before I build it. I design the full interface for your approval — no surprises, no wasted development time."
  },
  {
    number: "04",
    title: "Build & Develop",
    description:
      "Clean, production-level code. Responsive. Fast. Built to scale. I handle frontend, backend, and everything in between."
  },
  {
    number: "05",
    title: "Test & Launch",
    description:
      "Thorough testing across devices and browsers. Then a smooth, controlled launch — with zero downtime and full handover."
  }
];

function StepCard({ step, index }: { step: (typeof steps)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group grid grid-cols-[auto_1fr] gap-6 border-t border-border py-8 last:border-b"
    >
      <span className="mono mt-1 w-9 shrink-0 text-xs uppercase text-text-secondary">
        {step.number}
      </span>
      <div>
        <h3 className="text-xl font-semibold leading-tight text-text-primary transition-colors duration-200 group-hover:text-accent md:text-2xl">
          {step.title}
        </h3>
        <p className="mt-3 leading-7 text-text-secondary">{step.description}</p>
      </div>
    </motion.div>
  );
}

export default function ProcessSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section className="px-6 py-28 md:px-12 lg:px-20 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <p className="mono mb-3 text-sm uppercase text-accent">Process</p>
          <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.05] md:text-5xl lg:text-6xl">
            From Problem to Launch — No Guesswork
          </h2>
        </motion.div>

        <div className="max-w-3xl">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
