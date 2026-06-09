import { Overline } from "./Overline";
import { Reveal } from "./Reveal";
import { RevealWords } from "./RevealWords";

/* Section header — title animates word-by-word (from components.jsx). */
export function SectionHead({
  overline,
  title,
  titleClass = "display",
  note,
}: {
  overline: string;
  title: string;
  titleClass?: string;
  note?: string;
}) {
  return (
    <div className="work-head">
      <Reveal>
        <Overline>{overline}</Overline>
      </Reveal>
      <h2 className={titleClass} style={{ margin: 0 }}>
        <RevealWords text={title} />
      </h2>
      {note ? (
        <Reveal className="work-note" as="p" style={{ margin: 0 }}>
          {note}
        </Reveal>
      ) : null}
    </div>
  );
}
