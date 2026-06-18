"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { Locale } from "@/lib/i18n";
import type { ResolvedChrome, ResolvedStep } from "@/lib/contact-form-defaults";
import { useReducedMotion } from "@/lib/hooks";
import { Field } from "./Field";
import { TextInput } from "./TextInput";
import { Textarea } from "./Textarea";
import { RadioGroup } from "./RadioGroup";
import { CheckboxGroup } from "./CheckboxGroup";
import { Checkbox } from "./Checkbox";
import {
  validate,
  validateStep,
  type Answer,
  type AnswerValue,
  type ContactErrors,
  type ContactPayload,
  type StepSpec,
} from "./contact-schema";

type Status = "idle" | "submitting" | "ok" | "error";

const YESNO: Record<Locale, [string, string]> = {
  nl: ["Ja", "Nee"],
  en: ["Yes", "No"],
  fr: ["Oui", "Non"],
};

function initialValue(step: ResolvedStep): AnswerValue {
  if (step.type === "multi-choice") return [];
  if (step.type === "boolean") return false;
  return "";
}

function displayFor(step: ResolvedStep, value: AnswerValue, lang: Locale): string {
  if (step.type === "boolean") return value ? YESNO[lang][0] : YESNO[lang][1];
  if (step.type === "single-choice") {
    return step.options.find((o) => o.value === value)?.label ?? "";
  }
  if (step.type === "multi-choice" && Array.isArray(value)) {
    return value.map((v) => step.options.find((o) => o.value === v)?.label ?? v).join(", ");
  }
  return typeof value === "string" ? value : "";
}

/* Full-screen, one-question-at-a-time request form. Questions appear/disappear
   with a progress bar and subtle back/next pagination; a final review screen
   gates a consent checkbox before submitting to /api/contact. */
