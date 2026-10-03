import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import CareerNavigator from "@/components/CareerNavigator";
import { TimelineEntry } from "@/components/Timeline";
import Status from "@/components/Status";
import Reveal from "@/components/Reveal";
import { timeline } from "@/lib/content";
import { eraOf, timelineItemClass } from "@/lib/career";
import { pageMetadata } from "@/lib/seo";

const intro =
  "The timeline preserves the documented chronology while clearly distinguishing historical, current/recent and self-reported material.";

export const metadata = pageMetadata({ title: "Career Journey", description: intro, path: "/career" });

// Entries are rendered on the server; the client navigator only chooses which are visible.
const entries = timeline.map((item) => ({
  id: `${item.period}-${item.title}`,
  era: eraOf(item),
  className: timelineItemClass(item),
  node: <TimelineEntry item={item} />,
}));

const chapters = ["Legacy", "Leadership", "Tourism", "Hospitality", "Business", "International engagement", "Recognition", "Future"];

export default function Career() {
  return (
    <>
      <PageHeader
        index="02"
        label="Career Journey"
        path="/career"
        title="A career timeline spanning generations of Bangladesh tourism and hospitality."
        intro={intro}
        toc={[
          { href: "#chronology", label: "Reading the chronology" },
          { href: "#timeline", label: "Timeline by era" },
          { href: "#context", label: "2026 context note" },
        ]}
      />

      <section className="section" id="chronology" aria-labelledby="chron-heading">
        <div className="container split">
          <div>
            <SectionHeading index="01" label="Chronology" id="chron-heading">
              Follow the journey <em>by era.</em>
            </SectionHeading>
            <Reveal delay={80}>
              <ol className="chapters" role="list" aria-label="Narrative arc">
                {chapters.map((c, i) => (
                  <li key={c}><span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>{c}</li>
                ))}
              </ol>
            </Reveal>
          </div>
          <Reveal delay={120} className="prose stack">
            <p>
              Jump directly to a period or browse the complete chronology. The labels and descriptions retain the source
              record&apos;s status rather than treating every historical entry as a current appointment. The archive is
              organised so that documented, historical and self-reported material remain distinguishable.
            </p>
            <p>
              The chapters above mark the narrative arc of the public record — from early institutional foundations through
              leadership, industry representation, international engagement and the contemporary public activity noted in the
              2026 record.
            </p>
            <div>
              <p className="meta" style={{ marginBottom: 12 }}>Status key</p>
              <div className="status-key" aria-label="Status key">
                <Status text="Documented" kind="documented" />
                <Status text="Current / recent" kind="current" />
                <Status text="Historical" kind="historical" />
                <Status text="Self-reported" kind="self" />
                <Status text="Verify" kind="verify" />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="container" id="timeline">
          <h2 className="visually-hidden">Timeline by era</h2>
          <CareerNavigator entries={entries} />

          <Reveal className="tl-future" id="context">
            <Status text="Future · 2026 public record" kind="current" />
            <p className="tl-text">
              The 2026 record documents public activity around digital tourism, AI, tourism policy, youth and heritage. It is
              presented here as a contemporary context note within the chronology, not as a forecast of specific future
              appointments or outcomes.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
