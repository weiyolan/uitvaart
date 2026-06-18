"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { Locale } from "@/lib/i18n";
import type { ContactFormLabels } from "@/lib/site-types";
import { Reveal } from "@/components/shared/Reveal";
import { Field } from "./Field";
import { TextInput } from "./TextInput";
import { Textarea } from "./Textarea";
import { RadioGroup } from "./RadioGroup";
import { CheckboxGroup } from "./CheckboxGroup";
import { Checkbox } from "./Checkbox";
import {
  emptyPayload,
  validate,
  type ContactErrors,
  type ContactPayload,
  type ContactVariant,
} from "./contact-schema";

type Status = "idle" | "submitting" | "ok" | "error";

/* Warm online request form. Uitvaart gets the full field set (date, funeral
   home, moments, leather-book option); other services get a lighter version.
   Posts JSON to /api/contact; the transport behind that route is swappable. */
export function ContactForm({
  labels,
  lang,
  serviceKey,
  variant,
}: {
  labels: ContactFormLabels;
  lang: Locale;
  serviceKey: string;
  variant: ContactVariant;
}) {
  const [data, setData] = useState<ContactPayload>(() => emptyPayload(serviceKey, variant, lang));
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const isUitvaart = variant === "uitvaart";

  const set = <K extends keyof ContactPayload>(k: K, v: ContactPayload[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const errText = (k: keyof ContactPayload) => {
    const t = errors[k];
    if (!t) return undefined;
    return t === "email" ? labels.emailError : labels.requiredError;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = validate(data);
    setErrors(res.errors);
    if (!res.ok) return;
    setStatus("submitting");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!r.ok) throw new Error("bad status");
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  };

  if (status === "ok") {
    return (
      <Reveal className="fm-status fm-status--ok">
        <h3 className="fm-status-title">{labels.successTitle}</h3>
        <p>{labels.successBody}</p>
      </Reveal>
    );
  }

  return (
    <form className="fm" onSubmit={onSubmit} noValidate>
      {/* honeypot — hidden from people, tempting to bots */}
      <div className="fm-hp" aria-hidden="true">
        <label>
          Laat dit veld leeg
          <input
            tabIndex={-1}
            autoComplete="off"
            value={data._hp ?? ""}
            onChange={(e) => set("_hp", e.target.value)}
          />
        </label>
      </div>

      <div className="fm-row">
        <Field id="fm-name" label={labels.nameLabel} required error={errText("name")}>
          <TextInput id="fm-name" name="name" value={data.name} onChange={(v) => set("name", v)} autoComplete="name" required invalid={!!errors.name} />
        </Field>
        <Field id="fm-who" label={labels.whoLabel}>
          <TextInput id="fm-who" name="who" value={data.who} onChange={(v) => set("who", v)} />
        </Field>
      </div>

      <div className="fm-row">
        <Field id="fm-email" label={labels.emailLabel} error={errText("email")}>
          <TextInput id="fm-email" name="email" type="email" value={data.email} onChange={(v) => set("email", v)} autoComplete="email" invalid={!!errors.email} />
        </Field>
        <Field id="fm-phone" label={labels.phoneLabel}>
          <TextInput id="fm-phone" name="phone" type="tel" value={data.phone} onChange={(v) => set("phone", v)} autoComplete="tel" />
        </Field>
      </div>

      <div className="fm-row">
        <Field id="fm-date" label={labels.dateLabel} required={isUitvaart} error={errText("date")}>
          <TextInput id="fm-date" name="date" type="date" value={data.date} onChange={(v) => set("date", v)} invalid={!!errors.date} />
        </Field>
        <Field id="fm-time" label={labels.timeLabel}>
          <TextInput id="fm-time" name="time" type="time" value={data.time} onChange={(v) => set("time", v)} />
        </Field>
      </div>

      <Field id="fm-location" label={labels.locationLabel}>
        <TextInput id="fm-location" name="location" value={data.location} onChange={(v) => set("location", v)} />
      </Field>

      {isUitvaart ? (
        <Field id="fm-fh" label={labels.funeralHomeLabel}>
          <TextInput id="fm-fh" name="funeralHome" value={data.funeralHome} onChange={(v) => set("funeralHome", v)} />
        </Field>
      ) : null}

      <RadioGroup
        name="photoPref"
        legend={labels.photoPrefLegend}
        value={data.photoPref}
        onChange={(v) => set("photoPref", v as ContactPayload["photoPref"])}
        options={[
          { value: "kleur", label: labels.photoColor },
          { value: "zwartwit", label: labels.photoBw },
          { value: "geen", label: labels.photoNone },
        ]}
      />

      {isUitvaart ? (
        <>
          <CheckboxGroup
            name="parts"
            legend={labels.partsLegend}
            values={data.parts}
            onChange={(v) => set("parts", v)}
            hint={labels.partsHint}
            invalid={!!errors.parts}
            options={[
              { value: "ceremonie", label: labels.partCeremony },
              { value: "teraardebestelling", label: labels.partBurial },
            ]}
          />
          {errText("parts") ? (
            <p className="fm-err" role="alert">
              {errText("parts")}
            </p>
          ) : null}
          <Checkbox id="fm-book" name="book" checked={data.book} onChange={(v) => set("book", v)} label={labels.bookLabel} />
        </>
      ) : null}

      <Field id="fm-comments" label={labels.commentsLabel}>
        <Textarea id="fm-comments" name="comments" value={data.comments} onChange={(v) => set("comments", v)} />
      </Field>

      <Checkbox id="fm-consent" name="consent" checked={data.consent} onChange={(v) => set("consent", v)} label={labels.consentLabel} />
      {errText("consent") ? (
        <p className="fm-err" role="alert">
          {errText("consent")}
        </p>
      ) : null}

      {status === "error" ? (
        <p className="fm-status fm-status--err" role="alert">
          {labels.errorBody}
        </p>
      ) : null}

      <button type="submit" className="btn fm-submit" disabled={status === "submitting"}>
        {status === "submitting" ? labels.submittingLabel : labels.submitLabel}
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
