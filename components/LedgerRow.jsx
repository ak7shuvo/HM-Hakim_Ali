import Status from "@/components/Status";

// Editorial archive row: year (or label) · title, organisation, text · status.
export default function LedgerRow({ year, label, status, title, org, meta, text }) {
  return (
    <article className="ledger-row">
      <div>
        {year && <span className="ledger-year t-num">{year}</span>}
        {label && <span className="ledger-label meta">{label}</span>}
      </div>
      <div>
        <h3 className="ledger-title">{title}</h3>
        {org && <p className="ledger-org">{org}</p>}
        {meta && <p className="ledger-meta card-meta">{meta}</p>}
        {text && <p className="ledger-text">{text}</p>}
      </div>
      <Status text={status} className="ledger-status" />
    </article>
  );
}
