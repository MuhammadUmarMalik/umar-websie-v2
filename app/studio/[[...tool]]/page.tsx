import type { Metadata } from "next";
import { metadata as studioMetadata, viewport } from "next-sanity/studio";

import { Studio } from "./Studio";

export { viewport };

// robots.txt alone can't deindex a URL that's already in the index or linked
// externally — the meta directive is what actually removes it.
export const metadata: Metadata = {
  ...studioMetadata,
  robots: { index: false, follow: false, nocache: true },
};

export default function StudioPage() {
  return <Studio />;
}
