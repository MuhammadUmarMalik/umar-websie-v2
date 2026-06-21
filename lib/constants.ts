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
  calendlyUrl: "https://calendly.com/umarmalik-cs711/30min",
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
    name: "Starter",
    price: "$499",
    priceNote: "Starting at",
    badge: "Best first step",
    description: "For small businesses that need a clean, fast website live quickly without the bloat.",
    features: [
      "Up to 5 pages",
      "Responsive design (mobile + desktop)",
      "Basic on-page SEO setup",
      "Contact form integration",
      "2 rounds of revisions",
      "7–10 day delivery"
    ]
  },
  {
    name: "Growth",
    price: "$999",
    priceNote: "Starting at",
    badge: "Most Popular",
    featured: true,
    description: "For businesses ready to generate leads, rank on Google, and manage their own content.",
    features: [
      "Up to 10 pages",
      "Custom UI/UX design",
      "Full SEO setup + Core Web Vitals optimization",
      "CMS integration (blog, portfolio, or products)",
      "Lead capture forms + email automation",
      "Google Analytics 4 setup",
      "3 rounds of revisions",
      "14–21 day delivery"
    ]
  },
  {
    name: "Custom",
    price: "Let's talk",
    priceNote: "",
    badge: "For complex projects",
    description: "For web apps, internal tools, automation systems, or anything that doesn't fit a template.",
    features: [
      "Full discovery & strategy session",
      "Custom design system",
      "Full-stack web development",
      "AI & automation integrations",
      "Performance + security hardening",
      "Ongoing support option",
      "Timeline & price scoped to your project"
    ]
  }
];

export const addOns = [
  { name: "Monthly Maintenance & Updates", price: "From $100/mo", description: "Bug fixes, plugin updates, and minor content changes each month." },
  { name: "SEO Audit & Optimization", price: "From $200", description: "Technical SEO review, keyword gaps, and on-page fixes." },
  { name: "AI Chatbot Integration", price: "From $300", description: "Custom chatbot trained on your business info to handle FAQs automatically." },
  { name: "Workflow Automation (n8n / Make)", price: "From $400", description: "Connect your tools — CRM, forms, email, Slack — and eliminate manual steps." },
  { name: "Speed & Core Web Vitals Fix", price: "From $150", description: "Diagnose and fix what's slowing your site down and hurting your Google ranking." },
  { name: "Copywriting & Content", price: "From $100/page", description: "Conversion-focused copy written for your audience — not AI filler." }
];

export const faqs = [
  {
    question: "How do payments work?",
    answer: "I take 50% upfront before work begins and 50% before final delivery. For larger projects, we can structure it across 3 milestones — discovery, design approval, and launch."
  },
  {
    question: "How long does a project take?",
    answer: "Starter websites: 7–10 days. Growth packages: 14–21 days. Custom projects vary — we define a clear timeline in writing before any work starts."
  },
  {
    question: "Can I see the design before you start building?",
    answer: "Always. I design first, walk you through it, get your sign-off, then build. You're never looking at code for the first time at launch."
  },
  {
    question: "Will I own the website after it's built?",
    answer: "100%. You own everything — source code, domain, hosting account, and all credentials. No platform lock-in, no monthly fees owed to me unless you choose a support plan."
  },
  {
    question: "What tech do you build with?",
    answer: "Primarily Next.js, React, Tailwind CSS, and TypeScript for the frontend. For backends and automation I use Node.js, PostgreSQL, Supabase, n8n, and Make (Integromat)."
  },
  {
    question: "Can you work with my existing branding?",
    answer: "Yes. If you have logos, brand colors, or a style guide, I'll design within them. If you don't, I'll establish a clean, professional visual identity as part of the project."
  },
  {
    question: "What if I need changes after launch?",
    answer: "Minor fixes within 7 days of launch are included at no charge. For ongoing updates I offer a monthly maintenance plan — so you always have someone to call."
  },
  {
    question: "Do you only build new sites or fix existing ones too?",
    answer: "Both. I regularly audit and fix existing websites — performance issues, broken layouts, low conversion rates, outdated design. Sometimes a targeted fix is all you need."
  },
  {
    question: "Do you work with international clients?",
    answer: "Yes. I work with clients worldwide. We'll communicate over email, WhatsApp, or video call — whatever fits your timezone and workflow."
  }
];

export const stats = [
  { value: "30+", label: "Projects Delivered" },
  { value: "20+", label: "Businesses Helped" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "3x", label: "Avg. Performance Improvement" }
];

export const metrics = [
  { label: "Website score", value: "92" },
  { label: "Lead path", value: "Clear" },
  { label: "Manual hours saved", value: "8+/wk", icon: BarChart3 }
];

export const testimonials = [
  {
    quote: "Umar didn't just build a website — he actually understood our business and fixed what was hurting our sales. The results were immediate.",
    name: "Client Name",
    role: "Owner",
    company: "E-commerce Business"
  },
  {
    quote: "The speed improvement alone paid for the project. Our bounce rate dropped and leads went up. Highly recommend.",
    name: "Client Name",
    role: "Founder",
    company: "Service Business"
  },
  {
    quote: "He automated our order tracking process and saved us hours every single day. It felt like hiring a full team.",
    name: "Client Name",
    role: "Manager",
    company: "Restaurant"
  }
];
