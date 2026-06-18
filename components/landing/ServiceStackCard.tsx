"use client";

import type { Locale } from "@/lib/i18n";
import type { ServiceItem } from "@/lib/site-types";
import { servicePath } from "@/lib/routes";
import { Reveal } from "@/components/shared/Reveal";
import { RevealWords } from "@/components/shared/RevealWords";
import { FilmFrame } from "@/components/shared/FilmFrame";

/* One service presented as a stacking card — text + photo alternation.
   The big ordinal numeral (01–03) and the clickable title link are shared by
   both the sticky stack and its reduced-motion static fallback. */
export function ServiceStackCard({
  data,
  idx,
  lang,
  cta,
}: {
  data: ServiceItem;
  idx: number;
  lang: Locale;
  cta: string;
}) {
  const rev = idx % 2 === 1;
  const href = servicePath(lang, data.key);
  const no = String(idx + 1).padStart(2, "0");
  return (
    <article className="lp-stack-card" id={data.key} data-rev={rev ? "1" : "0"}>
      <div className="lp-stack-inner wrap">
        <div className="lp-svc-grid">
          <div className="lp-svc-text">
            <div className="lp-svc-head">
              <span className="lp-stack-no" aria-hidden="true">
                {no}
              </span>
              <Reveal as="div" className="lp-svc-num">
                {data.kicker}
              </Reveal>
            </div>
            <h2 className="lp-svc-name">
              <a className="lp-svc-name-link" href={href} aria-label={`${data.title} — ${cta}`}>
                <RevealWords text={data.title} step={48} />
              </a>
            </h2>
            <Reveal as="p" className="lp-svc-why">
              {data.why}
            </Reveal>
            <Reveal as="ul" className="lp-svc-spec">
              {data.specs.slice(0, 4).map((s, i) => (
                <li key={i}>
                  <span className="ix">{String(i + 1).padStart(2, "0")}</span>
                  <span>{s.value}</span>
                </li>
              ))}
            </Reveal>
            <Reveal style={{ marginTop: 26 }}>
              <a className="svc-link" href={href}>
                {cta}
                <span aria-hidden="true">→</span>
              </a>
            </Reveal>
          </div>
          <Reveal className="lp-svc-fig">
            <FilmFrame
              className="frame--light"
              style={{ width: "100%", height: "100%" }}
              tag={data.homeFrames?.row?.tag}
              meta={data.homeFrames?.row?.meta}
              corner={data.homeFrames?.row?.corner}
              image={data.homeFrames?.row?.image}
              zoomable
            />
            <span className="lp-svc-result">
              <span className="k">{data.result[0]}</span>
              <span className="v">{data.result[1]}</span>
            </span>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
