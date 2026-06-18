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

/* Extra service-page labels (gallery head, cross-link head, package badge + CTA)
   that aren't in the shared MW content — from service-page.jsx SP_LABELS.
   Passed as explicit props (the prototype mutated these onto the MW singleton). */
export interface SpGalleryLabels {
  overline: string;
  title: string;
  note: string;
}
export interface SpLabelSet {
  gallery: SpGalleryLabels;
  cross: string;
  popular: string;
  ask: string;
}

/* Extra landing-page gallery frames (placeholders until scans are added). */
export const HOME_GALLERY: { tag: string; corner: string; meta: Record<Lang, string> }[] = [
  { tag: "Kodak Portra 400", corner: "6×7 · 01", meta: { nl: "Stil licht", en: "Quiet light", fr: "Lumière calme" } },
  { tag: "Ilford HP5+", corner: "6×7 · 02", meta: { nl: "Handen samen", en: "Hands together", fr: "Mains jointes" } },
  { tag: "Kodak Tri-X 400", corner: "6×7 · 03", meta: { nl: "Een blik", en: "A glance", fr: "Un regard" } },
  { tag: "Kodak Portra 160", corner: "6×7 · 04", meta: { nl: "Warm namiddaglicht", en: "Warm afternoon light", fr: "Lumière d'après-midi" } },
  { tag: "Fujifilm Pro 400H", corner: "6×7 · 05", meta: { nl: "Samen", en: "Together", fr: "Ensemble" } },
  { tag: "Ilford Delta 3200", corner: "6×7 · 06", meta: { nl: "Het detail", en: "The detail", fr: "Le détail" } },
];

export const SP_LABELS: Record<Lang, SpLabelSet> = {
  nl: {
    gallery: {
      overline: "Galerij",
      title: "Het werk, op film.",
      note: "Een selectie sfeerbeelden — de korrel, het licht en de kleur die enkel analoog ontstaan.",
    },
    cross: "Andere diensten",
    popular: "Meest gekozen",
    ask: "Vraag aan",
  },
  en: {
    gallery: {
      overline: "Gallery",
      title: "The work, on film.",
      note: "A selection of images — the grain, light and colour that only analogue creates.",
    },
    cross: "Other services",
    popular: "Most chosen",
    ask: "Enquire",
  },
  fr: {
    gallery: {
      overline: "Galerie",
      title: "Le travail, sur film.",
      note: "Une sélection d’images — le grain, la lumière et la couleur que seul l’analogique crée.",
    },
    cross: "Autres services",
    popular: "Le plus choisi",
    ask: "Demander",
  },
};
