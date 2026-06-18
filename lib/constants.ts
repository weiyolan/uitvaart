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
/* Contact form labels (service-page request form). */
export interface ContactFormCopy {
  overline: string;
  title: string;
  intro: string;
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  dateLabel: string;
  timeLabel: string;
  locationLabel: string;
  funeralHomeLabel: string;
  whoLabel: string;
  commentsLabel: string;
  photoPrefLegend: string;
  photoColor: string;
  photoBw: string;
  photoNone: string;
  partsLegend: string;
  partCeremony: string;
  partBurial: string;
  partsHint: string;
  bookLabel: string;
  consentLabel: string;
  submitLabel: string;
  submittingLabel: string;
  successTitle: string;
  successBody: string;
  errorBody: string;
  requiredError: string;
  emailError: string;
}
export const CONTACT_FORM: Record<Lang, ContactFormCopy> = {
  nl: {
    overline: "Aanvraag",
    title: "Vraag Milo's service aan",
    intro: "Laat hieronder je gegevens achter — ik neem persoonlijk contact met je op.",
    nameLabel: "Jouw naam",
    emailLabel: "E-mail",
    phoneLabel: "Telefoon",
    dateLabel: "Datum",
    timeLabel: "Tijdstip",
    locationLabel: "Locatie",
    funeralHomeLabel: "Uitvaartorganisatie",
    whoLabel: "Voor wie",
    commentsLabel: "Opmerkingen",
    photoPrefLegend: "Foto-voorkeur",
    photoColor: "Kleur",
    photoBw: "Zwart-wit",
    photoNone: "Geen voorkeur",
    partsLegend: "Welke momenten wil je laten vastleggen?",
    partCeremony: "Ceremonie",
    partBurial: "Teraardebestelling",
    partsHint: "De koffietafel wordt niet gefotografeerd — dat moment hoort de familie toe.",
    bookLabel: "Gepersonaliseerd handgemaakt leren boek met Japans papier (+ 1000 €)",
    consentLabel: "Ik ga akkoord dat mijn gegevens gebruikt worden om mijn aanvraag te beantwoorden.",
    submitLabel: "Verstuur aanvraag",
    submittingLabel: "Versturen…",
    successTitle: "Dankjewel.",
    successBody: "Je aanvraag is verstuurd. Ik neem snel persoonlijk contact met je op.",
    errorBody: "Er ging iets mis bij het versturen. Probeer opnieuw, of bel/mail me gerust rechtstreeks.",
    requiredError: "Dit veld is verplicht.",
    emailError: "Vul een geldig e-mailadres of telefoonnummer in.",
  },
  en: {
    overline: "Request",
    title: "Request Milo's service",
    intro: "Leave your details below — I'll get in touch with you personally.",
    nameLabel: "Your name",
    emailLabel: "Email",
    phoneLabel: "Phone",
    dateLabel: "Date",
    timeLabel: "Time",
    locationLabel: "Location",
    funeralHomeLabel: "Funeral director",
    whoLabel: "For whom",
    commentsLabel: "Notes",
    photoPrefLegend: "Photo preference",
    photoColor: "Colour",
    photoBw: "Black & white",
    photoNone: "No preference",
    partsLegend: "Which moments would you like captured?",
    partCeremony: "Ceremony",
    partBurial: "Burial",
    partsHint: "The reception is not photographed — that moment belongs to the family.",
    bookLabel: "Personalised handmade leather book with Japanese paper (+ €1000)",
    consentLabel: "I agree that my details may be used to answer my request.",
    submitLabel: "Send request",
    submittingLabel: "Sending…",
    successTitle: "Thank you.",
    successBody: "Your request has been sent. I'll be in touch with you personally soon.",
    errorBody: "Something went wrong while sending. Please try again, or call/email me directly.",
    requiredError: "This field is required.",
    emailError: "Enter a valid email address or phone number.",
  },
  fr: {
    overline: "Demande",
    title: "Demandez le service de Milo",
    intro: "Laissez vos coordonnées ci-dessous — je vous recontacte personnellement.",
    nameLabel: "Votre nom",
    emailLabel: "E-mail",
    phoneLabel: "Téléphone",
    dateLabel: "Date",
    timeLabel: "Heure",
    locationLabel: "Lieu",
    funeralHomeLabel: "Entreprise de pompes funèbres",
    whoLabel: "Pour qui",
    commentsLabel: "Remarques",
    photoPrefLegend: "Préférence photo",
    photoColor: "Couleur",
    photoBw: "Noir et blanc",
    photoNone: "Sans préférence",
    partsLegend: "Quels moments souhaitez-vous immortaliser ?",
    partCeremony: "Cérémonie",
    partBurial: "Mise en terre",
    partsHint: "La réception (koffietafel) n'est pas photographiée — ce moment appartient à la famille.",
    bookLabel: "Livre en cuir fait main personnalisé, papier japonais (+ 1000 €)",
    consentLabel: "J'accepte que mes données soient utilisées pour répondre à ma demande.",
    submitLabel: "Envoyer la demande",
    submittingLabel: "Envoi…",
    successTitle: "Merci.",
    successBody: "Votre demande a été envoyée. Je vous recontacte personnellement très vite.",
    errorBody: "Une erreur est survenue lors de l'envoi. Réessayez, ou contactez-moi directement.",
    requiredError: "Ce champ est obligatoire.",
    emailError: "Entrez une adresse e-mail ou un numéro de téléphone valide.",
  },
};

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
