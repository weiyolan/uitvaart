"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import type { SiteContent } from "@/lib/site-types";
import { Overline } from "@/components/shared/Overline";
import { FilmFrame } from "@/components/shared/FilmFrame";
import { RevealWords } from "@/components/shared/RevealWords";

/* SHOWCASE — COCOON scroll-scale: the largest (center) frame grows to
   full-bleed as the section scrolls; side frames slide out and the caption
   reveals. Driven by a CSS custom property `--p` (0 → 1). */
export function Showcase({ c, head }: { c: SiteContent; head: string }) {
  const secRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const svc = c.philosophy.services; // [uitvaart, portret, huwelijk]
  const lenis = useLenis();

  useEffect(() => {
    const section = secRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;
    const update = () => {
      const total = section.offsetHeight - window.innerHeight;
      const passed = -section.getBoundingClientRect().top;
      let p = total > 0 ? passed / total : 0;
      p = Math.max(0, Math.min(1, p));
      sticky.style.setProperty("--p", p.toFixed(4));
    };
    // Driven by Lenis's scroll emission so the cocoon scale stays locked to the
    // smoothed scroll position (no one-frame trailing); falls back to an
    // initial run + resize.
    update();
    window.addEventListener("resize", update, { passive: true });
    lenis?.on("scroll", update);
    return () => {
      window.removeEventListener("resize", update);
      lenis?.off("scroll", update);
    };
  }, [lenis]);

  // The showcase composition assumes the three services; bail safely if a
  // dataset is incomplete rather than crashing the whole landing page.
  if (svc.length < 3) return null;

  return (
    <section className="lp-showcase" id="overzicht" ref={secRef} style={{ height: "260vh" }}>
      <div className="lp-show-sticky" ref={stickyRef}>
        <div className="lp-show-stage">
          <div className="lp-show-head">
            <Overline className="ov">{head}</Overline>
          </div>

          <div className="lp-show-row">
            <div className="lp-show-frame lp-show-left">
              <FilmFrame className="frame--light" tag={svc[1].fig[0]} corner={svc[1].fig[1]} />
              <span className="lp-show-side-lab">{svc[1].name}</span>
            </div>
            <div className="lp-show-frame lp-show-center">
              <FilmFrame className="frame--light" tag={svc[0].fig[0]} meta={svc[0].note} corner={svc[0].fig[1]} />
            </div>
            <div className="lp-show-frame lp-show-right">
              <FilmFrame className="frame--light" tag={svc[2].fig[0]} corner={svc[2].fig[1]} />
              <span className="lp-show-side-lab">{svc[2].name}</span>
            </div>
          </div>

          <div className="lp-show-veil" />
          <div className="lp-show-cap">
            <p className="ttl">
              <RevealWords text={c.philosophy.pull} step={0} start={0} />
            </p>
            <p className="sub">{svc.map((s) => s.name).join("  ·  ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Reduced-motion / static fallback: plain 3-up gallery. */
export function StaticShowcase({ c }: { c: SiteContent }) {
  const svc = c.philosophy.services;
  if (svc.length < 3) return null;
  return (
    <section className="lp-showcase" id="overzicht">
      <div className="lp-show-static">
        <div className="a">
          <FilmFrame className="frame--light" style={{ width: "100%", height: "100%" }} tag={svc[1].fig[0]} corner={svc[1].fig[1]} />
        </div>
        <div className="b">
          <FilmFrame className="frame--light" style={{ width: "100%", height: "100%" }} tag={svc[0].fig[0]} meta={svc[0].note} corner={svc[0].fig[1]} />
        </div>
        <div className="c">
          <FilmFrame className="frame--light" style={{ width: "100%", height: "100%" }} tag={svc[2].fig[0]} corner={svc[2].fig[1]} />
        </div>
      </div>
    </section>
  );
}
