/* Single swap-point for contact-form delivery. Sends two branded emails via
   Resend's batch endpoint (one HTTPS request, no SMTP ports — works on Netlify
   functions): a notification to Milo and a confirmation to the visitor.

   Server-only: imported solely by app/api/contact/route.ts. Reads config from
   env — never import this from a client component. */

import type { ContactPayload } from "@/components/form/contact-schema";
import { buildConfirmationEmail, buildNotificationEmail, visitorEmailOf, type BusinessFacts } from "./contact-email";

const RESEND_BATCH_ENDPOINT = "https://api.resend.com/emails/batch";

export async function deliverContact(payload: ContactPayload, business: BusinessFacts): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Milo Weiler <onboarding@resend.dev>";

  if (!apiKey || !to) {
    throw new Error("Contact delivery not configured: set RESEND_API_KEY and CONTACT_TO_EMAIL.");
  }

  const visitorEmail = visitorEmailOf(payload);
  const notification = buildNotificationEmail(payload, business);
  const confirmation = buildConfirmationEmail(payload, business);

  const messages = [
    {
      from,
      to: [to],
      // Milo can reply straight to the requester.
      reply_to: visitorEmail || undefined,
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
    },
    visitorEmail
      ? {
          from,
          to: [visitorEmail],
          reply_to: business.email || to,
          subject: confirmation.subject,
          html: confirmation.html,
          text: confirmation.text,
        }
      : null,
  ].filter(Boolean);

  const res = await fetch(RESEND_BATCH_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(messages),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend responded ${res.status}: ${detail}`);
  }
}
