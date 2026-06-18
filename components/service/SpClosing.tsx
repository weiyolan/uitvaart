"use client";

import type { Locale } from "@/lib/i18n";
import type { ContactFormLabels, ServiceData, ServiceSettings } from "@/lib/site-types";
import { servicePath } from "@/lib/routes";
import { Overline } from "@/components/shared/Overline";
import { Reveal } from "@/components/shared/Reveal";
import { RevealWords } from "@/components/shared/RevealWords";
import { FilmFrame } from "@/components/shared/FilmFrame";
import { ContactForm } from "@/components/form/ContactForm";

/* CLOSING — warm online request form + a tel/mail fallback + cross-links to
   the other two services. */
export function SpClosing({
  lang,
  contact,
  formLabels,
  svc,
  others,
  crossLabel,
}: {
  lang: Locale;
  contact: ServiceSettings["contact"];
  formLabels: ContactFormLabels;
  svc: string;
  others: ServiceData["others"];
  crossLabel: string;
}) {
  return (
    <section className="sp-cta" id="contact">
      <div className="wrap">
        <Reveal>
          <Overline>{formLabels.overline || contact.overline}</Overline>
        </Reveal>
        <h2 className="sp-cta-title">
          <RevealWords text={formLabels.title || contact.title} step={70} start={80} />
        </h2>
        <Reveal as="p" className="sp-cta-body">
          {formLabels.intro || contact.body}
        </Reveal>

        <ContactForm
          labels={formLabels}
          lang={lang}
          serviceKey={svc}
          variant={svc === "uitvaart" ? "uitvaart" : "generic"}
        />

        <Reveal className="sp-cta-actions">
          <a className="btn btn--ghost" href={contact.callHref}>
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
                  <FilmFrame className="frame--light" tag={s.fig[0]} corner={s.fig[1]} image={s.image} />
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
