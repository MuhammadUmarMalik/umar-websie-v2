import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "../components/Header";
import { Providers } from "../components/Providers";
import { ThirdPartyScripts } from "../components/ThirdPartyScripts";
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
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Muhammad Umar Malik - Software Engineer & Designer",
    template: "%s | Muhammad Umar Malik",
  },
  description:
    "I help small businesses fix slow websites, automate work, and grow with smart digital solutions.",
  openGraph: {
    title: "Muhammad Umar Malik - Software Engineer & Designer",
    description:
      "I help small businesses fix slow websites, automate work, and grow with smart digital solutions.",
    url: "/",
    siteName: "Muhammad Umar Malik",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Muhammad Umar Malik",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Umar Malik - Software Engineer & Designer",
    description:
      "I help small businesses fix slow websites, automate work, and grow with smart digital solutions.",
    images: ["/opengraph-image"],
  },
};

const themeInitScript = `
(() => {
  try {
    const theme = window.localStorage.getItem("umar-theme") === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {
    document.documentElement.dataset.theme = "dark";
    document.documentElement.style.colorScheme = "dark";
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
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
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Providers>
          <ThirdPartyScripts />
          <Header />
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
