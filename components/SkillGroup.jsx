// One expertise group. Languages render as name + proficiency (split on " · " for display only;
// the stored wording is unchanged). No percentages or proficiency scores are shown.
export default function SkillGroup({ group, index, night = false }) {
  const items = group?.items ?? [];
  const isLang = group?.title === "Languages";
  const number = index != null ? String(index).padStart(2, "0") : null;
  return (
    <article className={`card skill-group${night ? " card-night" : ""}`}>
      {number && <span className="card-index" aria-hidden="true">{number}</span>}
      <h3>{group?.title}</h3>
      {isLang ? (
        <ul className="lang-list" role="list">
          {items.map((item, n) => {
            const [name, ...rest] = item.split(" · ");
            return (
              <li key={`${item}-${n}`}>
                <span className="lang-name">{name}</span>
                {rest.length > 0 && <span className="meta"><span className="visually-hidden"> · </span>{rest.join(" · ")}</span>}
              </li>
            );
          })}
        </ul>
      ) : (
        <ul role="list">{items.map((item, n) => <li key={`${item}-${n}`}>{item}</li>)}</ul>
      )}
    </article>
  );
}
