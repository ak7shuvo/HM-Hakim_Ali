// A template re-mounts on every navigation, so this quiet entrance replays per route.
// The animation is transform-only, so content is never hidden before it runs.
export default function Template({ children }) {
  return <div className="page-transition">{children}</div>;
}
