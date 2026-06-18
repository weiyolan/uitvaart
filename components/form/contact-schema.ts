/* Shared contact-form contract — used by the client form for inline validation
   and by the API route as the authoritative gate. Pure TS (no React) so it is
   safe to import on the server. */

export type ContactVariant = "uitvaart" | "generic";
export type PhotoPref = "kleur" | "zwartwit" | "geen" | "";

export type ContactPayload = {
  service: string;
  variant: ContactVariant;
  lang: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  location: string;
  funeralHome: string;
  who: string;
  photoPref: PhotoPref;
  parts: string[];
  book: boolean;
  comments: string;
  consent: boolean;
  /* honeypot — must stay empty */
  _hp?: string;
};

export type FieldErrorType = "required" | "email";
export type ContactErrors = Partial<Record<keyof ContactPayload, FieldErrorType>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function emptyPayload(service: string, variant: ContactVariant, lang: string): ContactPayload {
  return {
    service,
    variant,
    lang,
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    location: "",
    funeralHome: "",
    who: "",
    photoPref: "",
    parts: [],
    book: false,
    comments: "",
    consent: false,
    _hp: "",
  };
}

export function validate(p: ContactPayload): { ok: boolean; errors: ContactErrors } {
  const errors: ContactErrors = {};
  if (!p.name?.trim()) errors.name = "required";
  // Need at least one way to reply; validate the email format when given.
  if (!p.email?.trim() && !p.phone?.trim()) {
    errors.email = "required";
  } else if (p.email?.trim() && !EMAIL_RE.test(p.email.trim())) {
    errors.email = "email";
  }
  if (!p.consent) errors.consent = "required";
  if (p.variant === "uitvaart") {
    if (!p.date?.trim()) errors.date = "required";
    if (!Array.isArray(p.parts) || p.parts.length === 0) errors.parts = "required";
  }
  return { ok: Object.keys(errors).length === 0, errors };
}
