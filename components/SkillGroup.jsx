export default function SkillGroup({ group, index }) {
  const number = Number.isFinite(Number(index)) && index !== "" && index != null ? String(index).padStart(2, "0") : null;
  const items = group?.items ?? [];
  return <article className="skill-group">{number && <span className="skill-number" aria-hidden="true">{number}</span>}<h3>{group?.title}</h3><ul role="list">{items.map((item, n) => <li key={`${item}-${n}`}>{item}</li>)}</ul></article>;
}
