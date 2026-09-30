// Quiet scroll reveal. Purely CSS (scroll-driven animation, see globals.css), so this is a
// server component: no client JS, no hydration dependency, content is visible by default.
export default function Reveal({ as: Tag = "div", delay = 0, className = "", style, children, ...rest }) {
  const offset = delay ? { "--rs": `${Math.min(delay / 10, 24)}%` } : null;
  return <Tag className={`reveal ${className}`.trim()} style={offset || style ? { ...offset, ...style } : undefined} {...rest}>{children}</Tag>;
}
