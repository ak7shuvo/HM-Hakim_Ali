// Scroll reveal marker. Server component: it only sets `data-reveal` and a delay; components/MotionRoot.jsx
// adds `.is-in` when the element enters the viewport. Content is hidden only when the `js` class is on <html>
// (set by an inline script that removes itself after 2.5 s if motion never initialises), and never under
// prefers-reduced-motion, so nothing depends on JavaScript to be readable.
// variant: "" (rise) | "fade" | "scale" | "left" | "mask"
export default function Reveal({ as: Tag = "div", delay = 0, variant = "", className, style, children, ...rest }) {
  const d = Math.min(Math.max(Number(delay) || 0, 0), 600);
  const merged = d ? { "--d": `${d}ms`, ...style } : style;
  return (
    <Tag data-reveal={variant} className={className || undefined} style={merged} {...rest}>
      {children}
    </Tag>
  );
}
