/**
 * Google Tag Manager dataLayer helpers.
 *
 * Safe to import from anywhere (including server components) — every function
 * no-ops when `window` is undefined, so nothing runs during SSR.
 */

/**
 * Push an event onto the GTM dataLayer.
 *
 * The array is created if GTM hasn't loaded yet: the GTM snippet does
 * `w[l] = w[l] || []`, so anything queued before the container boots is
 * replayed once it does. That makes early pushes safe rather than lost.
 */
export function pushToDataLayer(
  event: string,
  data: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

/** Fired when a visitor clicks through to the Calendly booking page. */
export function trackCalendlyClick(data: Record<string, unknown> = {}): void {
  pushToDataLayer("calendly_click", data);
}

/** Fired after the contact form has been accepted by the API. */
export function trackFormSubmit(formName: string): void {
  pushToDataLayer("form_submit", { form_name: formName });
}

/** Fired when one of the primary marketing CTAs is clicked. */
export function trackCtaClick(
  label: string,
  data: Record<string, unknown> = {},
): void {
  pushToDataLayer("cta_click", { label, ...data });
}
