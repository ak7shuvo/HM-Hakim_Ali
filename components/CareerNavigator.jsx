"use client";
import { useEffect, useId, useRef, useState } from "react";
import { eras } from "@/lib/career";

// Client shell only: it decides which pre-rendered (server) entries are visible.
// Entries stay in the DOM with `hidden` so no-JS, print and SSR all show the full chronology.
// The selected era lives in the URL (?era=…) so it survives navigating away and back.
export default function CareerNavigator({ entries }) {
  const [active, setActive] = useState("all");
  const groupRef = useRef(null);
  const listId = useId();

  useEffect(() => {
    const era = new URLSearchParams(window.location.search).get("era");
    if (era && eras.some((e) => e.id === era)) setActive(era);
  }, []);

  const select = (id) => {
    setActive(id);
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
  };

  const isShown = (e) => active === "all" || e.era === active;
  const visible = entries.filter(isShown).length;
  const label = eras.find((e) => e.id === active)?.label;
  let visibleIndex = -1;

  return <>
    <div ref={groupRef} className="career-nav" role="group" aria-label="Career timeline navigation" data-active-era={active} onKeyDown={onKeyDown}>
      <button type="button" className={active === "all" ? "is-active" : ""} aria-pressed={active === "all"} aria-controls={listId} onClick={() => select("all")}>Full timeline</button>
      {eras.map((era) => <button type="button" key={era.id} className={active === era.id ? "is-active" : ""} aria-pressed={active === era.id} aria-controls={listId} onClick={() => select(era.id)}>{era.label}</button>)}
    </div>
    <p className="visually-hidden" role="status">{label ? `${visible} of ${entries.length} timeline entries shown for ${label}` : `All ${entries.length} timeline entries shown`}</p>
    <ol className="timeline" role="list" id={listId}>
      {entries.map((e) => {
        const shown = isShown(e);
        if (shown) visibleIndex += 1;
        // --vi: position among visible entries (capped) so a stagger can restart after each era change.
        return <li key={e.id} className={e.className} data-era={e.era || undefined} style={shown ? { "--vi": Math.min(visibleIndex, 8) } : undefined} hidden={!shown}>{e.node}</li>;
      })}
    </ol>
  </>;
}
