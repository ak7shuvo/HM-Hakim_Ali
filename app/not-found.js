import Button from "@/components/Button";
import Lattice from "@/components/Lattice";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="container nf" aria-labelledby="nf-title">
      <Lattice id="nf-lattice" />
      <p className="sh-kicker"><span className="sh-num">404</span><span className="sh-line" aria-hidden="true" /><span>Archive notice</span></p>
      <p className="nf-code t-num" aria-hidden="true">404</p>
      <h1 id="nf-title" className="t-h1" style={{ maxWidth: "18ch" }}>This page is not part of the record.</h1>
      <p className="t-lead">
        The address may have changed or never existed within this professional archive. The career chronology and the
        documented collections remain the most reliable places to continue.
      </p>
      <div className="btn-row">
        <Button href="/" variant="dark">Return home</Button>
        <Button href="/career" variant="outline" icon={false}>Career journey</Button>
      </div>
    </section>
  );
}
