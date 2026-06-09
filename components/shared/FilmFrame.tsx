import type { CSSProperties } from "react";

/* Film-frame placeholder — striped, with filmstock labels. Looks intentional;
   real scans can be dropped in later as an <img> child (see .frame > img CSS). */
export function FilmFrame({
  tag,
  meta,
  corner,
  cross = true,
  className = "",
  style,
}: {
  tag?: string;
  meta?: string;
  corner?: string;
  cross?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`frame ${className}`} style={style} aria-hidden="true">
      {tag ? <span className="frame-tag">{tag}</span> : null}
      {corner ? <span className="frame-corner">{corner}</span> : null}
      {cross ? <span className="frame-cross" /> : null}
      {meta ? <span className="frame-meta">{meta}</span> : null}
    </div>
  );
}
