import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import LedgerRow from "@/components/LedgerRow";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import ContinueBand from "@/components/ContinueBand";
import { site, currentRoles, publicThemes } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const domains = [
  { title: "Tourism leadership", text: "Industry representation, tourism-sector dialogue, destination promotion and stakeholder engagement." },
  { title: "Hospitality", text: "A long professional association with Hotel Agrabad and the wider hotel industry." },
  { title: "Business", text: "Corporate and board-level responsibilities across documented business organisations." },
  { title: "International engagement", text: "International tourism networking and honorary consular representation." },
];

const intro = `${site.name} is a Bangladesh-based veteran tourism and hospitality professional, entrepreneur, business leader, tourism-industry association leader and honorary diplomatic representative.`;
export const metadata = pageMetadata({ title: "About", description: intro, path: "/about" });

export default function About() {
  return <>
    <PageHeader eyebrow="01 · About" title="A professional legacy built across tourism, hospitality and international engagement." intro={intro} />
    <section className="section container"><div className="split"><SectionHeading index="01" label="Profile">More than a <em>generic résumé.</em></SectionHeading><Reveal delay={120} className="prose"><p>The research record describes overlapping work in tourism and hospitality, hotel management, business and investment, tourism-industry associations, international tourism networking, honorary consular representation, tourism policy and advocacy, youth and heritage awareness, and community initiatives.</p><p>Hotel Agrabad in Chattogram is a central institution in this professional story. Later roles extend into business leadership, tourism associations, international networking and public tourism-sector dialogue.</p><Button href="/career" variant="outline">Explore the career journey</Button></Reveal></div></section>
    <section className="section band-cream"><div className="container"><SectionHeading index="02" label="Professional scope">Four connected <em>domains.</em></SectionHeading><div className="domain-grid">{domains.map((d, i) => <Reveal key={d.title} delay={i * 80} className="domain"><span className="domain-num">{String(i + 1).padStart(2, "0")}</span><h3>{d.title}</h3><p>{d.text}</p></Reveal>)}</div></div></section>
    <section className="section container"><SectionHeading index="03" label="Current / recent roles">Leadership in <em>the present.</em></SectionHeading><div className="ledger section-body">{currentRoles.map((r, i) => <LedgerRow key={r.organization} i={i} label={r.category} status={r.status} title={r.title} org={r.organization} text={r.text} />)}</div></section>
    <section className="section band-cream"><div className="container"><SectionHeading index="04" label="Public themes">Documented areas of <em>professional focus.</em></SectionHeading><div className="theme-grid">{publicThemes.map((t, i) => <Reveal key={t} delay={(i % 2) * 80} className="theme-item"><span>{String(i + 1).padStart(2, "0")}</span><p>{t}</p></Reveal>)}</div></div></section>
    <ContinueBand index="05" heading={<>The story is best understood <em>across the archive.</em></>} text="Follow the chronology for career context, the experience archive for organisational roles, and recognition for documented milestones and verification notes." links={[{ href: "/experience", label: "Experience archive" }, { href: "/achievements", label: "Recognition" }]} />
  </>;
}
