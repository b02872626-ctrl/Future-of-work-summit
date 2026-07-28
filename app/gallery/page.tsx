import type { Metadata } from "next";
import { GalleryGrid, type GalleryImage } from "@/components/GalleryGrid";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Gallery · Future of Work Summit",
  description:
    "Explore moments, conversations, workshops, exhibitions, and connections from the Future of Work Summit.",
};

const TILE_SHAPES: NonNullable<GalleryImage["shape"]>[] = [
  "square",
  "portrait",
  "landscape",
  "tall",
  "portrait",
  "square",
  "tall",
  "landscape",
];

function dayImages(day: 1 | 2): GalleryImage[] {
  const hiddenImages = day === 1 ? new Set([1, 2, 3]) : new Set<number>();

  return Array.from({ length: 50 }, (_, index) => index + 1)
    .filter((imageNumber) => !hiddenImages.has(imageNumber))
    .map((imageNumber, index) => {
      const fileNumber = String(imageNumber).padStart(3, "0");

      return {
        src: `/photos/gallery/day-${day}/day-${day}-${fileNumber}.jpg`,
        alt: `Future of Work Summit Day ${day}, photo ${imageNumber}`,
        caption: `Day ${day} photo ${imageNumber}`,
        shape: TILE_SHAPES[index % TILE_SHAPES.length],
      };
    });
}

const GALLERY_IMAGES = [...dayImages(1), ...dayImages(2)];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Nav theme="light" />
      <h1 className="sr-only">Gallery</h1>

      <section>
        <div className="w-full px-4 pb-20 pt-36 md:px-5 md:pb-28 md:pt-40">
          <GalleryGrid images={GALLERY_IMAGES} />
        </div>
      </section>
    </main>
  );
}
