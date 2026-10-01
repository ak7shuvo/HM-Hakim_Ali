import Button from "@/components/Button";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section
      className="section container notfound"
      aria-labelledby="nf-title"
    >
      <p className="eyebrow">
        <span className="eyebrow-line" aria-hidden="true" />
        Archive notice · 404
      </p>
      <h1 id="nf-title" className="page-title">
        This page is not part of the record.
      </h1>
      <p className="page-intro">
        The address may have changed or never existed within this professional
        archive. The career chronology and the documented collections remain the
        most reliable places to continue.
      </p>
      <div className="btn-row">
        <Button href="/">Return home</Button>
        <Button href="/career" variant="outline" icon={false}>
          Career journey
        </Button>
      </div>
    </section>
  );
}
