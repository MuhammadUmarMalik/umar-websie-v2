import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Muhammad Umar Malik — Software Engineer & Designer",
    short_name: "Umar Malik",
    description:
      "Software engineer and designer helping small businesses fix slow websites, improve UX, generate leads, and automate repetitive work.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0a0a0a",
    theme_color: "#a78bfa",
    categories: ["business", "technology", "portfolio"],
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
