import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
};

export const seoMap: Record<string, SeoInput> = {
  home: {
    title: "Software Engineer and Designer for Small Business Websites and Automation",
    description:
      "Muhammad Umar Malik helps small-scale businesses fix slow websites, poor UX, lead generation problems, checkout issues, and manual workflows with websites and automation.",
    path: "/"
  },
  about: {
    title: "About Muhammad Umar Malik",
    description:
      "Learn how Muhammad Umar Malik combines software engineering, UI/UX design, and automation to solve practical small-business problems.",
    path: "/about"
  },
  services: {
    title: "Websites, UI/UX, and Automation for Small Businesses",
    description:
      "Website development, business automation, and UI/UX design services for small-scale businesses that need clearer systems.",
    path: "/services"
  },
  websiteDevelopment: {
    title: "Website Development for Small Businesses That Need Leads",
    description:
      "Fast, responsive, conversion-focused website development for businesses dealing with slow pages, poor UI, checkout issues, and low leads.",
    path: "/website-development"
  },
  businessAutomation: {
    title: "Business Automation Services for Manual Repetitive Work",
    description:
      "Automate manual business tasks with AI workflows, forms, dashboards, CRM flows, email alerts, and custom integrations.",
    path: "/business-automation"
  },
  uiUxDesign: {
    title: "UI UX Design for Better Website Conversion",
    description:
      "Clean UI UX design for websites, landing pages, SaaS dashboards, and service businesses that need better user flow and trust.",
    path: "/ui-ux-design"
  },
  portfolio: {
    title: "Website and Automation Projects by Muhammad Umar Malik",
    description:
      "View selected website development, UI UX design, business automation, and full-stack software projects.",
    path: "/portfolio"
  },
  process: {
    title: "Website Audit, Design, Build, Test, and Launch Process",
    description:
      "A practical process for finding business problems, researching competitors, designing better flows, building, testing, and launching.",
    path: "/process"
  },
  pricing: {
    title: "Website and Automation Project Pricing",
    description:
      "Starter, growth, automation, and custom project options for small-business website and workflow improvements.",
    path: "/pricing"
  },
  blog: {
    title: "Small Business Website and Automation Insights",
    description:
      "Practical articles about website conversion, speed, UI/UX, and business automation for small businesses.",
    path: "/blog"
  },
  contact: {
    title: "Book a Call with Muhammad Umar Malik",
    description:
      "Share your website or automation problem and get a clear plan for design, development, testing, and launch.",
    path: "/contact"
  }
};

export function createMetadata({ title, description, path = "/" }: SeoInput): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name
    },
    twitter: {
      card: "summary",
      title,
      description
    }
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: "Software Engineer and Designer"
  };
}
