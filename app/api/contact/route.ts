import { NextResponse } from "next/server";
import { validate, type ContactPayload } from "@/components/form/contact-schema";
import { deliverContact } from "@/lib/contact-delivery";

/* Node runtime — the delivery layer may use Node APIs / outbound fetch. */
export const runtime = "nodejs";

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

  // Server-side is the authoritative validation gate.
  if (!validate(body).ok) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  try {
    await deliverContact(body);
  } catch (err) {
    console.error("[contact] delivery failed:", err);
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
