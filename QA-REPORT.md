# QA-REPORT — v3.0

Everything below was **actually executed** in the v3.0 authoring environment (Linux, Node 22.22, Chromium via Playwright 1.56,
with the shipped self-hosted fonts). Nothing here is estimated.

## Not run
- **Lighthouse** and the full **axe-core** rule set were not available. The checks below cover a subset with hand-written rules.
  Run both on the deployed site.
- Real devices, Safari and Firefox. Testing was Chromium only (desktop and mobile viewport emulation).

## Build and static checks — all PASS
| Check | Result |
|---|---|
| `npm ci` | OK (326 packages) |
| `npm run lint` | No ESLint warnings or errors |
| `npm run build` | Compiled; 18/18 static pages; shared JS 87.3 kB; largest first load 105 kB (`/gallery`) |
| `npm run check` | 66 colour literals scanned, 0 green-family; 26 WCAG token pairs, 0 failures (lowest text pair 4.56:1); 0 unused classes or tokens; 0 colour literals outside `:root` |
| Fresh-load console | 0 errors or warnings on all 9 content routes |

## Page × width matrix — 100 runs, 0 failures (`scripts/qa/matrix.py`)
Routes: `/`, `/about`, `/career`, `/experience`, `/education`, `/skills`, `/achievements`, `/gallery`, `/contact` and the 404 page.
Widths: 1920, 1440, 1280, 1180, 1024, 768, 480, 390, 360, 320.

A run passes only if there is no horizontal overflow; exactly one `h1`; no duplicate ids; every `img` has `alt`; every visible link
and button has a name; no skipped heading level; no visible text under 11 px; every visible reveal element is revealed after
scrolling; touch targets are at least 40 px at widths up to 900 px (inline text links excluded); and the desktop nav text never comes
within 8 px of the brand or the CTA.

Harness note: in one of three full matrix runs a single route logged Next.js "Failed to fetch RSC payload … network error". These come from link prefetches the harness aborts when it navigates away mid-prefetch; the same routes loaded fresh log no errors.

Measured nav gaps (brand→nav / nav→CTA): 1920 and 1440 px: 233 / 30 px · 1280: 80 / 30 · 1180: 38 / 30. Below 1180 px the mobile sheet is used.

Found and fixed during this pass:
- Mono labels below 11 px (raised to 11.2 px or more).
- The header condensing on scroll shifted content by 6 px (the wrapper height is now fixed).
- The scattered gallery overflowed at 390 px (scatter scaled to 40 % below 700 px, plus `overflow-x: clip` on the root as a safety net).
- The image mask reveal never fired, because IntersectionObserver ignores fully clipped targets (the clip now sits on the inner media).
- The mobile menu's focus trap could leak to the brand link (the sheet now follows the toggle in DOM order).

## Interaction tests — 32 / 32 PASS (`scripts/qa/interact.py`)
- Mobile menu: focus moves in; Tab stays contained; the page behind is `inert`; the current page is marked; Esc closes and returns focus; a link navigates and closes; the menu closes on resize to desktop.
- The skip link is the first Tab stop and focuses `main`. The header condenses on scroll with 0 px content shift.
- Back-to-top appears after one screen with a live progress ring, scrolls to the top and moves focus to `main`.
- Client-side navigation keeps the nav state and re-runs reveals.
- Experience filter "Hospitality" shows 2 cards, announces "2 roles · Hospitality", writes `?category=Hospitality`, survives a reload, and the cards are fully visible after the stagger; arrow keys move between chips.
- Career era "2011–2018" shows 2 of 15 entries, is announced politely, and the rail ends on the last visible entry; the deep link `?era=era-2020-2026` shows 5 entries, all visible.
- The lightbox opens from the keyboard, arrows step and wrap (3 / 8, 8 / 8), Esc closes and focus returns to the opening thumbnail; the organise toggle works.
- Contact "Copy LinkedIn link" writes the URL to the clipboard and shows and announces "Copied". External links carry `noopener noreferrer`.
- With `prefers-reduced-motion: reduce`, no reveal element is hidden, without any scrolling.
- With every JavaScript chunk blocked, the boot fallback shows all content after 2.5 s (0 hidden reveals; all 11 experience cards).
- All internal links, in-page anchors, `robots.txt`, `sitemap.xml`, the manifest, the OG image and the icons return 200; unknown routes return 404.

