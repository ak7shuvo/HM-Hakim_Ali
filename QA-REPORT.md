# QA-REPORT — v1.6

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
