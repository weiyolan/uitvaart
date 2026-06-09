"use client";

import type { ServicePage } from "@/lib/content-pages";
import { Overline } from "@/components/shared/Overline";
import { Reveal } from "@/components/shared/Reveal";
import { RevealWords } from "@/components/shared/RevealWords";
import { FilmFrame } from "@/components/shared/FilmFrame";

/* PIECE (het stuk) — the deliverable + specs; figure flips left for portret. */
export function SpPiece({ page }: { page: ServicePage }) {
  const p = page.piece;
  const figLeft = page.svc === "portret";
  return (
    <section className="sp-piece" id="piece" data-fig={figLeft ? "left" : "right"}>
      <div className="wrap sp-piece-grid">
        <Reveal className="sp-piece-fig">
          <FilmFrame className="frame--light" tag={p.fig.tag} meta={p.fig.meta} corner={p.fig.corner} />
          <span className="sp-piece-result">
            <span className="k">{p.result[0]}</span>
            <span className="v">{p.result[1]}</span>
          </span>
        </Reveal>
        <div className="sp-piece-text">
          <Reveal>
            <Overline>{p.overline}</Overline>
          </Reveal>
          <h2 className="display" style={{ fontSize: "clamp(30px,4.4vw,60px)", margin: "16px 0 0" }}>
            <RevealWords text={p.title} step={56} />
          </h2>
          <Reveal as="p" className="sp-piece-body">
            {p.body}
          </Reveal>
          <Reveal as="ul" className="sp-spec">
            {p.specs.map((s, i) => (
              <li key={i}>
                <span className="ix">{String(i + 1).padStart(2, "0")}</span>
                <span>{s}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
