"use client";

import type { SiteContent } from "@/lib/content";
import type { ServicePage } from "@/lib/content-pages";
import { LP_SERVICE_FILES } from "@/lib/constants";
import { Overline } from "@/components/shared/Overline";
import { Reveal } from "@/components/shared/Reveal";
import { RevealWords } from "@/components/shared/RevealWords";
import { FilmFrame } from "@/components/shared/FilmFrame";

/* CLOSING — contact CTA + cross-links to the other two services. */
export function SpClosing({ page, c, crossLabel }: { page: ServicePage; c: SiteContent; crossLabel: string }) {
  const others = c.philosophy.services.filter((s) => s.key !== page.svc);
  return (
    <section className="sp-cta" id="contact">
      <div className="wrap">
        <Reveal>
          <Overline>{c.contact.overline}</Overline>
        </Reveal>
        <h2 className="sp-cta-title">
          <RevealWords text={c.contact.title} step={70} start={80} />
        </h2>
        <Reveal as="p" className="sp-cta-body">
          {c.contact.body}
        </Reveal>
        <Reveal className="sp-cta-actions">
          <a className="btn" href="tel:+32476506209">
            {c.contact.callBtn}
          </a>
          <a className="btn btn--ghost" href="mailto:milo.weiler@gmail.com">
            {c.contact.mailBtn}
          </a>
        </Reveal>

        <div className="sp-cross">
          <Reveal className="sp-cross-h">
            <Overline>{crossLabel}</Overline>
          </Reveal>
          <div className="sp-cross-grid">
            {others.map((s) => (
              <Reveal as="a" key={s.key} className="sp-cross-card" href={LP_SERVICE_FILES[s.key]}>
                <span className="sp-cross-fig">
                  <FilmFrame className="frame--light" tag={s.fig[0]} corner={s.fig[1]} />
                </span>
                <span>
                  <span className="sp-cross-no">{s.no}</span>
                  <div className="sp-cross-name serif">{s.name}</div>
                  <p className="sp-cross-note">{s.note}</p>
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
