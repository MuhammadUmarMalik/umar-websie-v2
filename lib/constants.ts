import {
  BarChart3,
  Bot,
  CheckCircle2,
  Gauge,
  LayoutDashboard,
  MousePointerClick,
  Palette,
  Smartphone,
  Workflow
} from "lucide-react";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://umarmalik-dev.com").replace(/\/+$/, "");

export const siteConfig = {
  name: "Muhammad Umar Malik",
  url: siteUrl,
  description:
    "Software engineer and designer helping small businesses fix websites, improve UX, generate leads, and automate repetitive work.",
  email: "umarmalik.cs711@gmail.com",
  socials: {
    instagram: {
      label: "Instagram: @umarmalik_dev",
      href: "https://www.instagram.com/umarmalik_dev/"
    },
    linkedin: {
      label: "LinkedIn: @umarmalik-dev",
      href: "https://www.linkedin.com/in/umarmalik-dev"
    },
    github: {
      label: "Github: @MuhammadUmarMalik",
      href: "https://github.com/MuhammadUmarMalik"
    }
  }
};

export const marketingPages = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Work", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export const navItems = marketingPages;

export const servicePages = [
  {
    title: "Website Development",
    href: "/website-development",
    icon: Gauge,
    summary:
      "Fast, responsive, SEO-ready websites built to earn trust and generate enquiries."
  },
  {
    title: "Business Automation",
    href: "/business-automation",
    icon: Workflow,
    summary:
      "AI workflows, alerts, forms, CRM updates, and dashboards that reduce repetitive work."
  },
  {
    title: "UI/UX Design",
    href: "/ui-ux-design",
    icon: Palette,
    summary:
      "Clean website and app interfaces designed around clarity, trust, and user action."
  }
];

export const painPoints = [
  { title: "Slow Website", icon: Gauge, text: "Pages that make visitors leave before they contact you." },
  { title: "Poor Mobile Layout", icon: Smartphone, text: "Responsive issues that break trust on phones." },
  { title: "Low Leads", icon: MousePointerClick, text: "Weak calls-to-action and unclear user paths." },
  { title: "Checkout Problems", icon: CheckCircle2, text: "Form or checkout issues that block sales." },
  { title: "UI/UX Issues", icon: LayoutDashboard, text: "Screens that look busy, confusing, or inconsistent." },
  { title: "Manual Work", icon: Bot, text: "Repetitive tasks that waste hours every week." }
];

export const processSteps = [
  "Audit",
  "Research",
  "Design",
  "Build",
  "Test",
  "Launch",
  "Support"
];

export const automationExamples = [
  "Lead form to CRM",
  "WhatsApp follow-up",
  "Invoice reminders",
  "Weekly reports",
  "AI reply drafts"
];

export const caseStudies = [
  {
    title: "Rice Mill ERP",
    problem: "Manual inventory and reporting slowed daily operations.",
    solution: "Centralized dashboard, workflows, and reporting modules.",
    result: "Cleaner operations and faster business visibility.",
    tech: "Next.js, SQL, automation"
  },
  {
    title: "Business Website Redesign",
    problem: "Slow pages, weak mobile layout, and unclear conversion path.",
    solution: "Responsive rebuild with sharper service messaging and CTAs.",
    result: "Improved trust, speed, and lead capture readiness.",
    tech: "Next.js, Tailwind, SEO"
  },
  {
    title: "Automation Workflow",
    problem: "Leads and follow-ups were handled manually across tools.",
    solution: "Connected forms, notifications, status tracking, and reports.",
    result: "Less admin work and faster customer response.",
    tech: "Forms, AI, integrations"
  }
];

export const pricingPackages = [
  {
    name: "Website Starter",
    price: "Project-based",
    badge: "Best first step",
    features: ["Audit", "Core pages", "Mobile responsive UI", "Contact flow", "SEO basics"]
  },
  {
    name: "Growth Website",
    price: "Custom quote",
    badge: "Best for growth",
    featured: true,
    features: ["Strategy", "Conversion copy", "Performance pass", "Case-study sections", "Launch support"]
  },
  {
    name: "Automation Setup",
    price: "Custom quote",
    badge: "Best for busy teams",
    features: ["Workflow map", "Forms and alerts", "CRM updates", "Reports", "Testing"]
  }
];

export const faqs = [
  {
    question: "What is the best starting point?",
    answer: "A website audit is usually the fastest way to find speed, UX, conversion, and automation gaps."
  },
  {
    question: "Do you only build websites?",
    answer: "No. The offer combines website development, UI/UX, and business automation where it helps the business."
  },
  {
    question: "Can you work with an existing website?",
    answer: "Yes. Existing websites can be audited, redesigned, optimized, or connected with automation workflows."
  }
];

export const metrics = [
  { label: "Website score", value: "92" },
  { label: "Lead path", value: "Clear" },
  { label: "Manual hours saved", value: "8+/wk", icon: BarChart3 }
];
