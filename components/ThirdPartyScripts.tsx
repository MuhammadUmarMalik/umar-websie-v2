import Script from "next/script";

export function ThirdPartyScripts() {
  const adobeFontsKitId = process.env.NEXT_PUBLIC_ADOBE_FONTS_KIT_ID;
  const linkedInPartnerId = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;

  return (
    <>
      {adobeFontsKitId ? (
        <Script
          id="adobe-fonts"
          src={`https://use.typekit.net/${adobeFontsKitId}.js`}
          strategy="beforeInteractive"
        />
      ) : null}
      {adobeFontsKitId ? (
        <Script id="adobe-fonts-load" strategy="beforeInteractive">
          {`try{Typekit.load({async:true});}catch(e){}`}
        </Script>
      ) : null}
      {linkedInPartnerId ? (
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "${linkedInPartnerId}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l) {
                window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[];
              }
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";
              b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
      ) : null}
    </>
  );
}
