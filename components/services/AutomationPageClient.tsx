"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Bot,
  Workflow,
  Mail,
  FileText,
  Bell,
  BarChart3,
  MessageSquare,
  RefreshCw,
  Clock,
  Layers,
} from "lucide-react";
import CTABanner from "@/sections/CTABanner";

const PAIN_POINTS = [
  {
    icon: Clock,
    title: "Hours lost to repetition",
    description:
      "Copy-pasting leads from a form into a spreadsheet. Sending the same status update email every Friday. These tasks take 30 minutes each — but they happen every single day.",
  },
  {
    icon: RefreshCw,
    title: "Data siloed across tools",
    description:
      "Your leads are in a form, your CRM is separate, your team works in Slack, and nothing talks to anything else. Data gets missed, tasks get dropped, customers wait.",
  },
  {
    icon: MessageSquare,
    title: "Slow customer response",
    description:
      "When a new lead comes in at 10 PM, nobody responds until the next morning. By then, they've already contacted your competitor who had an automated follow-up.",
  },
  {
    icon: Layers,
    title: "No visibility on operations",
    description:
      "You don't have a real-time view of what's happening — orders, enquiries, pipeline, status. Everything is scattered across inboxes, spreadsheets, and people's heads.",
  },
];

const AUTOMATIONS = [
  {
    icon: Workflow,
    label: "Lead form to CRM",
    detail:
      "Every form submission automatically creates a contact in your CRM, assigns it to the right team member, and sends a confirmation to the customer.",
  },
  {
    icon: Bell,
    label: "WhatsApp & email alerts",
    detail:
      "Instant notifications to your phone or inbox whenever a new lead, order, or booking comes in — no more checking dashboards manually.",
  },
  {
    icon: FileText,
    label: "Invoice & payment reminders",
    detail:
      "Automatic reminders sent to clients on due dates — reducing late payments without the awkward follow-up calls.",
  },
  {
    icon: BarChart3,
    label: "Weekly business reports",
    detail:
      "Automated summaries of leads, revenue, tasks completed, and KPIs — delivered to your inbox every Monday morning.",
  },
  {
    icon: Bot,
    label: "AI reply drafts",
    detail:
      "Using the OpenAI API, I build workflows that draft email or WhatsApp responses based on the customer's message — your team reviews and sends.",
  },
  {
    icon: RefreshCw,
    label: "CRM status updates",
    detail:
      "Deal stages, pipeline values, and task statuses updated automatically based on actions in other tools — no manual entry.",
  },
  {
    icon: Mail,
    label: "Onboarding sequences",
    detail:
      "New client or customer? A triggered sequence of emails, Slack messages, and task assignments kicks off automatically — keeping nothing from falling through the cracks.",
  },
  {
    icon: MessageSquare,
    label: "Multi-step approval flows",
    detail:
      "Submit → review → approve → notify — all connected. Quotes, purchase requests, content approvals: structured workflows with clear audit trails.",
  },
];

const TOOLS = [
  "n8n",
  "Make (Integromat)",
  "OpenAI API",
  "Airtable",
  "Google Sheets",
  "Notion",
  "HubSpot",
  "Slack",
  "WhatsApp Business API",
  "Twilio",
  "SendGrid",
  "Stripe Webhooks",
  "Zapier (migration)",
  "PostgreSQL",
  "REST APIs",
];

const USE_CASES = [
  {
    business: "E-commerce store",
    problem: "Manual order tracking and customer updates",
    automation:
      "New order → WhatsApp confirmation to customer + Slack alert to team + inventory spreadsheet updated automatically.",
  },
  {
    business: "Service business (agency, consultant)",
    problem: "Leads sit in email for hours with no response",
    automation:
      "Form submission → AI drafts a personalized intro reply → team reviews and sends in one click → lead logged in CRM.",
  },
  {
    business: "Restaurant or food service",
    problem: "Reservation confirmations done manually",
    automation:
      "Booking form → WhatsApp confirmation sent immediately + reminder 2 hours before → no-show marked if they don't reply.",
  },
  {
    business: "Property or rental business",
    problem: "Maintenance requests tracked in a shared inbox",
    automation:
      "Tenant submits request → assigned to engineer → status updates sent automatically → closed when marked done.",
  },
];

