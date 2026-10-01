import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import LedgerRow from "@/components/LedgerRow";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import ContinueBand from "@/components/ContinueBand";
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
  description: intro,
  path: "/about",
});

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="01 · About"
        title="A professional legacy built across tourism, hospitality and international engagement."
        intro={intro}
      />

      {/* Profile — editorial biography */}
      <section className="section container" aria-labelledby="profile-heading">
        <div className="split">
          <SectionHeading index="01" label="Profile" id="profile-heading">
            More than a <em>generic résumé.</em>
          </SectionHeading>
          <Reveal delay={120} className="prose">
            <p>
              The research record describes overlapping work in tourism and
              hospitality, hotel management, business and investment,
              tourism-industry associations, international tourism networking,
              honorary consular representation, tourism policy and advocacy,
              youth and heritage awareness, and community initiatives.
            </p>
            <p>
              These strands are not sequential chapters that replace one
              another; they coexist. The public documentation presents a career
              in which operational hospitality experience, association
              leadership and international representation reinforce one another
              rather than stand apart.
            </p>
            <p>
              Hotel Agrabad in Chattogram is a central institution in this
              professional story. Later roles extend into business leadership,
              tourism associations, international networking and public
              tourism-sector dialogue. The portfolio therefore distinguishes
              current responsibilities, historical positions and claims that
              remain subject to verification, rather than presenting every
              entry as a single undifferentiated résumé.
            </p>
            <Button href="/career" variant="outline">
              Explore the career journey
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Professional scope — four domains */}
      <section
        className="section band-cream"
        aria-labelledby="scope-heading"
      >
        <div className="container">
          <SectionHeading index="02" label="Professional scope" id="scope-heading">
            Four connected <em>domains.</em>
          </SectionHeading>
          <p className="prose-copy" style={{ marginTop: "1.5rem", maxWidth: "58ch" }}>
            The career is most accurately read as four interlocking fields of
            activity. Each domain has its own institutional language and
            timeline; together they form the working architecture of the
            professional record.
          </p>
          <div className="domain-grid">
            {domains.map((d, i) => (
              <Reveal key={d.title} delay={i * 80} className="domain">
                <span className="domain-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Current / recent roles */}
      <section
        className="section container"
        aria-labelledby="roles-heading"
      >
        <SectionHeading index="03" label="Current / recent roles" id="roles-heading">
          Leadership in <em>the present.</em>
        </SectionHeading>
        <p className="prose-copy" style={{ marginTop: "1.25rem", maxWidth: "58ch" }}>
          The roles below reflect responsibilities documented as current or
          recent at the time of compilation. Status markers distinguish
          verified present appointments from historical or self-reported
          entries elsewhere in the archive.
        </p>
        <div className="ledger section-body">
          {currentRoles.map((r, i) => (
            <LedgerRow
              key={r.organization}
              i={i}
              label={r.category}
              status={r.status}
              title={r.title}
              org={r.organization}
              text={r.text}
            />
          ))}
        </div>
      </section>

      {/* Public themes */}
      <section
        className="section band-cream"
        aria-labelledby="themes-heading"
      >
        <div className="container">
          <SectionHeading index="04" label="Public themes" id="themes-heading">
            Documented areas of <em>professional focus.</em>
          </SectionHeading>
          <p className="prose-copy" style={{ marginTop: "1.25rem", maxWidth: "58ch" }}>
            Beyond formal titles, the public record points to recurring areas
            of attention: tourism policy and advocacy, the promotion of
            destination identity, engagement with youth and heritage awareness,
            and community-facing initiatives. These themes appear across
            association work, public dialogue and international networking.
          </p>
          <div className="theme-grid">
            {publicThemes.map((t, i) => (
              <Reveal
                key={t}
                delay={(i % 2) * 80}
                className="theme-item"
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p>{t}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing — connected legacy */}
      <ContinueBand
        index="05"
        heading={
          <>
            The story is best understood <em>across the archive.</em>
          </>
        }
        text="Follow the chronology for career context, the experience archive for organisational roles, and recognition for documented milestones and verification notes. Each section is designed to be read in relation to the others rather than in isolation."
        links={[
          { href: "/experience", label: "Experience archive" },
          { href: "/achievements", label: "Recognition" },
        ]}
      />
    </>
  );
}
