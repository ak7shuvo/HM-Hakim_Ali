import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import Status from "@/components/Status";
import Reveal from "@/components/Reveal";
import ContinueBand from "@/components/ContinueBand";
import { education } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const intro = "Only qualifications and study details supported by the project research are shown; unresolved institution details remain explicitly marked for verification.";
export const metadata = pageMetadata({ title: "Education", description: intro, path: "/education" });

const kinds = [
  { kind: "documented", label: "Documented", text: "Appears in corporate prospectuses; the institution and year are not established in the research baseline." },
  { kind: "self", label: "Self-reported", text: "Reported on LinkedIn and referenced in corporate records; not independently established." },
  { kind: "verify", label: "Verify", text: "Wording flagged in the research dossier and left exactly as it appears in the source until documents confirm it." },
];

export default function Education() {
  return (
    <>
      <PageHeader
        index="04"
        label="Education"
        path="/education"
        title="Academic and hospitality-management background."
        intro={intro}
        toc={[
          { href: "#qualifications", label: "Qualifications" },
          { href: "#reading", label: "Reading the record" },
        ]}
      />

      <section className="section" id="qualifications" aria-labelledby="qual-heading">
        <div className="container">
          <SectionHeading index="01" label="Qualifications" id="qual-heading">
            Study recorded in <em>the public documentation.</em>
          </SectionHeading>
          <div className="edu-list" style={{ marginTop: "clamp(2.5rem,4vw,3.5rem)" }}>
            {education.map((item, i) => {
              const unset = item.period === "Not established";
              return (
                <Reveal key={item.title + item.institution} delay={i * 80} className="card card-hover edu">
                  <div>
                    <p className="meta" style={{ marginBottom: 10 }}>Period</p>
                    <span className={`edu-period t-num${unset ? " is-unset" : ""}`}>{item.period}</span>
                  </div>
                  <div className="stack" style={{ "--stack": ".75rem" }}>
                    <h3 className="t-h3">{item.title}</h3>
                    <p className="card-org">{item.institution}</p>
                    <p className="card-text">{item.text}</p>
                  </div>
                  <Status text={item.status} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section band-paper2" id="reading" aria-labelledby="reading-heading">
        <div className="container">
          <SectionHeading index="02" label="Reading the record" id="reading-heading">
            Each entry keeps <em>its own status.</em>
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

      <ContinueBand
        index="03"
        heading={<>Study sits within <em>a longer record.</em></>}
        text="Education is one strand of a career documented in the chronology, the experience archive and the recognition archive."
        links={[{ href: "/career", label: "Career journey" }, { href: "/experience", label: "Experience archive" }]}
      />
    </>
  );
}
