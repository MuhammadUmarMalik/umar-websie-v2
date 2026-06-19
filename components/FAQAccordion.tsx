"use client";

import { useState } from "react";
import { faqs } from "@/lib/constants";

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl divide-y divide-border">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 py-5 text-left"
            aria-expanded={openIndex === i}
          >
            <span className="font-semibold text-text-primary">{faq.question}</span>
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
