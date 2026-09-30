# PROJECT STATE — H. M. HAKIM ALI PORTFOLIO

## Version
V1.9

## Current direction
Professional legacy portfolio with the v1.5 creamy-golden editorial design system (warm ivory, cream, champagne, muted antique gold, charcoal). Green has been removed completely.

## Completed
- V1.1: page architecture, responsive visual system, career timeline, experience/education/recognition presentation.
- V1.2: active navigation, mobile menu, scroll progress, restrained motion, focus states, reduced-motion support.
- V1.3: career-era navigation, archive category filters, status hierarchy.
- V1.4: domain storytelling on About, archive/status explanation, contact conversion surface.
- V1.5: full visual redesign — token-based colour system, editorial typography, ledger/timeline layouts, archival image frames, hospitality and international sections, featured 2025 Tourism Hero, quiet motion, responsive QA.

- V1.6: self-hosted editorial typography, WCAG 2.2 AA pass, CSS-driven motion with minimal client JS, next/image pipeline, SEO/metadata/OG/icons/JSON-LD, print stylesheet, ESLint, QA and content audit documents.
- V1.7: typography refinement (lining numerals, case-sensitive caps, text-wrap: pretty, tighter display tracking, 11.5 px labels) and quieter, richer motion (hero entrance, hairline draw-in, eased scroll reveals, mobile menu stagger, tap feedback, clearer filter states).
- V1.8: eight client photographs integrated (profile portrait in the hero, Hotel Agrabad in the hospitality feature) and a new Gallery page with a native-dialog lightbox. Photos converted to WebP (each under 300 KB). Alt/captions live in `lib/gallery.js`.
- V1.9: floating pill navbar (monogram circle, pill link states, solid pill CTA, floating menu card) and pill buttons with backgrounds and a soft lift. This deliberately relaxes the earlier "no large radii / no shadows" rule for buttons and the header only, at the client's request; shadows stay low-opacity, warm and offset.

## Source-of-truth rule
The research dossier is the factual baseline. Current/recent, historical, self-reported and verification-needed material must remain distinguished. Do not invent dates, awards, positions, employers, achievements, statistics, quotes or credentials. Content lives in `lib/content.js` (unchanged from v1.4).

## Technical constraints
- Next.js 14 / React 18; lucide-react only; only dev dependencies added (eslint, eslint-config-next).
- No backend, database, authentication, CMS, API or deployment work.
- All colour via tokens in `app/globals.css`; never reintroduce green.

## Open items
- Client assets still needed: photographs (portrait, hospitality, awards, optional international) and the research dossier. Placeholders and `lib/content.js` wording are unchanged. See `public/images/README.md` and `CONTENT-AUDIT.md`.
- Run `npm install` once to refresh `package-lock.json` for the ESLint devDependencies, then `npm run lint` and `npm run build`; run Lighthouse and axe on the built site (not run in the v1.6 authoring environment; see `QA-REPORT.md`).
- Set `NEXT_PUBLIC_SITE_URL` to the real production origin before deploying.
