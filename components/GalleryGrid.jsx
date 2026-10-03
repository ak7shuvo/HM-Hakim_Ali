"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Maximize2, ChevronLeft, ChevronRight, X } from "lucide-react";

// Deterministic scatter values so SSR and client match (no Math.random).
function scatterFor(i) {
  const rotations = [-7.5, 5.2, -3.8, 6.4, -5.1, 4.0, -6.2, 3.3, -4.7, 5.8, -2.9, 7.1];
  const x = [-18, 14, -10, 22, -8, 16, -20, 9, -14, 11, -6, 19];
  const y = [12, -16, 8, -10, 18, -7, 14, -12, 6, -15, 10, -9];
  const scale = [1.04, 0.94, 1.02, 0.97, 1.05, 0.93, 1.01, 0.96, 1.03, 0.95, 1.0, 0.98];
  return {
    rotate: rotations[i % rotations.length],
    x: x[i % x.length],
    y: y[i % y.length],
    scale: scale[i % scale.length],
  };
}

const EASE = "cubic-bezier(.22,.7,.2,1)";
const SWIPE_MIN = 48; // px of horizontal travel before a touch swipe changes photograph

// Every photograph interpolates from its scattered pose to identity using one shared variable, --gt
// (0 = scattered, 1 = organized). Scrolling only updates that variable on the <ul>, so the page
// does not re-render per frame; React state changes only when the organized/scattered flag flips.
// --gsf (set in CSS) scales the whole scatter down on narrow screens so photographs never cover captions.
const POSE =
  "translate(calc(var(--gx) * var(--gsf, 1) * (1 - var(--gt, 0))), calc(var(--gy) * var(--gsf, 1) * (1 - var(--gt, 0)))) " +
  "rotate(calc(var(--gr) * var(--gsf, 1) * (1 - var(--gt, 0)))) " +
  "scale(calc(1 + (var(--gs) - 1) * var(--gsf, 1) * (1 - var(--gt, 0))))";

