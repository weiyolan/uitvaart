"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";

export interface SiteChrome {
  theme: string;
  toggleTheme: () => void;
  reduce: boolean;
}

/* Shared site chrome: light/dark theme, persisted to localStorage (mw-theme)
   and coordinated with the no-flash inline script in the [lang] layout.
   (Language is URL state now — the locale segment — so no lang state here.) */
export function useSiteChrome(): SiteChrome {
  const [theme, setTheme] = useState<string>("licht");
  const themeHydrated = useRef(false);
  const reduce = useReducedMotion();

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

  return { theme, toggleTheme, reduce };
}
