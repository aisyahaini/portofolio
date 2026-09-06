import { useEffect, useRef, useState } from "react";
import { ImagePlaceholder } from "./ProjectCard";
import Lightbox from "./Lightbox";

const AUTOPLAY_MS = 5000;

/** Landing-page-style slideshow for a project's screenshots. Auto-advances
    when idle, pauses on hover/focus, and opens a zoomable Lightbox on
    click. Falls back to the static placeholder when a project has no
    images yet, instead of rendering an empty/broken slideshow. */
export default function ProjectGallery({ images, name }: { images: string[]; name: string }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [erroredSrcs, setErroredSrcs] = useState<Set<string>>(new Set());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const usableImages = images.filter((src) => !erroredSrcs.has(src));
  const hasImages = usableImages.length > 0;
  const safeIndex = hasImages ? Math.min(current, usableImages.length - 1) : 0;

  useEffect(() => {
    if (!hasImages || usableImages.length <= 1 || paused || lightboxOpen) return;
    timerRef.current = setInterval(() => {
      setCurrent((i) => (i + 1) % usableImages.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hasImages, usableImages.length, paused, lightboxOpen]);

  if (!hasImages) {
    return <ImagePlaceholder name={name} boxClassName="h-20 w-20" />;
  }

  const goTo = (i: number) => setCurrent((i + usableImages.length) % usableImages.length);
  const goPrev = () => goTo(safeIndex - 1);
  const goNext = () => goTo(safeIndex + 1);

  return (
    <div
      className="group/gallery relative h-full w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {usableImages.map((src, i) => (
        <button
          key={src}
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label={`Open ${name} screenshot ${i + 1} of ${usableImages.length} in zoomable viewer`}
          className={`absolute inset-0 h-full w-full cursor-zoom-in overflow-hidden transition-opacity duration-500 ${
            i === safeIndex ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <img
            src={src}
            alt={`${name} screenshot ${i + 1} of ${usableImages.length}`}
            onError={() => setErroredSrcs((prev) => new Set(prev).add(src))}
            draggable={false}
            className="h-full w-full object-cover"
          />
        </button>
      ))}

      {/* Zoom hint */}
      <div className="pointer-events-none absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded border border-white/15 bg-black/40 px-2.5 py-1 font-mono text-[11px] text-white/80 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover/gallery:opacity-100">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" strokeLinecap="round" />
        </svg>
        Click to zoom
      </div>

      {usableImages.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous screenshot"
            className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:border-white/40 hover:text-white group-hover/gallery:opacity-100"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next screenshot"
            className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:border-white/40 hover:text-white group-hover/gallery:opacity-100"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {usableImages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(i);
                }}
                aria-label={`Go to screenshot ${i + 1}`}
                aria-current={i === safeIndex}
                className={`h-1.5 rounded-full bg-white transition-all duration-300 ${
                  i === safeIndex ? "w-6 opacity-90" : "w-1.5 opacity-40 hover:opacity-70"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {lightboxOpen && (
        <Lightbox
          images={usableImages}
          index={safeIndex}
          alt={`${name} screenshot`}
          onClose={() => setLightboxOpen(false)}
          onIndexChange={goTo}
        />
      )}
    </div>
  );
}
