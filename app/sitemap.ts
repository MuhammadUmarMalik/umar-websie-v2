import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const base = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.umarmalik-dev.com"
).replace(/\/+$/, "");

/**
 * Real content-change dates, not build timestamps. Google discounts `lastmod`
 * it considers unreliable, and `new Date()` marks every page as changed on
 * every deploy. Update the entry when the page content actually changes.
 */
const PAGE_UPDATED: Record<string, string> = {
  "/": "2026-08-28",
  "/services": "2026-08-28",
  "/website-development": "2026-08-28",
  "/business-automation": "2026-08-28",
  "/ui-ux-design": "2026-08-28",
  "/pricing": "2026-08-28",
  "/portfolio": "2026-08-28",
  "/blog": "2026-08-28",
  "/about": "2026-07-08",
  "/process": "2026-07-08",
  "/contact": "2026-07-08",
};

const FALLBACK_UPDATED = "2026-08-28";

const ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/website-development", changeFrequency: "monthly", priority: 0.9 },
  { path: "/business-automation", changeFrequency: "monthly", priority: 0.9 },
  { path: "/ui-ux-design", changeFrequency: "monthly", priority: 0.9 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.9 },
  { path: "/portfolio", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/process", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return [
    ...ROUTES.map(({ path, changeFrequency, priority }) => ({
      url: path === "/" ? base : `${base}${path}`,
      lastModified: new Date(PAGE_UPDATED[path] ?? FALLBACK_UPDATED),
      changeFrequency,
      priority,
    })),
    // Posts sit below the service pages on purpose — this is a lead-gen site,
    // and blog posts were previously outranking the pages that convert.
    ...posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
