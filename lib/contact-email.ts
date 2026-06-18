/* Brand-matched HTML emails for the contact form (pure, server-safe). Builds
   two messages from one submission: a notification for Milo and a confirmation
   for the visitor. Inline CSS only (email clients), serif + warm palette to
   match the website; per-service accent. */

import type { ContactPayload } from "@/components/form/contact-schema";

export type BusinessFacts = {
  siteName: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  instagramUrl: string;
  instagramHandle: string;
  streetAddress: string;
  postalCode: string;
  city: string;
};

type Lang = "nl" | "en" | "fr";

/* Website tokens (light theme) inlined for email. */
const BG = "#f6f3ec";
const BG2 = "#efece3";
const INK = "#1f1d18";
const INK_SOFT = "#6c685e";
const INK_FAINT = "#a8a298";
const LINE = "rgba(31,29,24,0.12)";
const SERIF = "Georgia, 'Times New Roman', serif";
const MONO = "'Courier New', monospace";
const ACCENT: Record<string, string> = { uitvaart: "#5f6671", portret: "#8a6a4a", huwelijk: "#b07a5e" };

const YESNO: Record<Lang, [string, string]> = { nl: ["Ja", "Nee"], en: ["Yes", "No"], fr: ["Oui", "Non"] };

const COPY: Record<Lang, {
  notifyHeading: string;
  notifyLead: string;
  comments: string;
  confirmSubject: (site: string) => string;
  confirmHeading: string;
  confirmLead: (name: string) => string;
  summary: string;
  next: string;
  footerReply: string;
}> = {
  nl: {
    notifyHeading: "Nieuwe aanvraag via de website",
    notifyLead: "Iemand heeft het aanvraagformulier ingevuld.",
    comments: "Opmerkingen",
    confirmSubject: (s) => `Bedankt voor je aanvraag — ${s}`,
    confirmHeading: "Bedankt voor je aanvraag.",
    confirmLead: (n) => `${n ? `Dag ${n}, ` : ""}je aanvraag is goed ontvangen. Hieronder een overzicht van wat je doorgaf.`,
    summary: "Jouw aanvraag",
    next: "Ik neem snel persoonlijk contact met je op om alles rustig te bespreken.",
    footerReply: "Antwoord gerust op deze e-mail met vragen.",
  },
  en: {
    notifyHeading: "New request via the website",
    notifyLead: "Someone completed the request form.",
    comments: "Notes",
    confirmSubject: (s) => `Thank you for your request — ${s}`,
    confirmHeading: "Thank you for your request.",
    confirmLead: (n) => `${n ? `Hi ${n}, ` : ""}your request has been received. Below is a summary of what you shared.`,
    summary: "Your request",
    next: "I'll be in touch with you personally soon to talk everything through calmly.",
    footerReply: "Feel free to reply to this email with any questions.",
  },
  fr: {
    notifyHeading: "Nouvelle demande via le site",
    notifyLead: "Quelqu'un a complété le formulaire de demande.",
    comments: "Remarques",
    confirmSubject: (s) => `Merci pour votre demande — ${s}`,
    confirmHeading: "Merci pour votre demande.",
    confirmLead: (n) => `${n ? `Bonjour ${n}, ` : ""}votre demande a bien été reçue. Voici un récapitulatif de ce que vous avez indiqué.`,
    summary: "Votre demande",
    next: "Je vous recontacte personnellement très vite pour en discuter sereinement.",
    footerReply: "N'hésitez pas à répondre à cet e-mail pour toute question.",
  },
};

