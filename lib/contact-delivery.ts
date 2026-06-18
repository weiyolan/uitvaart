/* Single swap-point for contact-form delivery. Default transport is Resend
   (a plain HTTPS fetch — no SMTP ports, works on Netlify functions). To change
   how Milo receives requests (SMTP, store-in-Sanity, …) edit only this file.

   Server-only: imported solely by app/api/contact/route.ts. Reads config from
   env — never import this from a client component. */

import type { ContactPayload } from "@/components/form/contact-schema";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export async function deliverContact(payload: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Milo Weiler <onboarding@resend.dev>";

  if (!apiKey || !to) {
    throw new Error("Contact delivery not configured: set RESEND_API_KEY and CONTACT_TO_EMAIL.");
  }

  const { subject, text, html } = formatContactEmail(payload);
  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      html,
      // So Milo can reply straight to the requester.
      reply_to: payload.email || undefined,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend responded ${res.status}: ${detail}`);
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatContactEmail(p: ContactPayload): { subject: string; text: string; html: string } {
  const photoMap: Record<string, string> = {
    kleur: "Kleur",
    zwartwit: "Zwart-wit",
    geen: "Geen voorkeur",
    "": "—",
  };

  const rows: [string, string][] = [
    ["Dienst", p.service],
    ["Naam", p.name],
    ["E-mail", p.email || "—"],
    ["Telefoon", p.phone || "—"],
    ["Datum", p.date || "—"],
    ["Tijdstip", p.time || "—"],
    ["Locatie", p.location || "—"],
    ["Voor wie", p.who || "—"],
  ];
  if (p.variant === "uitvaart") {
    rows.push(["Uitvaartorganisatie", p.funeralHome || "—"]);
    rows.push(["Momenten", p.parts.length ? p.parts.join(", ") : "—"]);
    rows.push(["Leren boek", p.book ? "Ja" : "Nee"]);
  }
  rows.push(["Foto-voorkeur", photoMap[p.photoPref] ?? "—"]);
  rows.push(["Taal", p.lang]);

  const subject = `Nieuwe aanvraag — ${p.service}${p.name ? ` — ${p.name}` : ""}`;

  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    (p.comments ? `\n\nOpmerkingen:\n${p.comments}` : "");

  const htmlRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6c685e;font-size:13px;white-space:nowrap;vertical-align:top">${escapeHtml(
          k,
        )}</td><td style="padding:6px 0;font-size:15px;color:#1f1d18">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
  const html = `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#1f1d18">
      <h2 style="font-weight:400;font-size:22px;margin:0 0 6px">Nieuwe aanvraag via de website</h2>
      <table style="border-collapse:collapse;width:100%;margin:14px 0">${htmlRows}</table>
      ${
        p.comments
          ? `<div style="margin-top:8px"><div style="color:#6c685e;font-size:13px;margin-bottom:4px">Opmerkingen</div><div style="white-space:pre-wrap;font-size:15px">${escapeHtml(
              p.comments,
            )}</div></div>`
          : ""
      }
    </div>`;

  return { subject, text, html };
}
