"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

type State = "idle" | "sending" | "sent" | "error";

const fieldClasses =
  "w-full rounded-xl border border-hairline bg-graphite/70 px-4 py-3 text-sm text-fg placeholder:text-fg-subtle transition-colors focus:border-electric/50 focus:outline-none";

/**
 * Contact form with client-side validation and a honeypot field.
 *
 * Spam protection is layered: a hidden honeypot input, a minimum time-on-form
 * check, and server-side validation plus rate limiting in the API route.
 */
export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");
  const [startedAt] = useState(() => Date.now());

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, elapsedMs: Date.now() - startedAt }),
      });
      const result = (await response.json()) as { ok: boolean; message: string };

      setState(result.ok ? "sent" : "error");
      setMessage(result.message);
      if (result.ok) form.reset();
    } catch {
      setState("error");
      setMessage("Something went wrong. Please email us directly instead.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block font-display text-sm text-fg">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            className={fieldClasses}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block font-display text-sm text-fg">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className={fieldClasses}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block font-display text-sm text-fg">
          Subject
        </label>
        <select id="subject" name="subject" className={fieldClasses} defaultValue="general">
          <option value="general">General enquiry</option>
          <option value="university">University / admissions</option>
          <option value="competition">Competition or event</option>
          <option value="collaboration">Collaboration</option>
          <option value="press">Press</option>
          <option value="investment">Incubator / investment</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block font-display text-sm text-fg">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={4000}
          className={fieldClasses}
          placeholder="What would you like to know?"
        />
      </div>

      {/* Honeypot — hidden from humans, irresistible to bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={state === "sending"}>
          {state === "sending" ? (
            <>
              <Loader2 size={15} aria-hidden className="animate-spin" />
              Sending
            </>
          ) : (
            <>
              <Send size={15} aria-hidden />
              Send message
            </>
          )}
        </Button>

        <p
          role="status"
          aria-live="polite"
          className={
            state === "error"
              ? "text-sm text-amber-accent"
              : "text-sm text-emerald-accent"
          }
        >
          {message}
        </p>
      </div>

      <p className="text-xs leading-relaxed text-fg-subtle">
        Submissions are validated and rate-limited. No message content is stored in the browser.
      </p>
    </form>
  );
}
