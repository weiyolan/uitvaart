"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
   useInView — adds reveal state once the element scrolls into view.
   Ported from components.jsx observeInView: robust where Intersection
   Observer is throttled (also checks on mount + scroll/resize), and
   reveals immediately for reduced-motion.
   ------------------------------------------------------------------ */
export function useInView<T extends HTMLElement = HTMLElement>(
  { threshold = 0.9 }: { threshold?: number } = {},
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Reveal immediately (no animation) for reduced-motion users. This is a
      // deliberate mount-time external read, not a render-loop trigger.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInView(true);
      return;
    }

    let done = false;
    let ticking = false;

    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    const check = () => {
      if (done || !el.isConnected) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight || 800;
      if (r.top < vh * threshold && r.bottom > -40) {
        done = true;
        setInView(true);
        cleanup();
      }
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        check();
      });
    };

    const raf = requestAnimationFrame(check);
    const t1 = setTimeout(check, 80);
    const t2 = setTimeout(check, 360);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      cleanup();
    };
  }, [threshold]);

  return [ref, inView];
}

/* ------------------------------------------------------------------
   useActiveSection — tracks which section id is currently active for
   the right-rail nav (from landing.jsx useActiveSection).
   ------------------------------------------------------------------ */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join(",");

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const mid = window.innerHeight * 0.42;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) cur = id;
      }
      setActive(cur);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}

/* ------------------------------------------------------------------
   useReducedMotion — true when the user prefers reduced motion.
   ------------------------------------------------------------------ */
export function useReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduce(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return reduce;
}
