"use client";

import type { ServicePage } from "@/lib/content-pages";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHead } from "@/components/shared/SectionHead";

/* PACKAGES (formules) — 3 tiers, one "featured" with a badge. Copy is a
   placeholder starting point ("Op aanvraag", no amounts) — review before launch. */
export function SpPackages({
  page,
  ctaLabel,
}: {
  page: ServicePage;
  ctaLabel: { popular: string; ask: string };
}) {
  const pk = page.packages;
  return (
    <section className="sp-pkg" id="packages">
      <div className="wrap">
        <SectionHead overline={pk.overline} title={pk.title} titleClass="work-title display" note={pk.note} />
        <div className="sp-pkg-grid">
          {pk.items.map((it, i) => (
            <Reveal className="sp-card" key={i} data-feat={it.featured ? "1" : "0"} style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="sp-card-tag">{ctaLabel.popular}</span>
              <h3 className="sp-card-name">{it.name}</h3>
              <p className="sp-card-tagline">{it.tagline}</p>
              <ul className="sp-card-inc">
                {it.includes.map((inc, k) => (
                  <li key={k}>{inc}</li>
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
      </div>
    </section>
  );
}
