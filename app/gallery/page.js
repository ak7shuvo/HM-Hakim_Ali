import PageHeader from "@/components/PageHeader";
import GalleryGrid from "@/components/GalleryGrid";
import { gallery } from "@/lib/gallery";
import { pageMetadata } from "@/lib/seo";

const intro =
  "Photographs supplied for the portfolio, shown with neutral captions. Captions describe only what is visible; they do not identify people or link an event to a recognition.";

export const metadata = pageMetadata({ title: "Gallery", description: intro, path: "/gallery" });

export default function Gallery() {
  return (
    <>
      <PageHeader index="07" label="Gallery" path="/gallery" title="Archival photographs." intro={intro} />
      <section className="section" aria-labelledby="photos-heading">
        <div className="container">
          <h2 className="visually-hidden" id="photos-heading">Photographs</h2>
          <GalleryGrid items={gallery} />
        </div>
      </section>
    </>
  );
}
