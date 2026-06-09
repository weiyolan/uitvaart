import type { MouseEvent } from "react";

/* Smooth-scroll to an element by id; used by in-page anchors (from landing.jsx lpScrollTo). */
export const lpScrollTo = (id: string) => (e?: MouseEvent) => {
  if (e) e.preventDefault();
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 4, behavior: "smooth" });
};
