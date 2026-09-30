"use client";
import { useRef, useState } from "react";
import Image from "next/image";

// Masonry-style thumbnails + a lightbox built on the native <dialog>: showModal() gives focus containment,
// Esc-to-close and focus restoration to the opening button. Arrow keys step through photographs.
export default function GalleryGrid({ items }) {
  const dialog = useRef(null);
  const [index, setIndex] = useState(0);
  const step = (d) => setIndex((v) => (v + d + items.length) % items.length);
  const open = (n) => { setIndex(n); dialog.current?.showModal(); };
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
  };
  const cur = items[index];
  return <>
    <ul className="gallery" role="list">
      {items.map((g, n) => (
        <li key={g.key} className="gallery-item">
          <button type="button" className="gallery-open" onClick={() => open(n)} aria-label={`Open photograph ${n + 1} of ${items.length}: ${g.alt}`}>
            <Image src={`/images/${g.key}`} alt="" width={g.width} height={g.height} sizes="(max-width: 700px) 92vw, 46vw" />
          </button>
          {g.caption && <p className="gallery-cap">{g.caption}</p>}
        </li>
      ))}
    </ul>
    <dialog ref={dialog} className="lightbox" aria-label="Photograph viewer" onKeyDown={onKeyDown}>
      <div className="lb-bar">
        <span role="status">{index + 1} / {items.length}</span>
        <button type="button" className="lb-btn" onClick={() => dialog.current?.close()}>Close</button>
      </div>
      <figure className="lb-fig">
        <div className="lb-img"><Image key={cur.key} src={`/images/${cur.key}`} alt={cur.alt} fill sizes="92vw" /></div>
        {cur.caption && <figcaption className="lb-cap">{cur.caption}</figcaption>}
      </figure>
      <div className="lb-nav">
        <button type="button" className="lb-btn" onClick={() => step(-1)} aria-label="Previous photograph">Previous</button>
        <button type="button" className="lb-btn" onClick={() => step(1)} aria-label="Next photograph">Next</button>
      </div>
    </dialog>
  </>;
}
