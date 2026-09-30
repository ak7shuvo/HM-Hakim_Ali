import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import LedgerRow from "@/components/LedgerRow";
import Reveal from "@/components/Reveal";
import ContinueBand from "@/components/ContinueBand";
import { education } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const intro = "Only qualifications and study details supported by the project research are shown; unresolved institution details remain explicitly marked for verification.";
export const metadata = pageMetadata({ title: "Education", description: intro, path: "/education" });

export default function Education() {
  return <>
    <PageHeader eyebrow="04 · Education" title="Academic and hospitality-management background." intro={intro} />
    <section className="section container" aria-label="Qualifications">
      <h2 className="visually-hidden">Qualifications</h2>
      <div className="ledger">{education.map((item, i) => <LedgerRow key={item.title + item.institution} i={i} label={item.period} status={item.status} title={item.title} org={item.institution} text={item.text} />)}</div>
    </section>
    <section className="section band-cream" aria-label="Reading the record">
      <div className="container">
        <SectionHeading index="01" label="Reading the record">Each entry keeps <em>its own status.</em></SectionHeading>
        <div className="status-grid">
          <Reveal><strong>Documented</strong><p>Appears in corporate prospectuses; the institution and year are not established in the research baseline.</p></Reveal>
          <Reveal delay={90}><strong>Self-reported</strong><p>Reported on LinkedIn and referenced in corporate records; not independently established.</p></Reveal>
          <Reveal delay={180}><strong>Verify</strong><p>Wording flagged in the research dossier and left exactly as it appears in the source until documents confirm it.</p></Reveal>
        </div>
      </div>
    </section>
    <ContinueBand index="02" heading={<>Study sits within <em>a longer record.</em></>} text="Education is one strand of a career documented in the chronology, the experience archive and the recognition archive." links={[{ href: "/career", label: "Career journey" }, { href: "/experience", label: "Experience archive" }]} />
  </>;
}