## Content preservation — PASS (`scripts/qa/content_diff.py`)
v2.0 (built from the supplied ZIP; its Google font imports were swapped for local files only so that it could build offline) and
v3.0 were rendered side by side. Every v2.0 text node (883 across 10 routes) was searched for verbatim in v3.0's text, `alt` and
`aria-label` content. The strings not found verbatim, all intentional:

| v2.0 string | Why | Where the information is in v3.0 |
|---|---|---|
| `1.9` (footer, every page) | version bump | footer reads `v3.0` |
| `01 · About` … `08 · Contact` | eyebrow restyled | masthead shows `№ 01` and `About` as separate elements |
| `Archive notice · 404` | eyebrow restyled | `404` + `Archive notice` |
| `Professional legacy portfolio ·` | split into separate spans | `Professional legacy portfolio` · `Chattogram, Bangladesh` |
| `Certificate or photograph — to be supplied` (Home, Recognition) | public placeholder removed | typographic emblem; drop a photograph into `public/images/awards/` and it returns as a photo frame |
| `Tourism Hero · World Tourism Network · 2025` (frame caption) | caption belonged to the placeholder | the emblem's accessible name: "Typographic emblem: Tourism Hero, World Tourism Network, 2025" |
| About: "These strands are not sequential chapters … stand apart." | one paragraph split | first sentence as a pull-quote, the rest as the following paragraph; words unchanged |

## Visual review
Full-page screenshots were reviewed at 1440 and 390 px for every route, plus folds at 1024 and 768 px, the open mobile menu,
the lightbox and the copy-link state.

---

## Earlier report — v1.6 to v1.9 (historical; superseded where v3.0 re-tested)

## Read this first: what could and could not be run
The authoring environment had **no npm registry access** (403) and no Lighthouse, axe-core or ESLint. Therefore the following were **NOT run**:
`npm install`, `npm run lint`, `next build`, `next start`, **Lighthouse (any category)**, **axe-core**, and rendering with the real Cormorant Garamond / Inter files.
**No Lighthouse or axe numbers are reported because none exist.** Run them after `npm install && npm run build && npm run start`.

