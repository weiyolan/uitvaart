"use client";

import type { SiteContent } from "@/lib/content";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHead } from "@/components/shared/SectionHead";

/* PROCESS — 4 steps (KAIUNTA / MINTA). */
export function Process({ c }: { c: SiteContent }) {
  return (
    <section className="lp-proc" id="traject">
      <div className="wrap">
        <SectionHead
          overline={c.process.overline}
          title={c.process.title}
          titleClass="work-title display"
          note={c.process.note}
        />
        <div className="lp-proc-grid">
          {c.process.steps.map((s, i) => (
            <Reveal className="lp-step" key={i} style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="lp-step-no">{s.no}</div>
              <div className="lp-step-name">{s.name}</div>
              <div className="lp-step-text">{s.text}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
