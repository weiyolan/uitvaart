/* Built-in per-service form defaults — the "never blank" guarantee. Used when a
   service has no (or partial) Sanity form config, and as the seed source. Pure
   data + a pure merge helper, safe to import on client and server. */

import type { Locale } from "./i18n";
import type { StepType } from "@/components/form/contact-schema";
import type { ServiceFormConfig } from "./site-types";

type L = Record<Locale, string>;

export type DefaultOption = { value: string; label: L };
export type DefaultStep = {
  key: string;
  type: StepType;
  label: L;
  help?: L;
  placeholder?: L;
  required: boolean;
  options?: DefaultOption[];
};
export type DefaultChrome = {
  overline: L; title: L; intro: L;
  submitLabel: L; submittingLabel: L;
  backLabel: L; nextLabel: L; reviewLabel: L; reviewTitle: L;
  progressLabel: L;
  successTitle: L; successBody: L; errorBody: L;
  consentLabel: L; requiredError: L; emailError: L;
};
export type DefaultForm = { chrome: DefaultChrome; steps: DefaultStep[] };

/* ---- localized, flattened shapes the Typeform consumes ---------------- */
export type ResolvedOption = { value: string; label: string };
export type ResolvedStep = {
  key: string;
  type: StepType;
  label: string;
  help: string;
  placeholder: string;
  required: boolean;
  options: ResolvedOption[];
};
export type ResolvedChrome = Record<keyof DefaultChrome, string>;
export type ResolvedForm = { chrome: ResolvedChrome; steps: ResolvedStep[] };

/* ---- shared chrome (ported from the previous CONTACT_FORM copy) -------- */
const CHROME: DefaultChrome = {
  overline: { nl: "Aanvraag", en: "Request", fr: "Demande" },
  title: { nl: "Vraag Milo's service aan", en: "Request Milo's service", fr: "Demandez le service de Milo" },
  intro: {
    nl: "Een paar korte vragen — ik neem daarna persoonlijk contact met je op.",
    en: "A few short questions — I'll then get in touch with you personally.",
    fr: "Quelques questions — je vous recontacte ensuite personnellement.",
  },
  submitLabel: { nl: "Verstuur aanvraag", en: "Send request", fr: "Envoyer la demande" },
  submittingLabel: { nl: "Versturen…", en: "Sending…", fr: "Envoi…" },
  backLabel: { nl: "Vorige", en: "Back", fr: "Précédent" },
  nextLabel: { nl: "Volgende", en: "Next", fr: "Suivant" },
  reviewLabel: { nl: "Nakijken", en: "Review", fr: "Vérifier" },
  reviewTitle: { nl: "Even nakijken", en: "Quick review", fr: "Vérification" },
  progressLabel: { nl: "Vraag {current} van {total}", en: "Question {current} of {total}", fr: "Question {current} sur {total}" },
  successTitle: { nl: "Dankjewel.", en: "Thank you.", fr: "Merci." },
  successBody: {
    nl: "Je aanvraag is verstuurd en je ontvangt een bevestiging per e-mail. Ik neem snel persoonlijk contact met je op.",
    en: "Your request has been sent and a confirmation is on its way to your inbox. I'll be in touch with you personally soon.",
    fr: "Votre demande a été envoyée et une confirmation arrive dans votre boîte mail. Je vous recontacte personnellement très vite.",
  },
  errorBody: {
    nl: "Er ging iets mis bij het versturen. Probeer opnieuw, of bel/mail me gerust rechtstreeks.",
    en: "Something went wrong while sending. Please try again, or call/email me directly.",
    fr: "Une erreur est survenue lors de l'envoi. Réessayez, ou contactez-moi directement.",
  },
  consentLabel: {
    nl: "Ik ga akkoord dat mijn gegevens gebruikt worden om mijn aanvraag te beantwoorden.",
    en: "I agree that my details may be used to answer my request.",
    fr: "J'accepte que mes données soient utilisées pour répondre à ma demande.",
  },
  requiredError: { nl: "Dit veld is verplicht.", en: "This field is required.", fr: "Ce champ est obligatoire." },
  emailError: { nl: "Vul een geldig e-mailadres in.", en: "Enter a valid email address.", fr: "Entrez une adresse e-mail valide." },
};

