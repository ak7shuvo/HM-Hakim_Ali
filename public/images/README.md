# Photographs

Drop **one or more** files (jpg, png, webp, avif) into a folder; the first file (alphabetical) is used.

| Folder | Used for |
|---|---|
| `portrait/` (or `hero/`) | Home hero portrait (the only `priority` image) |
| `hospitality/` (or `general/`) | Hotel Agrabad feature on Home |
| `awards/` | 2025 Tourism Hero feature (Home + Recognition) |
| `international/`, `events/`, `gallery/`, `timeline/` | Reserved; no slot renders until a real photograph is placed and a slot is wired |

Rules: real photographs only (no stock or generated imagery). Keep originals out of the repo; export web sizes
(long edge about 2000 px, ideally under ~300 KB) and let `next/image` produce AVIF/WebP.

Then add an entry to `lib/image-meta.js`:

```js
"portrait/portrait-01.jpg": { alt: "What is visibly in the photograph", position: "50% 20%" },
```
`alt` must describe only what is visible (no invented names, dates or events). Add `caption` only where the source supports it.
`position` is the CSS object-position; use a low Y value (for example `50% 20%`) so faces are not cropped in the 4/5, 5/6 and mobile frames.
