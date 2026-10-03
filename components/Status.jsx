import { statusKind } from "@/lib/status";
// The state is always carried by the visible text label; colour and marker shape are secondary cues.
export default function Status({ text, kind, className = "" }) {
  if (!text) return null;
  const k = kind || statusKind(text);
  return <span className={`status s-${k} ${className}`.trim()} data-kind={k}>{text}</span>;
}
