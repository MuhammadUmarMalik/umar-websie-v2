"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ProjectShowcase } from "@/components/ui/project-showcase";
import DecryptedText from "@/components/ui/DecryptedText";

export default function Project() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      className="w-full px-6 py-24 md:px-10 lg:px-14 lg:py-32"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex flex-col gap-5 md:mb-20 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mono mb-4 text-xs uppercase tracking-[0.22em]"
              style={{ color: "var(--accent)" }}
            >
              <DecryptedText text="Selected Projects" animateOn="view" sequential={true} speed={40} revealDirection="start" />
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
            >
              <DecryptedText text="Work That Ships" animateOn="view" sequential={true} speed={25} revealDirection="start" />
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-56 text-sm leading-[1.95] md:pb-1 md:text-right"
            style={{ color: "var(--text-secondary)" }}
          >
            From e-commerce to SaaS.
            <br />
            Built fast, designed well.
            <br />
            Delivered on time.
          </motion.p>
        </motion.div>

        <ProjectShowcase />
      </div>
    </section>
  );
}
