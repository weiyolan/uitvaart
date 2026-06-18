/* Shared, generic contact-form contract — used by the client typeform for
   inline validation and by the API route as the validation gate. Pure TS (no
   React, no Sanity imports) so it is safe to import on the server. */

export type StepType =
  | "short-text"
  | "long-text"
  | "email"
  | "tel"
  | "date"
  | "time"
  | "single-choice"
  | "multi-choice"
  | "boolean";

export type AnswerValue = string | string[] | boolean;

/* Minimal structural spec used for validation (a subset of the Sanity step
   projection and the code defaults). */
export type StepSpec = {
  key: string;
  type: StepType;
  required: boolean;
};

/* One submitted answer carries a snapshot of its question label + type so the
   emails and review screen render without re-reading the form config. */
export type Answer = {
  key: string;
  label: string;
  type: StepType;
  value: AnswerValue;
  /* Localized display of the chosen option(s) for choice types. */
  displayValue?: string;
};

export type ContactPayload = {
  service: string;
  lang: string;
  consent: boolean;
  answers: Answer[];
  /* honeypot — must stay empty */
  _hp?: string;
};

export type FieldErrorType = "required" | "email";
/* Errors keyed by step key, plus the synthetic "consent". */
export type ContactErrors = Record<string, FieldErrorType>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export function isAnswered(type: StepType, value: AnswerValue): boolean {
  if (type === "boolean") return value === true;
  if (type === "multi-choice") return Array.isArray(value) && value.length > 0;
  return typeof value === "string" && value.trim().length > 0;
}

/* Validate one step's value — used to gate "next" and inside validate(). */
export function validateStep(spec: StepSpec, value: AnswerValue): FieldErrorType | null {
  const answered = isAnswered(spec.type, value);
  if (spec.required && !answered) return "required";
  if (spec.type === "email" && typeof value === "string" && value.trim() && !isValidEmail(value)) {
    return "email";
  }
  return null;
}

/* Authoritative gate, reused client + server. */
export function validate(
  specs: StepSpec[],
  answers: Record<string, AnswerValue>,
  consent: boolean,
): { ok: boolean; errors: ContactErrors } {
  const errors: ContactErrors = {};
  for (const spec of specs) {
    const err = validateStep(spec, answers[spec.key] ?? (spec.type === "multi-choice" ? [] : spec.type === "boolean" ? false : ""));
    if (err) errors[spec.key] = err;
  }
  if (!consent) errors.consent = "required";
  return { ok: Object.keys(errors).length === 0, errors };
}

/* Build a lookup of answers by key (for validate()). */
export function answersByKey(answers: Answer[]): Record<string, AnswerValue> {
  const map: Record<string, AnswerValue> = {};
  for (const a of answers) map[a.key] = a.value;
  return map;
}
