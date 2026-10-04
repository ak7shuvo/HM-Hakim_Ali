# H. M. Hakim Ali — Professional Legacy Portfolio · v3.1

An eleven-route Next.js 14 portfolio for H. M. Hakim Ali (tourism, hospitality, business and international engagement, Chattogram, Bangladesh).
v3.0 is a full visual and interaction rebuild — the **"Ledger & Lattice"** design system — on the same stack, routes and content as v2.0.

## Quick start

Requirements: **Node.js 18.17+** (tested on Node 22) and npm.

```bash
npm install          # or: npm ci
npm run dev          # http://localhost:3000
```

Production:

```bash
cp .env.example .env.local      # then set the real origin, see "Before you deploy"
npm run build
npm run start                    # serves the production build on :3000
```

Quality scripts:

```bash
npm run lint         # ESLint (next/core-web-vitals)
npm run check        # palette guard (no green family), WCAG contrast on every token pair,
                     # unused CSS classes/tokens, colour literals outside :root
```

The build has **no network dependency**: all three typefaces are self-hosted in `app/fonts/` and loaded through `next/font/local`.
(v2.0 fetched Google Fonts at build time, which fails on offline or restricted CI.)

## Before you deploy

1. **Set `NEXT_PUBLIC_SITE_URL`** to the production origin, no trailing slash (e.g. in Vercel → Project → Environment Variables).
   Canonical URLs, `sitemap.xml`, `robots.txt`, Open Graph URLs and JSON-LD all derive from it. If it is unset, the build
   logs a warning and those URLs point at `http://localhost:3000`. The real domain is not known to this project and is never guessed.
2. Review `CONTENT-AUDIT.md` — it lists open items that need the research dossier or the client's confirmation.
3. Any Node host that runs `next start` works (Vercel, Netlify, Render, a VPS). All pages are statically prerendered.

## Routes

| Route | Page | Notes |
|---|---|---|
| `/` | Home | Hero, executive overview, Hotel Agrabad feature, career preview, current leadership, international, 2025 recognition, connect |
| `/about` | About | Editorial profile with pull-quote, four domains, current roles, public themes |
| `/career` | Career Journey | Full 15-entry chronology, sticky era navigator (`?era=` deep links), status key |
| `/experience` | Experience | 11 roles, category filters (`?category=` deep links), status explanation |
| `/education` | Education | Three qualification plates, status explanation |
| `/skills` | Expertise | Bento of six groups, languages; no percentages or scores |
| `/achievements` | Recognition | Featured 2025 Tourism Hero, filterable archive, yellow/red verification lists |
| `/gallery` | Gallery | Scatter → organise interaction, keyboard/touch lightbox on native `<dialog>` |
| `/news` | News & Media | 14 press articles (2025–2026), newest first, year + category filters (`?year=`, `?category=`), institutional references |
| `/contact` | Contact | LinkedIn action, copy-link with feedback, location, profile link |
| any other | 404 | Designed not-found page (`noindex`) |

Also generated: `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/icon.svg`, `/favicon.ico`, `/apple-icon.png`, `/og-image.png`.

## Project structure

```
app/
  layout.js            root layout: fonts, metadata, motion boot script, header/footer, WebSite JSON-LD
  template.js          per-route entrance transition
  globals.css          the whole design system (tokens → base → primitives → components → print)
  fonts.js, fonts/     Newsreader · Instrument Sans · IBM Plex Mono (self-hosted, SIL OFL)
  <route>/page.js      one server component per page
components/
  MotionRoot.jsx       the only scroll-linked client module: reveals, parallax, tilt, progress
  SiteHeader.jsx       floating pill nav + full-screen mobile sheet (focus trap, inert, Esc)
  Footer.jsx, BackToTop.jsx, CopyLink.jsx
  CareerNavigator.jsx, ArchiveFilters.jsx, GalleryGrid.jsx   client shells over server-rendered content
  PageHeader, SectionHeading, RoleCard, LedgerRow, Timeline, SkillGroup, ContinueBand,
  ArchivalFrame, Emblem, Lattice, Status, Reveal, Button, JsonLd   server primitives
lib/
  content.js           ALL portfolio content (single source of truth)
  gallery.js           photographs: alt text, captions, crop, dimensions
  career.js, status.js, seo.js, site-url.js, assets.js, image-meta.js
public/images/         photographs by folder (see public/images/README.md)
scripts/               dependency-free audits used by `npm run check`
```

## Design system in brief

- **Palette** (tokens in `:root`): paper `#F4EFE6`, paper-2, card, ink `#1A1611` with two text steps, brass `#AD8743` / brass-ink `#7A5A22`,
  a restrained oxblood `#7C2E27` for key periods and "current" status, and a night band `#13100C` with champagne accents.
  Every text pair is checked by `npm run check` (lowest text ratio 4.56:1). The v1.5 rule "no green" still holds and is enforced.
- **Type**: Newsreader (variable, optical size) for display and headings; Instrument Sans for text and UI; IBM Plex Mono for dates,
  indices, status labels and captions. All sizes are fluid `clamp()` tokens.
- **Motif**: a brise-soleil lattice drawn after Hotel Agrabad's latticed tower, used quietly behind headers, the hero and dark bands.
- **Cards**: one radius scale (4/8/14/24 px, pills for controls), one elevation scale, several compositions — role cards (with a dark
  feature variant), timeline cards, ledger rows, qualification plates, bento groups, action cards.
- **Status markers** keep the dossier's wording and add a shape cue (filled, hollow, dashed, diamond). State is never colour-only.
- **Motion**: transform/opacity only, one easing family, ~0.6–1.1 s reveals, staggered where useful, subtle parallax and pointer tilt
  on fine pointers. Everything is off under `prefers-reduced-motion`. Content is never hidden without JavaScript: reveal styles are
  enabled by a tiny inline script that switches itself off after 2.5 s if the motion module fails to load.

## Editing content

Edit `lib/content.js` (and `lib/news.js` for press coverage) — pages read from them. To add an article, append an object to `news` with the publisher's exact headline, date and URL; ordering, year groups, counts and filters update automatically. Status wording drives the marker shape through `lib/status.js`; it never rewrites text.
Do not add dates, roles, awards, statistics, quotes or credentials that are not in the research record (see `PROJECT-STATE.md`).

## Documentation

`CHANGELOG.md` · `PROJECT-STATE.md` · `QA-REPORT.md` (what was actually run) · `CONTENT-AUDIT.md` (content preservation + open items).