const FAQS = [
  {
    q: "What tools do you use for automation?",
    a: "Primarily n8n (self-hosted, no monthly per-task fees) and Make (Integromat) for cloud-based workflows. For AI features I use the OpenAI API. I connect with HubSpot, Notion, Airtable, Google Sheets, Slack, WhatsApp Business API, and most tools that expose a REST API or webhook.",
  },
  {
    q: "Do I need technical knowledge to use the automations after you build them?",
    a: "No. I build the workflows, document every trigger and action in plain English, and walk you through how it runs. If something breaks, I build in error notifications so you're alerted immediately rather than discovering it days later.",
  },
  {
    q: "How long does an automation project take?",
    a: "Simple automations (a single workflow with 3–5 steps) take 3–7 days. Complex multi-workflow systems with AI, multiple integrations, and a reporting layer take 2–4 weeks. Timeline is agreed before work starts.",
  },
  {
    q: "What if my business tool isn't listed?",
    a: "If it has a REST API, webhook, or Zapier integration, it can almost certainly be connected. I'll assess your stack in the discovery call and confirm feasibility before scoping the project.",
  },
  {
    q: "Will the automations break if something changes in my tools?",
    a: "I build with error handling and alerting built in — if an API call fails or a webhook stops firing, you get notified. For ongoing reliability I offer a maintenance plan so I can fix issues quickly when they arise.",
  },
  {
    q: "Can you migrate my existing Zapier automations to n8n?",
    a: "Yes. n8n is self-hosted and has no per-task pricing, so migrating from Zapier often cuts monthly costs significantly. I map your existing flows and rebuild them — usually with improvements.",
  },
];

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-border py-6"
    >
      <h3 className="text-base font-semibold text-text-primary">{q}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{a}</p>
    </motion.div>
  );
}