/* ---- reusable step builders ------------------------------------------- */
const STEP = {
  email: {
    key: "email", type: "email" as const, required: true,
    label: { nl: "Jouw e-mailadres", en: "Your email", fr: "Votre e-mail" },
    placeholder: { nl: "naam@voorbeeld.be", en: "name@example.com", fr: "nom@exemple.be" },
  },
  name: {
    key: "name", type: "short-text" as const, required: true,
    label: { nl: "Jouw naam", en: "Your name", fr: "Votre nom" },
  },
  phone: {
    key: "phone", type: "tel" as const, required: false,
    label: { nl: "Telefoon (optioneel)", en: "Phone (optional)", fr: "Téléphone (facultatif)" },
  },
  date: (required: boolean): DefaultStep => ({
    key: "date", type: "date", required,
    label: { nl: "Datum", en: "Date", fr: "Date" },
  }),
  time: {
    key: "time", type: "time" as const, required: false,
    label: { nl: "Tijdstip", en: "Time", fr: "Heure" },
  },
  location: {
    key: "location", type: "short-text" as const, required: false,
    label: { nl: "Locatie", en: "Location", fr: "Lieu" },
  },
  who: {
    key: "who", type: "short-text" as const, required: false,
    label: { nl: "Voor wie", en: "For whom", fr: "Pour qui" },
  },
  photoPref: {
    key: "photoPref", type: "single-choice" as const, required: false,
    label: { nl: "Foto-voorkeur", en: "Photo preference", fr: "Préférence photo" },
    options: [
      { value: "kleur", label: { nl: "Kleur", en: "Colour", fr: "Couleur" } },
      { value: "zwartwit", label: { nl: "Zwart-wit", en: "Black & white", fr: "Noir et blanc" } },
      { value: "geen", label: { nl: "Geen voorkeur", en: "No preference", fr: "Sans préférence" } },
    ],
  },
  comments: {
    key: "comments", type: "long-text" as const, required: false,
    label: { nl: "Opmerkingen", en: "Notes", fr: "Remarques" },
  },
} satisfies Record<string, DefaultStep | ((r: boolean) => DefaultStep)>;

const UITVAART_STEPS: DefaultStep[] = [
  STEP.email,
  STEP.name,
  STEP.phone,
  STEP.date(true),
  STEP.time,
  STEP.location,
  {
    key: "funeralHome", type: "short-text", required: false,
    label: { nl: "Uitvaartorganisatie", en: "Funeral director", fr: "Pompes funèbres" },
  },
  STEP.who,
  STEP.photoPref,
  {
    key: "parts", type: "multi-choice", required: true,
    label: { nl: "Welke momenten wil je laten vastleggen?", en: "Which moments would you like captured?", fr: "Quels moments souhaitez-vous immortaliser ?" },
    help: {
      nl: "De koffietafel wordt niet gefotografeerd — dat moment hoort de familie toe. De prijs blijft gelijk, ongeacht je keuze.",
      en: "The reception is not photographed — that moment belongs to the family. The price stays the same regardless of your choice.",
      fr: "La réception n'est pas photographiée — ce moment appartient à la famille. Le prix reste identique quel que soit votre choix.",
    },
    options: [
      { value: "ceremonie", label: { nl: "Ceremonie", en: "Ceremony", fr: "Cérémonie" } },
      { value: "teraardebestelling", label: { nl: "Teraardebestelling", en: "Burial", fr: "Mise en terre" } },
    ],
  },
  {
    key: "book", type: "boolean", required: false,
    label: {
      nl: "Ik heb interesse in het gepersonaliseerd handgemaakt leren boek met Japans papier (+ 1000 €)",
      en: "I'm interested in the personalised handmade leather book with Japanese paper (+ €1000)",
      fr: "Le livre en cuir fait main personnalisé, papier japonais, m'intéresse (+ 1000 €)",
    },
  },
  STEP.comments,
];

