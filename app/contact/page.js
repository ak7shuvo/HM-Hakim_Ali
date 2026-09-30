import Link from "next/link";
import { ArrowUpRight, ExternalLink, Linkedin } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const intro = "For professional enquiries, tourism partnerships, media requests and relevant industry communication.";
export const metadata = pageMetadata({ title: "Contact", description: intro, path: "/contact" });

export default function Contact() {
  return <>
    <PageHeader eyebrow="08 · Contact" title="Professional connection." intro={intro} />
    <section className="section container">
      <div className="contact-grid">
        <Reveal>
          <p className="ledger-label">Professional enquiries</p>
          <h2>Connect with {site.name}.</h2>
          <p>Publicly documented contact details are limited in the current project sources. The portfolio therefore avoids inventing a phone number, email address or social profile.</p>
          <div className="contact-purpose"><span className="tag">Tourism & hospitality</span><span className="tag">Industry communication</span><span className="tag">Media / professional enquiries</span></div>
        </Reveal>
        <Reveal delay={120} className="contact-action">
          <a className="btn btn-dark" href="https://bd.linkedin.com/in/h-m-hakim-ali-608b7b217" target="_blank" rel="noopener noreferrer"><Linkedin size={16} strokeWidth={1.5} aria-hidden="true" /> <span>View LinkedIn<span className="visually-hidden"> (opens in a new tab)</span></span> <ExternalLink size={13} strokeWidth={1.5} aria-hidden="true" /></a>
          <Button href="/about" variant="outline">View professional profile</Button>
        </Reveal>
      </div>
      <div className="contact-note"><strong>Location</strong><span>{site.location}</span></div>
    </section>
    <section className="section band-dark"><div className="container split split-center"><SectionHeading index="01" label="Professional context" light>A public profile with <em>a long archive.</em></SectionHeading><Reveal delay={120} className="prose"><p>For deeper context, the Career and Experience archives preserve chronology and role status rather than reducing the professional record to a single current title.</p><div className="btn-row"><Link className="link-arrow" href="/career">Explore the timeline <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" /></Link></div></Reveal></div></section>
  </>;
}
