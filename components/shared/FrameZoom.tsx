"use client";

import type { Figure } from "@/lib/site-types";
import { useLightbox } from "./Lightbox";

/* Transparent overlay button that sits inside a .frame and opens the scan in
   the lightbox. Kept as its own client component so FilmFrame can stay
   server-renderable and just pass serializable props. */
export function FrameZoom({
  image,
  label,
  zoomLabel = "Vergroten",
}: {
  image: NonNullable<Figure["image"]>;
  label: string;
  zoomLabel?: string;
}) {
  const { open } = useLightbox();
  return (
    <button
      type="button"
      className="frame-zoom"
      aria-label={label ? `${label} — ${zoomLabel.toLowerCase()}` : zoomLabel}
      onClick={() => open(image, label)}
    >
      <span className="frame-zoom-cue" aria-hidden="true">
        {zoomLabel}
        <span className="frame-zoom-ic">⤢</span>
      </span>
    </button>
  );
}
