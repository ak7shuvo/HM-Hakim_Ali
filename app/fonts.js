import localFont from "next/font/local";

// v3.0 type system — all three families are self-hosted from app/fonts (SIL Open Font License),
// so builds never depend on a network request to Google Fonts.
//
// Display · Newsreader — a variable editorial serif with an optical-size axis (6–72).
// Large headlines pick up the high-contrast display cut automatically; small serif text stays sturdy.
export const display = localFont({
  src: [
    { path: "./fonts/newsreader-latin-standard-normal.woff2", weight: "200 800", style: "normal" },
    { path: "./fonts/newsreader-latin-standard-italic.woff2", weight: "200 800", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Iowan Old Style", "Palatino Linotype", "Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
});

// Text & UI · Instrument Sans — a contemporary grotesk with Swiss proportions (variable weight + width).
export const sans = localFont({
  src: [{ path: "./fonts/instrument-sans-latin-standard-normal.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-sans",
  display: "swap",
  fallback: ["Helvetica Neue", "Segoe UI", "system-ui", "-apple-system", "sans-serif"],
  adjustFontFallback: "Arial",
});

// Metadata · IBM Plex Mono — dates, indices, status labels and captions: the "archive" voice.
export const mono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
  adjustFontFallback: false,
});
