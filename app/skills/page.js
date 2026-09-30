import PageHeader from "@/components/PageHeader";
import SkillGroup from "@/components/SkillGroup";
import SectionHeading from "@/components/SectionHeading";
import ContinueBand from "@/components/ContinueBand";
import { skillGroups } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const intro = "The groups reflect the documented career record and public professional themes. No invented percentage ratings are used.";
export const metadata = pageMetadata({ title: "Expertise", description: intro, path: "/skills" });

export default function Skills() {
  return <>
    <PageHeader eyebrow="05 · Expertise" title="Areas of expertise and professional scope." intro={intro} />
    <section className="section container"><SectionHeading index="01" label="Expertise">A broad portfolio of <em>professional capabilities.</em></SectionHeading><div className="skill-grid">{skillGroups.map((g, i) => <SkillGroup key={g.title} group={g} index={i + 1} />)}</div></section>
    <ContinueBand index="02" heading={<>Capabilities are best read <em>alongside the record.</em></>} text="The groups above summarise themes; the career chronology and the experience archive show where each was exercised and how each role is labelled." links={[{ href: "/career", label: "Career journey" }, { href: "/experience", label: "Experience archive" }]} />
  </>;
}
