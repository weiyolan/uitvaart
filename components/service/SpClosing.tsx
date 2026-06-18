"use client";

import type { Locale } from "@/lib/i18n";
import type { ServiceData, ServiceFormConfig, ServiceSettings } from "@/lib/site-types";
import { servicePath } from "@/lib/routes";
import { resolveForm } from "@/lib/contact-form-defaults";
import { Overline } from "@/components/shared/Overline";
import { Reveal } from "@/components/shared/Reveal";
import { RevealWords } from "@/components/shared/RevealWords";
import { FilmFrame } from "@/components/shared/FilmFrame";
import { Typeform } from "@/components/form/Typeform";

/* CLOSING — full-screen typeform request + a tel/mail fallback + cross-links to
   the other two services. The form config + copy come from the service document
   (Sanity), merged over built-in defaults so it is never blank. */
export function SpClosing({
  lang,
  contact,
  formConfig,
  svc,
  others,
  crossLabel,
}: {
  lang: Locale;
  contact: ServiceSettings["contact"];
  formConfig: ServiceFormConfig | null;
  svc: string;
  others: ServiceData["others"];
  crossLabel: string;
}) {
  const { chrome, steps } = resolveForm(svc, lang, formConfig);
  return (
    <section className="sp-cta sp-cta--form" id="contact">
      <div className="wrap">
        <div className="sp-cta-head">
          <Reveal>
            <Overline>{chrome.overline}</Overline>
          </Reveal>
          <h2 className="sp-cta-title">
            <RevealWords text={chrome.title} step={70} start={80} />
          </h2>
          <Reveal as="p" className="sp-cta-body">
            {chrome.intro}
          </Reveal>
        </div>

        <Typeform svc={svc} lang={lang} steps={steps} chrome={chrome} />

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
