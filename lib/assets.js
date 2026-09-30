import fs from "node:fs";
import path from "node:path";
import { imageMeta } from "@/lib/image-meta";

const IMAGE = /\.(jpe?g|png|webp|avif)$/i;

// Returns the first image found in /public/images/<dir> as { src, alt, caption, position }, or null.
// Drop real photographs into those folders and they appear automatically (optimised by next/image).
export function findImage(dir) {
  try {
    const abs = path.join(process.cwd(), "public", "images", dir);
    const file = fs.readdirSync(abs).filter((n) => IMAGE.test(n)).sort()[0];
    if (!file) return null;
    const meta = imageMeta[`${dir}/${file}`] || {};
    return { src: `/images/${dir}/${file}`, alt: meta.alt, caption: meta.caption, position: meta.position };
  } catch {
    return null;
  }
}
