import Link from "next/link";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import ArchivalFrame from "@/components/ArchivalFrame";
import LedgerRow from "@/components/LedgerRow";
import Status from "@/components/Status";
import Reveal from "@/components/Reveal";
import Timeline from "@/components/Timeline";
import JsonLd from "@/components/JsonLd";
import { currentRoles, recognitions, site, stats, timeline } from "@/lib/content";
import { pageMetadata, personJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  description: "H. M. Hakim Ali is a veteran Bangladesh tourism and hospitality professional whose career spans hotel leadership, business, industry representation, international tourism networking and honorary consular service.",
  path: "/",
});

const byPeriod = (p) => timeline.find((t) => t.period === p);
const hospitality = ["1969", "1971", "2003"].map(byPeriod);
const journey = ["1969", "1991", "2008", "2012", "2020", "2026"].map(byPeriod);
const international = ["2003", "2020", "2023"].map(byPeriod);
const consul = currentRoles.find((r) => r.category === "International");
const leadership = currentRoles.filter((r) => r.category !== "International");
const hero = recognitions.find((r) => r.year === "2025");
const scope = [
  { title: "Hospitality", text: "Decades of association with Hotel Agrabad and the wider hotel industry." },
  { title: "Business", text: "Corporate leadership including current and historical board roles." },
  { title: "Industry", text: "Association leadership, tourism advocacy and stakeholder dialogue." },
  { title: "International", text: "Honorary consular representation and global tourism networking." },
];

