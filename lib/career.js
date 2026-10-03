// Shared career-era helpers used by the server-rendered timeline and the era navigator.
export const eras = [
  { id: "era-1969-1975", label: "1969–1975", match: ["1969", "1971", "1975"] },
  { id: "era-1991", label: "1991", match: ["1991"] },
  { id: "era-2003-2009", label: "2003–2009", match: ["2003", "2004", "2008", "2009"] },
  { id: "era-2011-2018", label: "2011–2018", match: ["2011–2015", "2012", "2014", "2016", "2017", "2018"] },
  { id: "era-2020-2026", label: "2020–2026", match: ["2020", "2023", "2024", "2025", "2026"] },
];

export const KEY_PERIODS = ["1971", "2025", "2026"];

export const eraOf = (item) => eras.find((era) => era.match.includes(item.period))?.id ?? null;

export const timelineItemClass = (item) => `timeline-item${KEY_PERIODS.includes(item.period) ? " is-key" : ""}`;
