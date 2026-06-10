import type { CSSProperties } from "react";
import type { Figure } from "@/lib/site-types";
import { SanityImage } from "./SanityImage";

/* Film-frame: shows a real Sanity scan when one is uploaded, otherwise the
   striped placeholder with filmstock labels. */
export function FilmFrame({
  tag,
  meta,
  corner,
  cross = true,
  className = "",
  style,
  image,
}: {
  tag?: string;
  meta?: string;
  corner?: string;
  cross?: boolean;
  className?: string;
  style?: CSSProperties;
  image?: Figure["image"];
}) {
  const hasScan = !!image?.asset;
  return (
    <div className={`frame ${className}`} style={style} aria-hidden={hasScan ? undefined : "true"}>
      {hasScan ? (
        <SanityImage value={image} alt={image.alt || meta || tag || ""} sizes="(max-width: 720px) 100vw, 50vw" />
      ) : null}
      {tag ? <span className="frame-tag">{tag}</span> : null}
      {corner ? <span className="frame-corner">{corner}</span> : null}
      {cross ? <span className="frame-cross" /> : null}
      {meta ? <span className="frame-meta">{meta}</span> : null}
    </div>
  );
}
