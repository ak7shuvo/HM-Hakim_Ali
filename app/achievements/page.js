import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import ArchiveFilters from "@/components/ArchiveFilters";
import ArchivalFrame from "@/components/ArchivalFrame";
import Status from "@/components/Status";
import LedgerRow from "@/components/LedgerRow";
import BackToTop from "@/components/BackToTop";
import Reveal from "@/components/Reveal";
import { recognitions, verificationNotes } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const recognitionItems = recognitions.map((item) => ({ ...item, category: item.status.includes("Verify") ? "Pending verification" : "Documented" }));
const intro = "Documented recognition is presented alongside verification status so archival claims are not overstated.";
export const metadata = pageMetadata({ title: "Recognition", description: intro, path: "/achievements" });

const entries = recognitionItems.map((item, i) => ({
  id: `${item.year}-${item.title}`,
  category: item.category,
  node: <LedgerRow i={i} year={item.year} status={item.status} title={item.title} org={item.organization} text={item.text} />,
}));
const hero = recognitions.find((r) => r.year === "2025");

export default function Achievements() {
  return <>
    <PageHeader eyebrow="06 · Recognition" title="Recognition across a long professional journey." intro={intro} />
    <section className="section band-dark" aria-label="Featured recognition"><div className="container award-feature"><div><Reveal><div className="award-year" aria-hidden="true">{hero.year}</div></Reveal><Reveal delay={100}><h2 className="award-title">{hero.title}</h2><p className="award-org">{hero.organization}</p><Status text={hero.status} /><p className="award-text">{hero.text}</p></Reveal></div><ArchivalFrame dark dir="awards" alt="Tourism Hero recognition, World Tourism Network, 2025" placeholder="Certificate or photograph — to be supplied" caption="Tourism Hero · World Tourism Network · 2025" ratio="4 / 5" position="50% 35%" sizes="(max-width: 900px) 88vw, 38vw" /></div></section>
    <section className="section container"><div className="award-lead"><SectionHeading index="01" label="Recognition archive">Selected <em>milestones.</em></SectionHeading></div><ArchiveFilters entries={entries} noun="recognitions" /><BackToTop /></section>
    <section className="section band-cream"><div className="container verification-grid"><div><SectionHeading index="02" label="Verification">Research archive, <em>not invented certainty.</em></SectionHeading><p className="prose-copy">The research dossier explicitly classifies some claims as yellow or red. They remain in the archive for future documentary verification rather than being silently promoted to confirmed facts.</p></div><div className="verify-columns"><Reveal><h3>Needs attribution / confirmation</h3>{verificationNotes.yellow.map((x) => <p key={x}>{x}</p>)}</Reveal><Reveal delay={100}><h3>Verify before absolute claim</h3>{verificationNotes.red.map((x) => <p key={x}>{x}</p>)}</Reveal></div></div></section>
  </>;
}
