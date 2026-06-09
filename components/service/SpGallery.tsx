"use client";

import type { ServicePage } from "@/lib/content-pages";
import type { SpGalleryLabels } from "@/lib/constants";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHead } from "@/components/shared/SectionHead";
import { FilmFrame } from "@/components/shared/FilmFrame";

/* GALLERY — 4 film frames built from the service's existing figures. */
export function SpGallery({ page, labels }: { page: ServicePage; labels: SpGalleryLabels }) {
  const frames = [
    { stock: page.head.fig.tag, meta: page.nav.why, corner: "6×7 · A", cls: "sp-g1" },
    { stock: page.why.fig.tag, meta: page.crumb, corner: "6×7 · B", cls: "sp-g2" },
    { stock: page.piece.fig.tag, meta: page.nav.piece, corner: "6×7 · C", cls: "sp-g3" },
    { stock: page.how.steps[1] ? "Kodak Portra 400" : "Ilford HP5+", meta: "Sfeer", corner: "6×7 · D", cls: "sp-g4" },
  ];
  return (
    <section className="sp-gal" id="gallery">
      <div className="wrap">
        <SectionHead overline={labels.overline} title={labels.title} titleClass="work-title display" note={labels.note} />
        <div className="sp-gal-grid">
          {frames.map((f, i) => (
            <Reveal className={f.cls} key={i} style={{ transitionDelay: `${i * 70}ms` }}>
              <FilmFrame className="frame--light" tag={f.stock} meta={f.meta} corner={f.corner} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