export function Typeform({
  svc,
  lang,
  steps,
  chrome,
}: {
  svc: string;
  lang: Locale;
  steps: ResolvedStep[];
  chrome: ResolvedChrome;
}) {
  const [index, setIndex] = useState(0); // 0..steps.length (last = review)
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>(() => {
    const init: Record<string, AnswerValue> = {};
    for (const s of steps) init[s.key] = initialValue(s);
    return init;
  });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const [hp, setHp] = useState("");
  const reduce = useReducedMotion();
  const screenRef = useRef<HTMLDivElement>(null);

  const isReview = index >= steps.length;
  const specs: StepSpec[] = useMemo(
    () => steps.map((s) => ({ key: s.key, type: s.type, required: s.required })),
    [steps],
  );

  const set = (key: string, value: AnswerValue) => setAnswers((a) => ({ ...a, [key]: value }));
  const clearErr = (key: string) =>
    setErrors((e) => {
      if (!(key in e)) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });

  const errText = (key: string) =>
    errors[key] ? (errors[key] === "email" ? chrome.emailError : chrome.requiredError) : undefined;

  // Move focus to the first control of each screen (keyboard continuity + a11y).
  useEffect(() => {
    if (status !== "idle") return;
    const el = screenRef.current?.querySelector<HTMLElement>(
      "input:not([type=hidden]), textarea, select, button[data-autofocus]",
    );
    el?.focus({ preventScroll: true });
  }, [index, status]);

  function goNext() {
    if (!isReview) {
      const step = steps[index];
      const err = validateStep(specs[index], answers[step.key]);
      if (err) {
        setErrors((e) => ({ ...e, [step.key]: err }));
        return;
      }
    }
    setDir("fwd");
    setIndex((i) => Math.min(i + 1, steps.length));
  }

  function goBack() {
    setDir("back");
    setIndex((i) => Math.max(i - 1, 0));
  }

  function onFormSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    if (!isReview) {
      goNext();
      return;
    }
    submitForm();
  }

  async function submitForm() {
    const res = validate(specs, answers, consent);
    setErrors(res.errors);
    if (!res.ok) {
      // Jump to the first failing step so the problem is visible.
      const firstBadStep = steps.findIndex((s) => res.errors[s.key]);
      if (firstBadStep >= 0) {
        setDir("back");
        setIndex(firstBadStep);
      }
      return;
    }
    const payloadAnswers: Answer[] = steps.map((s) => ({
      key: s.key,
      label: s.label,
      type: s.type,
      value: answers[s.key],
      displayValue: displayFor(s, answers[s.key], lang),
    }));
    const payload: ContactPayload = { service: svc, lang, consent, answers: payloadAnswers, _hp: hp };
    setStatus("submitting");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error("bad status");
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="fm-status fm-status--ok" role="status">
        <h3 className="fm-status-title">{chrome.successTitle}</h3>
        <p>{chrome.successBody}</p>
      </div>
    );
  }

  const total = steps.length;
  const current = Math.min(index + 1, total);
  const progress = total > 0 ? (index / total) * 100 : 0;
  const progressText = chrome.progressLabel
    .replace("{current}", String(current))
    .replace("{total}", String(total));
  const stepClass = reduce ? "fm-step" : `fm-step fm-step--enter-${dir}`;

  return (
    <form className="fm fm-typeform" onSubmit={onFormSubmit} noValidate>
      {/* honeypot */}
      <div className="fm-hp" aria-hidden="true">
        <label>
          Laat dit veld leeg
          <input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </label>
      </div>

      <div className="fm-progress" aria-hidden="true">
        <span className="fm-progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <p className="fm-progress-label" aria-live="polite">
        {isReview ? chrome.reviewTitle : progressText}
      </p>

      <div className={stepClass} key={index} ref={screenRef}>
        {isReview ? (
          <div className="fm-review">
            {steps.map((s) => {
              const display = displayFor(s, answers[s.key], lang);
              if (!display) return null;
              return (
                <div className="fm-review-row" key={s.key}>
                  <span className="fm-review-k">{s.label}</span>
                  <span className="fm-review-v">{display}</span>
                  <button
                    type="button"
                    className="fm-review-edit"
                    onClick={() => {
                      setDir("back");
                      setIndex(steps.findIndex((x) => x.key === s.key));
                    }}
                  >
                    ✎
                  </button>
                </div>
              );
            })}
            <div className="fm-consent">
              <Checkbox id="fm-consent" name="consent" checked={consent} onChange={setConsent} label={chrome.consentLabel} />
              {errors.consent ? (
                <p className="fm-err" role="alert">
                  {chrome.requiredError}
                </p>
              ) : null}
            </div>
          </div>
        ) : (
          renderStep(steps[index])
        )}
      </div>

      {status === "error" ? (
        <p className="fm-status fm-status--err" role="alert">
          {chrome.errorBody}
        </p>
      ) : null}

      <div className="fm-nav">
        <button type="button" className="fm-nav-btn" onClick={goBack} hidden={index === 0}>
          ← {chrome.backLabel}
        </button>
        <span className="fm-nav-spacer" />
        {isReview ? (
          <button type="submit" className="btn fm-submit" disabled={status === "submitting"} data-autofocus>
            {status === "submitting" ? chrome.submittingLabel : chrome.submitLabel}
            <span aria-hidden="true">→</span>
          </button>
        ) : (
          <button type="submit" className="fm-nav-btn fm-nav-next">
            {index === steps.length - 1 ? chrome.reviewLabel : chrome.nextLabel} <span aria-hidden="true">→</span>
          </button>
        )}
      </div>
    </form>
  );

  function renderStep(step: ResolvedStep) {
    const fid = `fm-${step.key}`;
    const common = { id: fid, name: step.key };
    const onText = (v: string) => {
      set(step.key, v);
      clearErr(step.key);
    };
    switch (step.type) {
      case "long-text":
        return (
          <Field id={fid} label={step.label} required={step.required} hint={step.help} error={errText(step.key)}>
            <Textarea {...common} value={String(answers[step.key] ?? "")} onChange={onText} placeholder={step.placeholder} />
          </Field>
        );
      case "single-choice":
        return (
          <div className="fm-field">
            <RadioGroup
              name={step.key}
              legend={step.label}
              value={String(answers[step.key] ?? "")}
              onChange={(v) => {
                set(step.key, v);
                clearErr(step.key);
              }}
              options={step.options}
            />
            {step.help ? <p className="fm-hint">{step.help}</p> : null}
            {errText(step.key) ? (
              <p className="fm-err" role="alert">
                {errText(step.key)}
              </p>
            ) : null}
          </div>
        );
      case "multi-choice":
        return (
          <div className="fm-field">
            <CheckboxGroup
              name={step.key}
              legend={step.label}
              values={Array.isArray(answers[step.key]) ? (answers[step.key] as string[]) : []}
              onChange={(v) => {
                set(step.key, v);
                clearErr(step.key);
              }}
              hint={step.help}
              invalid={!!errors[step.key]}
              options={step.options}
            />
            {errText(step.key) ? (
              <p className="fm-err" role="alert">
                {errText(step.key)}
              </p>
            ) : null}
          </div>
        );
      case "boolean":
        return (
          <Checkbox
            {...common}
            checked={answers[step.key] === true}
            onChange={(v) => set(step.key, v)}
            label={step.label}
            note={step.help || undefined}
          />
        );
      default: {
        const type = step.type === "email" ? "email" : step.type === "tel" ? "tel" : step.type === "date" ? "date" : step.type === "time" ? "time" : "text";
        const autoComplete = step.type === "email" ? "email" : step.type === "tel" ? "tel" : undefined;
        return (
          <Field id={fid} label={step.label} required={step.required} hint={step.help} error={errText(step.key)}>
            <TextInput
              {...common}
              type={type}
              value={String(answers[step.key] ?? "")}
              onChange={onText}
              placeholder={step.placeholder}
              autoComplete={autoComplete}
              invalid={!!errors[step.key]}
            />
          </Field>
        );
      }
    }
  }
}
