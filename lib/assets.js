import fs from "node:fs";
import path from "node:path";
import { imageMeta } from "@/lib/image-meta";

const IMAGE = /\.(jpe?g|png|webp|avif)$/i;

// Returns { src, alt, caption, position } for a photograph in /public/images, or null.
// `file` ("hospitality/agrabad-03-aerial.webp") picks one exact file; otherwise the first image
// (alphabetical) in /public/images/<dir> is used, so dropping a real photograph into a folder is enough.
export function findImage(dir, file) {
  try {
    let key = file;
    if (!key) {
      const abs = path.join(process.cwd(), "public", "images", dir);
      const first = fs.readdirSync(abs).filter((n) => IMAGE.test(n)).sort()[0];
      if (!first) return null;
      key = `${dir}/${first}`;
    } else if (!fs.existsSync(path.join(process.cwd(), "public", "images", key))) {
      return null;
    }
    const meta = imageMeta[key] || {};
    return { src: `/images/${key}`, alt: meta.alt, caption: meta.caption, position: meta.position };
  } catch {
    return null;
  }
}