export default function AutomationPageClient() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="px-6 pt-32 pb-20 md:px-10 lg:px-14 lg:pt-40">
        <div className="mx-auto max-w-[1280px]">
          <FadeUp>
            <nav aria-label="Breadcrumb">
              <ol className="mono flex items-center gap-2 text-xs text-text-secondary">
                <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link href="/services" className="hover:text-accent transition-colors">Services</Link></li>
                <li aria-hidden>/</li>
                <li className="text-text-primary">Business Automation</li>
              </ol>
            </nav>
          </FadeUp>
          <FadeUp delay={0.05}>
            <span className="mono mt-6 block text-xs uppercase tracking-widest text-accent">
              Service — Business Automation
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="mt-4 font-display text-5xl font-bold italic leading-[1.05] tracking-tight text-text-primary md:text-6xl lg:text-7xl">
              Stop Repeating Work.
              <br />
              <span className="not-italic text-accent">Automate It.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              I connect your tools — forms, CRM, email, WhatsApp, spreadsheets — and build
              workflows that run automatically. Using n8n, Make, and the OpenAI API, I
              eliminate the manual tasks eating your team&apos;s time every week.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg-primary transition-all hover:bg-accent-hover"
              >
                Discuss Your Workflow
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/pricing"
                className="flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-text-primary transition-all hover:border-accent hover:text-accent"
              >
                See Pricing
              </Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.4}>
            <div className="mt-8 flex flex-wrap gap-2">
              {["n8n workflows", "Make integrations", "AI reply drafts", "CRM automation", "WhatsApp alerts", "Weekly reports"].map((b) => (
                <span
                  key={b}
                  className="mono rounded-full border border-border px-3 py-1 text-xs text-text-secondary"
                >
                  {b}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Pain points ── */}
      <section className="px-6 py-20 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1280px]">
          <FadeUp>
            <span className="mono text-xs uppercase tracking-widest text-text-secondary">
              The problem
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold italic text-text-primary md:text-5xl">
              Where Your Time Is Going
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
              Manual work doesn&apos;t just waste time — it creates errors, slow responses, and
              missed follow-ups. Here&apos;s where most businesses bleed the most.
            </p>
          </FadeUp>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {PAIN_POINTS.map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.08} className="h-full">
                <div className="h-full flex gap-5 rounded-2xl border border-border bg-bg-card p-6">
                  <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-surface">
                    <p.icon className="size-5 text-accent" aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{p.description}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Automations I build ── */}
      <section className="px-6 py-20 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1280px]">
          <FadeUp>
            <span className="mono text-xs uppercase tracking-widest text-text-secondary">
              What I automate
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold italic text-text-primary md:text-5xl">
              Workflows I Build
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
              Every automation is custom-built for your specific tools and processes.
              These are the most common workflows I implement.
            </p>
          </FadeUp>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AUTOMATIONS.map((a, i) => (
              <FadeUp key={a.label} delay={i * 0.06} className="h-full">
                <div className="h-full flex flex-col gap-3 rounded-xl border border-border bg-bg-card p-5">
                  <a.icon className="size-5 text-accent" aria-hidden />
                  <p className="text-sm font-semibold text-text-primary">{a.label}</p>
                  <p className="text-xs leading-relaxed text-text-secondary">{a.detail}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Real use cases ── */}
      <section className="px-6 py-20 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1280px]">
          <FadeUp>
            <span className="mono text-xs uppercase tracking-widest text-text-secondary">
              Real examples
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold italic text-text-primary md:text-5xl">
              What This Looks Like in Practice
            </h2>
          </FadeUp>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {USE_CASES.map((uc, i) => (
              <FadeUp key={uc.business} delay={i * 0.08} className="h-full">
                <div className="h-full rounded-2xl border border-border bg-bg-card p-6 md:p-8">
                  <span className="mono text-xs uppercase tracking-widest text-accent">
                    {uc.business}
                  </span>
                  <h3 className="mt-3 font-semibold text-text-primary">{uc.problem}</h3>
                  <div className="mt-4 flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                    <p className="text-sm leading-relaxed text-text-secondary">{uc.automation}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools ── */}
      <section className="px-6 py-16 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1280px]">
          <FadeUp>
            <span className="mono text-xs uppercase tracking-widest text-text-secondary">
              Tools & integrations
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold italic text-text-primary md:text-4xl">
              What I Connect
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="mt-6 flex flex-wrap gap-2">
              {TOOLS.map((t) => (
                <span
                  key={t}
                  className="mono rounded-full border border-border bg-bg-card px-4 py-2 text-xs text-text-secondary"
                >
                  {t}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Results strip ── */}
      <section className="px-6 py-16 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1280px]">
          <div className="rounded-2xl border border-border bg-bg-card p-8 md:p-12">
            <FadeUp>
              <span className="mono text-xs uppercase tracking-widest text-text-secondary">
                The outcome
              </span>
              <h2 className="mt-3 font-display text-4xl font-bold italic text-text-primary md:text-5xl">
                What Changes After Automation
              </h2>
            </FadeUp>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { value: "8+", label: "Hours saved per week (typical)" },
                { value: "< 1m", label: "Response time on new leads" },
                { value: "0", label: "Manual data entry steps" },
                { value: "100%", label: "Audit trail on every action" },
              ].map((s, i) => (
                <FadeUp key={s.label} delay={i * 0.08} className="h-full">
                  <div className="h-full rounded-xl border border-border bg-surface p-5">
                    <p className="font-display text-4xl font-bold italic text-accent">{s.value}</p>
                    <p className="mono mt-1 text-xs text-text-secondary">{s.label}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 py-20 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1280px] lg:grid lg:grid-cols-[1fr_2fr] lg:gap-16">
          <FadeUp>
            <span className="mono text-xs uppercase tracking-widest text-text-secondary">FAQ</span>
            <h2 className="mt-3 font-display text-4xl font-bold italic text-text-primary md:text-5xl">
              Automation Questions
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              Everything you need to know before starting an automation project.
            </p>
          </FadeUp>
          <div>
            {FAQS.map((f, i) => (
              <FAQItem key={f.q} q={f.q} a={f.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
