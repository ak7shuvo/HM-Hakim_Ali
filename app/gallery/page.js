import PageHeader from "@/components/PageHeader";
import GalleryGrid from "@/components/GalleryGrid";
import BackToTop from "@/components/BackToTop";
import { gallery } from "@/lib/gallery";
import { pageMetadata } from "@/lib/seo";

const intro =
  "Photographs supplied for the portfolio, shown with neutral captions. Captions describe only what is visible; they do not identify people or link an event to a recognition.";

export const metadata = pageMetadata({
  title: "Gallery",
  description: intro,
  path: "/gallery",
});

export default function Gallery() {
  return (
    <>
      <PageHeader
        eyebrow="07 · Gallery"
        title="Archival photographs."
        intro={intro}
      />

      <section className="section container" aria-label="Photographs">
        <GalleryGrid items={gallery} />
        <BackToTop />
      </section>
    </>
  );
}
