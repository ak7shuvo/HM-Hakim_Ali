"use client";
import { useEffect, useId, useMemo, useRef, useState } from "react";

// Client shell over server-rendered news cards: filters by year and category, groups by year (newest first).
// Cards stay in the DOM with `hidden`, so no-JS, print and search engines see the full archive.
// The selection is kept in the URL (?year=…&category=…) so a filtered view can be linked and survives reload.
export default function NewsFilters({ entries, years, categories }) {
  const [year, setYear] = useState("All");
  const [category, setCategory] = useState("All");
  const [gen, setGen] = useState(0);
  const yearRef = useRef(null);
  const catRef = useRef(null);
  const listId = useId();

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const y = sp.get("year");
    const c = sp.get("category");
    let changed = false;
    if (y && years.includes(y)) { setYear(y); changed = true; }
    if (c && categories.includes(c)) { setCategory(c); changed = true; }
    if (changed) setGen(1);
  }, [years, categories]);

  const sync = (nextYear, nextCat) => {
    const url = new URL(window.location.href);
    if (nextYear === "All") url.searchParams.delete("year"); else url.searchParams.set("year", nextYear);
    if (nextCat === "All") url.searchParams.delete("category"); else url.searchParams.set("category", nextCat);
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  };
  const pickYear = (y) => { if (y === year) return; setYear(y); setGen((g) => g + 1); sync(y, category); };
  const pickCat = (c) => { if (c === category) return; setCategory(c); setGen((g) => g + 1); sync(year, c); };
  const reset = () => { setYear("All"); setCategory("All"); setGen((g) => g + 1); sync("All", "All"); };

  // Arrow / Home / End move focus within a chip group; choosing stays an explicit action.
  const arrows = (ref) => (event) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    const chips = Array.from(ref.current?.querySelectorAll("button") ?? []);
    const at = chips.indexOf(document.activeElement);
    if (at < 0) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? chips.length - 1 : (at + (event.key === "ArrowRight" ? 1 : -1) + chips.length) % chips.length;
    chips[next].focus();
  };

  const matchYear = (e, y = year) => y === "All" || e.year === y;
  const matchCat = (e, c = category) => c === "All" || e.categories.includes(c);
  const shown = (e) => matchYear(e) && matchCat(e);
  const count = entries.filter(shown).length;
  const yearCount = (y) => entries.filter((e) => matchYear(e, y) && matchCat(e)).length;
  const catCount = (c) => entries.filter((e) => matchYear(e) && matchCat(e, c)).length;
  const groups = useMemo(() => years.map((y) => ({ year: y, items: entries.filter((e) => e.year === y) })), [entries, years]);
  const order = new Map(entries.filter(shown).map((e, i) => [e.id, i]));
  const filtered = year !== "All" || category !== "All";

  return (
    <div className="news-filters">
      <div className="news-toolbar">
        <div className="news-filter-row">
          <span className="meta news-filter-label" id={`${listId}-y`}>Year</span>
          <div ref={yearRef} className="filter-list" role="group" aria-labelledby={`${listId}-y`} onKeyDown={arrows(yearRef)}>
            {["All", ...years].map((y) => (
              <button key={y} type="button" className={`filter-chip${year === y ? " is-active" : ""}`} aria-pressed={year === y} aria-controls={listId} onClick={() => pickYear(y)}>
                {y} <span className="count" aria-hidden="true">{yearCount(y)}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="news-filter-row">
          <span className="meta news-filter-label" id={`${listId}-c`}>Category</span>
          <div ref={catRef} className="filter-list news-cats" role="group" aria-labelledby={`${listId}-c`} onKeyDown={arrows(catRef)}>
            {["All", ...categories].map((c) => {
              const n = catCount(c);
              return (
                <button key={c} type="button" className={`filter-chip${category === c ? " is-active" : ""}`} aria-pressed={category === c} aria-controls={listId} onClick={() => pickCat(c)} disabled={n === 0 && category !== c}>
                  {c} <span className="count" aria-hidden="true">{n}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="news-status">
          <p className="filter-count" role="status">{count} {count === 1 ? "article" : "articles"}{year !== "All" ? ` · ${year}` : ""}{category !== "All" ? ` · ${category}` : ""}</p>
          {filtered && <button type="button" className="link-arrow news-reset" onClick={reset}><span>Show all coverage</span></button>}
        </div>
      </div>

      <div id={listId}>
        {count === 0 && <p className="filter-empty">No coverage matches these filters.</p>}
        {groups.map((g) => {
          const visible = g.items.filter(shown);
          return (
            <section key={g.year} className="news-year" hidden={visible.length === 0} aria-labelledby={`${listId}-${g.year}`}>
              <h2 className="news-year-head" id={`${listId}-${g.year}`}>
                <span className="t-num">{g.year}</span>
                <span className="meta">{visible.length} {visible.length === 1 ? "article" : "articles"}</span>
              </h2>
              <ol className="news-grid" role="list">
                {g.items.map((e) => {
                  const on = shown(e);
                  return (
                    <li key={gen > 0 ? `${e.id}-${gen}` : e.id} hidden={!on} className={`news-cell${gen > 0 && on ? " archive-cell is-entering" : ""}`} data-reveal={gen === 0 ? "" : undefined} style={on ? { "--vi": Math.min(order.get(e.id) ?? 0, 8), "--d": `${((order.get(e.id) ?? 0) % 2) * 80}ms` } : undefined}>
                      {e.node}
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>
    </div>
  );
}
