"use client";

import type { Locale } from "@/lib/i18n";
import type { ServiceData, ServiceSettings } from "@/lib/site-types";
import { servicePath } from "@/lib/routes";
import { Overline } from "@/components/shared/Overline";
import { Reveal } from "@/components/shared/Reveal";
import { RevealWords } from "@/components/shared/RevealWords";
import { FilmFrame } from "@/components/shared/FilmFrame";

/* CLOSING — contact CTA + cross-links to the other two services. */
export function SpClosing({
  lang,
  contact,
  others,
  crossLabel,
}: {
  lang: Locale;
  contact: ServiceSettings["contact"];
  others: ServiceData["others"];
  crossLabel: string;
}) {
  return (
    <section className="sp-cta" id="contact">
      <div className="wrap">
        <Reveal>
          <Overline>{contact.overline}</Overline>
        </Reveal>
        <h2 className="sp-cta-title">
          <RevealWords text={contact.title} step={70} start={80} />
        </h2>
        <Reveal as="p" className="sp-cta-body">
          {contact.body}
        </Reveal>
        <Reveal className="sp-cta-actions">
          <a className="btn" href={contact.callHref}>
            {contact.callBtn}
          </a>
          <a className="btn btn--ghost" href={contact.mailHref}>
            {contact.mailBtn}
          </a>
        </Reveal>

        <div className="sp-cross">
          <Reveal className="sp-cross-h">
            <Overline>{crossLabel}</Overline>
          </Reveal>
          <div className="sp-cross-grid">
            {others.map((s) => (
              <Reveal as="a" key={s.key} className="sp-cross-card" href={servicePath(lang, s.key)}>
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
