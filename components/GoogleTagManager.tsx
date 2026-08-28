import Script from "next/script";

// Inlined at build time by the bundler, so this must stay a full
// `process.env.NEXT_PUBLIC_*` expression. Absent ID => tag isn't rendered.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * The GTM container script.
 *
 * `afterInteractive` lets Next inject it into <head> on the client once
 * hydration has started — the recommended strategy for tag managers, and one
 * that keeps the tag off the critical rendering path. Because the markup is
 * injected client-side there is no server/client HTML mismatch to hydrate.
 *
 * Render this as a direct child of <html> in the root layout.
 */
export function GoogleTagManager() {
  if (!GTM_ID) return null;

  return (
    <Script id="gtm-container" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

/**
 * The <noscript> iframe fallback. Must be the first thing inside <body>.
 *
 * This one *is* server-rendered (a plain <noscript>, not next/script), which
 * is the point — it has to exist in the initial HTML for clients with JS
 * disabled. It renders identically on server and client, so it's
 * hydration-safe.
 */
export function GoogleTagManagerNoScript() {
  if (!GTM_ID) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
