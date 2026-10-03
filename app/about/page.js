import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import RoleCard from "@/components/RoleCard";
import Reveal from "@/components/Reveal";
import ArchivalFrame from "@/components/ArchivalFrame";
import ContinueBand from "@/components/ContinueBand";
import Link from "next/link";
import { site, currentRoles, publicThemes } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const domains = [
  {
    title: "Tourism leadership",
    text: "Industry representation, tourism-sector dialogue, destination promotion and stakeholder engagement form a continuous thread across the public record. The work sits at the intersection of association leadership, policy conversation and the practical promotion of Bangladesh as a destination.",
  },
  {
    title: "Hospitality",
    text: "A long professional association with Hotel Agrabad and the wider hotel industry anchors the career narrative. The hospitality dimension supplies both institutional continuity and the operational foundation from which later leadership roles emerged.",
  },
  {
    title: "Business",
    text: "Corporate and board-level responsibilities across documented business organisations extend the professional scope beyond tourism alone. These roles reflect sustained engagement with enterprise governance and the commercial structures that support the wider sector.",
  },
  {
    title: "International engagement",
    text: "International tourism networking and honorary consular representation place the career in a wider geographic and diplomatic frame. The work connects domestic industry advocacy with relationships beyond national borders.",
  },
];

const intro = `${site.name} is a Bangladesh-based veteran tourism and hospitality professional, entrepreneur, business leader, tourism-industry association leader and honorary diplomatic representative.`;

export const metadata = pageMetadata({
  title: "About",
  description: "Profile of H. M. Hakim Ali: tourism and hospitality professional, entrepreneur, business leader, association leader and honorary diplomatic representative.",
  path: "/about",
});

export default function About() {
  return (
    <>
      <PageHeader
        index="01"
        label="About"
        path="/about"
        title="A professional legacy built across tourism, hospitality and international engagement."
        intro={intro}
        toc={[
          { href: "#profile", label: "Profile" },
          { href: "#scope", label: "Professional scope" },
          { href: "#roles", label: "Current / recent roles" },
          { href: "#themes", label: "Public themes" },
        ]}
      />

      {/* Profile — editorial biography */}
      <section className="section" id="profile" aria-labelledby="profile-heading">
        <div className="container split">
          <div className="stack" style={{ "--stack": "2.5rem" }}>
            <SectionHeading index="01" label="Profile" id="profile-heading">
              More than a <em>generic résumé.</em>
            </SectionHeading>
            <ArchivalFrame
              plate
              dir="portrait"
              alt={`Portrait of ${site.name}`}
              caption={site.location}
              ratio="1 / 1"
              position="50% 26%"
              sizes="(max-width: 900px) 80vw, 34vw"
              className="about-portrait"
            />
          </div>
          <Reveal delay={120} className="prose stack" style={{ "--stack": "1.15em" }}>
            <p className="dropcap">
              The research record describes overlapping work in tourism and hospitality, hotel management, business and
              investment, tourism-industry associations, international tourism networking, honorary consular representation,
              tourism policy and advocacy, youth and heritage awareness, and community initiatives.
            </p>
            <blockquote className="pull" style={{ margin: "2em 0" }}>
              These strands are not sequential chapters that replace one another; they coexist.
            </blockquote>
            <p>
              The public documentation presents a career in which operational hospitality experience, association leadership
              and international representation reinforce one another rather than stand apart.
            </p>
            <p>
              Hotel Agrabad in Chattogram is a central institution in this professional story. Later roles extend into business
              leadership, tourism associations, international networking and public tourism-sector dialogue. The portfolio
              therefore distinguishes current responsibilities, historical positions and claims that remain subject to
              verification, rather than presenting every entry as a single undifferentiated résumé.
            </p>
            <p><Link className="link-arrow" href="/career"><span>Explore the career journey</span></Link></p>
          </Reveal>
        </div>
      </section>

      {/* Professional scope — four domains */}
      <section className="section band-paper2" id="scope" aria-labelledby="scope-heading">
        <div className="container">
          <SectionHeading
            index="02"
            label="Professional scope"
            id="scope-heading"
            intro="The career is most accurately read as four interlocking fields of activity. Each domain has its own institutional language and timeline; together they form the working architecture of the professional record."
          >
            Four connected <em>domains.</em>
          </SectionHeading>
          <div className="domain-rows">
            {domains.map((d, i) => (
              <Reveal key={d.title} className="domain-row">
                <span className="t-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Current / recent roles */}
      <section className="section" id="roles" aria-labelledby="roles-heading">
        <div className="container">
          <SectionHeading
            index="03"
            label="Current / recent roles"
            id="roles-heading"
            intro="The roles below reflect responsibilities documented as current or recent at the time of compilation. Status markers distinguish verified present appointments from historical or self-reported entries elsewhere in the archive."
          >
            Leadership in <em>the present.</em>
          </SectionHeading>
          <div className="role-grid" style={{ marginTop: "clamp(2.5rem,4vw,3.5rem)" }}>
            {currentRoles.map((r, i) => (
              <Reveal key={r.organization} delay={(i % 2) * 90} style={{ display: "grid" }} className={i === 0 ? "is-feature" : undefined}>
                <RoleCard index={i + 1} feature={i === 0} night={i === 0} category={r.category} status={r.status} title={r.title} org={r.organization} text={r.text} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Public themes */}
      <section className="section band-paper2" id="themes" aria-labelledby="themes-heading">
        <div className="container split">
          <SectionHeading
            index="04"
            label="Public themes"
            id="themes-heading"
            intro="Beyond formal titles, the public record points to recurring areas of attention: tourism policy and advocacy, the promotion of destination identity, engagement with youth and heritage awareness, and community-facing initiatives. These themes appear across association work, public dialogue and international networking."
          >
            Documented areas of <em>professional focus.</em>
          </SectionHeading>
          <ol className="theme-list" role="list" style={{ gridTemplateColumns: "1fr", marginTop: 0 }}>
            {publicThemes.map((t, i) => (
              <Reveal as="li" key={t} delay={(i % 3) * 60}>
                <span className="meta">{String(i + 1).padStart(2, "0")}</span>
                <span>{t}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <ContinueBand
        index="05"
        heading={<>The story is best understood <em>across the archive.</em></>}
        text="Follow the chronology for career context, the experience archive for organisational roles, and recognition for documented milestones and verification notes. Each section is designed to be read in relation to the others rather than in isolation."
        links={[
          { href: "/experience", label: "Experience archive" },
          { href: "/achievements", label: "Recognition" },
        ]}
      />
    </>
  );
}
