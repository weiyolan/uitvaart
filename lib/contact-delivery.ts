/* Single swap-point for contact-form delivery. Sends two branded emails via
   Resend's batch endpoint (one HTTPS request, no SMTP ports — works on Netlify
   functions): a notification to Milo and a confirmation to the visitor.

   Server-only: imported solely by app/api/contact/route.ts. Reads config from
   env — never import this from a client component. */

import type { ContactPayload } from "@/components/form/contact-schema";
import { OWNER_EMAIL, type MailSettings } from "./mail-config";
import { buildConfirmationEmail, buildNotificationEmail, visitorEmailOf, type BusinessFacts } from "./contact-email";

const RESEND_BATCH_ENDPOINT = "https://api.resend.com/emails/batch";

export type DeliveryResult = { notified: boolean; confirmed: boolean };

export async function deliverContact(
  payload: ContactPayload,
  business: BusinessFacts,
  settings: MailSettings,
): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  // Recipient: Studio setting → env → owner default.
  const to = settings.ownerEmail || process.env.CONTACT_TO_EMAIL || OWNER_EMAIL;
  const envFrom = process.env.CONTACT_FROM_EMAIL || "Milo Weiler <onboarding@resend.dev>";
  // Studio controls the display name only; the address stays the verified sender.
  const address = envFrom.match(/<([^>]+)>/)?.[1] ?? envFrom;
  const from = settings.fromName ? `${settings.fromName.replace(/[<>"]/g, "")} <${address}>` : envFrom;

  if (!apiKey) {
    throw new Error("Contact delivery not configured: set RESEND_API_KEY.");
  }

  const visitorEmail = visitorEmailOf(payload);
  const notify = settings.notifyOwner;
  const confirm = settings.sendConfirmation && Boolean(visitorEmail);
  const notification = buildNotificationEmail(payload, business);
  const confirmation = buildConfirmationEmail(payload, business, settings.confirmation[langKey(payload)]);

  const messages = [
    notify && {
      from,
      to: [to],
      // Milo can reply straight to the requester.
      reply_to: visitorEmail || undefined,
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
    },
    confirm
      ? {
          from,
          to: [visitorEmail],
          reply_to: settings.replyTo || business.email || to,
          subject: confirmation.subject,
          html: confirmation.html,
          text: confirmation.text,
        }
      : null,
  ].filter(Boolean);
  if (messages.length === 0) return { notified: false, confirmed: false };

  const res = await fetch(RESEND_BATCH_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(messages),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend responded ${res.status}: ${detail}`);
  }
  return { notified: notify, confirmed: confirm };
}

function langKey(payload: ContactPayload): "nl" | "en" | "fr" {
  return payload.lang === "en" || payload.lang === "fr" ? payload.lang : "nl";
}
