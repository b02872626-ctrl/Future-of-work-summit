"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  shape?: "landscape" | "square" | "portrait" | "tall";
};

const SHAPE_CLASSES = {
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  tall: "aspect-[3/4]",
};

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  useEffect(() => {
    if (!selected) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selected]);

  return (
    <>
      <div className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4 xl:columns-5">
        {images.map((image) => (
          <figure
            key={image.src}
            className="mb-3 inline-block w-full break-inside-avoid align-top sm:mb-4"
          >
            <button
              type="button"
              onClick={() => setSelected(image)}
              className="group block w-full"
              aria-label={`Open ${image.caption}`}
            >
              <span
                className={`block overflow-hidden rounded-2xl bg-plum/10 ${
                  SHAPE_CLASSES[image.shape ?? "landscape"]
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                />
              </span>
            </button>
          </figure>
        ))}
      </div>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.caption}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-10"
          onClick={() => setSelected(null)}
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-cream/25 text-2xl text-cream transition hover:border-magenta hover:text-magenta md:right-8 md:top-8"
            aria-label="Close image"
          >
            ×
          </button>

          <figure
            className="flex max-h-full max-w-6xl flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selected.src}
              alt={selected.alt}
              className="max-h-[78vh] max-w-full rounded-2xl object-contain"
            />
          </figure>
        </div>
      )}
    </>
  );
}
