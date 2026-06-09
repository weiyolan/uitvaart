import type { Lang } from "./content";

/* Right-rail / section labels per language (from landing.jsx LP_RAIL etc.) */
export const LP_RAIL: Record<Lang, { work: string; services: string; process: string }> = {
  nl: { work: "Werk", services: "Diensten", process: "Traject" },
  en: { work: "Work", services: "Services", process: "Process" },
  fr: { work: "Travail", services: "Services", process: "Parcours" },
};

export const LP_SHOW_HEAD: Record<Lang, string> = {
  nl: "Een blik op het werk",
  en: "A glance at the work",
  fr: "Un aperçu du travail",
};

export const LP_SVC_CTA: Record<Lang, string> = {
  nl: "Ontdek deze dienst",
  en: "Explore this service",
  fr: "Découvrir ce service",
};

export const LP_THEME_LABEL: Record<Lang, string> = {
  nl: "Licht / donker",
  en: "Light / dark",
  fr: "Clair / sombre",
};

/* Service id -> dedicated service-page route.
   (The prototype linked to standalone .html files; in the app these are routes.) */
export const LP_SERVICE_FILES: Record<string, string> = {
  uitvaart: "/diensten/uitvaart",
  portret: "/diensten/portret",
  huwelijk: "/diensten/huwelijk",
};
