import type { MetadataRoute } from "next";

const base = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.umarmalik-dev.com"
).replace(/\/+$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // No trailing slashes — "/studio/" does not match the bare "/studio"
        // URL, which returns 200 and would otherwise stay crawlable.
        disallow: ["/studio", "/api"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