What *was* run: the real components and the real `globals.css` were bundled with esbuild against stubs for `next/link`, `next/image`, `next/navigation`, `next/font/google` and `lucide-react`, server-rendered (React 19 renderer; project pins 18.3.1) and driven in Chromium (Playwright). Fonts in these runs were FreeSerif/DejaVu Sans and, as a worst-case width stress, DejaVu Serif/DejaVu Sans, not the shipped fonts. `axe-core` was replaced by hand-written checks listed below (not equivalent to axe's full rule set).

## Page × width matrix (measured; both font sets)
Each cell passes only if: no horizontal overflow; no green-family computed colour; zero text-contrast failures; no text under 11 px; exactly one `h1` and no skipped heading level; no duplicate ids; every image has alt; every link/button has a name; skip link + single `main` present; no touch target under 44 px at ≤900 px. 126 runs (63 × 2 font sets), 0 failures.

| Page | 1440 | 1280 | 1024 | 768 | 480 | 390 | 360 |
|---|---|---|---|---|---|---|---|
| / | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| /about | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| /career | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| /experience | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| /education | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| /skills | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| /achievements | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| /contact | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| 404 | PASS | PASS | PASS | PASS | PASS | PASS | PASS |

States tested in Chromium on the real client components (`interact.mjs`): all PASS
- Mobile menu: focus moves in; Tab and Shift+Tab contained; page behind `inert`; Esc closes and returns focus to toggle; closes on resize to desktop.
- Career eras: 2011–2018 shows 2 of 15 entries; `aria-pressed` set; polite status text "2 of 15 timeline entries shown for 2011–2018"; state kept in URL and restored after reload; last visible entry has no trailing rail line.
- Archive filters: Recognition "Pending verification" shows 4 rows with count text; Experience deep link `?category=Hospitality` shows 2.
- Condensed header: bar 76 → 62 px on scroll; wrapper height and content position unchanged (zero layout shift).
- Skip link: first Tab stop, visible on focus, moves focus to `main`.
- Focus rings: 2 px champagne on the dark hero, 2 px gold-deep on ivory.
- Reveal: for 5 page/width combinations every `.reveal` element reaches full opacity when scrolled to centre; none faded at page bottom (scroll timelines supported in the test browser).
- Print: filtered Career prints all 15 entries; dark bands become black-on-ivory; nav, filters, frames hidden; status labels kept.
- With synthetic stand-in photographs (temporary copy, not shipped): frames keep 4/5 and 5/6 ratios, no overflow at 1440/768/390, only the hero image is `priority`.

## Colour and contrast (measured)
Static token audit (`npm run check`): 20 pairs, 0 failures; lowest text ratio 4.01:1 (large italic accent on cream, needs 3:1); body ink 14–16:1; muted text ≥5.77:1; small gold labels ≥5.29:1; dark-surface text ≥7.55:1.
DOM audit: contrast computed per text element against composited backgrounds at every width; 0 failures. Not modelled: the hero's faint radial glow (12 % champagne) over black.
Green: 0 green-family colour literals in source (22 scanned, incl. SVG/CSS/JS); 0 green-family computed colours across 126 rendered pages, including `::before/::after`, borders, outlines, fills, strokes, shadows and gradients. Icon/OG/apple-icon pixels were generated from palette values only. The words green/emerald/teal/mint/lime appear only in rule statements and history in README, CHANGELOG and PROJECT-STATE.
Only computed colour outside the ten tokens: `rgb(0,0,0)` as the default SVG `fill` on `body`, which is never painted.

## Known limits and things to eyeball after the first real build
- Cormorant Garamond has a smaller x-height than the v1.5 stack; sizes were raised roughly 8–15 % but not seen in the real face. Check hero name, ledger titles and 15 px kicker numerals at 390 and 1440.
- `--serif` weight is 500 (only weight loaded); italic 500.
- Icons and OG image use a system serif (FreeSerif) outlined into shapes, not Cormorant.
- Scroll-driven reveals require `animation-timeline` support; elsewhere content simply shows without animation.
- Era/filter selection is restored in an effect, so a deep link paints "all" for one frame before filtering.
- The Education and Expertise pages remain light by design (no invented content); refinement is structural (status key, closing band).

## v1.8 addendum (measured with the same harness; same limits as above)
- 10 routes × 7 widths = 70 runs (added `/gallery`, real photographs in the hero and hospitality feature): 0 overflow, 0 green-family computed colours, 0 contrast failures, 0 tap targets under 44 px, one `h1` per page, 0 images without alt.
- Lightbox (native `<dialog>`): opens from the keyboard, announces "3 / 8", arrow keys step and wrap, Tab stays inside, Esc closes, focus returns to the opening button.
- Found and fixed: with seven nav links the desktop bar collided with the brand at ~1024 px. Mobile-menu breakpoint moved from 1000 to 1100 px; brand/nav/CTA gaps then measured ≥ 8 px from 1101 to 1440 px in both font sets.
- Photos: 8 files, 60–251 KB each (originals were ~1.7–2.8 MB PNG). Real-photo hero crop checked at 1440; object-position tuned per file in `lib/gallery.js`. Not re-checked at every width with real photos beyond the automated overflow/CLS-reserving checks.
- Not run (no registry): `npm install`, lint, `next build`, Lighthouse, axe.

## v1.9 addendum
- Nav-fit is measured on real text extents (Range rects), in both font sets, from 1240 to 1440 px: brand → nav and nav → CTA gaps ≥ 8 px; no horizontal overflow. Below 1241 px the mobile menu is used.
- Correction: the v1.8 nav-fit test used box widths and missed the collision it was meant to catch; the v1.8 zip's header can overlap at ~1024–1100 px in wide fonts. Superseded by v1.9.
- Shadows/radii: `--lift` and `--lift-hover` are low-opacity warm-charcoal tokens; buttons and header are the only pill/shadowed elements.
