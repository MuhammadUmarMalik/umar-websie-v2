"use client";

import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";
import CTABanner from "@/sections/CTABanner";

// ─── SVG Tech Icons ───────────────────────────────────────────────

const ReactIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
    <circle cx="12" cy="12" r="2.1" fill={color} />
    <ellipse cx="12" cy="12" rx="10.5" ry="3.9" stroke={color} strokeWidth="1.25" />
    <ellipse cx="12" cy="12" rx="10.5" ry="3.9" stroke={color} strokeWidth="1.25" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10.5" ry="3.9" stroke={color} strokeWidth="1.25" transform="rotate(120 12 12)" />
  </svg>
);

const NextJsIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
    <path d="M11.572 0C5.17 0 0 5.168 0 11.574c0 4.908 3.044 9.154 7.467 10.87l6.463-11.077v7.208c0 .493.037.97.108 1.435C11.83 22.914 9.64 24 7.198 24 3.224 24 0 20.757 0 16.758V7.242C0 3.243 3.224 0 7.198 0h9.604C20.776 0 24 3.243 24 7.242v9.516C24 20.757 20.776 24 16.802 24c-2.444 0-4.634-1.086-6.84-3.01.072-.466.108-.942.108-1.435V7.35l6.463 11.077C20.956 20.728 24 16.482 24 11.574 24 5.168 18.83 0 12.428 0h-.856z" />
  </svg>
);

const GitHubIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803a11.5 11.5 0 0 1 3.004.404c2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const VercelIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
    <path d="M24 22.525H0l12-21.05 12 21.05z" />
  </svg>
);

const GitIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
    <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.608-.406-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
  </svg>
);

const DockerIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
    <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.185-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.185.185 0 00-.185-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
  </svg>
);

const FigmaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <path d="M8 24c2.2 0 4-1.8 4-4v-4H8a4 4 0 0 0 0 8z" fill="#0ACF83" />
    <path d="M4 12a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4z" fill="#A259FF" />
    <path d="M4 4a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4z" fill="#F24E1E" />
    <path d="M12 0h4a4 4 0 0 1 0 8h-4V0z" fill="#FF7262" />
    <circle cx="16" cy="12" r="4" fill="#1ABCFE" />
  </svg>
);

const MongoIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
    <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.48Ic.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.29-8.423c.04-.308.01-.6-.05-.26z" />
  </svg>
);

// Letter icon for text-based brands
const LetterIcon = ({
  text,
  bg,
  fg = "#fff",
  fontSize = 9,
}: {
  text: string;
  bg: string;
  fg?: string;
  fontSize?: number;
}) => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <rect width="24" height="24" rx="4" fill={bg} />
    <text
      x="12"
      y={text.length > 2 ? "14" : "15.5"}
      textAnchor="middle"
      dominantBaseline="middle"
      fill={fg}
      fontFamily="ui-monospace,monospace"
      fontWeight="bold"
      fontSize={text.length > 2 ? fontSize : fontSize + 1}
    >
      {text}
    </text>
  </svg>
);

// OpenAI gear-circle icon
const OpenAIIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
  </svg>
);

// ─── Tech Stack Data ────────────────────────────────────────────────

const CATEGORIES = ["All", "Frontend", "Backend", "Design", "CMS & Platforms", "Automation & AI", "DevTools"];

type Tech = {
  name: string;
  category: string;
  color: string;
  icon: React.ReactNode;
};

