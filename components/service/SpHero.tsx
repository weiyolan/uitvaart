"use client";

import { useRef } from "react";
import { stegaClean } from "@sanity/client/stega";
import type { ServicePage, Figure } from "@/lib/site-types";
import { useParallax } from "@/lib/hooks";
import { Reveal } from "@/components/shared/Reveal";
import { RevealWords } from "@/components/shared/RevealWords";
import { FilmFrame } from "@/components/shared/FilmFrame";

/* Parallax-wrapped film frame (from service-page.jsx ParallaxFig). */
function ParallaxFig({
  amount = 40,
  ...props
}: {
  amount?: number;
  className?: string;
  tag?: string;
  meta?: string;
  corner?: string;
  image?: Figure["image"];
}) {
  const ref = useRef<HTMLDivElement>(null);
  useParallax(ref, amount);
  return (
    <div ref={ref} className="parallax" style={{ position: "absolute", inset: "-7% 0", height: "auto" }}>
      <FilmFrame {...props} />
    </div>
  );
}

/* HERO — variant switched on page.hero (centered | split | wide). */
export function SpHero({ page }: { page: ServicePage }) {
  const h = page.head;
  // Layout-bearing value from Sanity: clean stega chars before branching.
  const variant = stegaClean(page.hero);
  const crumb = (
    <Reveal className="sp-hero-crumb">
      <span className="ix">{page.crumb}</span>
      <span className="ln" />
    </Reveal>
  );
  const title = (
    <h1 className="sp-hero-title">
      <RevealWords text={h.title[0]} step={70} start={120} />
      <span className="l2">
        <RevealWords text={h.title[1]} step={70} start={120 + h.title[0].split(" ").length * 70} />
      </span>
    </h1>
  );
  const sub = (
    <Reveal className="sp-hero-sub" as="p">
      {h.sub}
    </Reveal>
  );

  if (variant === "split") {
    return (
      <header className="sp-hero sp-hero--split" id="top">
        <div className="wrap sp-hero-grid">
          <div>
            {crumb}
            {title}
            {sub}
          </div>
          <Reveal className="sp-hero-fig">
            <ParallaxFig amount={34} className="frame--light" tag={h.fig?.tag} meta={h.fig?.meta} corner={h.fig?.corner} image={h.fig?.image} />
          </Reveal>
        </div>
      </header>
    );
  }

  // centered + wide share the stacked layout; fig sizing differs via CSS
  return (
    <header className={"sp-hero sp-hero--" + variant} id="top">
      <div className="wrap">
        {crumb}
        {title}
        {sub}
        <Reveal className="sp-hero-fig">
          <ParallaxFig
            amount={variant === "wide" ? 46 : 38}
            className="frame--light"
            tag={h.fig?.tag}
            meta={h.fig?.meta}
            corner={h.fig?.corner}
            image={h.fig?.image}
          />
        </Reveal>
      </div>
    </header>
  );
}
