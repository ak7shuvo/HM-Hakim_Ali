// A template re-mounts on every navigation, so this short entrance replays per route.
// Transform + opacity only, ~600 ms; it never hides content and is disabled under reduced motion.
export default function Template({ children }) {
  return <div className="page-transition">{children}</div>;
}
