import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "../components/Footer";
import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from "../components/GoogleTagManager";
import { GtmClickTracker } from "../components/GtmClickTracker";
import { Header } from "../components/Header";
import { Providers } from "../components/Providers";
import { ThirdPartyScripts } from "../components/ThirdPartyScripts";
import { WhatsAppFloat } from "../components/WhatsAppFloat";
import "./globals.css";
import { cn } from "@/lib/utils";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.umarmalik-dev.com",
  ),
  title: {
    default: "Muhammad Umar Malik — Software Engineer & Designer",
    template: "%s | Muhammad Umar Malik",
  },
  description:
    "Software engineer and designer helping small businesses fix slow websites, improve UX, generate leads, and automate repetitive work.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  authors: [
    {
      name: "Muhammad Umar Malik",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.umarmalik-dev.com",
    },
  ],
  creator: "Muhammad Umar Malik",
  publisher: "Muhammad Umar Malik",
  category: "technology",
  verification: {
    google: "ifUySHi_sgkvuJMrKCFSpEj3BOO6RfrUNu90NPbg1A",
    other: {
      "p:domain_verify": "a0ce26af14e7b3f7a0ee80570944c5df",
    },
  },
  openGraph: {
    title: "Muhammad Umar Malik — Software Engineer & Designer",
    description:
      "Software engineer and designer helping small businesses fix slow websites, improve UX, generate leads, and automate repetitive work.",
    url: "/",
    siteName: "Muhammad Umar Malik",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Muhammad Umar Malik — Software Engineer & Designer",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Umar Malik — Software Engineer & Designer",
    description:
      "Software engineer and designer helping small businesses fix slow websites, improve UX, generate leads, and automate repetitive work.",
    images: ["/opengraph-image"],
    creator: "@umarmalik_dev",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Inlined at build time, so this must be a full `process.env.NEXT_PUBLIC_*`
  // expression. Absent ID => tag simply not rendered. (The GTM ID is read the
  // same way inside components/GoogleTagManager.tsx.)
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        "theme-transition",
        "font-sans",
        dmSans.variable,
        cormorant.variable,
        jetBrainsMono.variable,
      )}
    >
      {/* GTM container script — injected into <head> client-side */}
      <GoogleTagManager />
      <head>
        {/* Warm the TLS handshake for the hero video and remote images so they
            aren't paying connection setup on the critical path. */}
        <link
          rel="preconnect"
          href="https://d8j0ntlcm91z4.cloudfront.net"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/* GTM <noscript> fallback — must be the first element inside <body> */}
        <GoogleTagManagerNoScript />
        <Providers>
          <GtmClickTracker />
          <ThirdPartyScripts />
          <Header />
          {children}
          <Footer />
          <WhatsAppFloat />
          <Analytics />
        </Providers>
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
