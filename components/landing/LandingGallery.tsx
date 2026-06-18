"use client";

import type { HomeGalleryItem } from "@/lib/site-types";
import { Reveal } from "@/components/shared/Reveal";
import { FilmFrame } from "@/components/shared/FilmFrame";

/* Extra editorial gallery on the landing page. Renders nothing until the
   editor adds frames; scans open in the lightbox, placeholders stay quiet. */
export function LandingGallery({ items }: { items: HomeGalleryItem[] }) {
  if (!items?.length) return null;
  return (
    <section className="lp-gal wrap" id="galerij">
      <div className="lp-gal-grid">
        {items.map((f, i) => (
          <Reveal className="lp-gal-item" key={i} style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
            <FilmFrame
              className="frame--light"
              style={{ width: "100%", height: "100%" }}
              tag={f.tag}
              meta={f.meta}
              corner={f.corner}
              image={f.image}
              zoomable
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
