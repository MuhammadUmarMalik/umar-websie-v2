import type { Metadata } from "next";
import { siteConfig, faqs as siteFaqs, servicePages, caseStudies } from "@/lib/constants";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
};

/**
 * Titles are budgeted to <= 38 characters. The root layout's `title.template`
 * appends " | Muhammad Umar Malik" (+22 chars), so anything longer gets
 * truncated in the SERP. Descriptions target 145-155 characters.
 */
export const seoMap: Record<string, SeoInput> = {
  home: {
    title: "Small Business Web Design & Automation",
    description:
      "I fix slow websites, weak UX, and manual workflows for small businesses. Custom Next.js sites and automation that generate leads. Free discovery call.",
    path: "/"
  },
  about: {
    title: "About Umar Malik",
    description:
      "How I combine software engineering, UI/UX design, and automation to solve practical small-business problems — and how I decide what's worth fixing.",
    path: "/about"
  },
  services: {
    title: "Web, UI/UX & Automation Services",
    description:
      "Website development, UI/UX design, and business automation for small businesses. Fixed scope, fixed price, from $499. See what fits your problem.",
    path: "/services"
  },
  websiteDevelopment: {
    title: "Website Development That Wins Leads",
    description:
      "Fast, responsive Next.js and WordPress websites for small businesses losing customers to slow pages and unclear calls to action. From $499, 7-10 days.",
    path: "/website-development"
  },
  businessAutomation: {
    title: "Business Automation with n8n & AI",
    description:
      "Stop retyping data between tools. Automated lead capture, CRM updates, dashboards, and email workflows built with n8n, Make.com, and custom APIs.",
    path: "/business-automation"
  },
  uiUxDesign: {
    title: "UI/UX Design for Higher Conversion",
    description:
      "Clean UI/UX design for websites, landing pages, and SaaS dashboards. Clearer user flow, stronger trust signals, and more visitors who actually convert.",
    path: "/ui-ux-design"
  },
  portfolio: {
    title: "Client Work & Case Studies",
    description:
      "Real websites, dashboards, and automations built for small businesses — with the problem, the fix, and the measured result for each project.",
    path: "/portfolio"
  },
  process: {
    title: "My Process: Audit to Launch",
    description:
      "A practical five-step process — business audit, competitor research, Figma design sign-off, production build, and tested launch. No guesswork, no surprises.",
    path: "/process"
  },
  pricing: {
    title: "Pricing: Starter, Growth, Custom",
    description:
      "Transparent pricing for small-business websites and automation. Starter from $499, Growth from $999, or custom-scoped. You own everything at handover.",
    path: "/pricing"
  },
  blog: {
    title: "Website & Automation Notes",
    description:
      "Practical articles on website speed, conversion, UI/UX, and business automation — written for small business owners, not for other developers.",
    path: "/blog"
  },
  contact: {
    title: "Contact & Free Discovery Call",
    description:
      "Share your website or automation problem and get a clear plan for design, development, testing, and launch. Response within 24 hours.",
    path: "/contact"
  }
};

/** Build Next.js Metadata with canonical, OG, and Twitter tags */
export function createMetadata({ title, description, path = "/" }: SeoInput): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// ─── JSON-LD Schema Generators ────────────────────────────────────────────────

/** WebSite schema — enables Google Sitelinks Search */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    alternateName: ["Umar Malik", "umarmalik-dev"],
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: { "@id": `${siteConfig.url}/#organization` },
    author: { "@id": `${siteConfig.url}/#person` },
  };
}

/** Person schema — powers Google Knowledge Panel */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: "Software Engineer and Designer",
    description: siteConfig.description,
    email: `mailto:${siteConfig.email}`,
    image: `${siteConfig.url}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
    },
    sameAs: [
      siteConfig.socials.linkedin.href,
      siteConfig.socials.github.href,
      siteConfig.socials.instagram.href,
    ],
    knowsAbout: [
      "Web Development",
      "UI/UX Design",
      "Business Automation",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
      "n8n",
      "Make.com",
      "OpenAI API",
    ],
    worksFor: { "@id": `${siteConfig.url}/#organization` },
  };
}

