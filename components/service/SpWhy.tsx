"use client";

import type { ServicePage } from "@/lib/content-pages";
import { Overline } from "@/components/shared/Overline";
import { Reveal } from "@/components/shared/Reveal";
import { RevealWords } from "@/components/shared/RevealWords";
import { FilmFrame } from "@/components/shared/FilmFrame";

/* WHY (waarom) — extended pitch + pull-quote. */
export function SpWhy({ page }: { page: ServicePage }) {
  const w = page.why;
  return (
    <section className="sp-why" id="why">
      <div className="wrap">
        <div className="sp-why-grid">
          <div>
            <Reveal>
              <Overline>{w.overline}</Overline>
            </Reveal>
            <p className="sp-why-lead">
              <RevealWords text={w.lead} step={46} start={60} />
            </p>
            <div className="sp-why-body">
              {w.body.map((p, i) => (
                <Reveal as="p" key={i}>
                  {p}
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal className="sp-why-fig">
            <FilmFrame className="frame--light" tag={w.fig.tag} meta={w.fig.meta} corner={w.fig.corner} />
          </Reveal>
        </div>
        <div className="sp-pull">
          <p>
            <RevealWords text={w.pull} step={70} start={80} />
          </p>
        </div>
      </div>
    </section>
  );
}