export default function GalleryGrid({ items }) {
  const dialog = useRef(null);
  const galleryRef = useRef(null);
  const frame = useRef(0);
  const lockRef = useRef("auto"); // "auto" follows scroll; "organized" / "scattered" are manual choices
  const reducedRef = useRef(false);
  const swipe = useRef(null);
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [organized, setOrganized] = useState(false);
  const [lock, setLock] = useState("auto");
  const [reduced, setReduced] = useState(false);
  const [shownKey, setShownKey] = useState(null); // key of the lightbox photograph that has faded in

  const count = items?.length ?? 0;
  const step = (d) => { if (count) setIndex((v) => (v + d + count) % count); };
  const open = (n) => {
    setIndex(n);
    setIsOpen(true);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  const cur = items?.[index];

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    else if (e.key === "Home") { e.preventDefault(); setIndex(0); }
    else if (e.key === "End") { e.preventDefault(); setIndex(Math.max(0, count - 1)); }
  };

  // Clicks on the backdrop land on the <dialog> itself, outside its box; clicks on its padding are ignored.
  const onDialogClick = (e) => {
    if (e.target !== dialog.current) return;
    const r = dialog.current.getBoundingClientRect();
    const outside = e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    if (outside) close();
  };

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse") return;
    swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) >= SWIPE_MIN && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
  };

  const apply = useCallback((t) => {
    galleryRef.current?.style.setProperty("--gt", String(t));
    setOrganized(t >= 0.95); // bails out when unchanged, so scrolling does not re-render
  }, []);

  // Scroll-driven progress (0 → 1) relative to the gallery container.
  const measure = useCallback(() => {
    if (lockRef.current !== "auto" || reducedRef.current) return;
    const el = galleryRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const viewH = window.innerHeight || 1;
    // Start transition when top of gallery enters lower half of viewport;
    // finish when gallery is mostly past the middle.
    const start = viewH * 0.55;
    const end = viewH * 0.15;
    const raw = (start - rect.top) / (start - end);
    apply(Math.min(1, Math.max(0, raw)));
  }, [apply]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(measure);
    };
    const sync = () => {
      reducedRef.current = mq.matches;
      setReduced(mq.matches);
      if (mq.matches) apply(1); else measure();
    };
    sync();
    if (mq.addEventListener) mq.addEventListener("change", sync); else mq.addListener(sync);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame.current);
      if (mq.removeEventListener) mq.removeEventListener("change", sync); else mq.removeListener(sync);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [apply, measure]);

  // Page behind the open lightbox must not scroll; the scrollbar's width is kept so nothing shifts.
  useEffect(() => {
    if (!isOpen) return undefined;
    const root = document.documentElement;
    const before = { overflow: root.style.overflow, paddingRight: root.style.paddingRight };
    const gap = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    if (gap > 0) root.style.paddingRight = `${gap}px`;
    return () => {
      root.style.overflow = before.overflow;
      root.style.paddingRight = before.paddingRight;
    };
  }, [isOpen]);

  // Fade each lightbox photograph in. Visibility never waits on the image's load event.
  const curKey = cur?.key;
  useEffect(() => {
    if (!isOpen || curKey == null) return undefined;
    const id = requestAnimationFrame(() => setShownKey(curKey));
    return () => cancelAnimationFrame(id);
  }, [isOpen, curKey]);

  const toggle = () => {
    const next = organized ? "scattered" : "organized";
    lockRef.current = next;
    setLock(next);
    apply(next === "organized" ? 1 : 0);
  };

  if (!count) return null;

  const transition = reduced ? "none" : lock === "auto" ? "transform 0.12s linear" : `transform 0.9s ${EASE}`;
  const photoVisible = reduced || shownKey === cur.key;

  return (
    <>
      <div className="gallery-head">
        <p className="meta">{count} photographs · select any to enlarge</p>
        {!reduced && (
          <button type="button" className="btn btn-outline btn-sm" onClick={toggle} aria-pressed={organized}>
            {organized ? "Scatter again" : "Organize gallery"}
          </button>
        )}
      </div>

      <ul
        className="gallery"
        role="list"
        ref={galleryRef}
        data-organized={organized ? "true" : "false"}
        style={{ position: "relative", "--gt": 0 }}
      >
        {items.map((g, n) => {
          const s = scatterFor(n);
          return (
            <li
              key={g.key}
              className="gallery-item"
              style={{
                "--gx": `${s.x}px`,
                "--gy": `${s.y}px`,
                "--gr": `${s.rotate}deg`,
                "--gs": s.scale,
                transform: POSE,
                transformOrigin: "center center",
                transition,
                zIndex: organized ? 1 : 20,
                willChange: organized ? undefined : "transform",
              }}
            >
              <button
                type="button"
                className="gallery-open"
                onClick={() => open(n)}
                aria-label={`Open photograph ${n + 1} of ${count}: ${g.alt}`}
                aria-haspopup="dialog"
              >
                <Image
                  src={`/images/${g.key}`}
                  alt=""
                  width={g.width}
                  height={g.height}
                  sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 30vw"
                />
                <span className="zoom" aria-hidden="true"><Maximize2 size={16} strokeWidth={1.75} /></span>
              </button>
              <p className="gallery-cap">
                <span className="meta">Fig. {String(n + 1).padStart(2, "0")}</span>
                {g.caption && <span>{g.caption}</span>}
              </p>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Photograph viewer"
        onKeyDown={onKeyDown}
        onClick={onDialogClick}
        onClose={() => setIsOpen(false)}
        style={{ overscrollBehavior: "contain" }}
      >
        {isOpen && (
          <>
            <div className="lb-bar">
              <span role="status">
                {index + 1} / {count}
              </span>
              <button type="button" className="lb-btn" onClick={close}>
                <X size={16} strokeWidth={1.75} aria-hidden="true" /> Close
              </button>
            </div>
            <figure
              className="lb-fig"
              style={{ touchAction: "pan-y" }}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => { swipe.current = null; }}
            >
              <div className="lb-img">
                <Image
                  key={cur.key}
                  src={`/images/${cur.key}`}
                  alt={cur.alt}
                  fill
                  sizes="92vw"
                  style={{ opacity: photoVisible ? 1 : 0, transition: reduced ? "none" : "opacity 0.45s ease" }}
                />
              </div>
              {cur.caption && (
                <figcaption className="lb-cap">{cur.caption}</figcaption>
              )}
            </figure>
            <div className="lb-nav">
              <button
                type="button"
                className="lb-btn"
                onClick={() => step(-1)}
                aria-label="Previous photograph"
              >
                <ChevronLeft size={16} strokeWidth={1.75} aria-hidden="true" /> Previous
              </button>
              <button
                type="button"
                className="lb-btn"
                onClick={() => step(1)}
                aria-label="Next photograph"
              >
                Next <ChevronRight size={16} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
