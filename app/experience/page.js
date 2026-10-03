import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import ArchiveFilters from "@/components/ArchiveFilters";
import RoleCard from "@/components/RoleCard";
import Status from "@/components/Status";
import Reveal from "@/components/Reveal";
import { experiences } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const intro =
  "A structured record of professional responsibilities and institutional affiliations, presented with clear distinction between current, historical and still-to-be-verified appointments.";

export const metadata = pageMetadata({
  title: "Experience",
  description: "Professional responsibilities and institutional affiliations of H. M. Hakim Ali, with current, historical and to-be-verified appointments clearly distinguished.",
  path: "/experience",
});

const entries = experiences.map((item) => ({
  id: `${item.title}-${item.organization}`,
  category: item.category,
  node: (
    <RoleCard
      category={item.category}
      status={item.status || item.duration}
      title={item.title}
      org={item.organization}
      meta={item.status && item.duration ? item.duration : undefined}
      text={item.text}
    />
  ),
}));

const kinds = [
  { kind: "current", label: "Current / recent", text: "Roles supported by recent reporting or by current corporate and public records. These entries reflect responsibilities understood to be active or only lately concluded." },
  { kind: "historical", label: "Historical", text: "Earlier appointments retained as career evidence. They belong to the chronology and are not presented as present-day roles merely because they appear in the archive." },
  { kind: "verify", label: "Verify", text: "Appointments for which current documentation is still required before they can be described as active. The marker signals that further confirmation is needed." },
];

export default function Experience() {
  return (
    <>
      <PageHeader
        index="03"
        label="Experience"
        path="/experience"
        title="Institutional roles across hospitality, tourism, business and industry leadership."
        intro={intro}
        toc={[
          { href: "#archive", label: "Experience archive" },
          { href: "#reading", label: "Reading the archive" },
        ]}
      />

      <section className="section" id="archive" aria-labelledby="archive-heading">
        <div className="container">
          <div className="split">
            <SectionHeading index="01" label="Experience archive" id="archive-heading">
              Appointments, organisations and <em>the passage of time.</em>
            </SectionHeading>
            <Reveal delay={120} className="prose stack">
              <p>
                The entries that follow form a working ledger of professional life. Each retains the status recorded in the
                source material so that present responsibilities, earlier chapters and appointments still awaiting confirmation
                remain legible as distinct kinds of evidence.
              </p>
              <p>
                Categories allow the archive to be read by domain. Filtering changes only what is visible; the underlying
                sequence and the meaning of each appointment are left undisturbed.
              </p>
            </Reveal>
          </div>
          <ArchiveFilters entries={entries} noun="roles" layout="cards" />
        </div>
      </section>

      <section className="section band-paper2" id="reading" aria-labelledby="reading-heading">
        <div className="container">
          <SectionHeading
            index="02"
            label="Reading the archive"
            id="reading-heading"
            intro="The markers below indicate how each entry should be read against the public record at the time of compilation. They are not decorative; they protect the integrity of the chronology."
          >
            Status as part of <em>the record.</em>
          </SectionHeading>
          <div className="status-grid">
            {kinds.map((k, i) => (
              <Reveal key={k.kind} delay={i * 90} className="card">
                <span aria-hidden="true"><Status text={k.label} kind={k.kind} /></span>
                <h3 className="t-h3">{k.label}</h3>
                <p>{k.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
