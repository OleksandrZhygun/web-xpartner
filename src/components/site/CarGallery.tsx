"use client";

import { useState } from "react";
import Lightbox from "@/components/site/Lightbox";
import { useSwipe } from "@/lib/useSwipe";

export default function CarGallery({ photos, alt }: { photos: { url: string }[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const go = (delta: number) => {
    setIndex((i) => (i + delta + photos.length) % photos.length);
  };

  const swipeHandlers = useSwipe(
    () => go(1),
    () => go(-1)
  );

  if (photos.length === 0) {
    return (
      <div className="flex aspect-[3/2] items-center justify-center rounded-2xl bg-slate-100 text-sm text-slate-400">
        —
      </div>
    );
  }

  return (
    <div>
      <div className="group relative aspect-[3/2] overflow-hidden rounded-2xl bg-slate-100" {...swipeHandlers}>
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="block h-full w-full cursor-zoom-in touch-pan-y"
          aria-label="Enlarge photo"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photos[index].url} alt={alt} className="h-full w-full object-cover" />
        </button>

        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-lg text-white opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-lg text-white opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
            >
              ›
            </button>
          </>
        )}
      </div>

      {photos.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {photos.map((p, i) => (
            <button
              key={p.url + i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-16 w-20 flex-none overflow-hidden rounded-lg border-2 transition-colors ${
                i === index ? "border-brand-navy" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <Lightbox
          photos={photos}
          index={index}
          alt={alt}
          onIndexChange={setIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
