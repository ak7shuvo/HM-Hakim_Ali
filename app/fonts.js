import { Cormorant_Garamond, Inter } from "next/font/google";

// Display serif: Cormorant Garamond — a high-contrast Garamond revival with a true italic,
// which suits a heritage/editorial tone. Regular (500) + italic only. next/font self-hosts
// the files at build time, so the browser makes no request to Google at runtime.
export const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
  fallback: ["Iowan Old Style", "Palatino Linotype", "Georgia", "serif"],
});

// UI sans: Inter, only the three weights the stylesheet uses.
export const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-sans",
  fallback: ["Helvetica Neue", "Segoe UI", "system-ui", "sans-serif"],
});
