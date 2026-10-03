"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// Floating back-to-top control with a reading-progress ring (ring value is written by MotionRoot).
// Appears after the first screen. Scrolls smoothly (instantly under reduced motion) and moves keyboard
// focus to the skip-link target at the top so focus does not stay at the bottom of the page.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    let last = false;
    const check = () => {
      const next = window.scrollY > window.innerHeight * 0.9;
      if (next !== last) { last = next; setVisible(next); }
    };
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(check); };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); };
  }, []);

  const onClick = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <button type="button" className={`to-top${visible ? " is-visible" : ""}`} onClick={onClick} aria-label="Back to top" tabIndex={visible ? 0 : -1} aria-hidden={visible ? undefined : true} data-scroll-progress="">
      <svg className="ring" viewBox="0 0 54 54" aria-hidden="true"><circle cx="27" cy="27" r="25" /></svg>
      <ArrowUp size={18} strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
