"use client";

import type { ServicePage } from "@/lib/content-pages";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHead } from "@/components/shared/SectionHead";

/* HOW (werkwijze) — staggered process steps. */
export function SpHow({ page }: { page: ServicePage }) {
  const h = page.how;
  return (
    <section className="sp-how" id="how">
      <div className="wrap">
        <SectionHead overline={h.overline} title={h.title} titleClass="work-title display" note={h.note} />
        <div className="sp-how-grid">
          {h.steps.map((s, i) => (
            <Reveal className="sp-step" key={i} style={{ transitionDelay: `${(i % 2) * 90}ms` }}>
              <span className="sp-step-no">{s.no}</span>
              <div>
                <h3 className="sp-step-name">{s.name}</h3>
                <p className="sp-step-text">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
