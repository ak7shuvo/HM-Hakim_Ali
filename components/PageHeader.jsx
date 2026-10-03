import Link from "next/link";
import Reveal from "@/components/Reveal";
import Lattice from "@/components/Lattice";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

// Inner-page masthead: breadcrumb, chapter index, title, intro and an optional "On this page" index.
export default function PageHeader({ index, label, title, intro, path, toc }) {
  return (
    <header className="page-header">
      {path && <JsonLd data={breadcrumbJsonLd(label, path)} />}
      <Lattice id="ph-lattice" parallax="-0.05" />
      <div className="container ph-grid">
        <div>
          <nav className="crumbs meta" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><span aria-current="page">{label}</span></li>
            </ol>
          </nav>
          <p className="ph-index hero-in" style={{ "--d": "60ms" }}>
            <span className="t-num">№ {index}</span>
            <span className="meta">{label}</span>
          </p>
          <h1 className="t-h1 page-title hero-in" style={{ "--d": "120ms" }}>{title}</h1>
          {intro && <p className="t-lead page-intro hero-in" style={{ "--d": "220ms" }}>{intro}</p>}
        </div>
        {toc?.length > 0 && (
          <Reveal as="nav" delay={320} className="toc" aria-label="On this page">
            <p className="meta">On this page</p>
            <ol>
              {toc.map((t) => <li key={t.href}><a href={t.href}>{t.label}</a></li>)}
            </ol>
          </Reveal>
        )}
      </div>
    </header>
  );
}
