import Status from "@/components/Status";
import { statusKind } from "@/lib/status";
import { timelineItemClass } from "@/lib/career";

// Content of one timeline entry. Server-rendered; also handed to the client era navigator as a node.
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

export default function Timeline({ items }) {
  return (
    <ol className="timeline" role="list">
      {items.map((item) => (
        <li key={`${item.period}-${item.title}`} className={timelineItemClass(item)}>
          <TimelineEntry item={item} />
        </li>
      ))}
    </ol>
  );
}
