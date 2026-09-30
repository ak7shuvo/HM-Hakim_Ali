"use client";
import { useEffect, useState } from "react";
import { eras } from "@/lib/career";

// Client shell only: it decides which pre-rendered (server) entries are visible.
// Entries stay in the DOM with `hidden` so no-JS, print and SSR all show the full chronology.
// The selected era lives in the URL (?era=…) so it survives navigating away and back.
export default function CareerNavigator({ entries }) {
  const [active, setActive] = useState("all");

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

  const visible = entries.filter((e) => active === "all" || e.era === active).length;
  const label = eras.find((e) => e.id === active)?.label;

  return <>
    <div className="career-nav" role="group" aria-label="Career timeline navigation">
      <button type="button" className={active === "all" ? "is-active" : ""} aria-pressed={active === "all"} onClick={() => select("all")}>Full timeline</button>
      {eras.map((era) => <button type="button" key={era.id} className={active === era.id ? "is-active" : ""} aria-pressed={active === era.id} onClick={() => select(era.id)}>{era.label}</button>)}
    </div>
    <p className="visually-hidden" role="status">{label ? `${visible} of ${entries.length} timeline entries shown for ${label}` : `All ${entries.length} timeline entries shown`}</p>
    <ol className="timeline" role="list">
      {entries.map((e) => <li key={e.id} className={e.className} hidden={active !== "all" && e.era !== active}>{e.node}</li>)}
    </ol>
  </>;
}
