# Photographs

Drop **one or more** files (jpg, png, webp, avif) into a folder; the first file (alphabetical) is used by that slot.

| Folder | Used for |
|---|---|
| `portrait/` (or `hero/`) | Home hero portrait (the only `priority` image), About profile plate, OG image source |
| `hospitality/` (or `general/`) | Hotel Agrabad feature on Home (first file = large frame; `agrabad-03-aerial.webp` = inset frame) |
| `awards/` | 2025 Tourism Hero feature (Home + Recognition). **Empty today:** a typographic emblem built only from the recognition's title, organisation and year is shown instead. Add a real certificate photograph here and it replaces the emblem automatically. |
| `events/`, `timeline/` | Shown on the Gallery page via `lib/gallery.js` |
| `international/`, `gallery/` | Reserved; no slot renders until a real photograph is placed and a slot is wired |

Rules: real photographs only (no stock or generated imagery). Keep originals out of the repo; export web sizes
(long edge about 2000 px, ideally under ~300 KB) and let `next/image` produce AVIF/WebP.

Then add an entry to `lib/gallery.js` (the single source for alt text, captions, crop and dimensions):

```js
{ key: "awards/tourism-hero-2025.webp", width: 1600, height: 2000, alt: "What is visibly in the photograph", caption: null, position: "50% 30%" },
```
`alt` must describe only what is visible (no invented names, dates or events). Add `caption` only where the source supports it.
`position` is the CSS object-position; use a low Y value (for example `50% 20%`) so faces are not cropped.
