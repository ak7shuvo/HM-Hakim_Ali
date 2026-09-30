import Link from "next/link";
import { navLinks, site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand"><strong>{site.name}</strong><p>{site.positioning}</p></div>
        <nav className="footer-nav" aria-label="Footer">{navLinks.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}<Link href="/contact">Contact</Link></nav>
        <div className="footer-bottom"><span>© 2026 {site.name}</span><span>Professional Legacy Portfolio · v{site.version}</span></div>
      </div>
    </footer>
  );
}
