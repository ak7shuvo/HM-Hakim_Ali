// A template re-mounts on every navigation, so this quiet entrance replays per route.
// Transform + opacity only; content remains visible and accessible before the animation settles.
// The CSS keyframe respects prefers-reduced-motion and never hides content.
export default function Template({ children }) {
  return <div className="page-transition">{children}</div>;
}
