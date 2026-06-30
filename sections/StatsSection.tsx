"use client";

import { motion, useInView, animate } from "motion/react";
import { useRef, useEffect, useState } from "react";
import DecryptedText from "@/components/ui/DecryptedText";

const statsData = [
  {
    number: 30,
    suffix: "+",
    label: "Projects Delivered",
    description: "Across ecommerce, SaaS, and service businesses",
    tag: "Volume",
  },
  {
    number: 20,
    suffix: "+",
    label: "Businesses Helped",
    description: "SMBs that returned for ongoing work",
    tag: "Clients",
  },
  {
    number: 98,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Based on direct project feedback",
    tag: "Quality",
  },
  {
    number: 3,
    suffix: "×",
    label: "Avg. Performance Gain",
    description: "PageSpeed lift on every client site",
    tag: "Impact",
  },
];

// Hero (0) spans 2 rows; stat 1 spans 2 cols on lg
const GRID_CLASSES = [
  "lg:col-span-1 lg:row-span-2",
  "lg:col-span-2",
  "",
  "",
];

function AnimatedNumber({
  number,
  suffix,
  inView,
}: {
  number: number;
  suffix: string;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const prefersReduced =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

    if (prefersReduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(number);
      return;
    }

    const controls = animate(0, number, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        setDisplay(Math.floor(v));
      },
    });
    return controls.stop;
  }, [inView, number]);

  return (
    <>
      {display}
      <span style={{ color: "var(--accent)" }}>{suffix}</span>
    </>
  );
}

function StatCard({
  stat,
  i,
}: {
  stat: (typeof statsData)[number];
  i: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex min-h-60 flex-col p-5 cursor-default transition-colors duration-300 sm:min-h-65 sm:p-7 lg:p-10 lg:min-h-75 ${GRID_CLASSES[i]}`}
      style={{ background: "var(--bg-primary)" }}
      suppressHydrationWarning
    >

      {/* Accent wash — fades in on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "rgba(200, 169, 110, 0.045)" }}
      />
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 h-0 w-0.5 transition-[height] duration-500 ease-out group-hover:h-full"
        style={{ background: "var(--accent)" }}
      />

      {/* Top row — index + category tag */}
      <div className="mb-auto flex items-center justify-between pb-8">
        <span
          className="mono text-[11px]"
          style={{ color: "var(--text-secondary)", opacity: 0.35 }}
        >
          0{i + 1}
        </span>
        <span
          className="mono text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "var(--accent)", opacity: 0.65 }}
        >
          {stat.tag}
        </span>
      </div>

      {/* Big number — bottom-aligned within the flex-1 area */}
      <div className="mb-6 flex flex-1 items-end">
        <div
          className="font-display font-bold leading-none transition-opacity duration-200 group-hover:opacity-90"
          style={{
            fontSize: "clamp(72px, 9vw, 120px)",
            color: "var(--text-primary)",
          }}
        >
          <AnimatedNumber number={stat.number} suffix={stat.suffix} inView={inView} />
        </div>
      </div>

      {/* Divider */}
      <div
        className="mb-4 h-px"
        style={{ background: "var(--border)" }}
      />

      {/* Label + description */}
      <div>
        <p
          className="mono mb-1.5 text-xs uppercase tracking-[0.18em]"
          style={{ color: "var(--text-primary)" }}
        >
          {stat.label}
        </p>
        <p className="text-xs leading-[1.85]" style={{ color: "var(--text-secondary)" }}>
          {stat.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-14 lg:py-32 2xl:px-20 2xl:py-40"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Subtle dot-grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, var(--text-primary) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          opacity: 0.025,
        }}
      />

      <div className="relative">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex flex-col gap-4 sm:mb-14 md:mb-20 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mono mb-4 text-xs uppercase tracking-[0.22em]"
              style={{ color: "var(--accent)" }}
              suppressHydrationWarning
            >
              <DecryptedText text="Results I've Delivered" animateOn="view" sequential={true} speed={40} revealDirection="start" />
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold leading-[1.03]"
              style={{
                fontSize: "clamp(36px, 5.5vw, 68px)",
                color: "var(--text-primary)",
              }}
              suppressHydrationWarning
            >
              <DecryptedText text="Numbers That Matter" animateOn="view" sequential={true} speed={25} revealDirection="start" />
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-52.5 text-sm leading-[1.95] md:pb-1 md:text-right"
            style={{ color: "var(--text-secondary)" }}
            suppressHydrationWarning
          >
            Real outcomes.
            <br />
            Real businesses.
            <br />
            Real growth.
          </motion.p>
        </motion.div>

        {/* Bento grid — 3-col on desktop, 2-col tablet, 1-col mobile */}
        <div
          className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3"
          style={{ background: "var(--border)" }}
        >
          {statsData.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} i={i} />
          ))}
        </div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="mono mt-6 text-[11px] tracking-[0.14em]"
          style={{ color: "var(--text-secondary)", opacity: 0.4 }}
        >
          * Based on projects completed 2022 2025
        </motion.p>
      </div>
    </section>
  );
}
