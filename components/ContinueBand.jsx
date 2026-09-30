import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";

// Closing dark band shared by About, Education and Expertise.
export default function ContinueBand({ index, label = "Continue exploring", heading, text, links }) {
  return (
    <section className="section band-dark" aria-label={label}>
      <div className="container split split-center">
        <SectionHeading index={index} label={label} light>{heading}</SectionHeading>
        <Reveal delay={120} className="prose">
          <p>{text}</p>
          <div className="btn-row">{links.map((l, i) => <Button key={l.href} href={l.href} variant={i === 0 ? "light" : "outline-light"} icon={i === 0}>{l.label}</Button>)}</div>
        </Reveal>
      </div>
    </section>
  );
}
