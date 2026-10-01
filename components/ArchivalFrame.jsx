import Image from "next/image";
import { findImage } from "@/lib/assets";
import Reveal from "@/components/Reveal";

// Archival photo slot. Shows the first real photograph found in /public/images/<dir> (or fallbackDir),
// otherwise an intentional placeholder. `priority` is for the hero portrait only: it is preloaded and
// skips the reveal so it can paint (and count for LCP) immediately.
export default function ArchivalFrame({ dir, fallbackDir, alt, caption, placeholder, ratio = "4 / 5", dark = false, priority = false, sizes = "(max-width: 900px) 92vw, 45vw", position = "50% 30%", delay = 0, className = "" }) {
  const photo = findImage(dir) || (fallbackDir ? findImage(fallbackDir) : null);
  const cls = ["frame", dark && "frame-dark", className].filter(Boolean).join(" ");
  const text = photo?.caption ?? caption;
  const state = photo ? "photo" : "placeholder";
  const body = <>
    <div className="frame-media">
      {photo
        ? <Image src={photo.src} alt={photo.alt || alt || ""} fill sizes={sizes} priority={priority} style={{ objectPosition: photo.position || position }} />
        : <div className="frame-empty" role="img" aria-label={placeholder || alt}><span className="frame-mono" aria-hidden="true">HA</span><span className="frame-label">{placeholder}</span></div>}
    </div>
    {text && <figcaption>{text}</figcaption>}
  </>;
  return priority
    ? <figure className={cls} data-state={state} style={{ "--ratio": ratio }}>{body}</figure>
    : <Reveal as="figure" delay={delay} className={`${cls} reveal-frame`} data-state={state} style={{ "--ratio": ratio }}>{body}</Reveal>;
}
