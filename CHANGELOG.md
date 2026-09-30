# Changelog

## v1.9 — Premium navbar and pill buttons
**Navbar** — floating pill bar (hairline border, soft lift, circular monogram, pill link hover/active states, solid dark pill CTA); condenses on scroll with no layout shift. Tagline removed from the bar. Mobile menu is a floating rounded card under the bar; toggle is a circular button. Desktop nav now starts at 1241 px (was 1001 px) so seven links never collide with the brand; the mobile menu covers everything below.
**Buttons** — every `.btn` is a pill with a background: gold and dark fills, ivory-filled outline, charcoal-filled outline on dark bands; soft warm lift that rises 2 px on hover and settles on press. Lightbox buttons are pills.
**Design note** — this intentionally relaxes the v1.x rule against large radii and shadows for buttons and the header only, at the client's request. Palette and tokens unchanged; shadow values are tokens (`--lift`, `--lift-hover`).
**Testing fix** — the earlier nav-fit test measured box widths instead of text extents and missed a real brand/nav collision; it now measures text ranges.
**Versioning** — `1.9.0`, `site.version` `1.9`. Content unchanged.

## v1.8 — Real photographs and Gallery
**Assets** — 8 supplied photographs converted from ~2 MB PNG to WebP (60–251 KB each) and placed in `portrait/`, `hospitality/`, `events/`, `timeline/`. Hero now shows the supplied profile portrait (`priority`); the Hotel Agrabad feature shows the supplied facade photograph. The 2025 Tourism Hero frame is still a placeholder: none of the supplied photographs is that certificate.
**Gallery** — new `/gallery` page (nav, sitemap, metadata): natural-ratio thumbnails, keyboard-accessible lightbox on native `<dialog>` (focus containment, Esc, focus restore, arrow keys, position announced).
**Content integrity** — alt text describes only what is visible; captions use only visible text or neutral labels. No photograph is used as evidence of an award, role or event. `lib/gallery.js` is the single source for alt, caption and crop position.
**SEO** — JSON-LD `Person` gains the profile image.
**Versioning** — `1.8.0`, `site.version` `1.8`. Content strings otherwise unchanged.

## v1.7 — Typography and motion polish
**Typography** — kept Cormorant Garamond + Inter (no new font requests). Added lining numerals for dates and figures, `case` feature on uppercase labels, `text-wrap: pretty` on running text, tighter display tracking, optical sizing, 11.5 px small labels, 18 px body copy on wide screens.
**Motion** — CSS only, transform/opacity only, disabled under `prefers-reduced-motion`: staggered hero entrance (transform-only, nothing hidden), eyebrow hairline draw-in, eased scroll-driven reveals, staggered mobile-menu links, ledger title hover, arrow nudge on links.
**UX** — 2 px filter/era selected underline (no layout shift), button press feedback, tap feedback and no sticky hover on touch devices, larger focus offset on buttons.
**Content** — unchanged. **Versioning** — `1.7.0`, `site.version` `1.7`.

## v1.6 — Refinement, hardening and asset integration
**Typography** — Cormorant Garamond (display, regular + italic) and Inter (400/500/600) self-hosted through `next/font` with metric-matched fallbacks; type scale retuned for the new face.
**Accessibility** — skip-to-content link; single `main` landmark in the layout; mobile menu moves focus in, contains Tab, closes on Esc / route change / resize to desktop, returns focus to the toggle and makes the page behind `inert`; `aria-pressed` filters with polite result counts; list roles kept on reset lists; decorative icons hidden; 44 px touch targets; scroll padding under the sticky header; measured contrast on every text pair.
**Performance** — reveal, page entrance and reading-progress are now CSS (scroll-driven, no JavaScript); `Reveal`, `Timeline`, `ScrollProgress` and `ArchivalFrame` are server components; only the header and the two filter controls ship client JS. Hero portrait is the only `priority` image and skips the reveal. Page entrance is transform-only, so nothing is ever hidden while it runs.
**Images** — `ArchivalFrame` uses `next/image` (`fill` + `sizes`, AVIF/WebP), per-image `object-position`, alt and caption via `lib/image-meta.js`.
**SEO** — per-page metadata, canonical URLs, Open Graph and Twitter cards, restrained OG image, favicon/app icons/manifest, `robots`, `sitemap`, JSON-LD `Person` limited to current/official roles, `not-found` page.
**Interaction** — condensed header on scroll with no layout shift (glass blur removed); career era and archive category kept in the URL so they survive navigation and reload; internal links use `next/link`; hairline back-to-top on Career, Experience and Recognition; print stylesheet (black on ivory, full chronology, status labels kept).
**Editorial** — Education and Expertise gain a status key and a closing band, using existing wording only; shared `ContinueBand`.
**Code quality** — ESLint config (`next/core-web-vitals`), unused CSS and tokens removed, every colour tokenised, `npm run check` scripts.
**Content** — unchanged. The research dossier and photographs were not supplied; see `CONTENT-AUDIT.md`.
**Versioning** — package `1.6.0`, `site.version` `1.6`.

## v1.5 — Creamy-golden legacy redesign
**Visual system**
- Replaced the green identity entirely. New token palette: warm ivory, cream, soft champagne, muted antique gold, deep charcoal / warm black, soft taupe.
- `app/globals.css` rewritten from scratch as a single token-driven stylesheet (v1.4 colour tokens, gradients and green sections removed).
- Editorial typography: large serif display, restrained sans UI, generous line-height and spacing.
- Corners reduced to ~2px; boxed SaaS-style cards replaced by editorial ledger rows, hairline columns and archival frames; shadows removed.

**Pages and components**
- Home: cinematic dark hero with H. M. Hakim Ali as the lead statement; new Hotel Agrabad hospitality feature, journey preview, current-leadership ledger, international/Myanmar Honorary Consul-General section, and a prominent 2025 Tourism Hero recognition feature.
- Career: archival timeline with thin gold rail, large dates, emphasised key periods (1971, 2025, 2026), narrative arc line and a closing 2026 note.
- Recognition: featured 2025 Tourism Hero, then a dated ledger archive with filters and the verification columns.
- Experience, Education, Expertise, About, Contact reworked into the same system.
- New: `ArchivalFrame` (drop-in photo slots with elegant placeholders), `Reveal` (quiet scroll reveal), `Status` (shape-coded status markers), `LedgerRow`; `Timeline` now shared by home and career.
- Navigation: flat, minimal bar with gold underline states; full-width mobile menu.
- Removed unused/replaced components: `Card`, `ExperienceCard`, `PortraitComposition`, `FloatingContact`.

**Motion** — slow image reveal, fade/slide, gold line growth, low-intensity image zoom. All disabled under `prefers-reduced-motion`.

**Content** — unchanged. Status distinctions (current / recent / historical / self-reported / verify) preserved.

**Versioning** — package `1.5.0`, README, PROJECT-STATE, footer shows v1.5.

## v1.4
Information architecture, domain storytelling, contact refinement.
## v1.3
Career-era navigation and archive filters.
## v1.2
Interaction and motion layer.
## v1.1
Page architecture and responsive visual system.
