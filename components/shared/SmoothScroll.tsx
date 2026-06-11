"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { useReducedMotion } from "@/lib/hooks";

/* Lenis smooth scroll for the public site (root mode → binds to window, no
   wrapper DOM). Mounted in the (frontend) layout only — the Studio keeps
   native scroll. Reduced-motion falls back to native wheel + native anchor
   jumps (which the `prefers-reduced-motion` CSS makes instant). Kept always
   mounted and gated via options so toggling never remounts the page tree. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <ReactLenis
      root
      options={{
        smoothWheel: !reduce,
        anchors: reduce ? false : { offset: 4 },
        syncTouch: false, // native momentum on touch devices
        lerp: 0.1,
      }}
    >
      {children}
    </ReactLenis>
  );
}
