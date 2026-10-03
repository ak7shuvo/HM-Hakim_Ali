import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import Lattice from "@/components/Lattice";

// Closing dark panel shared by About, Education and Expertise: where to read next.
export default function ContinueBand({ index, label = "Continue exploring", heading, text, links = [] }) {
  return (
    <section className="section" aria-label={label}>
      <div className="container">
        <Reveal variant="scale" className="continue on-night">
          <Lattice id={`continue-lattice-${index}`} />
          <SectionHeading index={index} label={label}>{heading}</SectionHeading>
          <div className="stack">
            <p>{text}</p>
            <div className="btn-row">
              {links.map((l, i) => (
                <Button key={`${l.href}-${i}`} href={l.href} variant={i === 0 ? "light" : "outline-light"} icon={i === 0}>{l.label}</Button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
