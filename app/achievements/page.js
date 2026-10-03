import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import ArchiveFilters from "@/components/ArchiveFilters";
import ArchivalFrame from "@/components/ArchivalFrame";
import Status from "@/components/Status";
import LedgerRow from "@/components/LedgerRow";
import Reveal from "@/components/Reveal";
import Lattice from "@/components/Lattice";
import { recognitions, verificationNotes } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const recognitionItems = recognitions.map((item) => ({ ...item, category: item.status.includes("Verify") ? "Pending verification" : "Documented" }));
const intro = "Documented recognition is presented alongside verification status so archival claims are not overstated.";
export const metadata = pageMetadata({ title: "Recognition", description: intro, path: "/achievements" });

const entries = recognitionItems.map((item) => ({
  id: `${item.year}-${item.title}`,
  category: item.category,
  node: <LedgerRow year={item.year} status={item.status} title={item.title} org={item.organization} text={item.text} />,
}));
const hero = recognitions.find((r) => r.year === "2025");

export default function Achievements() {
  return (
    <>
      <PageHeader
        index="06"
        label="Recognition"
        path="/achievements"
        title="Recognition across a long professional journey."
        intro={intro}
        toc={[
          { href: "#featured", label: "Featured · 2025" },
          { href: "#archive", label: "Recognition archive" },
          { href: "#verification", label: "Verification notes" },
        ]}
      />

      <section className="section band-night on-night" id="featured" aria-labelledby="featured-heading" style={{ overflow: "hidden" }}>
        <Lattice id="rec-lattice" parallax="0.06" />
        <div className="container award" style={{ position: "relative" }}>
          <div>
            <p className="sh-kicker"><span className="sh-num">01</span><span className="sh-line" aria-hidden="true" style={{ transform: "none" }} /><span>Featured recognition</span></p>
            <Reveal variant="fade"><div className="award-year t-num" aria-hidden="true">{hero.year}</div></Reveal>
            <Reveal delay={100}>
              <h2 className="award-title" id="featured-heading">{hero.title}</h2>
              <p className="award-org">{hero.organization}</p>
              <Status text={hero.status} />
              <p className="award-text">{hero.text}</p>
              <Link className="link-arrow" href="/career?era=era-2020-2026"><span>See 2020–2026 in the chronology</span></Link>
            </Reveal>
          </div>
          <ArchivalFrame
            dir="awards"
            alt="Tourism Hero recognition, World Tourism Network, 2025"
            caption="Tourism Hero · World Tourism Network · 2025"
            emblem={{ year: hero.year, title: hero.title, organization: hero.organization }}
            ratio="4 / 5"
            position="50% 35%"
            sizes="(max-width: 980px) 88vw, 38vw"
          />
        </div>
      </section>

      <section className="section" id="archive" aria-labelledby="archive-heading">
        <div className="container">
          <SectionHeading index="02" label="Recognition archive" id="archive-heading">
            Selected <em>milestones.</em>
          </SectionHeading>
          <ArchiveFilters entries={entries} noun="recognitions" layout="ledger" label="Filter by verification status" />
        </div>
      </section>

      <section className="section band-paper2" id="verification" aria-labelledby="verify-heading">
        <div className="container verify">
          <SectionHeading
            index="03"
            label="Verification"
            id="verify-heading"
            intro="The research dossier explicitly classifies some claims as yellow or red. They remain in the archive for future documentary verification rather than being silently promoted to confirmed facts."
          >
            Research archive, <em>not invented certainty.</em>
          </SectionHeading>
          <div className="verify-cols">
            <Reveal className="card">
              <span aria-hidden="true"><Status text="Yellow" kind="verify" /></span>
              <h3 className="t-h3">Needs attribution / confirmation</h3>
              <ul role="list">{verificationNotes.yellow.map((x) => <li key={x}>{x}</li>)}</ul>
            </Reveal>
            <Reveal delay={100} className="card is-red">
              <span aria-hidden="true"><Status text="Red" kind="current" /></span>
              <h3 className="t-h3">Verify before absolute claim</h3>
              <ul role="list">{verificationNotes.red.map((x) => <li key={x}>{x}</li>)}</ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
