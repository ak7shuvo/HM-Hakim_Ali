"use client";
import { useEffect, useId, useMemo, useRef, useState } from "react";

// Client shell only: filters pre-rendered (server) ledger rows by category. Rows stay in the DOM
// with `hidden`, so no-JS and print show the full archive. Selection is kept in the URL (?category=…).
export default function ArchiveFilters({ entries, noun = "roles" }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(entries.map((e) => e.category).filter(Boolean)))], [entries]);
  const [active, setActive] = useState("All");
  const groupRef = useRef(null);
  const listId = useId();

  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get("category");
    if (category && categories.includes(category)) setActive(category);
  }, [categories]);

  const select = (category) => {
    setActive(category);
    const url = new URL(window.location.href);
    if (category === "All") url.searchParams.delete("category"); else url.searchParams.set("category", category);
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  };

  // Arrow / Home / End move focus between chips (Tab still works); selection stays an explicit action.
  const onKeyDown = (event) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    const chips = Array.from(groupRef.current?.querySelectorAll("button") ?? []);
    const at = chips.indexOf(document.activeElement);
    if (at < 0) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0
      : event.key === "End" ? chips.length - 1
      : (at + (event.key === "ArrowRight" ? 1 : -1) + chips.length) % chips.length;
    chips[next].focus();
  };

  const isShown = (e) => active === "All" || e.category === active;
  const count = entries.filter(isShown).length;
  let visibleIndex = -1;

  return (
    <div className="archive-filter-wrap" data-active-category={active}>
      <div className="archive-toolbar">
        <span className="filter-count" role="status">{count} {noun}{active === "All" ? "" : ` · ${active}`}</span>
        <div ref={groupRef} className="filter-list" role="group" aria-label="Filter by category" onKeyDown={onKeyDown}>
          {categories.map((category) => (
            <button key={category} type="button" className={`filter-chip ${active === category ? "is-active" : ""}`} aria-pressed={active === category} aria-controls={listId} onClick={() => select(category)}>{category}</button>
          ))}
        </div>
      </div>
      <div className="ledger" id={listId}>
        {entries.map((e) => {
          const shown = isShown(e);
          if (shown) visibleIndex += 1;
          // --vi: position among visible rows (capped) so a stagger can restart after each filter change.
          return <div key={e.id} className="ledger-cell" data-category={e.category || undefined} style={shown ? { "--vi": Math.min(visibleIndex, 8) } : undefined} hidden={!shown}>{e.node}</div>;
        })}
        {entries.length === 0 && <p className="filter-empty">No entries to show.</p>}
      </div>
    </div>
  );
}
