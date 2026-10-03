"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// One small client module drives every scroll-linked effect, so pages stay server components:
//  · reveals  — IntersectionObserver adds .is-in to [data-reveal] once (never re-hides)
//  · parallax — [data-parallax="<speed>"] drifts with scroll (transform only, rAF-throttled, ≥700px)
//  · tilt     — [data-tilt] follows a fine pointer by a few degrees
//  · progress — [data-scroll-progress] receives --scroll (0–1)
// Everything is skipped under prefers-reduced-motion; content is visible without this module.
export default function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-ready");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let io;
    let frame = 0;
    let parallax = [];
    let progress = [];

    const scan = () => {
      const reveals = Array.from(document.querySelectorAll("[data-reveal]:not(.is-in)"));
      if (reduce || !("IntersectionObserver" in window)) {
        reveals.forEach((el) => el.classList.add("is-in"));
      } else {
        io?.disconnect();
        io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
          });
        }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
        reveals.forEach((el) => io.observe(el));
      }
      parallax = reduce ? [] : Array.from(document.querySelectorAll("[data-parallax]"));
      progress = Array.from(document.querySelectorAll("[data-scroll-progress]"));
    };

    const update = () => {
      frame = 0;
      const vh = window.innerHeight || 1;
      const max = Math.max(1, document.documentElement.scrollHeight - vh);
      const p = Math.min(1, Math.max(0, window.scrollY / max)).toFixed(4);
      progress.forEach((el) => el.style.setProperty("--scroll", p));
      if (window.innerWidth < 700) { parallax.forEach((el) => { el.style.transform = ""; }); return; }
      parallax.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0;
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const offset = (r.top + r.height / 2 - vh / 2) * speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };

    // Tilt (fine pointers only).
    const fine = window.matchMedia("(pointer: fine)").matches;
    const onMove = (e) => {
      const el = e.target.closest?.("[data-tilt]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.classList.add("is-tilting");
      el.style.setProperty("--rx", `${(-y * 2.4).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(x * 3.2).toFixed(2)}deg`);
    };
    const onLeave = (e) => {
      const el = e.target.closest?.("[data-tilt]");
      if (!el || el.contains(e.relatedTarget)) return;
      el.classList.remove("is-tilting");
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
    };

    const start = requestAnimationFrame(() => { scan(); update(); });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    if (fine && !reduce) {
      document.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerout", onLeave, { passive: true });
    }
    return () => {
      cancelAnimationFrame(start);
      cancelAnimationFrame(frame);
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onLeave);
    };
  }, [pathname]);

  return (
    <div className="scroll-progress" aria-hidden="true"><span data-scroll-progress="" /></div>
  );
}
