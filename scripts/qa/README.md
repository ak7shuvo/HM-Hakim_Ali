# Browser QA harness (optional)

Python + Playwright scripts used to verify v3.0. Start a production server first (`npm run build && npm run start`), then:

```bash
pip install playwright && playwright install chromium   # once
BASE=http://localhost:3000 python3 scripts/qa/matrix.py     # 10 routes × 10 widths: overflow, h1, ids, alt, names, headings, ≥11px text, reveals, touch targets, nav fit
BASE=http://localhost:3000 python3 scripts/qa/interact.py   # menu focus trap, skip link, header shift, back-to-top, filters, eras, deep links, lightbox, copy, reduced motion, JS-failure fallback, links
BASE=http://localhost:3000 BASE_V2=http://localhost:3200 python3 scripts/qa/content_diff.py   # every v2.0 text node must exist in v3.0
```
