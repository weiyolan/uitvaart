"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import type { Locale } from "@/lib/i18n";
import type { ServiceItem } from "@/lib/site-types";
import { ServiceStackCard } from "./ServiceStackCard";

/* SERVICE STACK — the three services as cards that pin and stack with sticky
   positioning, so they read as one cohesive sequence instead of three loose
   sections. A Lenis scroll listener writes a per-card `--depth` (0 active → 1
   covered) for a subtle recede; it bails for reduced motion / data-motion=off,
   and the cards degrade to plain flow via CSS. */
export function ServiceStack({
  services,
  lang,
  cta,
}: {
  services: ServiceItem[];
  lang: Locale;
  cta: string;
}) {
  const secRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const section = secRef.current;
    if (!section) return;
    const cards = Array.from(section.querySelectorAll<HTMLElement>(".lp-stack-card"));
    const update = () => {
      const off = document.documentElement.getAttribute("data-motion") === "off";
      const vh = window.innerHeight || 800;
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (off || !next) {
          card.style.setProperty("--depth", "0");
          return;
        }
        // The next card's top travels from the viewport bottom (just entering)
        // up to 0 (fully covering this one) → progress 0 → 1.
        const top = next.getBoundingClientRect().top;
        const p = Math.max(0, Math.min(1, 1 - top / vh));
        card.style.setProperty("--depth", p.toFixed(4));
      });
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    lenis?.on("scroll", update);
    return () => {
      window.removeEventListener("resize", update);
      lenis?.off("scroll", update);
    };
  }, [lenis]);

  return (
    <section className="lp-stack" ref={secRef}>
      {services.map((s, i) => (
        <ServiceStackCard key={s.key} data={s} idx={i} lang={lang} cta={cta} />
      ))}
    </section>
  );
}

/* Reduced-motion / static fallback: the same cards in plain document flow. */
export function StaticServiceStack({
  services,
  lang,
  cta,
}: {
  services: ServiceItem[];
  lang: Locale;
  cta: string;
}) {
  return (
    <section className="lp-stack lp-stack--static">
      {services.map((s, i) => (
        <ServiceStackCard key={s.key} data={s} idx={i} lang={lang} cta={cta} />
      ))}
    </section>
  );
}
