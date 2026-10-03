import Image from "next/image";
import { findImage } from "@/lib/assets";
import Reveal from "@/components/Reveal";
import Emblem from "@/components/Emblem";

// Photograph slot. Shows a real photograph from /public/images (by folder or exact file); when none exists it
// renders `emblem` (a typographic device) if given, else a quiet placeholder. `priority` is for the single LCP
// image (the hero portrait): it is preloaded and skips the reveal. `plate` mounts a white-background photograph
// on a card like a print. `parallax` gives the image a subtle scroll drift (disabled for reduced motion).
export default function ArchivalFrame({
  dir, file, fallbackDir, alt, caption, figure, placeholder, emblem,
  ratio = "4 / 5", priority = false, plate = false, parallax = false,
  sizes = "(max-width: 900px) 92vw, 45vw", position = "50% 30%", delay = 0, className = "",
}) {
  const photo = findImage(dir, file) || (fallbackDir ? findImage(fallbackDir) : null);
  if (!photo && emblem) return <Reveal variant="scale" delay={delay} className={className}><Emblem {...emblem} /></Reveal>;

  const text = photo?.caption ?? caption;
  const img = photo && (
    <Image src={photo.src} alt={photo.alt || alt || ""} fill sizes={sizes} priority={priority} style={{ objectPosition: photo.position || position }} />
  );
  const media = photo
    ? plate
      ? <div className="frame-inner">{img}</div>
      : parallax
        ? <div className="frame-move" data-parallax="0.06">{img}</div>
        : img
    : (
      <div className="frame-empty" role="img" aria-label={placeholder || alt}>
        <span className="frame-mono" aria-hidden="true">HA</span>
        <span className="frame-label">{placeholder}</span>
      </div>
    );

  const body = (
    <>
      <div className="frame-media">{media}</div>
      {(text || figure) && (
        <figcaption>
          <span>{text}</span>
          {figure && <span aria-hidden="true">{figure}</span>}
        </figcaption>
      )}
    </>
  );
  const cls = ["frame", plate && "frame-plate", className].filter(Boolean).join(" ");
  return priority
    ? <figure className={cls} data-state={photo ? "photo" : "placeholder"} style={{ "--ratio": ratio }}>{body}</figure>
    : <Reveal as="figure" variant="mask" delay={delay} className={cls} data-state={photo ? "photo" : "placeholder"} style={{ "--ratio": ratio }}>{body}</Reveal>;
}
