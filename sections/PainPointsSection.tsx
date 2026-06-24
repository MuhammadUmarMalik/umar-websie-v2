"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const painPoints = [
  {
    index: "01",
    tag: "Speed",
    title: "Your website is painfully slow.",
    stat: "−7%",
    statLabel: "conversions lost per extra second",
    description:
      "Every extra second of load time drives paying customers straight to your competitors — before they even see what you offer.",
  },
  {
    index: "02",
    tag: "UX",
    title: "Visitors arrive — then leave immediately.",
    stat: "Leads lost",
    statLabel: "before ever contacting you",
    description:
      "Confusing layouts and buried CTAs mean people can't find what to do next. They bounce, and you never even know they were there.",
  },
  {
    index: "03",
    tag: "Visibility",
    title: "You're invisible on Google.",
    stat: "0",
    statLabel: "organic traffic from search",
    description:
      "If customers can't find you, they find your competitors. A site with no SEO foundation is a business with no discoverability.",
  },
  {
    index: "04",
    tag: "Automation",
    title: "Manual work is eating your hours.",
    stat: "15+ hrs",
    statLabel: "wasted on repetitive tasks weekly",
    description:
      "Order tracking, follow-ups, reporting — tasks your team handles daily could be fully automated. That's time you're paying for nothing.",
  },
  {
    index: "05",
    tag: "Trust",
    title: "Your site looks outdated and untrustworthy.",
    stat: "3 sec",
    statLabel: "to lose a visitor's trust",
    description:
      "First impressions happen before a single word is read. An outdated design signals an outdated business — visitors decide and leave instantly.",
  },
  {
    index: "06",
    tag: "Leads",
    title: "You're losing leads you don't even know about.",
    stat: "Revenue",
    statLabel: "slipping through invisible cracks",
    description:
      "Without a clear funnel and lead capture, interested visitors vanish into thin air. No system means no follow-up. No follow-up means no sale.",
  },
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function PainCard({
  item,
  i,
}: {
  item: (typeof painPoints)[number];
  i: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: i * 0.07, ease }}
      className="group relative flex cursor-default flex-col overflow-hidden rounded-2xl p-5 transition-colors duration-300 sm:p-6 sm:min-h-64 md:min-h-72 lg:min-h-80 lg:p-10"
      style={{ background: "var(--bg-primary)" }}
      suppressHydrationWarning
    >
      {/* Left accent bar — grows on hover */}
      <div
        className="absolute left-0 top-0 h-0 w-0.5 transition-[height] duration-500 ease-out group-hover:h-full"
        style={{ background: "var(--accent)" }}
      />

      {/* Gold wash on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "rgba(200,169,110,0.042)" }}
      />

      {/* Top row — index + tag */}
      <div className="mb-auto flex items-start justify-between pb-7">
        <span
          className="mono text-[11px]"
          style={{ color: "var(--text-secondary)", opacity: 0.32 }}
        >
          {item.index}
        </span>
        <span
          className="mono text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "var(--accent)", opacity: 0.68 }}
        >
          {item.tag}
        </span>
      </div>

      {/* Title */}
      <h3
        className="mb-4 font-display font-bold italic leading-[1.1] transition-opacity duration-200 group-hover:opacity-90"
        style={{
          fontSize: "clamp(20px, 2.2vw, 28px)",
          color: "var(--text-primary)",
        }}
      >
        {item.title}
      </h3>

      {/* Description */}
      <p
        className="mb-8 flex-1 text-[13px] leading-[1.95]"
        style={{ color: "var(--text-secondary)" }}
      >
        {item.description}
      </p>

      {/* Divider */}
      <div className="mb-5 h-px" style={{ background: "var(--border)" }} />

      {/* Stat row */}
      <div className="flex items-end justify-between">
        <div>
          <p
            className="font-display font-bold leading-none"
            style={{
              fontSize: "clamp(28px, 3.2vw, 42px)",
              color: "var(--accent)",
            }}
          >
            {item.stat}
          </p>
          <p
            className="mono mt-1.5 text-[10px] uppercase tracking-[0.18em]"
            style={{ color: "var(--text-secondary)", opacity: 0.42 }}
          >
            {item.statLabel}
          </p>
        </div>

        {/* Arrow — slides in on hover */}
        <span
          className="translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          style={{ color: "var(--accent)" }}
          aria-hidden
        >
          <ArrowRight className="size-4" />
        </span>
      </div>
    </motion.div>
  );
}

export default function PainPointsSection() {
  return (
    <section
      className="relative overflow-hidden mt-4 px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-18 md:px-10 md:pt-24 lg:px-14 lg:pb-32 lg:pt-28 2xl:px-20 2xl:py-40"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Dot-grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, var(--text-primary) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          opacity: 0.022,
        }}
      />

      {/* ── Section header ── */}
      <div className="relative mb-10 flex flex-col gap-4 sm:mb-14 md:mb-20 md:flex-row md:items-end md:justify-between">
        <div>
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="mono mb-4 text-xs uppercase tracking-[0.22em]"
            style={{ color: "var(--accent)" }}
            suppressHydrationWarning
          >
            Pain Points
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, delay: 0.15, ease }}
            className="font-display font-bold leading-[1.02]"
            style={{
              fontSize: "clamp(38px, 5.5vw, 72px)",
              color: "var(--text-primary)",
            }}
            suppressHydrationWarning
          >
            What&apos;s Holding Your
            <br />
            Business Back?
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="max-w-60 text-sm leading-[1.95] md:pb-1 md:text-right"
          style={{ color: "var(--text-secondary)" }}
          suppressHydrationWarning
        >
          These aren&apos;t edge cases.
          <br />
          They&apos;re the exact problems
          <br />
          costing real businesses every day.
        </motion.p>
      </div>

      {/* ── Bento card grid ── */}
      <div
        className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
      >
        {painPoints.map((item, i) => (
          <PainCard key={item.index} item={item} i={i} />
        ))}
      </div>

      {/* ── Bottom CTA strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.15, ease }}
        className="relative mt-14 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <p
          className="font-display text-2xl font-bold italic lg:text-[1.9rem]"
          style={{ color: "var(--text-primary)" }}
        >
          Recognize any of these?
        </p>

        <Link
          href="/contact"
          className="group inline-flex shrink-0 items-center gap-4 rounded-full border py-2 px-2 text-sm font-semibold transition-all duration-300 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          style={{
            borderColor: "var(--accent)",
            color: "var(--text-primary)",
          }}
        >
          Let&apos;s Fix It Together
          <span
            className="grid size-11 place-items-center rounded-full transition-all duration-300 group-hover:translate-x-0.5"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            <ArrowRight className="size-4" aria-hidden />
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
