"use client";

import { useState } from "react";
import type { ServicePage } from "@/lib/site-types";
import { Overline } from "@/components/shared/Overline";
import { Reveal } from "@/components/shared/Reveal";
import { RevealWords } from "@/components/shared/RevealWords";

/* FAQ — single-open accordion. */
export function SpFaq({ page }: { page: ServicePage }) {
  const f = page.faq;
  const [open, setOpen] = useState(0);
  return (
    <section className="sp-faq" id="faq">
      <div className="wrap">
        <div className="sp-faq-grid">
          <div>
            <Reveal>
              <Overline>{f.overline}</Overline>
            </Reveal>
            <h2 className="display" style={{ fontSize: "clamp(30px,4.2vw,56px)", margin: "16px 0 0" }}>
              <RevealWords text={f.title} step={56} />
            </h2>
          </div>
          <Reveal className="sp-faq-list">
            {f.items.map((it, i) => (
              <div className="sp-faq-item" key={i} data-open={open === i ? "1" : "0"}>
                <button className="sp-faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  <span>{it.q}</span>
                  <span className="sign" aria-hidden="true">
                    +
                  </span>
                </button>
                <div className="sp-faq-a">
                  <p>{it.a}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
