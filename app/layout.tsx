import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "../components/Footer";
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
  // Both IDs are inlined at build time, so they must be referenced as full
  // `process.env.NEXT_PUBLIC_*` expressions. Absent ID => tag simply not rendered.
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
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
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
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
        <Providers>
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
