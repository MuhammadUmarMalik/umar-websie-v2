type LeadEmailInput = {
  subject: string;
  payload: Record<string, unknown>;
};

export async function sendLeadEmail({ subject, payload }: LeadEmailInput) {
  // Wire Resend or Nodemailer here when API credentials are available.
  console.info("Lead email placeholder", {
    to: process.env.LEAD_EMAIL_TO,
    subject,
    payload
  });

  return { ok: true };
}
