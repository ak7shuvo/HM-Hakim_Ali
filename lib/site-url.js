// The production origin is not known to this project, so it is never guessed.
// Set NEXT_PUBLIC_SITE_URL (for example in the hosting dashboard) before deploying;
// canonical URLs, the sitemap, robots.txt and Open Graph URLs are all derived from it.
const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
if (!fromEnv && process.env.NODE_ENV === "production" && typeof window === "undefined" && !globalThis.__siteUrlWarned) {
  globalThis.__siteUrlWarned = true;
  console.warn("[site-url] NEXT_PUBLIC_SITE_URL is not set — canonical, sitemap and Open Graph URLs will point at http://localhost:3000.");
}
export const siteUrl = (fromEnv || "http://localhost:3000").replace(/\/+$/, "");
