import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CTABanner from "@/sections/CTABanner";

export const metadata: Metadata = {
  title: "About Umar — Full-Stack Engineer & Designer",
  description:
    "Learn about Muhammad Umar Malik, a full-stack engineer who helps businesses solve real problems with websites and automation.",
};

const skills = [
  {
    category: "Frontend",
    items: "React · Next.js · HTML/CSS · Tailwind CSS · Framer Motion · JavaScript · TypeScript"
  },
  {
    category: "Backend",
    items: "Node.js · Express.js · REST APIs · PostgreSQL · MongoDB · Prisma"
  },
  {
    category: "Design",
    items: "Figma · UI/UX Design · Prototyping · Wireframing · Design Systems"
  },
  {
    category: "CMS & Platforms",
    items: "WordPress · Shopify · Webflow · WooCommerce"
  },
  {
    category: "Automation & AI",
    items: "n8n · Make.com · OpenAI API · Custom AI Integrations · Workflow Automation"
  },
  {
    category: "Tools",
    items: "Git · GitHub · Vercel · Docker · Postman · VS Code"
  }
];

const process = [
  { step: "01", title: "Understand first", desc: "I ask the right questions before doing anything" },
  { step: "02", title: "Research deeply", desc: "Competitors, market, user behavior" },
  { step: "03", title: "Design for approval", desc: "You see it before I build it" },
  { step: "04", title: "Build clean", desc: "Production-level, maintainable code" },
  { step: "05", title: "Launch right", desc: "Tested, optimized, and handed over properly" }
];

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <section className="px-6 pb-16 pt-36 md:px-12 lg:px-20 lg:pt-48">
        <div className="mx-auto max-w-320">
          <p className="mono mb-4 text-sm uppercase text-accent">About Me</p>
          <h1 className="max-w-3xl font-display text-4xl font-bold leading-none md:text-6xl lg:text-7xl">
            I Build Things That Fix Real Problems.
          </h1>
          <p className="mt-6 text-xl text-text-secondary">Not just websites. Solutions.</p>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-320 grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <p className="mono text-sm uppercase text-accent">Who I Am</p>
          </div>
          <div className="space-y-6 text-lg leading-8 text-text-secondary">
            <p className="text-text-primary">
              I&apos;m Muhammad Umar Malik — a full-stack software engineer and designer based in
              Pakistan, working with small businesses worldwide to solve the problems that cost them
              customers and revenue.
            </p>
            <p>
              I started this work because I kept seeing the same thing: businesses with great
              products but broken digital presence. Slow websites. Confusing layouts. No leads.
              Manual processes wasting hours every day.
            </p>
            <p>
              My job is simple — I find what&apos;s broken, understand your business deeply, and
              build solutions that actually move the needle. Clean code, smart design, and real
              results. That&apos;s the standard I hold myself to on every project.
            </p>
            <p>
              Whether it&apos;s rebuilding your website from scratch, fixing a checkout flow, or
              automating a repetitive workflow with AI — I treat every project like it&apos;s my
              own business on the line.
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="border-t border-border px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-320">
          <p className="mono mb-12 text-sm uppercase text-accent">What I Work With</p>
          <div className="grid gap-0">
            {skills.map((skill) => (
              <div
                key={skill.category}
                className="grid grid-cols-1 gap-3 border-t border-border py-6 md:grid-cols-[200px_1fr] md:gap-8"
              >
                <p className="mono text-sm uppercase text-text-secondary">{skill.category}</p>
                <p className="text-text-primary">{skill.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-border px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-320">
          <p className="mono mb-12 text-sm uppercase text-accent">How I Approach Every Project</p>
          <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {process.map((item) => (
              <div
                key={item.step}
                className="border-t border-border py-6 md:border-l md:border-t-0 md:px-6 md:first:border-l-0"
              >
                <p className="mono mb-3 text-xs uppercase text-text-secondary">{item.step}</p>
                <p className="font-semibold text-text-primary">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-320 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Want to Work Together?</h2>
            <p className="mt-3 text-text-secondary">
              If you have a project, a problem, or just a question — I&apos;m easy to reach.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-bg-primary transition duration-200 hover:bg-accent-hover"
          >
            Let&apos;s Talk
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
