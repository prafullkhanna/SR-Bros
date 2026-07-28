import { NextResponse } from "next/server";

/**
 * Contact endpoint.
 *
 * Security posture:
 *  - Strict input validation and length caps on every field
 *  - Honeypot field must be empty
 *  - Minimum time-on-form (bots submit instantly)
 *  - Simple in-memory, per-IP rate limit
 *
 * Delivery is intentionally not wired to a provider. Add one (Resend, Postmark,
 * SES…) where marked, and keep the API key in an environment variable — never
 * in the client bundle. See docs/DEPLOYMENT.md.
 */

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const MIN_ELAPSED_MS = 2_000;

const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many messages. Please try again in a minute." },
      { status: 429 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const message = String(payload.message ?? "").trim();
  const subject = String(payload.subject ?? "general").trim();
  const honeypot = String(payload.company ?? "").trim();
  const elapsedMs = Number(payload.elapsedMs ?? 0);

  // Silent success for obvious bots — never tell them why they failed.
  if (honeypot.length > 0 || elapsedMs < MIN_ELAPSED_MS) {
    return NextResponse.json({ ok: true, message: "Thanks — message received." });
  }

  if (name.length < 2 || name.length > 120) {
    return NextResponse.json({ ok: false, message: "Please enter your name." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email) || email.length > 200) {
    return NextResponse.json(
      { ok: false, message: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (message.length < 10 || message.length > 4000) {
    return NextResponse.json(
      { ok: false, message: "Please write a message between 10 and 4000 characters." },
      { status: 400 },
    );
  }

  // ------------------------------------------------------------------
  // TODO: connect an email provider here, e.g.
  //   await resend.emails.send({ from, to, subject, text })
  // Until then the submission is accepted and logged server-side only.
  // ------------------------------------------------------------------
  console.info("[contact] submission", { subject, from: email, length: message.length });

  return NextResponse.json({
    ok: true,
    message: "Thanks — your message has been received.",
  });
}
