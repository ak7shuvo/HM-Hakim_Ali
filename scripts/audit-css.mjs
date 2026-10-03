// Dependency-free stylesheet audit. Run: npm run check
//  - class selectors in globals.css that appear nowhere in app/, components/ or lib/
//  - custom properties that are defined but never referenced (and referenced but never defined)
//  - colour literals outside :root
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const css = fs.readFileSync(path.join(root, "app/globals.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
const src = ["app", "components", "lib"].flatMap(function walk(d) {
  return fs.readdirSync(path.join(root, d), { withFileTypes: true }).flatMap((e) => {
    const p = path.join(d, e.name);
    return e.isDirectory() ? walk(p) : /\.(js|jsx)$/.test(e.name) && e.name !== "globals.css" ? [fs.readFileSync(path.join(root, p), "utf8")] : [];
  });
}).join("\n");

const used = (name) => new RegExp(`(^|[^\\w-])${name.replace(/[-]/g, "\\-")}([^\\w-]|$)`).test(src);
const classes = [...new Set([...css.matchAll(/\.([a-zA-Z][\w-]*)/g)].map((m) => m[1]))];
// classes applied at runtime by state/JS or by Next, or via template strings
const dynamic = new Set(["is-in", "js", "motion-ready", "is-tilting", "is-visible", "is-entering", "is-last-visible", "is-feature", "is-unset", "is-red", "is-3", "is-cards", "is-ledger", "on-night", "is-active", "is-condensed", "is-key", "menu-open", "reveal-frame", "frame-dark", "btn-gold", "btn-dark", "btn-outline", "btn-light", "btn-outline-light", "btn-sm", "s-current", "s-documented", "s-historical", "s-self", "s-verify", "js"]);
const unused = classes.filter((c) => !used(c) && !dynamic.has(c));
console.log(unused.length ? `unused classes (${unused.length}): ${unused.join(", ")}` : "unused classes: none");

const defined = new Set([...css.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
const refs = new Set([...css.matchAll(/var\((--[\w-]+)/g)].map((m) => m[1]));
const external = new Set(["--font-display", "--font-sans", "--font-mono", "--ratio", "--d", "--n", "--vi", "--scroll", "--rx", "--ry", "--lift", "--stack", "--gt", "--gx", "--gy", "--gr", "--gs", "--gsf", "--btn-hover"]);
const unusedTokens = [...defined].filter((t) => !refs.has(t) && !external.has(t) && !src.includes(t));
const undef = [...refs].filter((t) => !defined.has(t) && !external.has(t));
console.log(unusedTokens.length ? `unused tokens: ${unusedTokens.join(", ")}` : "unused tokens: none");
console.log(undef.length ? `undefined tokens referenced: ${undef.join(", ")}` : "undefined tokens: none");

const rootEnd = css.indexOf("}", css.indexOf(":root{"));
const outside = (css.slice(rootEnd).match(/#[0-9a-f]{3,8}\b|rgba?\(/gi) || []);
console.log(`colour literals outside :root: ${outside.length}`);
process.exit(unused.length || undef.length || outside.length ? 1 : 0);
