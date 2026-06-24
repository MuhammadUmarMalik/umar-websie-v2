"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/lib/constants";

const STATS = [
  { value: "12+", label: "Businesses helped" },
  { value: "100%", label: "Client satisfaction" },
];

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="px-4 py-14 sm:px-6 sm:py-18 md:px-10 lg:px-14 lg:py-28 2xl:px-20 2xl:py-36">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-360 overflow-hidden rounded-2xl border border-border bg-bg-card"
      >
        {/* Atmospheric glow — top-right */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--accent) 15%, transparent) 0%, transparent 70%)",
          }}
        />

        {/* Subtle grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in srgb, var(--accent) 4%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--accent) 4%, transparent) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row">
          {/* ── Left — headline ── */}
          <div className="flex flex-1 flex-col justify-between p-6 sm:p-8 md:p-12 lg:p-14">
           
            <div className="mt-8 lg:mt-auto">
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mono mb-5 text-xs uppercase tracking-widest text-text-secondary"
              >
                Ready to grow?
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-4xl font-bold italic leading-none tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-[5.25rem] 2xl:text-[6rem]"
              >
                Your Business
                <br />
                Deserves a
                <br />
                <span className="not-italic text-accent">Website</span>
                <br />
                That Works.
              </motion.h2>
            </div>

            {/* Bottom rule with site name */}
            <div className="mt-10 hidden items-center gap-3 lg:flex">
              <div className="h-px flex-1 bg-border" />
              <span className="mono text-xs text-text-secondary opacity-40">
                umarmalik.dev
              </span>
            </div>
          </div>

          {/* ── Animated vertical divider ── */}
          <motion.div
            aria-hidden
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.75, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden w-px origin-top self-stretch bg-border lg:block"
          />

          {/* ── Right — action panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between p-6 sm:p-8 md:p-12 lg:w-115 lg:p-14"
          >
            <div>
              <p className="text-lg leading-relaxed text-text-secondary">
                Let&apos;s find what&apos;s holding your business back and fix
                it — together. No fluff, no jargon, just results.
              </p>

              {/* Trust micro-stats */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border bg-surface px-4 py-3"
                  >
                    <p className="font-display text-3xl font-bold italic text-accent">
                      {stat.value}
                    </p>
                    <p className="mono mt-0.5 text-xs text-text-secondary">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col gap-3">
              {/* Primary — Start your project */}
              <Link
                href="/contact"
                className="group flex w-full cursor-pointer items-center justify-between rounded-full bg-accent px-6 py-4 text-sm font-semibold transition-all duration-200 hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                style={{ color: "var(--accent-foreground)" }}
              >
                <span>Start your project</span>
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-200 group-hover:translate-x-1"
                  style={{ backgroundColor: "color-mix(in srgb, var(--accent-foreground) 20%, transparent)" }}
                >
                  <ArrowRight className="size-3.5" style={{ color: "var(--accent-foreground)" }} aria-hidden />
                </span>
              </Link>

              {/* Secondary — Let's Talk */}
              <Link
                href={siteConfig.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full cursor-pointer items-center justify-between rounded-full border border-border bg-transparent px-6 py-4 text-sm font-semibold text-text-primary transition-all duration-200 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <span>Let&apos;s talk</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border transition-all duration-200 group-hover:border-accent group-hover:text-accent group-hover:translate-x-1">
                  <ArrowRight className="size-3.5" aria-hidden />
                </span>
              </Link>

              <p className="mono mt-1 text-center text-xs text-text-secondary">
                Free consultation · No commitment
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom gradient accent rule */}
        <div
          aria-hidden
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(to right, transparent, color-mix(in srgb, var(--accent) 35%, transparent), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
