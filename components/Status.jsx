import { statusKind } from "@/lib/status";
// The state is always carried by the visible text label, never by colour alone; `data-kind` is a hook only.
export default function Status({ text, kind }) {
  if (!text) return null;
  const k = kind || statusKind(text);
  return <span className={`status s-${k}`} data-kind={k}>{text}</span>;
}
