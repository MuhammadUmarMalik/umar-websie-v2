"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="px-6 py-28 md:px-12 lg:px-20 lg:py-36">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-320 rounded-3xl border border-border bg-bg-card px-8 py-16 text-center md:px-16 md:py-24"
      >
        <p className="mono mb-4 text-sm uppercase text-accent">Ready?</p>
        <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-[1.05] md:text-5xl lg:text-6xl">
          Your Business Deserves a Website That Works.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-8 text-text-secondary">
          Let&apos;s find what&apos;s holding you back and fix it — together.
        </p>
        <Link
          href="/contact"
          className="mt-10 inline-flex h-13 items-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold text-bg-primary transition duration-200 hover:bg-accent-hover"
        >
          Let&apos;s Talk
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </motion.div>
    </section>
  );
}
