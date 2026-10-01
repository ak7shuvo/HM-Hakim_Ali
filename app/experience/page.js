import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import ArchiveFilters from "@/components/ArchiveFilters";
import LedgerRow from "@/components/LedgerRow";
import BackToTop from "@/components/BackToTop";
import Reveal from "@/components/Reveal";
import { experiences } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const intro =
  "A structured record of professional responsibilities and institutional affiliations, presented with clear distinction between current, historical and still-to-be-verified appointments.";

export const metadata = pageMetadata({
  title: "Experience",
  description: intro,
  path: "/experience",
});

const entries = experiences.map((item, i) => ({
  id: `${item.title}-${item.organization}`,
  category: item.category,
  node: (
    <LedgerRow
      i={i}
      label={item.category}
      status={item.status || item.duration}
      title={item.title}
      org={item.organization}
      meta={item.status && item.duration ? item.duration : undefined}
      text={item.text}
    />
  ),
}));

export default function Experience() {
  return (
    <>
      <PageHeader
        eyebrow="03 · Experience"
        title="Institutional roles across hospitality, tourism, business and industry leadership."
        intro={intro}
      />

      <section className="section container" aria-label="Experience archive">
        <div className="split archive-intro">
          <SectionHeading index="01" label="Experience archive">
            Appointments, organisations and <em>the passage of time.</em>
          </SectionHeading>
          <Reveal delay={120} className="prose">
            <p>
              The entries that follow form a working ledger of professional
              life. Each retains the status recorded in the source material so
              that present responsibilities, earlier chapters and appointments
              still awaiting confirmation remain legible as distinct kinds of
              evidence.
            </p>
            <p>
              Categories allow the archive to be read by domain. Filtering
              changes only what is visible; the underlying sequence and the
              meaning of each appointment are left undisturbed.
            </p>
          </Reveal>
        </div>

        <ArchiveFilters entries={entries} noun="roles" />
        <BackToTop />
      </section>

      <section
        className="section band-cream"
        aria-label="Reading the archive"
      >
        <div className="container">
          <SectionHeading index="02" label="Reading the archive">
            Status as part of <em>the record.</em>
          </SectionHeading>
          <p
            className="prose-copy"
            style={{ marginTop: "1.25rem", maxWidth: "58ch" }}
          >
            The markers below indicate how each entry should be read against
            the public record at the time of compilation. They are not
            decorative; they protect the integrity of the chronology.
          </p>
          <div className="status-grid">
            <Reveal>
              <strong>Current / recent</strong>
              <p>
                Roles supported by recent reporting or by current corporate and
                public records. These entries reflect responsibilities
                understood to be active or only lately concluded.
              </p>
            </Reveal>
            <Reveal delay={90}>
              <strong>Historical</strong>
              <p>
                Earlier appointments retained as career evidence. They belong
                to the chronology and are not presented as present-day roles
                merely because they appear in the archive.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <strong>Verify</strong>
              <p>
                Appointments for which current documentation is still required
                before they can be described as active. The marker signals that
                further confirmation is needed.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
