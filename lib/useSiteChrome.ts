"use client";

import { useEffect, useRef, useState } from "react";
import { LANGS } from "@/lib/content";
import type { Lang } from "@/lib/content";
import { useReducedMotion } from "@/lib/hooks";

export interface SiteChrome {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: string;
  toggleTheme: () => void;
  reduce: boolean;
}

/* Shared site chrome: NL/EN/FR language + light/dark theme, persisted to
   localStorage (mw-lang / mw-theme) and coordinated with the no-flash inline
   script in layout.tsx. Used by both the landing and the service pages so the
   theme/lang carry across navigation. */
export function useSiteChrome(): SiteChrome {
  const [lang, setLang] = useState<Lang>("nl");
  const [theme, setTheme] = useState<string>("licht");
  const themeHydrated = useRef(false);
  const reduce = useReducedMotion();

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

  // reveal safety net for print (matches the prototype; useInView already
  // handles throttled/hidden-tab reveal, so this stays scoped to beforeprint
  // and never permanently disables scroll animations).
  useEffect(() => {
    const arm = () => document.documentElement.classList.add("force-reveal");
    window.addEventListener("beforeprint", arm);
    return () => window.removeEventListener("beforeprint", arm);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "nacht" ? "licht" : "nacht"));

  return { lang, setLang, theme, toggleTheme, reduce };
}
