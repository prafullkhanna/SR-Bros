import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Contact endpoint.
 *
 * Delivery: SMTP through the Hostinger mailbox for the site. Credentials come
 * from unprefixed environment variables and never reach the client bundle.
 *
 * Security posture:
 *  - Strict input validation and length caps on every field
 *  - Honeypot field must be empty
 *  - Minimum time-on-form (bots submit instantly)
 *  - Simple in-memory, per-IP rate limit
 *  - Header-injection guard on anything interpolated into a mail header
 *
 * See docs/DEPLOYMENT.md for the environment variables this needs.
 */

export const runtime = "nodejs";

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

/**
 * Strips CR/LF before any value is placed in a mail header. Without this, a
 * name containing a newline could inject extra headers (a Bcc, for example)
 * into the outgoing message.
 */
function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, " ").slice(0, 150);
}

const SUBJECT_LABELS: Record<string, string> = {
  general: "General enquiry",
  university: "University / admissions",
  competition: "Competition or event",
  collaboration: "Collaboration",
  press: "Press",
  investment: "Incubator / investment",
};

/** Only known subject values are used, so the header cannot be attacker-chosen. */
function subjectLabel(value: string): string {
  return SUBJECT_LABELS[value] ?? "General enquiry";
}

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
  // Deliver over SMTP.
  // ------------------------------------------------------------------
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const to = process.env.CONTACT_TO ?? user;

  if (!host || !user || !pass) {
    // Misconfiguration must never look like success to the sender — otherwise
    // a real enquiry is silently lost and nobody finds out.
    console.error("[contact] SMTP is not configured; message not delivered", {
      from: email,
      subject,
    });
    return NextResponse.json(
      {
        ok: false,
        message:
          "Our contact form is temporarily unavailable. Please email hello@srbros.in directly.",
      },
      { status: 503 },
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: Number(process.env.SMTP_PORT ?? 465) === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      // The envelope sender must be our own mailbox — sending "as" the visitor
      // would fail SPF/DKIM and land the message in spam.
      from: `"SRbros.in contact form" <${user}>`,
      to,
      replyTo: `"${headerSafe(name)}" <${email}>`,
      subject: `[srbros.in] ${headerSafe(subjectLabel(subject))} — ${headerSafe(name)}`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Subject: ${subjectLabel(subject)}`,
        "",
        message,
        "",
        "—",
        "Sent from the contact form at https://srbros.in/contact",
      ].join("\n"),
    });
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "We couldn't send that just now. Please email hello@srbros.in directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Thanks — your message has been received. We'll reply by email.",
  });
}
