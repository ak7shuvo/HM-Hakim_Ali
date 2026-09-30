export default function SkillGroup({ group, index }) {
  return <article className="skill-group"><span className="skill-number">{String(index).padStart(2, "0")}</span><h3>{group.title}</h3><ul role="list">{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>;
}
