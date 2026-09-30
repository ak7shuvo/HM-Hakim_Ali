"use client";
import { useEffect, useMemo, useState } from "react";

// Client shell only: filters pre-rendered (server) ledger rows by category. Rows stay in the DOM
// with `hidden`, so no-JS and print show the full archive. Selection is kept in the URL (?category=…).
export default function ArchiveFilters({ entries, noun = "roles" }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(entries.map((e) => e.category).filter(Boolean)))], [entries]);
  const [active, setActive] = useState("All");

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

  const count = active === "All" ? entries.length : entries.filter((e) => e.category === active).length;

  return (
    <div className="archive-filter-wrap">
      <div className="archive-toolbar">
        <span className="filter-count" role="status">{count} {noun}{active === "All" ? "" : ` · ${active}`}</span>
        <div className="filter-list" role="group" aria-label="Filter by category">
          {categories.map((category) => (
            <button key={category} type="button" className={`filter-chip ${active === category ? "is-active" : ""}`} aria-pressed={active === category} onClick={() => select(category)}>{category}</button>
          ))}
        </div>
      </div>
      <div className="ledger">
        {entries.map((e) => <div key={e.id} className="ledger-cell" hidden={active !== "All" && e.category !== active}>{e.node}</div>)}
      </div>
    </div>
  );
}
