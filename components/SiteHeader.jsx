"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/lib/content";

const DESKTOP_MIN = 1241; // keep in sync with the @media (max-width:1240px) nav breakpoint in globals.css

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef(null);
  const menuRef = useRef(null);
  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

  // Close on route change.
  useEffect(() => { setOpen(false); }, [pathname]);

  // Discreet condensed state once the page has scrolled. Only sets state when the value flips.
  useEffect(() => {
    let frame = 0;
    let last = false;
    const check = () => {
      const next = window.scrollY > 32;
      if (next !== last) { last = next; setCondensed(next); }
    };
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(check); };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); };
  }, []);

  // Open menu: move focus in, contain Tab, close on Esc (focus back to toggle), lock scroll,
  // make the page behind inert, and close if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (!open) return undefined;
    const behind = Array.from(document.querySelectorAll("main, .site-footer"));
    behind.forEach((el) => el.setAttribute("inert", ""));
    document.body.classList.add("menu-open");
    menuRef.current?.querySelector("a[href]")?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") { event.preventDefault(); setOpen(false); toggleRef.current?.focus(); return; }
      if (event.key !== "Tab") return;
      const stops = [toggleRef.current, ...menuRef.current.querySelectorAll("a[href]")].filter(Boolean);
      const first = stops[0];
      const last = stops[stops.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    const onResize = () => { if (window.innerWidth >= DESKTOP_MIN) setOpen(false); };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      behind.forEach((el) => el.removeAttribute("inert"));
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <header className={`site-header-wrap ${condensed ? "is-condensed" : ""}`.trim()}>
      <div className="site-header container">
        <Link className="brand" href="/" aria-label={`${site.name} — home`}>
          <span className="brand-mark" aria-hidden="true">{site.initials}</span>
          <span className="brand-text"><strong>{site.name}</strong></span>
        </Link>
        <nav className="nav-desktop" aria-label="Primary">{navLinks.map((l) => <Link key={l.href} href={l.href} className={isActive(l.href) ? "is-active" : ""} aria-current={isActive(l.href) ? "page" : undefined}>{l.label}</Link>)}</nav>
        <Link className="btn btn-dark btn-sm nav-cta" href="/contact">Connect</Link>
        <button ref={toggleRef} type="button" className="nav-toggle" aria-label="Menu" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((v) => !v)}>{open ? <X size={20} strokeWidth={1.5} aria-hidden="true" /> : <Menu size={20} strokeWidth={1.5} aria-hidden="true" />}</button>
      </div>
      {open && <nav id="mobile-nav" ref={menuRef} className="nav-mobile" aria-label="Primary">{navLinks.map((l) => <Link key={l.href} href={l.href} className={isActive(l.href) ? "is-active" : ""} aria-current={isActive(l.href) ? "page" : undefined}>{l.label}</Link>)}<Link className="btn btn-gold" href="/contact">Connect</Link></nav>}
    </header>
  );
}
