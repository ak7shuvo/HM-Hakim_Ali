import { statusKind } from "@/lib/status";
export default function Status({ text, kind }) {
  if (!text) return null;
  return <span className={`status s-${kind || statusKind(text)}`}>{text}</span>;
}
