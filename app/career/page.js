import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import CareerNavigator from "@/components/CareerNavigator";
import { TimelineEntry } from "@/components/Timeline";
import BackToTop from "@/components/BackToTop";
import Status from "@/components/Status";
import Reveal from "@/components/Reveal";
import { timeline } from "@/lib/content";
import { eraOf, timelineItemClass } from "@/lib/career";
import { pageMetadata } from "@/lib/seo";

const intro =
  "The timeline preserves the documented chronology while clearly distinguishing historical, current/recent and self-reported material.";

export const metadata = pageMetadata({
  title: "Career Journey",
  description: intro,
  path: "/career",
});

// Entries are rendered on the server; the client navigator only chooses which are visible.
const entries = timeline.map((item) => ({
  id: `${item.period}-${item.title}`,
  era: eraOf(item),
  className: timelineItemClass(item),
  node: <TimelineEntry item={item} />,
}));

const chapters = [
  "Legacy",
  "Leadership",
  "Tourism",
  "Hospitality",
  "Business",
  "International engagement",
  "Recognition",
  "Future",
];

export default function Career() {
  return (
    <>
      <PageHeader
        eyebrow="02 · Career Journey"
        title="A career timeline spanning generations of Bangladesh tourism and hospitality."
        intro={intro}
      />

      <section className="section container" aria-label="Career chronology">
        {/* Narrative arc + status key */}
        <div className="split career-lead">
          <div>
            <SectionHeading index="01" label="Chronology">
              Follow the journey <em>by era.</em>
            </SectionHeading>
            <ol className="chapters" role="list" aria-label="Narrative arc">
              {chapters.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ol>
          </div>
          <Reveal delay={120} className="prose">
            <p>
              Jump directly to a period or browse the complete chronology. The
              labels and descriptions retain the source record&apos;s status
              rather than treating every historical entry as a current
              appointment. The archive is organised so that documented,
              historical and self-reported material remain distinguishable.
            </p>
            <p>
              The chapters above mark the narrative arc of the public record —
              from early institutional foundations through leadership,
              industry representation, international engagement and the
              contemporary public activity noted in the 2026 record.
            </p>
            <div className="fact-legend" aria-label="Status key">
              <Status text="Documented" kind="documented" />
              <Status text="Current / recent" kind="current" />
              <Status text="Historical" kind="historical" />
              <Status text="Self-reported" kind="self" />
              <Status text="Verify" kind="verify" />
            </div>
          </Reveal>
        </div>

        {/* Interactive chronology */}
        <CareerNavigator entries={entries} />

        {/* Contemporary context note */}
        <Reveal className="tl-future">
          <Status text="Future · 2026 public record" kind="current" />
          <p className="tl-text">
            The 2026 record documents public activity around digital tourism,
            AI, tourism policy, youth and heritage. It is presented here as a
            contemporary context note within the chronology, not as a forecast
            of specific future appointments or outcomes.
          </p>
        </Reveal>

        <BackToTop />
      </section>
    </>
  );
}
