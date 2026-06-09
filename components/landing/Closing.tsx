"use client";

import type { SiteContent } from "@/lib/content";
import { lpScrollTo } from "@/lib/utils";
import { Overline } from "@/components/shared/Overline";
import { Reveal } from "@/components/shared/Reveal";
import { RevealWords } from "@/components/shared/RevealWords";

/* CLOSING statement (reuses styles.css .closing). */
export function Closing({ c }: { c: SiteContent }) {
  const x = c.closing;
  return (
    <section className="section-pad closing" id="slot">
      <div className="wrap closing-wrap">
        <Reveal>
          <Overline>{x.overline}</Overline>
        </Reveal>
        <p className="closing-statement display">
          <RevealWords text={x.statement} step={90} start={100} />
        </p>
        <Reveal as="p" className="closing-sub">
          {x.sub}
        </Reveal>
        <Reveal as="div" className="closing-cta">
          <a className="btn" href="#contact" onClick={lpScrollTo("contact")}>
            {c.hero.cta}
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