const GENERIC_STEPS: DefaultStep[] = [
  STEP.email,
  STEP.name,
  STEP.phone,
  STEP.date(false),
  STEP.location,
  STEP.who,
  STEP.photoPref,
  STEP.comments,
];

export const CONTACT_FORM_DEFAULTS: Record<"uitvaart" | "portret" | "huwelijk", DefaultForm> = {
  uitvaart: { chrome: CHROME, steps: UITVAART_STEPS },
  portret: { chrome: CHROME, steps: GENERIC_STEPS },
  huwelijk: { chrome: CHROME, steps: GENERIC_STEPS },
};

function defaultFormFor(svc: string): DefaultForm {
  return CONTACT_FORM_DEFAULTS[svc as keyof typeof CONTACT_FORM_DEFAULTS] ?? { chrome: CHROME, steps: GENERIC_STEPS };
}

function localizeStep(s: DefaultStep, lang: Locale): ResolvedStep {
  return {
    key: s.key,
    type: s.type,
    label: s.label[lang] || s.label.nl,
    help: s.help ? s.help[lang] || s.help.nl : "",
    placeholder: s.placeholder ? s.placeholder[lang] || s.placeholder.nl : "",
    required: s.required,
    options: (s.options ?? []).map((o) => ({ value: o.value, label: o.label[lang] || o.label.nl })),
  };
}

/* Merge Sanity config over code defaults, field-by-field, returning fully
   localized strings. Sanity steps win if any are configured; otherwise the
   default steps are used. Each chrome field falls back to the default when the
   Sanity value is empty — so a half-configured form still renders fully. */
export function resolveForm(svc: string, lang: Locale, sanity: ServiceFormConfig | null | undefined): ResolvedForm {
  const def = defaultFormFor(svc);
  const c = def.chrome;
  const pick = (key: keyof DefaultChrome, sanityValue: string | undefined): string =>
    (sanityValue && sanityValue.trim()) || c[key][lang] || c[key].nl;

  const chrome: ResolvedChrome = {
    overline: pick("overline", sanity?.overline),
    title: pick("title", sanity?.title),
    intro: pick("intro", sanity?.intro),
    submitLabel: pick("submitLabel", sanity?.submitLabel),
    submittingLabel: pick("submittingLabel", sanity?.submittingLabel),
    backLabel: pick("backLabel", sanity?.backLabel),
    nextLabel: pick("nextLabel", sanity?.nextLabel),
    reviewLabel: pick("reviewLabel", sanity?.reviewLabel),
    reviewTitle: pick("reviewTitle", sanity?.reviewTitle),
    progressLabel: pick("progressLabel", sanity?.progressLabel),
    successTitle: pick("successTitle", sanity?.successTitle),
    successBody: pick("successBody", sanity?.successBody),
    errorBody: pick("errorBody", sanity?.errorBody),
    consentLabel: pick("consentLabel", sanity?.consentLabel),
    requiredError: pick("requiredError", sanity?.requiredError),
    emailError: pick("emailError", sanity?.emailError),
  };

  const sanitySteps = sanity?.steps ?? [];
  const steps: ResolvedStep[] = sanitySteps.length
    ? sanitySteps.map((s) => ({
        key: s.key,
        type: s.type as StepType,
        label: s.label,
        help: s.help,
        placeholder: s.placeholder,
        required: s.required,
        options: s.options ?? [],
      }))
    : def.steps.map((s) => localizeStep(s, lang));

  return { chrome, steps };
}
