"use client";

import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

interface WordsPullUpProps {
  text: string;
  className?: string;
}

// const navItems = [
//   { label: "About", href: "/about" },
//   { label: "Work", href: "/portfolio" },
//   { label: "Services", href: "/services" },
//   { label: "Pricing", href: "/pricing" },
//   { label: "Contact", href: "/contact" },
// ];

const wordContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.18,
    },
  },
};

const wordItem: Variants = {
  hidden: {
    opacity: 0,
    y: 70,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function WordsPullUp({ text, className }: WordsPullUpProps) {
  return (
    <motion.h1
      aria-label={text}
      className={className}
      initial="hidden"
      animate="visible"
      variants={wordContainer}
    >
      {text.split(" ").map((word) => (
        <span
          key={word}
          className="mb-[-0.12em] mr-[0.14em] inline-block overflow-hidden pb-[0.12em]"
        >
          <motion.span className="inline-block" variants={wordItem}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 64]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.58, 1],
    [1, 0.7, 0],
  );
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const cardOpacity = useTransform(
    scrollYProgress,
    [0, 0.48, 0.85],
    [1, 0.8, 0],
  );

  return (
    <section
      ref={heroRef}
      className="min-h-[155svh] bg-background p-2 text-foreground"
    >
      <motion.div
        className="sticky top-2 isolate min-h-[calc(100svh-16px)] origin-top overflow-hidden rounded-[28px] bg-bg-primary"
        style={{ scale: heroScale, y: heroY }}
      >
        <motion.video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ scale: videoScale }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Cinematic background video"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.18)_42%,rgba(0,0,0,0.78)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_64%_25%,transparent_0%,rgba(0,0,0,0.18)_44%,rgba(0,0,0,0.58)_100%)]" />

        <motion.article
          className="absolute right-5 top-24 z-10 hidden w-52.5 text-[#f4f1de] md:block lg:right-14 lg:top-28 lg:w-58"
          style={{ y: cardY, opacity: cardOpacity }}
          aria-label="Featured profile card"
        >
          <motion.div
            className="group relative overflow-hidden rounded-lg border border-[#f4f1de]/20 bg-black/25 p-2 shadow-2xl shadow-black/35 backdrop-blur-md"
            initial={{ opacity: 0, y: -18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.75,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="relative aspect-[1.04] overflow-hidden rounded-[7px] bg-bg-secondary">
              <Image
                src="/umar-picture.png"
                alt="Muhammad Umar Malik portrait"
                fill
                priority
                sizes="(min-width: 1024px) 232px, 210px"
                className="origin-top scale-[1.72] object-cover object-[50%_15%] saturate-95 transition duration-700 group-hover:scale-[1.82] group-hover:saturate-110"
              />
              <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(181,244,74,0.2)_0%,transparent_34%,rgba(0,0,0,0.34)_100%)] mix-blend-screen" />
            </div>

            <div className="mono mt-3 flex items-center justify-between text-[13px] font-black uppercase leading-none tracking-normal">
              <p>
                <span className="text-[#f4f1de]/70">[01]</span> Umar Malik
              </p>
              <p className="text-[#f4f1de]/90">©2026</p>
            </div>
          </motion.div>
        </motion.article>

        <motion.div
          className="absolute inset-x-0 bottom-0 z-10 grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_440px] lg:items-end lg:p-14"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <div>
            <motion.p
              className="mono mb-4 text-xs uppercase text-accent"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              Software Engineer & Designer
            </motion.p>

            <div className="flex items-end gap-5">
              <WordsPullUp
                text="I Fix What's Costing Your Business."
                className="max-w-7xl font-display text-[16vw] font-bold leading-[0.97] text-[#f4f1de] sm:text-[12vw] lg:text-[112px] xl:text-[132px]"
              />
            </div>
          </div>

          <motion.div
            className="max-w-lg pb-2 text-[#f4f1de] lg:pb-3"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.5 }}
          >
            <p className="text-[17px] leading-7 text-[#f4f1de]/85 md:text-lg md:leading-8">
              Slow websites, poor UI, zero leads, I find the exact problems
              holding your business back and build solutions that actually
              work.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/portfolio"
                className="inline-flex h-13 items-center rounded-full bg-[#f4f1de] px-8 text-[15px] font-semibold text-black transition-all duration-200 hover:bg-accent hover:text-bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f4f1de] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                View My Work
              </Link>
              <Link
                href="/contact"
                className="group inline-flex h-13 items-center gap-4 rounded-full border border-[#f4f1de]/35 py-1 pl-6 pr-1 text-[15px] font-semibold text-[#f4f1de] backdrop-blur-sm transition-all duration-200 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                Book a Free Call
                <span className="grid size-11 place-items-center rounded-full bg-[#f4f1de] text-black transition-all duration-200 group-hover:translate-x-1 group-hover:bg-accent group-hover:text-bg-primary">
                  <ArrowRight className="size-4" aria-hidden />
                </span>
              </Link>
            </div>

            
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
