import { Cormorant_Garamond, Inter } from "next/font/google";

// Display serif — Cormorant Garamond
// High-contrast Garamond revival with a true italic; chosen for heritage/editorial tone.
// Weights kept minimal: 500 for display headings + italic for emphasis.
// next/font self-hosts at build time; no runtime Google requests.
export const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
  fallback: [
    "Iowan Old Style",
    "Palatino Linotype",
    "Palatino",
    "Georgia",
    "Times New Roman",
    "serif",
  ],
  adjustFontFallback: true,
});

// UI sans — Inter
// Only the weights referenced by the design system (body 400, medium 500, emphasis 600).
export const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-sans",
  fallback: [
    "Helvetica Neue",
    "Segoe UI",
    "system-ui",
    "-apple-system",
    "sans-serif",
  ],
  adjustFontFallback: true,
});
