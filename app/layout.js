import "./globals.css";
import { display, sans } from "./fonts";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { site } from "@/lib/content";
import { OG_IMAGE } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

const description =
  "Professional legacy portfolio of H. M. Hakim Ali — tourism, hospitality, business leadership, and international engagement.";
const title = `${site.name} — Tourism, Hospitality & Business`;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "H. M. Hakim Ali",
    "tourism",
    "hospitality",
    "business leadership",
    "Bangladesh",
    "professional portfolio",
    "international engagement",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en",
    title,
    description,
    url: siteUrl,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [OG_IMAGE?.url ?? OG_IMAGE],
  },
  category: "professional portfolio",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F2E9" },
    { media: "(prefers-color-scheme: dark)", color: "#0F0E0C" },
  ],
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ScrollProgress />
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
