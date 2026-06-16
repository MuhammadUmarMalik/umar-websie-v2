import { z } from "zod";

const baseLeadSchema = z.object({
  name: z.string().min(2, "Name is required").max(80),
  businessName: z.string().min(2, "Business name is required").max(120),
  websiteUrl: z.string().url("Enter a valid website URL").optional().or(z.literal("")),
  serviceNeeded: z.string().min(2, "Select a service"),
  problem: z.string().min(15, "Share a little more detail").max(2000),
  contact: z.string().min(5, "Email or WhatsApp is required").max(120),
  honeypot: z.string().optional()
});

export const contactSchema = baseLeadSchema.extend({
  budget: z.string().min(2, "Budget range is required"),
  timeline: z.string().min(2, "Timeline is required")
});

export const auditRequestSchema = baseLeadSchema.extend({
  currentSpeedIssue: z.string().optional()
});

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email"),
  honeypot: z.string().optional()
});

export type ContactInput = z.infer<typeof contactSchema>;
export type AuditRequestInput = z.infer<typeof auditRequestSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
