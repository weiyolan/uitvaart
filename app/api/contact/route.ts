import { NextResponse } from "next/server";
import { answersByKey, isValidEmail, validate, type ContactPayload, type StepSpec } from "@/components/form/contact-schema";
import { deliverContact } from "@/lib/contact-delivery";
import type { BusinessFacts } from "@/lib/contact-email";
import { client } from "@/sanity/lib/client";
import { CONTACT_BUSINESS_QUERY } from "@/sanity/lib/queries";

/* Node runtime — the delivery layer uses outbound fetch. */
export const runtime = "nodejs";

const FALLBACK_BUSINESS: BusinessFacts = {
  siteName: "Milo Weiler",
  email: process.env.CONTACT_TO_EMAIL || "",
  phone: "",
  phoneDisplay: "",
  instagramUrl: "",
  instagramHandle: "",
  streetAddress: "",
  postalCode: "",
  city: "",
};

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: a filled hidden field means a bot — accept silently, send nothing.
  if (typeof body._hp === "string" && body._hp.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (!Array.isArray(body.answers) || body.answers.length === 0) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  // Structural gate: email-type answers are required + format-checked; consent
  // must be true; honeypot empty. (Client gates the rest before submit.)
  const specs: StepSpec[] = body.answers.map((a) => ({ key: a.key, type: a.type, required: a.type === "email" }));
  const { ok } = validate(specs, answersByKey(body.answers), body.consent);
  const hasValidEmail = body.answers.some((a) => a.type === "email" && typeof a.value === "string" && isValidEmail(a.value));
  if (!ok || !hasValidEmail) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  // Business facts for the branded email footer (published, stega-free). Never
  // hard-fail delivery on a CMS hiccup — fall back to env-only.
  let business: BusinessFacts = FALLBACK_BUSINESS;
  try {
    const fetched = await client.fetch(CONTACT_BUSINESS_QUERY, {}, { stega: false });
    if (fetched) business = fetched as BusinessFacts;
  } catch (err) {
    console.error("[contact] business fetch failed, using fallback:", err);
  }

  try {
    await deliverContact(body, business);
  } catch (err) {
    console.error("[contact] delivery failed:", err);
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