const TECHS: Tech[] = [
  // Frontend
  { name: "React", category: "Frontend", color: "#61DAFB", icon: <ReactIcon color="#61DAFB" /> },
  { name: "Next.js", category: "Frontend", color: "#e2e8f0", icon: <NextJsIcon color="#e2e8f0" /> },
  { name: "TypeScript", category: "Frontend", color: "#3178C6", icon: <LetterIcon text="TS" bg="#3178C6" fg="#fff" /> },
  { name: "JavaScript", category: "Frontend", color: "#F7DF1E", icon: <LetterIcon text="JS" bg="#F7DF1E" fg="#1a1a1a" /> },
  { name: "Tailwind CSS", category: "Frontend", color: "#06B6D4", icon: <LetterIcon text="TW" bg="#06B6D4" fg="#fff" /> },
  { name: "Framer Motion", category: "Frontend", color: "#A78BFA", icon: <LetterIcon text="FM" bg="#0055FF" fg="#fff" /> },
  { name: "HTML5", category: "Frontend", color: "#E34F26", icon: <LetterIcon text="H5" bg="#E34F26" fg="#fff" /> },
  { name: "CSS3", category: "Frontend", color: "#1572B6", icon: <LetterIcon text="C3" bg="#1572B6" fg="#fff" /> },
  // Backend
  { name: "Node.js", category: "Backend", color: "#339933", icon: <LetterIcon text="Node" bg="#339933" fg="#fff" fontSize={7} /> },
  { name: "Express.js", category: "Backend", color: "#ffffff", icon: <LetterIcon text="Ex" bg="#161616" fg="#f0ede6" /> },
  { name: "REST APIs", category: "Backend", color: "#FF6C37", icon: <LetterIcon text="API" bg="#FF6C37" fg="#fff" fontSize={7} /> },
  { name: "PostgreSQL", category: "Backend", color: "#4169E1", icon: <LetterIcon text="PG" bg="#4169E1" fg="#fff" /> },
  { name: "MongoDB", category: "Backend", color: "#47A248", icon: <MongoIcon color="#47A248" /> },
  { name: "Prisma", category: "Backend", color: "#5A67D8", icon: <LetterIcon text="Pr" bg="#2D3748" fg="#A78BFA" /> },
  // Design
  { name: "Figma", category: "Design", color: "#F24E1E", icon: <FigmaIcon /> },
  { name: "UI/UX Design", category: "Design", color: "#D6FB61", icon: <LetterIcon text="UX" bg="#1c1c1c" fg="#D6FB61" /> },
  { name: "Prototyping", category: "Design", color: "#9b59b6", icon: <LetterIcon text="Pt" bg="#2c1654" fg="#e879f9" /> },
  // CMS
  { name: "WordPress", category: "CMS & Platforms", color: "#21759B", icon: <LetterIcon text="WP" bg="#21759B" fg="#fff" /> },
  { name: "Shopify", category: "CMS & Platforms", color: "#7AB55C", icon: <LetterIcon text="Sh" bg="#7AB55C" fg="#fff" /> },
  { name: "Webflow", category: "CMS & Platforms", color: "#4353FF", icon: <LetterIcon text="Wf" bg="#4353FF" fg="#fff" /> },
  { name: "WooCommerce", category: "CMS & Platforms", color: "#96588A", icon: <LetterIcon text="Woo" bg="#96588A" fg="#fff" fontSize={7} /> },
  // Automation
  { name: "n8n", category: "Automation & AI", color: "#EA4B71", icon: <LetterIcon text="n8n" bg="#EA4B71" fg="#fff" fontSize={7} /> },
  { name: "Make.com", category: "Automation & AI", color: "#6D00CC", icon: <LetterIcon text="Mk" bg="#6D00CC" fg="#fff" /> },
  { name: "OpenAI API", category: "Automation & AI", color: "#ffffff", icon: <OpenAIIcon color="#e2e8f0" /> },
  { name: "AI Workflows", category: "Automation & AI", color: "#D6FB61", icon: <LetterIcon text="AI" bg="#1c1c1c" fg="#D6FB61" /> },
  // DevTools
  { name: "Git", category: "DevTools", color: "#F05032", icon: <GitIcon color="#F05032" /> },
  { name: "GitHub", category: "DevTools", color: "#f0ede6", icon: <GitHubIcon color="#f0ede6" /> },
  { name: "Vercel", category: "DevTools", color: "#e2e8f0", icon: <VercelIcon color="#e2e8f0" /> },
  { name: "Docker", category: "DevTools", color: "#2496ED", icon: <DockerIcon color="#2496ED" /> },
  { name: "VS Code", category: "DevTools", color: "#007ACC", icon: <LetterIcon text="VS" bg="#007ACC" fg="#fff" /> },
  { name: "Postman", category: "DevTools", color: "#FF6C37", icon: <LetterIcon text="Pm" bg="#FF6C37" fg="#fff" /> },
];

// ─── Process steps ────────────────────────────────────────────────

