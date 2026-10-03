# PROJECT STATE — H. M. HAKIM ALI PORTFOLIO

## Version
V3.0

## Current direction
Professional legacy portfolio on the v3.0 "Ledger & Lattice" design system: paper and ink neutrals, brass accent, a restrained oxblood for key periods and current status, night bands with champagne; Newsreader / Instrument Sans / IBM Plex Mono, self-hosted. Green remains excluded (enforced by `npm run check`). Pill buttons and the floating pill header from v1.9 are kept by request.

## Completed
- V1.1: page architecture, responsive visual system, career timeline, experience/education/recognition presentation.
- V1.2: active navigation, mobile menu, scroll progress, restrained motion, focus states, reduced-motion support.
- V1.3: career-era navigation, archive category filters, status hierarchy.
- V1.4: domain storytelling on About, archive/status explanation, contact conversion surface.
- V1.5: full visual redesign — token-based colour system, editorial typography, ledger/timeline layouts, archival image frames, hospitality and international sections, featured 2025 Tourism Hero, quiet motion, responsive QA.

- V1.6: self-hosted editorial typography, WCAG 2.2 AA pass, CSS-driven motion with minimal client JS, next/image pipeline, SEO/metadata/OG/icons/JSON-LD, print stylesheet, ESLint, QA and content audit documents.
- V1.7: typography refinement (lining numerals, case-sensitive caps, text-wrap: pretty, tighter display tracking, 11.5 px labels) and quieter, richer motion (hero entrance, hairline draw-in, eased scroll reveals, mobile menu stagger, tap feedback, clearer filter states).
- V1.8: eight client photographs integrated (profile portrait in the hero, Hotel Agrabad in the hospitality feature) and a new Gallery page with a native-dialog lightbox. Photos converted to WebP (each under 300 KB). Alt/captions live in `lib/gallery.js`.
- V3.0: complete visual and interaction rebuild (see CHANGELOG). Same stack, routes and content; fonts self-hosted; one client motion module; new card system, page mastheads, timeline, filters, gallery, contact actions, 404, icons and OG image.
- V1.9: floating pill navbar (monogram circle, pill link states, solid pill CTA, floating menu card) and pill buttons with backgrounds and a soft lift. This deliberately relaxes the earlier "no large radii / no shadows" rule for buttons and the header only, at the client's request; shadows stay low-opacity, warm and offset.

## Source-of-truth rule
The research dossier is the factual baseline. Current/recent, historical, self-reported and verification-needed material must remain distinguished. Do not invent dates, awards, positions, employers, achievements, statistics, quotes or credentials. Content lives in `lib/content.js` (unchanged from v1.4).

## Technical constraints
- Next.js 14 / React 18; lucide-react is the only runtime dependency beyond Next/React; fonts are local files, not packages.
- No backend, database, authentication, CMS, API or deployment work.
- All colour via tokens in `:root` of `app/globals.css` (audited: zero literals elsewhere); never reintroduce green.
- Motion: transform/opacity only; register new scroll effects in `components/MotionRoot.jsx`; never hide content without the `html.js` guard.

## Open items
- Client assets still needed: a Tourism Hero 2025 certificate/photograph (`public/images/awards/`; the emblem is shown until then) and the research dossier. See `public/images/README.md` and `CONTENT-AUDIT.md`.
- Set `NEXT_PUBLIC_SITE_URL` to the real production origin before deploying.
- Run Lighthouse and a full axe scan on the deployed site (not available in the v3.0 authoring environment; see `QA-REPORT.md`).
