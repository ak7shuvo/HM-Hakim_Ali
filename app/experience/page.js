import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import ArchiveFilters from "@/components/ArchiveFilters";
import LedgerRow from "@/components/LedgerRow";
import BackToTop from "@/components/BackToTop";
import Reveal from "@/components/Reveal";
import { experiences } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const intro = "The archive separates current or recent positions from historical records and items that require a current-status check.";
export const metadata = pageMetadata({ title: "Experience", description: intro, path: "/experience" });

const entries = experiences.map((item, i) => ({
  id: `${item.title}-${item.organization}`,
  category: item.category,
  node: <LedgerRow i={i} label={item.category} status={item.status || item.duration} title={item.title} org={item.organization} meta={item.status && item.duration ? item.duration : undefined} text={item.text} />,
}));

export default function Experience() {
  return <>
    <PageHeader eyebrow="03 · Experience" title="Leadership roles across hospitality, tourism, business and industry." intro={intro} />
    <section className="section container"><div className="split archive-intro"><SectionHeading index="01" label="Experience archive">Roles, institutions and <em>context.</em></SectionHeading><Reveal delay={120} className="prose"><p>Use the filters to move between professional domains. Descriptions stay close to the research record and avoid converting older appointments into present-day roles.</p></Reveal></div><ArchiveFilters entries={entries} noun="roles" /><BackToTop /></section>
    <section className="section band-cream"><div className="container"><SectionHeading index="02" label="Reading the archive">Status is part of <em>the story.</em></SectionHeading><div className="status-grid"><Reveal><strong>Current / recent</strong><p>Used for roles supported by recent 2026 reporting or current corporate/public records.</p></Reveal><Reveal delay={90}><strong>Historical</strong><p>Older appointments remain useful career evidence but are not presented as current automatically.</p></Reveal><Reveal delay={180}><strong>Verify</strong><p>Some corporate roles require current documentation before being described as active.</p></Reveal></div></div></section>
  </>;
}
