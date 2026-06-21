import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent clickjacking — no one should iframe this site
  { key: "X-Frame-Options", value: "DENY" },
  // Block MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Force HTTPS for 1 year once visited (includeSubDomains so subdomains are also covered)
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // Leak origin only to same-origin; send only origin (no path) to cross-origin HTTPS
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restrict browser feature access
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  // Cross-origin resource policy — don't let other origins embed our assets
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  // Isolate the browsing context from cross-origin openers
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  // Content Security Policy
  // - Scripts: self + Vercel, PostHog, LinkedIn, Adobe Fonts, and Google Tag
  // - Styles: self + Google Fonts + unsafe-inline (required by Framer Motion / Tailwind)
  // - Fonts: self + Google Fonts CDN
  // - Connect: self + analytics endpoints
  // - Images: self + data URIs + Unsplash
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.com https://*.vercel-insights.com https://us.i.posthog.com https://snap.licdn.com https://use.typekit.net https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://use.typekit.net",
      "font-src 'self' https://fonts.gstatic.com https://use.typekit.net data:",
      "img-src 'self' data: blob: https://images.unsplash.com https://*.posthog.com",
      "media-src 'self' https://d8j0ntlcm91z4.cloudfront.net",
      "connect-src 'self' https://us.i.posthog.com https://*.vercel-insights.com https://vitals.vercel-insights.com https://snap.licdn.com https://script.google.com https://*.googleapis.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Don't advertise that this is Next.js
  poweredByHeader: false,

  // Compress responses with gzip
  compress: true,

  images: {
    // Serve WebP and AVIF for modern browsers
    formats: ["image/avif", "image/webp"],
    // Cache optimized images for 30 days
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // Aggressive cache for versioned static assets (JS/CSS chunks have content hashes)
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Images in /public get a 7-day cache
        source: "/(.*\\.(?:png|jpg|jpeg|webp|avif|svg|gif|ico))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
