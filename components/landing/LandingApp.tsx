"use client";

import { useEffect, useRef, useState } from "react";
import { MW, LANGS } from "@/lib/content";
import type { Lang } from "@/lib/content";
import { LP_RAIL } from "@/lib/constants";
import { useActiveSection, useReducedMotion } from "@/lib/hooks";
import { TopBar } from "./TopBar";
import { RailNav } from "./RailNav";
import type { RailItem } from "./RailNav";
import { Hero } from "./Hero";
import { Showcase, StaticShowcase } from "./Showcase";
import { Philosophy } from "./Philosophy";
import { ServiceRow } from "./ServiceRow";
import { Process } from "./Process";
import { Closing } from "./Closing";
import { Contact } from "./Contact";
import { Footer } from "./Footer";

const SECTION_IDS = ["top", "overzicht", "filosofie", "uitvaart", "portret", "huwelijk", "traject", "contact"];

export function LandingApp() {
  const [lang, setLang] = useState<Lang>("nl");
  const [theme, setTheme] = useState<string>("licht");
  const themeHydrated = useRef(false);
  const reduce = useReducedMotion();

  const c = MW[lang] || MW.nl;
  const rail = LP_RAIL[lang] || LP_RAIL.nl;

  // restore stored language on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("mw-lang");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored && (LANGS as string[]).includes(stored)) setLang(stored as Lang);
    } catch {}
  }, []);

  // persist language + reflect on <html lang>
  useEffect(() => {
    try {
      localStorage.setItem("mw-lang", lang);
    } catch {}
    document.documentElement.lang = lang;
  }, [lang]);

  // theme: skip the first run so the no-flash inline <script> attribute stands;
  // only write localStorage after hydration so a visitor's choice isn't clobbered.
  useEffect(() => {
    if (!themeHydrated.current) {
      themeHydrated.current = true;
      return;
    }
    const root = document.documentElement;
    if (theme === "nacht") root.setAttribute("data-theme", "nacht");
    else root.removeAttribute("data-theme");
    try {
      localStorage.setItem("mw-theme", theme);
    } catch {}
  }, [theme]);

  // restore a stored theme so React state + toggle icon match the inline script
  // (declared after the guard effect so the guard's first run is the no-op).
  useEffect(() => {
    try {
      const stored = localStorage.getItem("mw-theme");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored && stored !== theme) setTheme(stored);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "nacht" ? "licht" : "nacht"));

  // reveal safety net for print / hidden tabs (never leave content stuck hidden)
  useEffect(() => {
    const el = document.documentElement;
    const arm = () => el.classList.add("force-reveal");
    const onVis = () => {
      if (document.visibilityState !== "visible") arm();
    };
    window.addEventListener("beforeprint", arm);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("beforeprint", arm);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const railItems: RailItem[] = [
    { id: "overzicht", label: rail.work },
    { id: "filosofie", label: c.nav.filosofie },
    { id: "uitvaart", label: rail.services },
    { id: "traject", label: rail.process },
    { id: "contact", label: c.nav.contact },
  ];
  const active = useActiveSection(SECTION_IDS);
  const railActive = ["portret", "huwelijk"].includes(active)
    ? "uitvaart"
    : active === "top"
      ? "overzicht"
      : active;

  return (
    <>
      <TopBar lang={lang} setLang={setLang} theme={theme} onToggleTheme={toggleTheme} />
      <RailNav items={railItems} active={railActive} />
      <main>
        <Hero c={c} />
        {reduce ? <StaticShowcase c={c} /> : <Showcase c={c} lang={lang} />}
        <Philosophy c={c} />
        {c.services.map((s, i) => (
          <ServiceRow key={s.id} data={s} idx={i} lang={lang} />
        ))}
        <Process c={c} />
        <Closing c={c} />
        <Contact c={c} />
      </main>
      <Footer c={c} />
    </>
  );
}
