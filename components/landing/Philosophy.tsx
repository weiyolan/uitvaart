"use client";

import type { SiteContent } from "@/lib/site-types";
import { Overline } from "@/components/shared/Overline";
import { Reveal } from "@/components/shared/Reveal";
import { RevealWords } from "@/components/shared/RevealWords";
import { FilmFrame } from "@/components/shared/FilmFrame";

/* PHILOSOPHY / ABOUT (COCOON — filosofie & fotograaf). */
export function Philosophy({ c }: { c: SiteContent }) {
  const m = c.philosophy;
  return (
    <section className="lp-philo wrap" id="filosofie">
      <Reveal>
        <Overline>{m.overline}</Overline>
      </Reveal>
      <p className="lp-philo-lead">
        <RevealWords text={m.lead} step={42} start={80} />
      </p>
      <div className="lp-philo-grid">
        <Reveal className="lp-philo-fig">
          <FilmFrame className="frame--light" style={{ width: "100%", height: "100%" }} tag={m.name} meta="Middenformaat 6×7" corner="6×7" />
        </Reveal>
        <div className="lp-philo-body">
          <Reveal as="p">{m.body}</Reveal>
          <Reveal className="lp-philo-sign">
            <span className="nm serif">{m.name}</span>
            <span className="rl">{m.role}</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