const PROCESS = [
  {
    step: "01",
    title: "Listen First",
    desc: "I ask the questions your last developer never did. Understanding the real problem before touching any code.",
    accent: "Listen",
  },
  {
    step: "02",
    title: "Research Deeply",
    desc: "Competitors, market, user behavior patterns — I know your landscape before designing a single pixel.",
    accent: "Research",
  },
  {
    step: "03",
    title: "Design for Buy-In",
    desc: "You see and approve it before I build it. No surprises, no wasted sprints — just aligned execution.",
    accent: "Design",
  },
  {
    step: "04",
    title: "Build Clean",
    desc: "Production-level, maintainable code. Not a prototype — the real thing, done right the first time.",
    accent: "Build",
  },
  {
    step: "05",
    title: "Launch Right",
    desc: "Tested, optimized, handed over with documentation. You own it, you understand it, it works.",
    accent: "Launch",
  },
];

// ─── Values ────────────────────────────────────────────────────────

const VALUES = [
  {
    num: "I",
    title: "Outcome over Output",
    desc: "I measure success in revenue, leads, and time saved — not in lines of code or design tokens delivered.",
  },
  {
    num: "II",
    title: "Clarity over Complexity",
    desc: "The best solution is the simplest one that works. I don't build what you don't need.",
  },
  {
    num: "III",
    title: "Ownership over Delivery",
    desc: "I treat every project like it's my own business on the line. That accountability shows in the results.",
  },
];

// ─── Animation helpers ─────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, inView };
}

// ─── TechCard component ────────────────────────────────────────────

