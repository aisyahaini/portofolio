import { useEffect, useRef, useState } from "react";

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

interface LightboxProps {
  images: string[];
  index: number;
  alt: string;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

/** Full-screen image viewer: click a gallery frame to open it here, then
    zoom in/out (buttons, scroll wheel, or pinch) and drag to pan once
    zoomed past 1x. Resets zoom/pan whenever the image changes so zoom
    state never leaks from one slide to the next. */
export default function Lightbox({ images, index, alt, onClose, onIndexChange }: LightboxProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragState = useRef<{ startX: number; startY: number; panX: number; panY: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  useEffect(resetView, [index]);

  // Lock page scroll while the lightbox is open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const goPrev = () => onIndexChange((index - 1 + images.length) % images.length);
  const goNext = () => onIndexChange((index + 1) % images.length);

  const zoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)));
  const zoomOut = () =>
    setZoom((z) => {
      const next = Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2));
      if (next === MIN_ZOOM) setPan({ x: 0, y: 0 });
      return next;
    });

  // Keyboard: Esc to close, arrows to navigate, +/- to zoom.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && images.length > 1) goPrev();
      else if (e.key === "ArrowRight" && images.length > 1) goNext();
      else if (e.key === "+" || e.key === "=") zoomIn();
      else if (e.key === "-") zoomOut();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, images.length]);

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) zoomIn();
    else zoomOut();
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (zoom <= 1) return;
    (e.target as Element).setPointerCapture(e.pointerId);
    dragState.current = { startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y };
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    setPan({ x: dragState.current.panX + dx, y: dragState.current.panY + dy });
  };

  const endDrag = () => {
    dragState.current = null;
    setIsDragging(false);
  };

  const doubleClickZoom = () => {
    if (zoom > 1) resetView();
    else setZoom(2);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} — image viewer`}
      className="fixed inset-0 z-[100] flex flex-col bg-black/92 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <p className="font-mono text-[12px] text-white/60">
          {images.length > 1 ? `${index + 1} / ${images.length} — ` : ""}
          {alt}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={zoomOut}
            disabled={zoom <= MIN_ZOOM}
            aria-label="Zoom out"
            className="flex h-9 w-9 items-center justify-center rounded border border-white/20 text-white/80 transition-colors hover:border-white/50 hover:text-white disabled:opacity-30"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35M8 11h6" strokeLinecap="round" />
            </svg>
          </button>
          <span className="w-12 text-center font-mono text-[12px] text-white/60">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={zoomIn}
            disabled={zoom >= MAX_ZOOM}
            aria-label="Zoom in"
            className="flex h-9 w-9 items-center justify-center rounded border border-white/20 text-white/80 transition-colors hover:border-white/50 hover:text-white disabled:opacity-30"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image viewer"
            className="ml-2 flex h-9 w-9 items-center justify-center rounded border border-white/20 text-white/80 transition-colors hover:border-white/50 hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Image stage */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-4"
        onWheel={onWheel}
      >
        {images.length > 1 && (
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 transition-colors hover:border-white/50 hover:text-white sm:left-6"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        <img
          src={images[index]}
          alt={alt}
          onDoubleClick={doubleClickZoom}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          draggable={false}
          className="max-h-full max-w-full select-none rounded shadow-2xl"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transition: isDragging ? "none" : "transform 0.15s ease-out",
            cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
            touchAction: "none",
          }}
        />

        {images.length > 1 && (
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 transition-colors hover:border-white/50 hover:text-white sm:right-6"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 px-4 pb-5">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => onIndexChange(i)}
              aria-label={`Go to image ${i + 1}`}
              aria-current={i === index}
              className={`h-12 w-20 shrink-0 overflow-hidden rounded border transition-colors ${
                i === index ? "border-white/70" : "border-white/15 opacity-60 hover:opacity-90"
              }`}
            >
              <img src={src} alt="" draggable={false} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
