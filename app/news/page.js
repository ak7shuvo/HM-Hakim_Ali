import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import NewsCard from "@/components/NewsCard";
import NewsFilters from "@/components/NewsFilters";
import { institutionalReferences, newsCategories, newsEditorialNote, newsIntro, newsSorted } from "@/lib/news";
import { pageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

export const metadata = pageMetadata({
  title: "News & Media",
  description: "National and international media coverage of H. M. Hakim Ali's tourism and hospitality leadership, 2025–2026, with links to the original articles.",
  path: "/news",
});

const years = Array.from(new Set(newsSorted.map((n) => n.date.slice(0, 4))));
// Only categories that actually have coverage are offered as filters, in the dossier's order.
const categories = newsCategories.filter((c) => newsSorted.some((n) => n.categories.includes(c)));
const publications = new Set(newsSorted.map((n) => n.publication));
const span = `${years[years.length - 1]}–${years[0]}`;

const entries = newsSorted.map((item) => ({
  id: item.id,
  year: item.date.slice(0, 4),
  categories: item.categories,
  node: <NewsCard item={item} />,
}));

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "News & media coverage — H. M. Hakim Ali",
  url: `${siteUrl}/news`,
  itemListElement: newsSorted.map((n, i) => ({ "@type": "ListItem", position: i + 1, url: n.url, name: n.headline })),
};

export default function News() {
  return (
    <>
      <JsonLd data={itemList} />
      <PageHeader
        index="08"
        label="News & Media"
        path="/news"
        title="News & media coverage."
        intro={newsIntro}
        toc={[
          { href: "#coverage", label: "Coverage archive" },
          { href: "#references", label: "Institutional references" },
        ]}
      />

      <section className="section" id="coverage" aria-labelledby="coverage-heading">
        <div className="container">
          <div className="heading-row">
            <SectionHeading index="01" label="Coverage archive" id="coverage-heading">
              Reported in <em>the press.</em>
            </SectionHeading>
            <Reveal as="dl" delay={120} className="news-stats" aria-label="Archive at a glance">
              <div><dt className="meta">Articles</dt><dd className="t-num">{newsSorted.length}</dd></div>
              <div><dt className="meta">Publications</dt><dd className="t-num">{publications.size}</dd></div>
              <div><dt className="meta">Period</dt><dd className="t-num">{span}</dd></div>
            </Reveal>
          </div>
          <NewsFilters entries={entries} years={years} categories={categories} />
          <Reveal as="p" className="news-note">{newsEditorialNote}</Reveal>
        </div>
      </section>

      <section className="section band-paper2" id="references" aria-labelledby="references-heading">
        <div className="container">
          <SectionHeading index="02" label="Institutional references" id="references-heading"
            intro="Official and organisational profiles, kept separate from press coverage.">
            Institutional <em>references.</em>
          </SectionHeading>
          <ul className="ref-grid" role="list">
            {institutionalReferences.map((r, i) => (
              <Reveal as="li" key={r.id} delay={i * 90} style={{ display: "grid" }}>
                <article className="card card-hover ref-card" aria-labelledby={`${r.id}-h`}>
                  <p className="meta">{r.kind}</p>
                  <h3 className="ref-title" id={`${r.id}-h`}>{r.name}</h3>
                  <p className="news-summary">{r.summary}</p>
                  <a className="news-read" href={r.url} target="_blank" rel="noopener noreferrer">
                    <span>Visit reference</span><span aria-hidden="true" className="news-arrow">↗</span>
                    <span className="visually-hidden">: {r.name} (opens in a new tab)</span>
                  </a>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
