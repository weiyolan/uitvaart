"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/site-types";
import { Overline } from "@/components/shared/Overline";
import { Kinetic } from "./Kinetic";

/* HERO (SWISSBRUT — weight contrast, white space, kinetic blur-in title). */
export function Hero({ c }: { c: SiteContent }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(id);
  }, []);

  const [l1, l2] = c.hero.title;
  return (
    <header className={"lp-hero" + (ready ? " is-ready" : "")} id="top">
      <div className="lp-hero-over">
        <span className="ln" />
        <Overline>{c.hero.overline}</Overline>
      </div>
      <h1 className="lp-hero-title">
        <Kinetic text={l1} start={160} />
        <span className="lp-l2 lp-thin">
          <Kinetic text={l2} start={160 + l1.length * 34} />
        </span>
      </h1>
      <div className="lp-hero-foot">
        <p className="lp-hero-sub">{c.hero.sub}</p>
        <span className="lp-hero-scroll">
          <span className="dot" />
          {c.hero.cue}
        </span>
      </div>
    </header>
  );
}
