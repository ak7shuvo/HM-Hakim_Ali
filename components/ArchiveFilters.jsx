"use client";
import { useEffect, useId, useMemo, useRef, useState } from "react";

// Client shell only: filters pre-rendered (server) entries by category. Entries stay in the DOM with
// `hidden`, so no-JS and print show the full archive. Selection is kept in the URL (?category=…).
// layout: "cards" (two-column card grid) | "ledger" (editorial rows).
export default function ArchiveFilters({ entries, noun = "roles", layout = "cards", label = "Filter by category" }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(entries.map((e) => e.category).filter(Boolean)))], [entries]);
  const [active, setActive] = useState("All");
  const [gen, setGen] = useState(0);
  const groupRef = useRef(null);
  const listId = useId();

  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get("category");
    if (category && category !== "All" && categories.includes(category)) { setActive(category); setGen(1); }
  }, [categories]);

  const select = (category) => {
    if (category === active) return;
    setActive(category);
    setGen((g) => g + 1);
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
  const countOf = (c) => (c === "All" ? entries.length : entries.filter((e) => e.category === c).length);
  let visibleIndex = -1;

  return (
    <div className="archive-filter-wrap" data-active-category={active}>
      <div className="archive-toolbar">
        <div ref={groupRef} className="filter-list" role="group" aria-label={label} onKeyDown={onKeyDown}>
          {categories.map((category) => (
            <button key={category} type="button" className={`filter-chip ${active === category ? "is-active" : ""}`.trim()} aria-pressed={active === category} aria-controls={listId} onClick={() => select(category)}>
              {category} <span className="count" aria-hidden="true">{countOf(category)}</span>
            </button>
          ))}
        </div>
        <span className="filter-count" role="status">{count} {noun}{active === "All" ? "" : ` · ${active}`}</span>
      </div>
      <div className={`archive-grid ${layout === "ledger" ? "is-ledger ledger" : "is-cards"}`} id={listId}>
        {entries.map((e) => {
          const shown = isShown(e);
          if (shown) visibleIndex += 1;
          return (
            <div key={gen > 0 ? `${e.id}-${gen}` : e.id} className={`archive-cell${gen > 0 ? " is-entering" : ""}`} data-category={e.category || undefined} data-reveal={gen === 0 ? "" : undefined} style={shown ? { "--vi": Math.min(visibleIndex, 8), "--d": `${(visibleIndex % 2) * 80}ms` } : undefined} hidden={!shown}>
              {e.node}
            </div>
          );
        })}
        {entries.length === 0 && <p className="filter-empty">No entries to show.</p>}
      </div>
    </div>
  );
}
