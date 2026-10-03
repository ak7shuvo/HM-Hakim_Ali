import Status from "@/components/Status";
import Reveal from "@/components/Reveal";
import { statusKind } from "@/lib/status";
import { KEY_PERIODS } from "@/lib/career";

// Content of one chronology entry. Server-rendered; also handed to the client era navigator as a node.
export function TimelineEntry({ item }) {
  return (
    <>
      <div className="tl-period">{item.period}</div>
      <div className="tl-rail" aria-hidden="true" />
      <article className="tl-body">
        <Status text={item.category} kind={statusKind(item.category)} />
        <h3>{item.title}</h3>
        <p className="tl-org">{item.organization}</p>
        <p className="tl-text">{item.text}</p>
      </article>
    </>
  );
}

// Compact home-page preview of selected periods (the full chronology lives on /career).
export function JourneyPreview({ items }) {
  return (
    <ol className="journey" role="list">
      {items.map((item, i) => (
        <Reveal as="li" key={`${item.period}-${item.title}`} delay={(i % 3) * 90} className={`journey-item${KEY_PERIODS.includes(item.period) ? " is-key" : ""}`}>
          <span className="journey-year t-num">{item.period}</span>
          <Status text={item.category} kind={statusKind(item.category)} />
          <h3>{item.title}</h3>
          <p className="tl-org">{item.organization}</p>
          <p>{item.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}
