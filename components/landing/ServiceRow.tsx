"use client";

import type { Service, Lang } from "@/lib/content";
import { LP_SVC_CTA, LP_SERVICE_FILES } from "@/lib/constants";
import { Reveal } from "@/components/shared/Reveal";
import { RevealWords } from "@/components/shared/RevealWords";
import { FilmFrame } from "@/components/shared/FilmFrame";

/* SERVICE ROW — text/photo alternation (KOSUKE/MINTA). */
export function ServiceRow({ data, idx, lang }: { data: Service; idx: number; lang: Lang }) {
  const rev = idx % 2 === 1;
  const cta = LP_SVC_CTA[lang] || LP_SVC_CTA.nl;
  const href = LP_SERVICE_FILES[data.id] || "#traject";
  return (
    <section className="lp-svc wrap" id={data.id} data-rev={rev ? "1" : "0"}>
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
                <span>{s}</span>
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
            tag={data.figures[0].tag}
            meta={data.figures[0].meta}
            corner={data.figures[0].corner}
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
