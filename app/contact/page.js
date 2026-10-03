import Link from "next/link";
import { ArrowUpRight, Linkedin, User } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CopyLink from "@/components/CopyLink";
import Lattice from "@/components/Lattice";
import { nbsp, site } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const intro = "For professional enquiries, tourism partnerships, media requests and relevant industry communication.";
export const metadata = pageMetadata({ title: "Contact", description: intro, path: "/contact" });

export default function Contact() {
  return (
    <>
      <PageHeader index="08" label="Contact" path="/contact" title="Professional connection." intro={intro} />

      <section className="section" aria-labelledby="connect-heading">
        <div className="container contact">
          <Reveal className="stack" style={{ "--stack": "1.5rem" }}>
            <p className="sh-kicker"><span className="sh-num">01</span><span className="sh-line" aria-hidden="true" style={{ transform: "none" }} /><span>Professional enquiries</span></p>
            <h2 className="t-h2" id="connect-heading">Connect with <em>{nbsp(site.name)}.</em></h2>
            <p className="t-lead">
              Publicly documented contact details are limited in the current project sources. The portfolio therefore avoids
              inventing a phone number, email address or social profile.
            </p>
            <div>
              <p className="meta" style={{ marginBottom: 12 }}>Suitable for</p>
              <div className="tags">
                <span className="tag">Tourism & hospitality</span>
                <span className="tag">Industry communication</span>
                <span className="tag">Media / professional enquiries</span>
              </div>
            </div>
            <div className="card" style={{ marginTop: "2rem" }}>
              <p className="meta">Location</p>
              <div className="coords">
                <strong>{site.location}</strong>
                <span className="meta">{site.coordinates}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="contact-actions">
            <a className="card card-hover card-night action-card" href={site.linkedin} target="_blank" rel="noopener noreferrer">
              <span className="ac-icon" aria-hidden="true"><Linkedin size={20} strokeWidth={1.6} /></span>
              <span>
                <span className="meta">Primary channel</span>
                <span className="ac-title" style={{ display: "block", marginTop: 4 }}>View LinkedIn<span className="visually-hidden"> (opens in a new tab)</span></span>
              </span>
              <ArrowUpRight className="ac-go" size={20} strokeWidth={1.6} aria-hidden="true" />
            </a>
            <CopyLink value={site.linkedin} label="Copy LinkedIn link" hint={site.linkedin.replace(/^https:\/\//, "")} />
            <Link className="card card-hover action-card" href="/about">
              <span className="ac-icon" aria-hidden="true"><User size={20} strokeWidth={1.6} /></span>
              <span>
                <span className="meta">Background</span>
                <span className="ac-title" style={{ display: "block", marginTop: 4 }}>View professional profile</span>
              </span>
              <ArrowUpRight className="ac-go" size={20} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="context-heading">
        <div className="container">
          <Reveal variant="scale" className="continue on-night">
            <Lattice id="contact-lattice" />
            <SectionHeading index="02" label="Professional context" id="context-heading">
              A public profile with <em>a long archive.</em>
            </SectionHeading>
            <div className="stack">
              <p>
                For deeper context, the Career and Experience archives preserve chronology and role status rather than reducing
                the professional record to a single current title.
              </p>
              <div className="btn-row">
                <Link className="link-arrow" href="/career"><span>Explore the timeline</span></Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
