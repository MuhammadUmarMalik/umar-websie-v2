import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Muhammad Umar Malik — Software Engineer & Designer",
    short_name: "Umar Malik",
    description:
      "Software engineer and designer helping small businesses fix websites, improve UX, generate leads, and automate repetitive work.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#c8a96e",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
