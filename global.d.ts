/**
 * Global ambient types.
 *
 * `dataLayer` is intentionally typed as `Object[] | undefined` to match the
 * declaration shipped by `@next/third-parties` (used for GoogleAnalytics in
 * app/layout.tsx). TypeScript merges duplicate `Window` members only when the
 * types are identical — widening or narrowing this would raise TS2717.
 */
export {};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
    dataLayer?: Object[];
  }
}
