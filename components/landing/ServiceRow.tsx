"use client";

import type { Locale } from "@/lib/i18n";
import type { ServiceItem } from "@/lib/site-types";
import { servicePath } from "@/lib/routes";
import { Reveal } from "@/components/shared/Reveal";
import { RevealWords } from "@/components/shared/RevealWords";
import { FilmFrame } from "@/components/shared/FilmFrame";

/* SERVICE ROW — text/photo alternation (KOSUKE/MINTA). */
export function ServiceRow({
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
  return (
    <section className="lp-svc wrap" id={data.key} data-rev={rev ? "1" : "0"}>
      <div className="lp-svc-grid">
        <div className="lp-svc-text">
          <Reveal as="div" className="lp-svc-num">
            {data.kicker}
          </Reveal>
          <h2 className="lp-svc-name">
            <RevealWords text={data.title} step={48} />
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
            tag={data.figures[0]?.tag}
            meta={data.figures[0]?.meta}
            corner={data.figures[0]?.corner}
            image={data.figures[0]?.image}
          />
          <span className="lp-svc-result">
            <span className="k">{data.result[0]}</span>
            <span className="v">{data.result[1]}</span>
          </span>
        </Reveal>
      </div>
    </section>
  );
}
