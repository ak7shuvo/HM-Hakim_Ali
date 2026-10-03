import Reveal from "@/components/Reveal";

// Kicker (index + hairline + label), title and optional intro. Colour follows the surrounding surface
// (`.on-night` sections switch it), so there is no per-heading light/dark prop to keep in sync.
export default function SectionHeading({ index, label, children, intro, as: Tag = "h2", id, size = "h2", className = "" }) {
  return (
    <Reveal className={`sh ${className}`.trim()}>
      {(index || label) && (
        <p className="sh-kicker">
          {index && <span className="sh-num">{index}</span>}
          <span className="sh-line" aria-hidden="true" />
          {label && <span>{label}</span>}
        </p>
      )}
      <Tag className={size === "h3" ? "t-h3" : "t-h2"} id={id}>{children}</Tag>
      {intro && <p className="sh-intro">{intro}</p>}
    </Reveal>
  );
}
