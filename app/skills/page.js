import PageHeader from "@/components/PageHeader";
import SkillGroup from "@/components/SkillGroup";
import SectionHeading from "@/components/SectionHeading";
import ContinueBand from "@/components/ContinueBand";
import { skillGroups } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const intro =
  "The groups below reflect the documented career record and the public professional themes that recur across it. No percentage ratings or self-awarded proficiency scores are used.";

export const metadata = pageMetadata({
  title: "Expertise",
  description: intro,
  path: "/skills",
});

export default function Skills() {
  return (
    <>
      <PageHeader
        eyebrow="05 · Expertise"
        title="A body of knowledge shaped by practice, institutions and time."
        intro={intro}
      />

      <section className="section container" aria-label="Expertise">
        <SectionHeading index="01" label="Expertise">
          Capabilities formed through <em>sustained engagement.</em>
        </SectionHeading>
        <div className="skill-grid">
          {skillGroups.map((g, i) => (
            <SkillGroup key={g.title} group={g} index={i + 1} />
          ))}
        </div>
      </section>

      <ContinueBand
        index="02"
        heading={
          <>
            Expertise is most clearly read <em>in context.</em>
          </>
        }
        text="The groups above summarise recurring themes. The career chronology and the experience archive show where each was exercised, under which institutions, and how each role is labelled in the public record."
        links={[
          { href: "/career", label: "Career journey" },
          { href: "/experience", label: "Experience archive" },
        ]}
      />
    </>
  );
}
