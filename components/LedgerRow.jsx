import Status from "@/components/Status";
// Editorial row: replaces boxed cards for roles, education and archive entries.
// The stagger index is capped so rows far down a long ledger never wait on a long delay.
export default function LedgerRow({ year, label, status, title, org, meta, text, i = 0 }) {
  const stagger = Math.min(Math.max(Number(i) || 0, 0), 8);
  return (
    <article className="ledger-row rise" style={{ "--i": stagger }}>
      <div className="ledger-side">
        {year && <span className="ledger-year">{year}</span>}
        {label && <span className="ledger-label">{label}</span>}
        <Status text={status} />
      </div>
      <div className="ledger-body">
        <h3 className="ledger-title">{title}</h3>
        {org && <p className="ledger-org">{org}</p>}
        {meta && <p className="ledger-meta">{meta}</p>}
        {text && <p className="ledger-text">{text}</p>}
      </div>
    </article>
  );
}
