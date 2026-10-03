// Typographic emblem for a recognition that has no supplied photograph or certificate.
// It is a decorative device built only from the recognition's own title, organisation and year;
// it is not, and is not labelled as, a reproduction of any certificate.
export default function Emblem({ year, title, organization }) {
  const ring = `${title} · ${organization} · ${year} · `.toUpperCase();
  return (
    <figure className="emblem" role="img" aria-label={`Typographic emblem: ${title}, ${organization}, ${year}`}>
      <svg viewBox="0 0 400 400" aria-hidden="true">
        <defs>
          <path id="em-ring" d="M200 200 m-150 0 a150 150 0 1 1 300 0 a150 150 0 1 1 -300 0" />
        </defs>
        <circle cx="200" cy="200" r="196" fill="none" stroke="currentColor" strokeOpacity=".22" />
        <circle cx="200" cy="200" r="176" fill="none" stroke="currentColor" strokeOpacity=".35" strokeDasharray="1 5" />
        <g className="em-rotate">
          <text fill="currentColor" fontSize="13.5" style={{ fontFamily: "var(--mono)" }}>
            <textPath href="#em-ring" textLength="936" lengthAdjust="spacing">{ring + ring}</textPath>
          </text>
        </g>
        <circle cx="200" cy="200" r="122" fill="none" stroke="currentColor" strokeOpacity=".3" />
      </svg>
      <div className="emblem-core" aria-hidden="true">
        <span className="t-num">{year}</span>
        <span className="meta">{title}</span>
      </div>
    </figure>
  );
}
