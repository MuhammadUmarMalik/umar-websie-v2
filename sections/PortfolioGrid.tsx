"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const categories = ["All", "Web Development", "UI/UX Design", "Automation"] as const;
type Category = (typeof categories)[number];

const projects = [
  {
    title: "TripIt",
    category: "Web Development" as Category,
    year: "2024",
    tags: ["React", "Next.js", "UX Design"],
    result: "Travel itinerary platform UI redesign with improved booking flow and mobile experience.",
    href: "https://www.tripit.com/",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=480&h=280&fit=crop&auto=format&q=80",
  },
  {
    title: "babi.sh",
    category: "UI/UX Design" as Category,
    year: "2024",
    tags: ["Shopify", "UI/UX", "E-commerce"],
    result: "Premium baby fashion e-commerce with elevated product presentation and checkout optimization.",
    href: "https://www.babi.sh/",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=480&h=280&fit=crop&auto=format&q=80",
  },
  {
    title: "New Relic",
    category: "Web Development" as Category,
    year: "2023",
    tags: ["React", "Performance", "SEO"],
    result: "Observability platform marketing site with improved Core Web Vitals and developer-focused UX.",
    href: "https://newrelic.com/",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&h=280&fit=crop&auto=format&q=80",
  },
  {
    title: "VonaviPro",
    category: "Web Development" as Category,
    year: "2024",
    tags: ["Next.js", "Tailwind", "Performance"],
    result: "Professional services platform with seamless client booking and project management flow.",
    href: "https://vonavipro.com/",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=480&h=280&fit=crop&auto=format&q=80",
  },
  {
    title: "Javis Gravy",
    category: "Web Development" as Category,
    year: "2024",
    tags: ["Next.js", "Web Dev", "SEO"],
    result: "Restaurant website with online ordering — 3x faster load time and +60% increase in orders.",
    href: "https://www.javisgravy.com/",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=480&h=280&fit=crop&auto=format&q=80",
  },
  {
    title: "Extendicare",
    category: "Web Development" as Category,
    year: "2023",
    tags: ["WordPress", "Accessibility", "SEO"],
    result: "Accessibility-first corporate website redesign for one of Canada's largest senior care providers.",
    href: "https://www.extendicare.com/",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=480&h=280&fit=crop&auto=format&q=80",
  },
  {
    title: "EduSuite",
    category: "Automation" as Category,
    year: "2024",
    tags: ["Node.js", "Next.js", "LMS"],
    result: "Full-stack LMS platform for Pakistani schools with automated grading and reporting.",
    href: "https://www.edusuite.pk/",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=480&h=280&fit=crop&auto=format&q=80",
  },
  {
    title: "Digilari",
    category: "UI/UX Design" as Category,
    year: "2024",
    tags: ["UI/UX", "Framer", "Branding"],
    result: "Digital marketing agency website with bold animations and a distinctive visual identity.",
    href: "https://digilari.com.au/",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=480&h=280&fit=crop&auto=format&q=80",
  },
  {
    title: "EfroTech",
    category: "Web Development" as Category,
    year: "2023",
    tags: ["React", "Next.js", "CMS"],
    result: "Tech company platform with custom CMS, service pages, and integrated lead generation system.",
    href: "https://www.efrotech.com/",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=480&h=280&fit=crop&auto=format&q=80",
  },
  {
    title: "Digital Cover",
    category: "UI/UX Design" as Category,
    year: "2024",
    tags: ["UI/UX", "Webflow", "Branding"],
    result: "Digital marketing agency portfolio with conversion-optimized layout and dynamic service showcase.",
    href: "https://digital-cover.com/",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=480&h=280&fit=crop&auto=format&q=80",
  },
];

export function PortfolioGrid() {
  const [active, setActive] = useState<Category>("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`mono rounded-full border px-4 py-2 text-xs uppercase transition-colors duration-200 ${
              active === cat
                ? "border-accent bg-accent text-bg-primary"
                : "border-border text-text-secondary hover:border-text-secondary hover:text-text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <article
            key={project.title}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-card transition-all duration-300 hover:border-accent/50"
          >
            {/* Thumbnail */}
            <div className="relative h-52 overflow-hidden bg-bg-secondary">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent to-bg-card/60" />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="mono text-xs uppercase text-accent">{project.category}</span>
                <span className="mono text-xs text-text-secondary">{project.year}</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold text-text-primary">{project.title}</h2>
              <p className="mt-2 text-sm leading-6 text-text-secondary">{project.result}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="mono rounded-full border border-border px-3 py-1 text-xs uppercase text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mono mt-6 inline-flex items-center gap-1.5 text-xs uppercase text-text-primary transition-colors hover:text-accent"
              >
                Visit Project
                <ArrowUpRight className="size-3" aria-hidden />
              </a>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
