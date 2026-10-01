export default function PageHeader({ eyebrow, title, intro }) {
  return (
    <header className="page-header">
      <div className="container">
        {eyebrow && <p className="eyebrow"><span className="eyebrow-line" aria-hidden="true" />{eyebrow}</p>}
        <h1 className="page-title">{title}</h1>
        {intro && <p className="page-intro">{intro}</p>}
      </div>
    </header>
  );
}
