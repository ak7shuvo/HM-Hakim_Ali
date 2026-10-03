"use client";
import { useEffect, useId, useRef, useState } from "react";
import { eras } from "@/lib/career";

// Client shell only: it decides which pre-rendered (server) entries are visible.
// Entries stay in the DOM with `hidden`, so no-JS, print and SSR all show the full chronology.
// The selected era lives in the URL (?era=…) so it survives navigating away and back.
// First paint uses the scroll reveal; after a change, entries re-enter with a short stagger instead.
export default function CareerNavigator({ entries }) {
  const [active, setActive] = useState("all");
  const [gen, setGen] = useState(0);
  const groupRef = useRef(null);
  const listId = useId();

  useEffect(() => {
    const era = new URLSearchParams(window.location.search).get("era");
    if (era && eras.some((e) => e.id === era)) { setActive(era); setGen(1); }
  }, []);

  const select = (id) => {
    if (id === active) return;
    setActive(id);
    setGen((g) => g + 1);
    const url = new URL(window.location.href);
    if (id === "all") url.searchParams.delete("era"); else url.searchParams.set("era", id);
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  };

  // Arrow / Home / End move focus between era buttons (Tab still works); choosing stays an explicit action.
  const onKeyDown = (event) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    const buttons = Array.from(groupRef.current?.querySelectorAll("button") ?? []);
    const at = buttons.indexOf(document.activeElement);
    if (at < 0) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0
      : event.key === "End" ? buttons.length - 1
      : (at + (event.key === "ArrowRight" ? 1 : -1) + buttons.length) % buttons.length;
    buttons[next].focus();
    buttons[next].scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  const isShown = (e) => active === "all" || e.era === active;
  const shown = entries.filter(isShown);
  const lastId = shown[shown.length - 1]?.id;
  const label = eras.find((e) => e.id === active)?.label;
  const countOf = (id) => entries.filter((e) => e.era === id).length;
  let visibleIndex = -1;

  return <>
    <div className="era-bar">
      <div ref={groupRef} className="career-nav" role="group" aria-label="Career timeline navigation" data-active-era={active} onKeyDown={onKeyDown}>
        <button type="button" className={active === "all" ? "is-active" : ""} aria-pressed={active === "all"} aria-controls={listId} onClick={() => select("all")}>
          Full timeline <span className="count" aria-hidden="true">{entries.length}</span>
        </button>
        {eras.map((era) => (
          <button type="button" key={era.id} className={active === era.id ? "is-active" : ""} aria-pressed={active === era.id} aria-controls={listId} onClick={() => select(era.id)}>
            {era.label} <span className="count" aria-hidden="true">{countOf(era.id)}</span>
          </button>
        ))}
      </div>
    </div>
    <p className="visually-hidden" role="status">{label ? `${shown.length} of ${entries.length} timeline entries shown for ${label}` : `All ${entries.length} timeline entries shown`}</p>
    <ol className="timeline" role="list" id={listId}>
      {entries.map((e) => {
        const visible = isShown(e);
        if (visible) visibleIndex += 1;
        const cls = `${e.className}${e.id === lastId ? " is-last-visible" : ""}${gen > 0 && visible ? " archive-cell is-entering" : ""}`;
        return (
          <li key={gen > 0 ? `${e.id}-${gen}` : e.id} className={cls} data-era={e.era || undefined} data-reveal={gen === 0 ? "" : undefined} style={visible ? { "--vi": Math.min(visibleIndex, 8) } : undefined} hidden={!visible}>
            {e.node}
          </li>
        );
      })}
    </ol>
  </>;
}
