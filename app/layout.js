import "./globals.css";
import { display, sans, mono } from "./fonts";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import MotionRoot from "@/components/MotionRoot";
import BackToTop from "@/components/BackToTop";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/content";
import { OG_IMAGE, websiteJsonLd } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

const description =
  "Professional legacy portfolio of H. M. Hakim Ali — tourism, hospitality, business leadership, and international engagement.";
const title = `${site.name} — Tourism, Hospitality & Business`;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s — ${site.name}` },
  description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  keywords: ["H. M. Hakim Ali", "tourism", "hospitality", "business leadership", "Bangladesh", "Chattogram", "Hotel Agrabad", "professional portfolio", "international engagement"],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: site.name, locale: "en", title, description, url: siteUrl, images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  formatDetection: { telephone: false, email: false, address: false },
  category: "professional portfolio",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F4EFE6",
  colorScheme: "light",
};

// Runs before first paint: enables reveal styles only when JS is live, and gives up (shows everything)
// if the motion module has not initialised within 2.5 s, so a script failure can never hide content.
const motionBoot = `(function(d){var r=d.documentElement;r.classList.add('js');setTimeout(function(){if(!r.classList.contains('motion-ready'))r.classList.remove('js')},2500)})(document)`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <JsonLd data={websiteJsonLd()} />
        <MotionRoot />
        <SiteHeader />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
