import { currentRoles, site } from "@/lib/content";
import { statusKind } from "@/lib/status";
import { siteUrl } from "@/lib/site-url";

export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.tagline}`,
};

// Full per-page metadata. Open Graph / Twitter objects replace (not merge with) the layout's,
// so each page states them completely.
export function pageMetadata({ title, description, path }) {
  const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — Tourism, Hospitality & Business`;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: { type: path === "/" ? "profile" : "website", siteName: site.name, locale: "en", url: path, title: fullTitle, description, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [OG_IMAGE.url] },
  };
}

// JSON-LD Person. Only roles that lib/content.js marks as current/verified or an official public
// record are used. Historical, self-reported, "verify" and "to check" items are excluded by
// construction (statusKind sends them elsewhere). `sameAs` is the LinkedIn profile already linked
// from the Contact page. Nothing here is invented.
export function personJsonLd() {
  const roles = currentRoles.filter((r) => statusKind(r.status) === "current" || r.status === "Official public record");
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: siteUrl,
    image: `${siteUrl}/images/portrait/profile.webp`,
    jobTitle: roles.map((r) => `${r.title}, ${r.organization}`),
    address: { "@type": "PostalAddress", addressLocality: "Chattogram", addressCountry: "BD" },
    sameAs: [site.linkedin],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: siteUrl,
    inLanguage: "en",
  };
}

export function breadcrumbJsonLd(label, path) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: label, item: `${siteUrl}${path}` },
    ],
  };
}
