"use client";

import type { ServicePage } from "@/lib/site-types";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHead } from "@/components/shared/SectionHead";

/* PACKAGES (formules). Multiple items render as the tier grid; a single item
   (uitvaart's one formule) renders as a centered formule with an optional
   add-on line (the handmade leather book). The koffietafel disclaimer and the
   single price are CMS-driven — choosing moments never changes the price. */
export function SpPackages({
  page,
  ctaLabel,
}: {
  page: ServicePage;
  ctaLabel: { popular: string; ask: string };
}) {
  const pk = page.packages;
  const single = pk.items.length === 1;
  const addon = pk.bookAddon;

  return (
    <section className="sp-pkg" id="packages">
      <div className="wrap">
        <SectionHead overline={pk.overline} title={pk.title} titleClass="work-title display" note={pk.note} />

        {single ? (
          <Reveal className="sp-formule">
            <h3 className="sp-formule-name">{pk.items[0].name}</h3>
            {pk.items[0].tagline ? <p className="sp-formule-tagline">{pk.items[0].tagline}</p> : null}
            <ul className="sp-formule-inc">
              {pk.items[0].includes.map((inc, k) => (
                <li key={k}>{inc.value}</li>
              ))}
            </ul>
            {addon.enabled && addon.label ? (
              <p className="sp-formule-addon">
                <span className="sp-formule-addon-label">{addon.label}</span>
                {addon.priceNote ? <span className="sp-formule-addon-price">{addon.priceNote}</span> : null}
              </p>
            ) : null}
            <div className="sp-formule-foot">
              <span className="sp-formule-price">{pk.priceNote}</span>
              <a className="sp-card-cta" href="#contact">
                {ctaLabel.ask}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>
        ) : (
          <div className="sp-pkg-grid">
            {pk.items.map((it, i) => (
              <Reveal className="sp-card" key={i} data-feat={it.featured ? "1" : "0"} style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="sp-card-tag">{ctaLabel.popular}</span>
                <h3 className="sp-card-name">{it.name}</h3>
                <p className="sp-card-tagline">{it.tagline}</p>
                <ul className="sp-card-inc">
                  {it.includes.map((inc, k) => (
                    <li key={k}>{inc.value}</li>
                  ))}
                </ul>
                <div className="sp-card-foot">
                  <span className="sp-card-price">{pk.priceNote}</span>
                  <a className="sp-card-cta" href="#contact">
                    {ctaLabel.ask}
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {pk.koffietafelNote ? (
          <Reveal as="p" className="sp-pkg-disclaimer">
            {pk.koffietafelNote}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
