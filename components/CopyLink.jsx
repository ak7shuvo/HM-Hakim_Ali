"use client";
import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

// Copies a public URL to the clipboard with visible and announced feedback.
// Falls back to a hidden textarea + execCommand where the async Clipboard API is unavailable.
export default function CopyLink({ value, label = "Copy profile link", hint }) {
  const [state, setState] = useState("idle"); // idle | copied | error
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    let ok = false;
    try {
      if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(value); ok = true; }
    } catch { ok = false; }
    if (!ok) {
      try {
        const ta = document.createElement("textarea");
        ta.value = value; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select(); ok = document.execCommand("copy"); ta.remove();
      } catch { ok = false; }
    }
    setState(ok ? "copied" : "error");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2400);
  };

  return (
    <button type="button" className="card card-hover action-card copy-btn" data-state={state} onClick={copy}>
      <span className="ac-icon" aria-hidden="true">{state === "copied" ? <Check size={20} strokeWidth={1.6} /> : <Copy size={19} strokeWidth={1.6} />}</span>
      <span>
        <span className="meta">{state === "copied" ? "Copied to clipboard" : state === "error" ? "Copy unavailable — select the address instead" : "Share"}</span>
        <span className="ac-title" style={{ display: "block", marginTop: 4 }}>{label}</span>
        {hint && <span className="card-meta" style={{ display: "block", marginTop: 4, wordBreak: "break-all" }}>{hint}</span>}
      </span>
      <span className="visually-hidden" role="status">{state === "copied" ? "Link copied to clipboard" : state === "error" ? "Copy failed" : ""}</span>
    </button>
  );
}
