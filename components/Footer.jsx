"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, site } from "@/lib/content";
import Lattice from "@/components/Lattice";

export default function Footer() {
  const pathname = usePathname() || "";
  const current = (href) => (pathname === href ? "page" : undefined);
  return (
    <footer className="site-footer on-night">
      <Lattice id="footer-lattice" />
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <p className="footer-name">H. M. <em>Hakim Ali</em></p>
            <p>{site.positioning}</p>
          </div>
          <nav className="footer-col" aria-label="Footer">
            <h2 className="meta">Portfolio</h2>
            <ul role="list">
              <li><Link href="/" aria-current={current("/")}>Home</Link></li>
              {navLinks.map((l) => <li key={l.href}><Link href={l.href} aria-current={current(l.href)}>{l.label}</Link></li>)}
            </ul>
          </nav>
          <div className="footer-col">
            <h2 className="meta">Connect</h2>
            <ul role="list">
              <li><Link href="/contact" aria-current={current("/contact")}>Contact</Link></li>
              <li><a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗<span className="visually-hidden"> (opens in a new tab)</span></a></li>
            </ul>
            <p className="meta" style={{ marginTop: 24 }}>{site.location}<br />{site.coordinates}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="meta">© 2026 {site.name}</span>
          <span className="meta">Professional Legacy Portfolio · v{site.version}</span>
        </div>
      </div>
    </footer>
  );
}
