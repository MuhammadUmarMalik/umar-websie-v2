"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { stats } from "@/lib/constants";

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-bg-secondary px-6 py-20 md:px-12 lg:px-20 lg:py-28">
      <div className="mx-auto max-w-320">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mono mb-12 text-sm uppercase text-text-secondary"
        >
          Results I've Delivered
        </motion.p>

        <div
          ref={ref}
          className="grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="flex flex-col justify-between bg-bg-primary p-6 md:p-8 lg:p-10"
            >
              <span className="font-display text-5xl font-bold leading-none text-accent md:text-6xl lg:text-7xl">
                {stat.value}
              </span>
              <span className="mono mt-4 text-xs uppercase leading-tight text-text-secondary">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
