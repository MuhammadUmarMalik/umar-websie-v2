"use client";

import { useState } from "react";
import { faqs } from "@/lib/constants";

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-border">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="group flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-expanded={openIndex === i}
          >
            <span className={`font-semibold transition-colors duration-200 ${openIndex === i ? "text-accent" : "text-text-primary group-hover:text-accent/80"}`}>
              {faq.question}
            </span>
            <span
              className={`mono shrink-0 text-accent transition-transform duration-200 ${
                openIndex === i ? "rotate-45" : ""
              }`}
              aria-hidden
            >
              +
            </span>
          </button>
          {openIndex === i && (
            <p className="pb-5 leading-7 text-text-secondary">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
}
