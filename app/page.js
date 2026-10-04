import Link from "next/link";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import ArchivalFrame from "@/components/ArchivalFrame";
import RoleCard from "@/components/RoleCard";
import Status from "@/components/Status";
import Reveal from "@/components/Reveal";
import Lattice from "@/components/Lattice";
import { JourneyPreview } from "@/components/Timeline";
import JsonLd from "@/components/JsonLd";
import { currentRoles, nbsp, recognitions, site, stats, timeline } from "@/lib/content";
import { pageMetadata, personJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  description:
    "H. M. Hakim Ali — Bangladesh tourism and hospitality professional: hotel leadership, business, industry representation and international engagement.",
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

const hotelAward = {
  hotel: "Hotel Agrabad",
  title: "Best Four-Star Hotel",
  award: "Bangladesh Tourism Award 2026",
  presenter: "Bangladesh Tourism Board",
};

const hotelAwardCss = `
.hosp-award{
  position:relative;
  margin:1.75rem 0 .5rem;
  padding:1.15rem 1.3rem 1.15rem 1.5rem;
  display:grid;
  grid-template-columns:auto minmax(0,1fr);
  gap:1rem 1.2rem;
  align-items:center;
  background:linear-gradient(135deg,#fbf6ea 0%,#f3ead6 100%);
  border:1px solid rgba(176,141,87,.45);
  color:#17130e;
  box-shadow:0 1px 0 rgba(255,255,255,.7) inset,0 10px 28px -18px rgba(23,19,14,.35);
}
.hosp-award::before{
  content:"";
  position:absolute;
  left:0;top:0;bottom:0;
  width:3px;
  background:linear-gradient(180deg,#c9a66b,#9a7842);
}
.hosp-award::after{
  content:"";
  position:absolute;
  inset:4px;
  border:1px solid rgba(176,141,87,.22);
  pointer-events:none;
}
.hosp-award__seal{
  width:3.5rem;height:3.5rem;
  display:grid;place-items:center;
  border-radius:50%;
  color:#c9a66b;
  background:#17130e;
  border:1px solid #9a7842;
  box-shadow:0 0 0 3px #f6eedc,0 0 0 4px rgba(176,141,87,.55);
  flex-shrink:0;
}
.hosp-award__seal svg{width:1.55rem;height:1.55rem;display:block}
.hosp-award__body{min-width:0}
.hosp-award__kicker{
  margin:0 0 .35rem;
  display:flex;align-items:center;gap:.6rem;
  font-size:.68rem;
  letter-spacing:.2em;
  text-transform:uppercase;
  color:#8a6a36;
  font-weight:600;
}
.hosp-award__kicker::after{
  content:"";
  flex:1;
  height:1px;
  background:linear-gradient(90deg,rgba(176,141,87,.6),transparent);
}
.hosp-award__title{
  margin:0;
  font-size:clamp(1.25rem,2.4vw,1.6rem);
  line-height:1.15;
  font-weight:500;
  letter-spacing:-.005em;
  color:#17130e;
}
.hosp-award__sub{
  margin:.35rem 0 0;
  font-size:.92rem;
  line-height:1.4;
  color:#3b3328;
}
.hosp-award__sub strong{font-weight:600;color:#17130e}
.hosp-award__foot{
  margin:.7rem 0 0;
  padding-top:.6rem;
  border-top:1px solid rgba(176,141,87,.35);
  display:flex;flex-wrap:wrap;gap:.25rem .9rem;
  font-size:.7rem;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:#6e5a3a;
}
.hosp-award__foot b{font-weight:600;color:#17130e}
@media (max-width:520px){
  .hosp-award{
    grid-template-columns:1fr;
    padding:1.1rem 1.1rem 1.1rem 1.35rem;
    gap:.85rem;
  }
  .hosp-award__seal{width:3rem;height:3rem}
  .hosp-award__seal svg{width:1.3rem;height:1.3rem}
}
`;

export default function Home() {
  return (
    <>
      <JsonLd data={personJsonLd()} />

      {/* ── Hero — editorial identity ── */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container">
          <div className="hero-grid">
            <div>
              <p className="hero-eyebrow meta hero-in">
                <span className="dot" aria-hidden="true" />
                <span>Professional legacy portfolio</span>
                <span aria-hidden="true">·</span>
                <span>{site.location}</span>
              </p>
              <h1 id="hero-title" className="t-display hero-name">
                <span className="line-mask"><span className="hn-pre" style={{ "--d": "80ms" }}>H. M.</span></span>
                <span className="line-mask"><span style={{ "--d": "180ms" }}>Hakim Ali</span></span>
              </h1>
              <ul className="hero-roles hero-in" style={{ "--d": "340ms" }} aria-label="Professional roles">
                {site.positioning.split(" · ").map((r) => <li key={r}>{r}</li>)}
              </ul>
              <p className="t-lead hero-in" style={{ "--d": "420ms" }}>
                {site.name} is a veteran Bangladesh tourism and hospitality professional whose career spans hotel
                leadership, business, industry representation, international tourism networking and honorary consular service.
              </p>
              <div className="btn-row hero-in" style={{ "--d": "500ms" }}>
                <Button href="/career" variant="dark">Explore the journey</Button>
                <Button href="/about" variant="outline" icon={false}>Professional profile</Button>
              </div>
            </div>

            <div className="hero-figure hero-in" style={{ "--d": "260ms" }}>
              <Lattice id="hero-lattice" parallax="-0.08" />
              <div className="hero-arch">
                <div className="hero-arch__portrait">
                  <ArchivalFrame
                    priority
                    dir="portrait"
                    fallbackDir="hero"
                    alt={`Portrait of ${site.name}`}
                    placeholder="Portrait — to be supplied"
                    caption={site.location}
                    figure={site.coordinates}
                    ratio="4 / 5"
                    position="50% 22%"
                    sizes="(max-width: 980px) 86vw, 34vw"
                  />
                  <p className="hero-honor">
                    <span>Tourism Hero</span>
                    <span>2025</span>
                  </p>
                </div>
              </div>
              <div className="hero-tag">
                <span className="meta">Since 1971</span>
                <strong>Hotel Agrabad</strong>
              </div>
            </div>
          </div>

          <div className="facts" aria-label="At a glance">
            {stats.map((s, i) => (
              <Reveal className="fact" key={s.value} delay={i * 90}>
                <span className="fact-value t-num">{s.value}</span>
                <span className="fact-label">{s.label}</span>
                <span className="fact-note meta">{s.note}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Executive overview ── */}
      <section className="section band-paper2" aria-labelledby="overview-title">
        <div className="container">
          <div className="split">
            <SectionHeading index="01" label="Executive overview" id="overview-title">
              A career built on <em>hospitality, leadership</em> and connection.
            </SectionHeading>
            <Reveal delay={120} className="prose stack">
              <p className="dropcap">
                From a long association with Hotel Agrabad in Chattogram to leadership across tourism associations,
                business organisations and international networks, the public record documents a career with several
                overlapping dimensions.
              </p>
              <p>
                The portfolio distinguishes current roles, historical positions, self-reported milestones and claims
                awaiting verification rather than presenting them as one undifferentiated résumé.
              </p>
              <Link className="link-arrow" href="/about"><span>Read the profile</span></Link>
            </Reveal>
          </div>
          <div className="scope-grid">
            {scope.map((d, i) => (
              <Reveal key={d.title} delay={i * 80} className="scope">
                <span className="scope-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hospitality legacy ── */}
      <section className="section" aria-labelledby="hosp-title">
        <div className="container hosp">
          <div className="hosp-media">
            <ArchivalFrame
              parallax
              dir="hospitality"
              fallbackDir="general"
              alt="Hotel Agrabad, Chattogram"
              placeholder="Hotel Agrabad photograph — to be supplied"
              caption="Hotel Agrabad · Chattogram"
              ratio="5 / 4"
              position="50% 40%"
              sizes="(max-width: 980px) 92vw, 52vw"
            />
            <ArchivalFrame
              className="frame-sub"
              file="hospitality/agrabad-03-aerial.webp"
              alt="Hotel Agrabad, Chattogram, from above"
              figure="Fig. 02"
              ratio="4 / 3"
              delay={160}
              sizes="(max-width: 980px) 58vw, 32vw"
            />
          </div>
          <div className="hosp-copy">
            <SectionHeading index="02" label="Hospitality legacy" id="hosp-title">
              Hotel Agrabad, a <em>central institution</em> in the story.
            </SectionHeading>
            <Reveal delay={120} className="prose" style={{ marginTop: "1.5rem" }}>
              <p>
                Hotel Agrabad in Chattogram is a central institution in this professional story. Later roles extend into
                business leadership, tourism associations, international networking and public tourism-sector dialogue.
              </p>
            </Reveal>

            {/* Award recognition */}
            <style dangerouslySetInnerHTML={{ __html: hotelAwardCss }} />
            <Reveal delay={160}>
              <aside className="hosp-award" role="group" aria-label={`Award recognition: ${hotelAward.title}`}>
                <span className="hosp-award__seal" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2.8l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16l-5.2 2.8 1-5.8-4.2-4.1 5.8-.8L12 2.8z" />
                    <path d="M8.5 20.6h7" />
                  </svg>
                </span>
                <div className="hosp-award__body">
                  <p className="hosp-award__kicker">Award recognition</p>
                  <h3 className="hosp-award__title">{hotelAward.title}</h3>
                  <p className="hosp-award__sub">
                    <strong>{hotelAward.hotel}</strong> · {hotelAward.award}
                  </p>
                  <p className="hosp-award__foot">
                    <span>Presented by</span>
                    <b>{hotelAward.presenter}</b>
                  </p>
                </div>
              </aside>
            </Reveal>

            <ol className="mini-chron" role="list">
              {hospitality.map((h, i) => (
                <Reveal as="li" key={h.period} delay={i * 90}>
                  <b>{h.period}</b>
                  <div>
                    <h3>{h.title}</h3>
                    <p>{h.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Career journey ── */}
      <section className="section band-paper2" aria-labelledby="journey-title">
        <div className="container">
          <div className="heading-row">
            <SectionHeading index="03" label="Career journey" id="journey-title">
              Legacy, leadership and <em>a lifetime in tourism.</em>
            </SectionHeading>
            <Reveal delay={120}><Status text="1969 — 2026" kind="documented" /></Reveal>
          </div>
          <JourneyPreview items={journey} />
          <div className="section-foot">
            <p className="meta">Six of fifteen documented periods</p>
            <Button href="/career" variant="outline">View full timeline</Button>
          </div>
        </div>
      </section>

      {/* ── Current leadership ── */}
      <section className="section" aria-labelledby="lead-title">
        <div className="container">
          <SectionHeading index="04" label="Current leadership" id="lead-title">
            Roles shaping <em>the present.</em>
          </SectionHeading>
          <div className="role-grid is-3" style={{ marginTop: "clamp(2.5rem,4vw,3.5rem)" }}>
            {leadership.map((r, i) => (
              <Reveal key={r.organization} delay={(i % 2) * 90} style={{ display: "grid" }} className={i === 0 ? "is-feature" : undefined}>
                <RoleCard index={i + 1} feature={i === 0} night={i === 0} category={r.category} status={r.status} title={r.title} org={r.organization} text={r.text} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── International engagement ── */}
      <section className="section band-paper2" aria-labelledby="intl-title">
        <div className="container intl">
          <div>
            <SectionHeading index="05" label="International engagement" id="intl-title">
              Representation and networks <em>beyond Bangladesh.</em>
            </SectionHeading>
            <Reveal className="globe" variant="scale" delay={150}>
              <svg viewBox="0 0 200 200" aria-hidden="true">
                <circle cx="100" cy="100" r="96" />
                <circle cx="100" cy="100" r="68" strokeOpacity=".6" />
                <circle cx="100" cy="100" r="40" strokeOpacity=".4" />
                <g className="meridians">
                  <ellipse cx="100" cy="100" rx="40" ry="96" />
                  <ellipse cx="100" cy="100" rx="78" ry="96" />
                </g>
                <line x1="4" y1="100" x2="196" y2="100" />
                <path d="M14 66 Q100 84 186 66" />
                <path d="M14 134 Q100 116 186 134" />
                <circle className="pin-halo" cx="118" cy="92" r="4" />
                <circle className="pin" cx="118" cy="92" r="3" />
              </svg>
              <span className="globe-label">
                <strong>Chattogram</strong>
                <span className="meta">{site.coordinates}</span>
              </span>
            </Reveal>
          </div>
          <div>
            <Reveal className="card consul">
              <span className="meta card-cat">{consul.title}</span>
              <h3 className="t-h3">{consul.organization}</h3>
              <div><Status text={consul.status} /></div>
              <p className="card-text">{consul.text}</p>
            </Reveal>
            <ol className="mini-chron" role="list">
              {international.map((h, i) => (
                <Reveal as="li" key={h.period} delay={i * 90}>
                  <b>{h.period}</b>
                  <div>
                    <h3>{h.title}</h3>
                    <p>{h.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Featured recognition ── */}
      <section className="section band-night on-night" aria-labelledby="award-title" style={{ overflow: "hidden" }}>
        <Lattice id="award-lattice" parallax="0.06" className="award-lattice" />
        <div className="container award" style={{ position: "relative" }}>
          <div>
            <SectionHeading index="06" label="Recognition">
              A journey marked by <em>documented recognition.</em>
            </SectionHeading>
            <Reveal delay={100} variant="fade"><div className="award-year t-num" aria-hidden="true">{hero.year}</div></Reveal>
            <Reveal delay={160}>
              <h3 className="award-title" id="award-title">{hero.title}</h3>
              <p className="award-org">{hero.organization}</p>
              <Status text={hero.status} />
              <p className="award-text">{hero.text}</p>
              <Link className="link-arrow" href="/achievements"><span>Recognition archive</span></Link>
            </Reveal>
          </div>
          <ArchivalFrame
            dir="awards"
            alt="Tourism Hero recognition, World Tourism Network, 2025"
            caption="Tourism Hero · World Tourism Network · 2025"
            emblem={{ year: hero.year, title: hero.title, organization: hero.organization }}
            ratio="4 / 5"
            position="50% 35%"
            sizes="(max-width: 980px) 88vw, 38vw"
          />
        </div>
      </section>

      {/* ── Closing — professional connection ── */}
      <section className="section" aria-labelledby="cta-title">
        <div className="container cta-big">
          <p className="sh-kicker"><span className="sh-num">07</span><span className="sh-line" aria-hidden="true" /><span>Professional connection</span></p>
          <Reveal as="h2" className="t-display" id="cta-title">Connect with <em>{nbsp(site.name)}.</em></Reveal>
          <div className="split split-center">
            <Reveal delay={120}>
              <p className="t-lead">
                Professional enquiries, tourism partnerships and media requests can be directed through the contact page.
                Contact details are presented only where confirmed in the project source material.
              </p>
            </Reveal>
            <Reveal delay={200} className="btn-row" style={{ justifyContent: "flex-start" }}>
              <Button href="/contact" variant="dark">Contact</Button>
              <Button href="/career" variant="outline" icon={false}>Career journey</Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
