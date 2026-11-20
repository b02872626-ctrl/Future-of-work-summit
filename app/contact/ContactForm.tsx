"use client";

import { useState } from "react";

const FIELD =
  "w-full rounded-md border border-cream/15 bg-cream/5 px-4 py-3 text-sm text-cream placeholder:text-cream/40 outline-none transition focus:border-magenta focus:bg-cream/10 focus:ring-2 focus:ring-magenta/30 md:text-base";

type Status = { state: "idle" | "sending" | "sent" | "error"; message?: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      form.reset();
      setStatus({ state: "sent" });
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  if (status.state === "sent") {
    return (
      <div className="mt-8 rounded-md border border-magenta/40 bg-magenta/10 p-6 text-cream" role="status">
        <p className="text-lg font-semibold">Thanks — your message is on its way.</p>
        <p className="mt-2 text-sm text-cream/70">We&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form className="mt-8 space-y-4" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input type="text" name="first_name" placeholder="First name" className={FIELD} required />
        <input type="text" name="last_name" placeholder="Last name" className={FIELD} required />
      </div>
      <input type="text" name="contact" placeholder="Email or phone number" className={FIELD} required />
      <textarea
        name="message"
        placeholder="Write your message here…"
        rows={6}
        className={`${FIELD} resize-none`}
        required
      />
      {/* Honeypot for spam bots — hidden from people and screen readers. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {status.state === "error" && (
        <p className="text-sm text-magenta" role="alert">
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={status.state === "sending"}
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-magenta px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-cream shadow-glow transition hover:brightness-110 disabled:opacity-60 sm:w-auto md:text-base md:px-9 md:py-4"
      >
        {status.state === "sending" ? "Sending…" : "Send message"}
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
