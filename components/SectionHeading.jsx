import Reveal from "@/components/Reveal";
// `id` is an optional addition so a section can point aria-labelledby at its heading.
export default function SectionHeading({ index, label, children, light = false, as: Tag = "h2", id }) {
  return (
    <Reveal className={`section-heading ${light ? "is-light" : ""}`}>
      <p className="kicker">{index && <span className="kicker-num">{index}</span>}{label}</p>
      <Tag className="h-section" id={id}>{children}</Tag>
    </Reveal>
  );
}
