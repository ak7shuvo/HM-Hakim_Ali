import Status from "@/components/Status";

// Role / appointment card. `feature` widens it for the lead role in a grid; `night` gives the dark variant.
export default function RoleCard({ category, title, org, status, meta, text, index, feature = false, night = false, as: Tag = "article" }) {
  const cls = ["card", "card-hover", "role-card", feature && "is-feature", night && "card-night", "tilt"].filter(Boolean).join(" ");
  return (
    <Tag className={cls} data-tilt="">
      <div className="card-head">
        {category && <span className="meta card-cat">{category}</span>}
        {index != null && <span className="card-index" aria-hidden="true">{String(index).padStart(2, "0")}</span>}
      </div>
      <div>
        <h3 className="t-h3">{title}</h3>
        {org && <p className="card-org" style={{ marginTop: 8 }}>{org}</p>}
      </div>
      {meta && <p className="card-meta">{meta}</p>}
      {text && <p className="card-text">{text}</p>}
      {status && <div className="card-foot"><Status text={status} /></div>}
    </Tag>
  );
}