/** ProfessionalService / Organization schema */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    founder: { "@id": `${siteConfig.url}/#person` },
    areaServed: "Worldwide",
    serviceType: ["Website Development", "UI/UX Design", "Business Automation"],
    // Must be a plain range or $-band. The previous "$499–$999+" used an
    // en-dash, which several structured-data parsers reject.
    priceRange: "$$",
    telephone: siteConfig.whatsapp.tel,
    address: {
      // TODO: add addressLocality + addressRegion. Country alone is too thin
      // to compete for regional queries, but I'm not guessing your city here.
      "@type": "PostalAddress",
      addressCountry: "PK",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: servicePages.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
          url: `${siteConfig.url}${service.href}`,
        },
      })),
    },
    sameAs: [
      siteConfig.socials.linkedin.href,
      siteConfig.socials.github.href,
      siteConfig.socials.instagram.href,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.email,
      contactType: "customer service",
      availableLanguage: "English",
    },
  };
}

/** FAQPage schema — wins FAQ rich results in SERPs */
export function faqSchema(faqs?: { question: string; answer: string }[]) {
  const items = faqs ?? siteFaqs;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

/** HowTo schema — wins How-To rich results for the Process page */
export function howToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How I Run Every Project — From Audit to Launch",
    description:
      "Five clear steps: business audit, competitor research, Figma design approval, production build, and tested launch with zero guesswork.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Audit",
        text: "Deep review of the existing website, analytics, speed scores, conversion paths, and competitor presence to understand exactly what is broken.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Research",
        text: "Competitor analysis, user behaviour study, and market positioning to define the clearest path forward for the specific business.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Design",
        text: "Full UI/UX design delivered in Figma for client review and sign-off before any code is written. No surprises at launch.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Build",
        text: "Production-grade development using Next.js, React, and Tailwind CSS — fast, accessible, SEO-ready, and maintainable.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Test and Launch",
        text: "Cross-device and cross-browser testing, Core Web Vitals optimisation, and a clean handover with all credentials and documentation.",
      },
    ],
  };
}

/** ItemList of services — helps AI assistants summarise offerings */
export function servicesListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Services — Muhammad Umar Malik",
    itemListElement: servicePages.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.summary,
        provider: { "@id": `${siteConfig.url}/#organization` },
        url: `${siteConfig.url}${service.href}`,
      },
    })),
  };
}

/** Individual Service page schema — ServicePage rich result */
export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}${path}`,
    name,
    description,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: "Worldwide",
    url: `${siteConfig.url}${path}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}${path}`,
    },
  };
}

/** BreadcrumbList — improves SERP display and navigation */
export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href}`,
    })),
  };
}

/** BlogPosting — powers article rich results for a single blog post */
export function articleSchema({
  title,
  description,
  slug,
  date,
  author,
  image,
}: {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${siteConfig.url}/blog/${slug}#article`,
    mainEntityOfPage: `${siteConfig.url}/blog/${slug}`,
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    image: image || `${siteConfig.url}/opengraph-image`,
    author: {
      "@type": "Person",
      name: author,
      url: siteConfig.url,
    },
    publisher: {
      "@id": `${siteConfig.url}/#person`,
    },
    inLanguage: "en",
  };
}

/** CollectionPage + ItemList for the Portfolio page */
export function portfolioSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}/portfolio`,
    name: "Portfolio — Muhammad Umar Malik",
    description:
      "Real projects across website development, UI/UX design, and business automation for small businesses worldwide.",
    url: `${siteConfig.url}/portfolio`,
    author: { "@id": `${siteConfig.url}/#person` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: caseStudies.map((cs, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: cs.title,
        description: `Problem: ${cs.problem} Solution: ${cs.solution} Result: ${cs.result}`,
      })),
    },
  };
}

/** Service + Offers schema for the Pricing page */
export function pricingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/pricing`,
    name: "Website Development and Business Automation Services",
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: "Worldwide",
    offers: [
      {
        "@type": "Offer",
        name: "Starter Website Package",
        description:
          "Up to 5 pages, responsive design, basic on-page SEO, contact form integration, 2 revision rounds, delivered in 7–10 days.",
        price: "499",
        priceCurrency: "USD",
        eligibleRegion: "Worldwide",
        url: `${siteConfig.url}/pricing`,
      },
      {
        "@type": "Offer",
        name: "Growth Website Package",
        description:
          "Up to 10 pages, custom UI/UX design, full SEO and Core Web Vitals optimisation, CMS integration, lead capture forms, email automation, Google Analytics 4 setup, 3 revision rounds, delivered in 14–21 days.",
        price: "999",
        priceCurrency: "USD",
        eligibleRegion: "Worldwide",
        url: `${siteConfig.url}/pricing`,
      },
    ],
  };
}
