// Maps the dossier's status wording to a display kind. It only chooses a marker
// shape; it never rewrites or upgrades the original status text.
export function statusKind(text = "") {
  const t = text.toLowerCase();
  if (t.includes("verify") || t.includes("to check") || t.includes("pending")) return "verify";
  if (t.includes("self-reported")) return "self";
  if (t.includes("historical")) return "historical";
  if (t.includes("current") || t.includes("recent")) return "current";
  return "documented";
}
