// Decorative brise-soleil lattice, drawn after the latticed tower of Hotel Agrabad's facade.
// Pure decoration: aria-hidden, no content. `id` must be unique on the page (pattern reference).
export default function Lattice({ id = "lattice", className = "", parallax, cell = 26 }) {
  const h = Math.round(cell * 1.5);
  return (
    <div className={`lattice ${className}`.trim()} aria-hidden="true" data-parallax={parallax}>
      <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <pattern id={id} width={cell} height={h} patternUnits="userSpaceOnUse">
            <path
              d={`M${cell * 0.22} ${h * 0.86} V${h * 0.38} a${cell * 0.28} ${cell * 0.28} 0 0 1 ${cell * 0.56} 0 V${h * 0.86} Z`}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}