function TechCard({ tech, index }: { tech: Tech; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      custom={index * 0.5}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col items-center gap-3 rounded-2xl border border-border bg-bg-card p-4 transition-all duration-300"
      style={{
        boxShadow: hovered
          ? `0 0 28px color-mix(in srgb, ${tech.color} 20%, transparent), 0 0 0 1px color-mix(in srgb, ${tech.color} 35%, transparent)`
          : "none",
        borderColor: hovered
          ? `color-mix(in srgb, ${tech.color} 35%, var(--border))`
          : "var(--border)",
      }}
    >
      <div
        className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
        style={{
          filter: hovered ? `drop-shadow(0 0 8px ${tech.color}80)` : "none",
        }}
      >
        {tech.icon}
      </div>
      <span className="mono text-center text-[10px] leading-tight text-text-secondary transition-colors duration-200 group-hover:text-text-primary">
        {tech.name}
      </span>
    </motion.div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────

export default function AboutPageClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { ref: heroRevealRef, inView: isHeroInView } = useReveal();
  const { ref: storyRevealRef, inView: isStoryInView } = useReveal();
  const { ref: techRevealRef, inView: isTechInView } = useReveal();
  const { ref: processRevealRef, inView: isProcessInView } = useReveal();
  const { ref: valuesRevealRef, inView: isValuesInView } = useReveal();

  const filteredTechs =
    activeCategory === "All"
      ? TECHS
      : TECHS.filter((t) => t.category === activeCategory);

  return (
    <main className="bg-background text-foreground overflow-hidden">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background">
        {/* Inview anchor */}
        <div ref={heroRevealRef} className="pointer-events-none absolute top-1/3" />

        {/* ── UNIFIED RESPONSIVE LAYOUT ───────────────────────────── */}
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-10 xl:px-16">
          <div className="grid grid-cols-1 gap-8 pt-24 pb-14 sm:gap-10 sm:pt-32 sm:pb-16 md:pt-40 md:pb-20 [@media(orientation:landscape)_and_(max-width:1023px)]:grid-cols-[1fr_auto] [@media(orientation:landscape)_and_(max-width:1023px)]:items-center [@media(orientation:landscape)_and_(max-width:1023px)]:gap-6 [@media(orientation:landscape)_and_(max-width:1023px)]:pt-20 [@media(orientation:landscape)_and_(max-width:1023px)]:pb-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:pt-36 lg:pb-24 xl:gap-16 xl:pt-44 xl:pb-28">

            {/* Text: headline + meta */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-center"
            >
              <p className="mono mb-4 text-[11px] uppercase tracking-[0.22em] text-accent sm:mb-5">
                Full-Stack Engineer &amp; Designer
              </p>
              <h1 className="font-display text-4xl font-bold italic leading-[1.04] tracking-tight text-text-primary sm:text-5xl lg:text-5xl xl:text-6xl">
                I Build Things That Fix
                <br />
                <span className="text-accent">Real Problems.</span>
              </h1>
              <p className="mt-5 max-w-[42ch] text-base leading-7 text-text-secondary sm:mt-6">
                Full-stack engineer, UI/UX designer, and automation builder
                helping businesses fix what is broken and build what is missing.
              </p>
              <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
                <Link
                  href="/contact"
                  className="group inline-flex h-11 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                >
                  Work With Me
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
                <Link
                  href="/portfolio"
                  className="mono inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-semibold text-text-primary transition-all duration-200 hover:border-accent hover:text-accent active:scale-[0.98]"
                >
                  See Work
                </Link>
              </div>
              <div className="mt-8 flex gap-8 border-t border-border pt-7 sm:mt-10 sm:gap-10 sm:pt-8">
                {[
                  { value: "12+", label: "Projects Shipped" },
                  { value: "2+", label: "Years Building" },
                  { value: "4+", label: "Service Domains" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-3xl font-bold italic leading-none text-text-primary">
                      {s.value}
                    </p>
                    <p className="mono mt-1.5 text-[10px] uppercase tracking-widest text-text-secondary">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
              className="flex items-center justify-center"
            >
              <div className="relative h-80 max-h-[50svh] w-full overflow-hidden rounded-2xl sm:h-96 sm:rounded-3xl [@media(orientation:landscape)_and_(max-width:1023px)]:h-[calc(100svh-7rem)] [@media(orientation:landscape)_and_(max-width:1023px)]:max-h-none [@media(orientation:landscape)_and_(max-width:1023px)]:w-44 lg:max-h-none lg:h-125 lg:w-95 xl:h-140 xl:w-105">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/umar-dp.png"
                  alt="Muhammad Umar Malik"
                  className="h-full w-full object-cover object-top"
                  draggable={false}
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-accent/15 to-transparent" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── STORY ─────────────────────────────────────────────────── */}
      <section className="border-t border-border px-4 py-16 sm:px-6 sm:py-20 md:px-12 lg:px-20 2xl:px-28 2xl:py-28">
        <div className="mx-auto max-w-7xl">
          <div
            ref={storyRevealRef}
            className="grid gap-16 lg:grid-cols-[280px_1fr]"
          >
            {/* Left label */}
            <motion.div
              initial="hidden"
              animate={isStoryInView ? "visible" : "hidden"}
              variants={fadeUp}
            >
              <p className="mono text-xs uppercase tracking-widest text-accent">
                01 · Origin
              </p>
              <p className="mt-4 font-display text-7xl font-bold italic leading-none text-border md:text-9xl">
                Me
              </p>
            </motion.div>

            {/* Right text */}
            <motion.div
              initial="hidden"
              animate={isStoryInView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={1}
              className="space-y-6 text-lg leading-9 text-text-secondary"
            >
              <p className="text-xl leading-9 text-text-primary">
                I&apos;m <strong>Muhammad Umar Malik</strong> — a full-stack
                software engineer and designer based in Pakistan, working with
                small businesses worldwide to solve the problems that cost them
                customers and revenue.
              </p>
              <p>
                I started this work because I kept seeing the same thing:
                businesses with great products but broken digital presence.
                Slow websites. Confusing layouts. No leads. Manual processes
                wasting hours every day.
              </p>
              <p>
                My job is simple — I find what&apos;s broken, understand your
                business deeply, and build solutions that actually move the
                needle. Clean code, smart design, real results.
              </p>
              <p>
                Whether it&apos;s rebuilding your site from scratch, fixing a
                checkout flow, or automating a repetitive workflow with AI — I
                treat every project like it&apos;s my own business on the line.
              </p>

              <div className="mt-10 flex flex-wrap gap-3 pt-2">
                {["12+ Projects", "Full-Stack", "Available Now"].map((tag) => (
                  <span
                    key={tag}
                    className="mono inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs text-text-secondary"
                  >
                    <CheckCircle2 className="size-3 text-accent" aria-hidden />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ────────────────────────────────────────────── */}
      <section className="border-t border-border px-4 py-16 sm:px-6 sm:py-20 md:px-12 lg:px-20 2xl:px-28 2xl:py-28">
        <div className="mx-auto max-w-7xl" ref={techRevealRef}>
          {/* Header */}
          <motion.div
            initial="hidden"
            animate={isTechInView ? "visible" : "hidden"}
            variants={fadeUp}
            className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="mono mb-2 text-xs uppercase tracking-widest text-accent">
                02 · Skills & Arsenal
              </p>
              <h2 className="font-display text-4xl font-bold italic leading-tight text-text-primary md:text-5xl">
                Technologies I Use
              </h2>
            </div>
            <p className="text-sm text-text-secondary sm:max-w-xs sm:text-right">
              {TECHS.length}+ technologies I rely on to build, design, and ship
              production work.
            </p>
          </motion.div>

          {/* Category filter */}
          <motion.div
            initial="hidden"
            animate={isTechInView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={1}
            className="mb-8 flex flex-wrap gap-2"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`mono cursor-pointer rounded-full border px-4 py-2 text-xs transition-all duration-200 ${
                  activeCategory === cat
                    ? "border-accent bg-accent text-bg-primary"
                    : "border-border text-text-secondary hover:border-text-secondary hover:text-text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Icon grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
            >
              {filteredTechs.map((tech, i) => (
                <TechCard key={tech.name} tech={tech} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────── */}
      <section className="border-t border-border px-4 py-16 sm:px-6 sm:py-20 md:px-12 lg:px-20 2xl:px-28 2xl:py-28">
        <div className="mx-auto max-w-7xl" ref={processRevealRef}>
          {/* Header */}
          <motion.div
            initial="hidden"
            animate={isProcessInView ? "visible" : "hidden"}
            variants={fadeUp}
            className="mb-16"
          >
            <p className="mono mb-2 text-xs uppercase tracking-widest text-accent">
              03 · How I Work
            </p>
            <h2 className="font-display text-4xl font-bold italic leading-tight text-text-primary md:text-5xl">
              My Process
            </h2>
          </motion.div>

          {/* Steps */}
          <div className="relative">
            {/* Connecting line - desktop */}
            <div
              aria-hidden
              className="absolute left-0 right-0 top-8 hidden h-px bg-border lg:block"
            />

            <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-5">
              {PROCESS.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial="hidden"
                  animate={isProcessInView ? "visible" : "hidden"}
                  variants={fadeUp}
                  custom={i}
                  className="relative flex flex-col gap-4 border-l border-border py-6 pl-6 lg:border-l-0 lg:border-t-0 lg:pl-0 lg:pr-8 lg:pt-16"
                >
                  {/* Step number circle */}
                  <div
                    className="mono relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-bg-card text-xs text-text-secondary lg:absolute lg:-top-4 lg:left-0"
                    style={{
                      boxShadow: "0 0 0 4px var(--bg-primary)",
                    }}
                  >
                    {item.step}
                  </div>

                  <div>
                    <p className="mb-2 font-semibold text-text-primary">
                      <span className="text-accent">{item.accent}</span>
                      {item.title.replace(item.accent, "")}
                    </p>
                    <p className="text-sm leading-6 text-text-secondary">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────────────────────── */}
      <section className="border-t border-border px-4 py-16 sm:px-6 sm:py-20 md:px-12 lg:px-20 2xl:px-28 2xl:py-28">
        <div className="mx-auto max-w-7xl" ref={valuesRevealRef}>
          <motion.div
            initial="hidden"
            animate={isValuesInView ? "visible" : "hidden"}
            variants={fadeUp}
            className="mb-12"
          >
            <p className="mono mb-2 text-xs uppercase tracking-widest text-accent">
              04 · What Drives Me
            </p>
            <h2 className="font-display text-4xl font-bold italic leading-tight text-text-primary md:text-5xl">
              My Philosophy
            </h2>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.num}
                initial="hidden"
                animate={isValuesInView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={i}
                className="group relative overflow-hidden rounded-2xl border border-border bg-bg-card p-8 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_40px_color-mix(in_srgb,#D6FB61_6%,transparent)]"
              >
                {/* Roman numeral */}
                <p className="font-display text-6xl font-bold italic leading-none text-border transition-colors duration-300 group-hover:text-accent/20">
                  {v.num}
                </p>
                <h3 className="mt-4 font-display text-2xl font-bold italic text-text-primary">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-text-secondary">
                  {v.desc}
                </p>
                {/* Hover glow top-right */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle, color-mix(in srgb, #D6FB61 15%, transparent) 0%, transparent 70%)",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