export default function Home() {
  return <>
    <section className="hero" aria-labelledby="hero-title">
      <JsonLd data={personJsonLd()} />
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" aria-hidden="true" />Professional legacy portfolio · {site.location}</p>
          <h1 id="hero-title" className="h-display"><span>H. M.</span>{" "}<span>Hakim Ali</span></h1>
          <p className="hero-roles">{site.positioning.split(" · ").map((r) => <span key={r}>{r}</span>)}</p>
          <p className="lead">{site.name} is a veteran Bangladesh tourism and hospitality professional whose career spans hotel leadership, business, industry representation, international tourism networking and honorary consular service.</p>
          <div className="btn-row"><Button href="/career">Explore the journey</Button><Button href="/about" variant="outline-light" icon={false}>Professional profile</Button></div>
        </div>
        <ArchivalFrame dark priority dir="portrait" fallbackDir="hero" alt={`Portrait of ${site.name}`} placeholder="Portrait — to be supplied" caption={site.location} ratio="4 / 5" position="50% 22%" sizes="(max-width: 900px) 80vw, 32vw" />
      </div>
      <div className="container hero-facts" aria-label="At a glance">{stats.map((s) => <div className="fact" key={s.value}><span className="fact-value">{s.value}</span><span className="fact-label">{s.label}</span><span className="fact-note">{s.note}</span></div>)}</div>
    </section>

    <section className="section container" aria-label="Executive overview">
      <div className="split">
        <SectionHeading index="01" label="Executive overview">A career built on <em>hospitality, leadership</em> and connection.</SectionHeading>
        <Reveal delay={120} className="prose">
          <p>From a long association with Hotel Agrabad in Chattogram to leadership across tourism associations, business organisations and international networks, the public record documents a career with several overlapping dimensions.</p>
          <p>The portfolio distinguishes current roles, historical positions, self-reported milestones and claims awaiting verification rather than presenting them as one undifferentiated résumé.</p>
          <Button href="/about" variant="outline">Read the profile</Button>
        </Reveal>
      </div>
      <div className="domain-grid">{scope.map((d, i) => <Reveal key={d.title} delay={i * 80} className="domain"><span className="domain-num">{String(i + 1).padStart(2, "0")}</span><h3>{d.title}</h3><p>{d.text}</p></Reveal>)}</div>
    </section>

    <section className="section band-cream" aria-label="Hospitality legacy">
      <div className="container feature">
        <ArchivalFrame dir="hospitality" fallbackDir="general" alt="Hotel Agrabad, Chattogram" placeholder="Hotel Agrabad photograph — to be supplied" caption="Hotel Agrabad · Chattogram" ratio="5 / 6" position="50% 40%" sizes="(max-width: 900px) 92vw, 44vw" />
        <div>
          <SectionHeading index="02" label="Hospitality legacy">Hotel Agrabad, a <em>central institution</em> in the story.</SectionHeading>
          <Reveal delay={120} className="prose prose-lead"><p>Hotel Agrabad in Chattogram is a central institution in this professional story. Later roles extend into business leadership, tourism associations, international networking and public tourism-sector dialogue.</p></Reveal>
          <ol className="mini-chron" role="list">{hospitality.map((h, i) => <Reveal as="li" key={h.period} delay={i * 90}><b>{h.period}</b><div><h3>{h.title}</h3><p>{h.text}</p></div></Reveal>)}</ol>
        </div>
      </div>
    </section>

    <section className="section container" aria-label="Career journey">
      <div className="heading-row"><SectionHeading index="03" label="Career journey">Legacy, leadership and <em>a lifetime in tourism.</em></SectionHeading><span className="status s-documented">1969 — 2026</span></div>
      <div className="section-body"><Timeline items={journey} /></div>
      <div className="section-link"><Button href="/career" variant="outline">View full timeline</Button></div>
    </section>

    <section className="section container band-line" aria-label="Current leadership">
      <SectionHeading index="04" label="Current leadership">Roles shaping <em>the present.</em></SectionHeading>
      <div className="ledger section-body">{leadership.map((r, i) => <LedgerRow key={r.organization} i={i} label={r.category} status={r.status} title={r.title} org={r.organization} text={r.text} />)}</div>
    </section>

    <section className="section band-cream" aria-label="International engagement">
      <div className="container intl">
        <div>
          <SectionHeading index="05" label="International engagement">Representation and networks <em>beyond Bangladesh.</em></SectionHeading>
          <Reveal className="geo" delay={150}>
            <svg viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="96" /><circle cx="100" cy="100" r="68" /><circle cx="100" cy="100" r="40" /><ellipse cx="100" cy="100" rx="40" ry="96" /><ellipse cx="100" cy="100" rx="78" ry="96" /><line x1="4" y1="100" x2="196" y2="100" /><path d="M14 66 Q100 84 186 66" /><path d="M14 134 Q100 116 186 134" /><circle className="dot" cx="118" cy="92" r="3" /></svg>
            <span className="geo-label">Chattogram<br />22.36° N · 91.78° E</span>
          </Reveal>
        </div>
        <div>
          <Reveal className="consul">
            <span className="ledger-label">{consul.title}</span>
            <h3 className="consul-role">{consul.organization}</h3>
            <Status text={consul.status} />
            <p className="consul-text">{consul.text}</p>
          </Reveal>
          <ol className="mini-chron" role="list">{international.map((h, i) => <Reveal as="li" key={h.period} delay={i * 90}><b>{h.period}</b><div><h3>{h.title}</h3><p>{h.text}</p></div></Reveal>)}</ol>
        </div>
      </div>
    </section>

    <section className="section band-dark" aria-label="Featured recognition">
      <div className="container award-feature">
        <div>
          <SectionHeading index="06" label="Recognition" light>A journey marked by <em>documented recognition.</em></SectionHeading>
          <Reveal delay={100}><div className="award-year" aria-hidden="true">{hero.year}</div></Reveal>
          <Reveal delay={160}>
            <h3 className="award-title">{hero.title}</h3>
            <p className="award-org">{hero.organization}</p>
            <Status text={hero.status} />
            <p className="award-text">{hero.text}</p>
            <Link className="link-arrow" href="/achievements">Recognition archive</Link>
          </Reveal>
        </div>
        <ArchivalFrame dark dir="awards" alt="Tourism Hero recognition, World Tourism Network, 2025" placeholder="Certificate or photograph — to be supplied" caption="Tourism Hero · World Tourism Network · 2025" ratio="4 / 5" position="50% 35%" sizes="(max-width: 900px) 88vw, 38vw" />
      </div>
    </section>

    <section className="section container" aria-label="Contact">
      <div className="cta">
        <SectionHeading index="07" label="Professional connection">Connect with <em>{site.name}.</em></SectionHeading>
        <Reveal delay={120}><p>Professional enquiries, tourism partnerships and media requests can be directed through the contact page. Contact details are presented only where confirmed in the project source material.</p><div className="btn-row"><Button href="/contact" variant="dark">Contact</Button></div></Reveal>
      </div>
    </section>
  </>;
}
