/* Kinetic per-letter title (SWISSBRUT). Letters blur-in via CSS once an
   ancestor gains `.is-ready` (see .lp-kin in globals.css). */
export function Kinetic({
  text,
  start = 0,
  step = 34,
  className = "",
}: {
  text: string;
  start?: number;
  step?: number;
  className?: string;
}) {
  let i = 0;
  return (
    <span className={`lp-kin ${className}`}>
      {[...String(text)].map((ch, k) => {
        if (ch === " ") return <span className="sp" key={k} />;
        const d = start + i * step;
        i += 1;
        return (
          <span className="ch" key={k} style={{ transitionDelay: `${d}ms` }}>
            {ch}
          </span>
        );
      })}
    </span>
  );
}
