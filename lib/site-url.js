// The production origin is not known to this project, so it is never guessed.
// Set NEXT_PUBLIC_SITE_URL (for example in the hosting dashboard) before deploying;
// canonical URLs, the sitemap, robots.txt and Open Graph URLs are all derived from it.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");
