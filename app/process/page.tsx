import type { Metadata } from "next";
import ProcessPageContent from "@/sections/ProcessPageContent";

export const metadata: Metadata = {
  title: "The Process — How I Work | Umar Malik",
  description:
    "Five clear steps. No guesswork, no delays, no surprises. See exactly how every project runs — from discovery to launch.",
};

export default function ProcessPage() {
  return <ProcessPageContent />;
}
