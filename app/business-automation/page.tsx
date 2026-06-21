import type { Metadata } from "next";
import {
  createMetadata,
  seoMap,
  faqSchema,
  breadcrumbSchema,
  serviceSchema,
} from "@/lib/seo";
import AutomationPageClient from "@/components/services/AutomationPageClient";

export const metadata: Metadata = createMetadata(seoMap.businessAutomation);

const SERVICE_FAQS = [
  {
    question: "What tools do you use for automation?",
    answer:
      "Primarily n8n (self-hosted, no monthly per-task fees) and Make (Integromat) for cloud-based workflows. For AI features I use the OpenAI API. I connect with HubSpot, Notion, Airtable, Google Sheets, Slack, WhatsApp Business API, and most tools that expose a REST API or webhook.",
  },
  {
    question: "Do I need technical knowledge to use the automations after you build them?",
    answer:
      "No. I build the workflows, document every trigger and action in plain English, and walk you through how it runs. If something breaks, I build in error notifications so you're alerted immediately.",
  },
  {
    question: "How long does an automation project take?",
    answer:
      "Simple automations (a single workflow with 3–5 steps) take 3–7 days. Complex multi-workflow systems with AI, multiple integrations, and a reporting layer take 2–4 weeks. Timeline is agreed before work starts.",
  },
  {
    question: "What if my business tool isn't listed?",
    answer:
      "If it has a REST API, webhook, or Zapier integration, it can almost certainly be connected. I'll assess your stack in the discovery call and confirm feasibility before scoping the project.",
  },
  {
    question: "Will the automations break if something changes in my tools?",
    answer:
      "I build with error handling and alerting built in — if an API call fails or a webhook stops firing, you get notified. For ongoing reliability I offer a maintenance plan.",
  },
  {
    question: "Can you migrate my existing Zapier automations to n8n?",
    answer:
      "Yes. n8n is self-hosted and has no per-task pricing, so migrating from Zapier often cuts monthly costs significantly. I map your existing flows and rebuild them — usually with improvements.",
  },
];

export default function BusinessAutomationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: "Business Automation",
              description:
                "Business process automation using n8n, Make (Integromat), and the OpenAI API. I build custom workflows that connect forms, CRM, email, WhatsApp, and spreadsheets — eliminating repetitive manual work for small businesses.",
              path: "/business-automation",
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(SERVICE_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", href: "/" },
              { name: "Services", href: "/services" },
              { name: "Business Automation", href: "/business-automation" },
            ])
          ),
        }}
      />
      <AutomationPageClient />
    </>
  );
}