function esc(s: string): string {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function langOf(payload: ContactPayload): Lang {
  return payload.lang === "en" || payload.lang === "fr" ? payload.lang : "nl";
}

function valueOf(a: ContactPayload["answers"][number], lang: Lang): string {
  if (a.displayValue && a.displayValue.trim()) return a.displayValue;
  if (typeof a.value === "boolean") return a.value ? YESNO[lang][0] : YESNO[lang][1];
  if (Array.isArray(a.value)) return a.value.join(", ");
  return String(a.value ?? "");
}

export function visitorEmailOf(payload: ContactPayload): string {
  return String(payload.answers.find((a) => a.type === "email")?.value ?? "").trim();
}
function nameOf(payload: ContactPayload): string {
  return String(payload.answers.find((a) => a.key === "name")?.value ?? "").trim();
}
function serviceName(slug: string): string {
  return slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Milo Weiler";
}

function answersTable(payload: ContactPayload, lang: Lang): string {
  const rows = payload.answers
    .filter((a) => a.type !== "long-text" && valueOf(a, lang))
    .map(
      (a) =>
        `<tr><td style="padding:7px 18px 7px 0;color:${INK_SOFT};font-size:13px;white-space:nowrap;vertical-align:top;font-family:${MONO}">${esc(
          a.label,
        )}</td><td style="padding:7px 0;font-size:15px;color:${INK};font-family:${SERIF}">${esc(valueOf(a, lang))}</td></tr>`,
    )
    .join("");
  const longs = payload.answers
    .filter((a) => a.type === "long-text" && valueOf(a, lang))
    .map(
      (a) =>
        `<div style="margin-top:16px"><div style="color:${INK_SOFT};font-size:12px;font-family:${MONO};text-transform:uppercase;letter-spacing:0.12em;margin-bottom:6px">${esc(
          a.label,
        )}</div><div style="white-space:pre-wrap;font-size:15px;color:${INK};font-family:${SERIF}">${esc(valueOf(a, lang))}</div></div>`,
    )
    .join("");
  return `<table style="border-collapse:collapse;width:100%;margin:6px 0">${rows}</table>${longs}`;
}

function shell(opts: { accent: string; heading: string; lead: string; bodyHtml: string; footerNote: string; business: BusinessFacts }): string {
  const { accent, heading, lead, bodyHtml, footerNote, business } = opts;
  const addr = [business.streetAddress, [business.postalCode, business.city].filter(Boolean).join(" ")].filter(Boolean).join(", ");
  const footerBits = [
    business.phoneDisplay ? `<a href="tel:${esc(business.phone)}" style="color:${INK_SOFT};text-decoration:none">${esc(business.phoneDisplay)}</a>` : "",
    business.email ? `<a href="mailto:${esc(business.email)}" style="color:${INK_SOFT};text-decoration:none">${esc(business.email)}</a>` : "",
    business.instagramHandle ? `<a href="${esc(business.instagramUrl)}" style="color:${INK_SOFT};text-decoration:none">${esc(business.instagramHandle)}</a>` : "",
    addr ? esc(addr) : "",
  ].filter(Boolean).join(" &nbsp;·&nbsp; ");

  return `<!doctype html><html><body style="margin:0;background:${BG2};padding:32px 0">
  <div style="max-width:560px;margin:0 auto;background:${BG};padding:40px clamp(20px,6vw,44px);border-top:3px solid ${accent}">
    <div style="font-family:${MONO};font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:${INK_FAINT}">${esc(business.siteName || "Milo Weiler")}</div>
    <h1 style="font-family:${SERIF};font-weight:400;font-size:26px;line-height:1.15;color:${INK};margin:18px 0 0">${esc(heading)}</h1>
    <p style="font-family:${SERIF};font-size:15px;line-height:1.6;color:${INK_SOFT};margin:12px 0 22px">${esc(lead)}</p>
    ${bodyHtml}
    <p style="font-family:${SERIF};font-size:14px;line-height:1.6;color:${INK_SOFT};margin:24px 0 0">${esc(footerNote)}</p>
    <div style="margin-top:28px;padding-top:18px;border-top:1px solid ${LINE};font-family:${MONO};font-size:11px;letter-spacing:0.04em;color:${INK_FAINT}">${footerBits}</div>
  </div></body></html>`;
}

export function buildNotificationEmail(payload: ContactPayload, business: BusinessFacts) {
  const lang = langOf(payload);
  const t = COPY[lang];
  const accent = ACCENT[payload.service] ?? "#8a7f6b";
  const name = nameOf(payload);
  const subject = `Nieuwe aanvraag — ${serviceName(payload.service)}${name ? ` — ${name}` : ""}`;
  const html = shell({
    accent,
    heading: t.notifyHeading,
    lead: t.notifyLead,
    bodyHtml: answersTable(payload, lang),
    footerNote: t.footerReply,
    business,
  });
  const text =
    `${t.notifyHeading}\n\n` +
    payload.answers.filter((a) => valueOf(a, lang)).map((a) => `${a.label}: ${valueOf(a, lang)}`).join("\n");
  return { subject, html, text };
}

export function buildConfirmationEmail(payload: ContactPayload, business: BusinessFacts) {
  const lang = langOf(payload);
  const t = COPY[lang];
  const accent = ACCENT[payload.service] ?? "#8a7f6b";
  const subject = t.confirmSubject(business.siteName || "Milo Weiler");
  const summaryHeading = `<div style="font-family:${MONO};font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:${INK_FAINT};margin-bottom:6px">${esc(t.summary)}</div>`;
  const html = shell({
    accent,
    heading: t.confirmHeading,
    lead: t.confirmLead(nameOf(payload)),
    bodyHtml: summaryHeading + answersTable(payload, lang),
    footerNote: t.next,
    business,
  });
  const text =
    `${t.confirmHeading}\n${t.confirmLead(nameOf(payload))}\n\n` +
    payload.answers.filter((a) => valueOf(a, lang)).map((a) => `${a.label}: ${valueOf(a, lang)}`).join("\n") +
    `\n\n${t.next}`;
  return { subject, html, text };
}
