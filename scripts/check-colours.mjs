// Dependency-free palette guard. Run: npm run check
//  1. Scans source for colour literals and reports any whose hue is in the green family.
//  2. Scans for the words green / emerald / teal / mint / lime (prose mentions in docs are listed, not failed).
//  3. Computes WCAG contrast for the token pairs the stylesheet actually uses.
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const SKIP = new Set(["node_modules", ".next", ".git", "package-lock.json"]);
const TEXT = /\.(js|jsx|mjs|css|json|md|svg|html|txt|webmanifest)$/i;
function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out); else if (TEXT.test(name)) out.push(full);
  }
  return out;
}

const hexToRgb = (h) => { h = h.replace("#", ""); if (h.length === 3) h = [...h].map((c) => c + c).join(""); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)); };
function hue([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  if (d === 0) return { h: 0, s: 0 };
  const l = (max + min) / 2, s = d / (1 - Math.abs(2 * l - 1));
  let h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  h = (h * 60 + 360) % 360;
  return { h, s };
}
const isGreen = (rgb) => { const { h, s } = hue(rgb); return s > 0.12 && h >= 75 && h <= 175; };

let failures = 0;
const files = walk(root);
const literal = /#[0-9a-f]{8}\b|#[0-9a-f]{6}\b|#[0-9a-f]{3}\b|rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+/gi;
let literals = 0;
for (const f of files) {
  if (/\.(md)$/i.test(f)) continue;
  const text = fs.readFileSync(f, "utf8");
  for (const m of text.match(literal) || []) {
    literals++;
    const rgb = m.startsWith("#") ? hexToRgb(m.slice(0, 7)) : m.match(/\d+/g).slice(0, 3).map(Number);
    if (isGreen(rgb)) { failures++; console.log(`GREEN literal ${m} in ${path.relative(root, f)}`); }
  }
}
console.log(`colour literals scanned: ${literals}; green-family literals: ${failures}`);

const words = /\b(green|emerald|teal|mint|lime)\b/gi;
const prose = [];
for (const f of files) {
  const text = fs.readFileSync(f, "utf8");
  text.split("\n").forEach((line, i) => { if (words.test(line)) { const rel = path.relative(root, f); if (/\.md$/i.test(f) && !/^scripts/.test(rel)) prose.push(`${rel}:${i + 1}`); else if (!/scripts\/check-colours/.test(rel)) { failures++; console.log(`GREEN word in ${rel}:${i + 1}`); } } words.lastIndex = 0; });
}
console.log(`prose mentions in docs (rule statements / changelog history): ${prose.length}${prose.length ? " → " + prose.join(", ") : ""}`);

// ---- contrast on real token pairs
const css = fs.readFileSync(path.join(root, "app/globals.css"), "utf8");
const rootBlock = css.slice(css.indexOf(":root{"), css.indexOf("}", css.indexOf(":root{")));
const tok = {};
for (const m of rootBlock.matchAll(/--([\w-]+):\s*(#[0-9a-f]{3,6}|rgba?\([^)]*\))/gi)) tok[m[1]] = m[2];
const parse = (v) => v.startsWith("#") ? { rgb: hexToRgb(v), a: 1 } : (() => { const n = v.match(/[\d.]+/g).map(Number); return { rgb: n.slice(0, 3), a: n[3] ?? 1 }; })();
const over = (fg, bg) => fg.rgb.map((c, i) => Math.round(c * fg.a + bg[i] * (1 - fg.a)));
const lum = ([r, g, b]) => { const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const T = (n) => parse(tok[n]);
const pairs = [
  // [label, fg token, bg token, min ratio]
  ["body · ink on paper", "ink", "paper", 4.5], ["body · ink on paper-2", "ink", "paper-2", 4.5], ["body · ink on card", "ink", "card", 4.5],
  ["copy · ink-2 on paper", "ink-2", "paper", 4.5], ["copy · ink-2 on paper-2", "ink-2", "paper-2", 4.5], ["copy · ink-2 on card", "ink-2", "card", 4.5],
  ["meta · ink-3 on paper", "ink-3", "paper", 4.5], ["meta · ink-3 on paper-2", "ink-3", "paper-2", 4.5], ["meta · ink-3 on card", "ink-3", "card", 4.5],
  ["accent · brass-ink on paper", "brass-ink", "paper", 4.5], ["accent · brass-ink on paper-2", "brass-ink", "paper-2", 4.5], ["accent · brass-ink on card", "brass-ink", "card", 4.5],
  ["key · oxblood on paper", "oxblood", "paper", 4.5], ["status current · oxblood on oxblood-soft", "oxblood", "oxblood-soft", 4.5],
  ["status verify · amber on card", "amber", "card", 4.5], ["status verify · amber on paper-2", "amber", "paper-2", 4.5],
  ["active chip · paper on ink", "paper", "ink", 4.5], ["button hover · paper on oxblood", "paper", "oxblood", 4.5],
  ["button · night on brass", "night", "brass", 4.5], ["button hover · night on champagne", "night", "champagne", 4.5],
  ["dark · bone on night", "bone", "night", 4.5], ["dark copy · on-night on night", "on-night", "night", 4.5], ["dark meta · on-night-2 on night", "on-night-2", "night", 4.5],
  ["dark accent · champagne on night", "champagne", "night", 4.5], ["dark accent · champagne on night-2", "champagne", "night-2", 4.5],
  ["decorative UI · brass on paper (dots/rules)", "brass", "paper", 2.5],
];
let cfail = 0;
console.log("\ncontrast (WCAG 2.2):");
for (const [label, f, b, min] of pairs) {
  const bg = parse(tok[b]).rgb; const fg = over(T(f), bg); const r = ratio(fg, bg);
  const ok = r >= min; if (!ok) { cfail++; failures++; }
  console.log(`${ok ? "PASS" : "FAIL"}  ${r.toFixed(2).padStart(5)}:1  (min ${min})  ${label}`);
}
console.log(`\ncontrast failures: ${cfail}`);
process.exit(failures ? 1 : 0);
