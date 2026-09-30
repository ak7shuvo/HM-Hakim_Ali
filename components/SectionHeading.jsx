import Reveal from "@/components/Reveal";
export default function SectionHeading({ index, label, children, light = false, as: Tag = "h2" }) {
  return (
    <Reveal className={`section-heading ${light ? "is-light" : ""}`}>
      <p className="kicker">{index && <span className="kicker-num">{index}</span>}{label}</p>
      <Tag className="h-section">{children}</Tag>
    </Reveal>
  );
}
