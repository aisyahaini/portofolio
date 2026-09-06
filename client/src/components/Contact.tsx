import { useState, type FormEvent } from "react";
import type { Profile } from "../types";
import { api } from "../lib/api";
import { useReveal } from "../hooks/useReveal";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact({ profile }: { profile: Profile | null }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      await api.sendContact(form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-16">
      <div ref={ref} className={`reveal ${visible ? "is-visible" : ""}`}>
        <p className="font-mono text-xs uppercase tracking-widest text-teal">Contact</p>
        <h2 className="mt-2 font-mono text-2xl text-ink sm:text-3xl">Send a message.</h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Prefer email? Reach me directly at{" "}
          <a href={`mailto:${profile?.email}`} className="text-teal hover:underline">
            {profile?.email}
          </a>
          .
        </p>

        <form onSubmit={handleSubmit} className="mt-7 max-w-lg space-y-4">
          <div>
            <label htmlFor="name" className="font-mono text-xs text-muted">
              Name
            </label>
            <input
              id="name"
              required
              minLength={2}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1.5 w-full rounded border border-border bg-elevated px-3 py-2 text-sm text-ink outline-none focus:border-amber/60"
              placeholder="e.g. Aisyah or your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="font-mono text-xs text-muted">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1.5 w-full rounded border border-border bg-elevated px-3 py-2 text-sm text-ink outline-none focus:border-amber/60"
              placeholder="you@company.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="font-mono text-xs text-muted">
              Message
            </label>
            <textarea
              id="message"
              required
              minLength={10}
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-1.5 w-full resize-none rounded border border-border bg-elevated px-3 py-2 text-sm text-ink outline-none focus:border-amber/60"
              placeholder="Tell me a little about your project, idea, or how I can help."
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded bg-amber px-5 py-2.5 font-mono text-sm font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>

          {status === "sent" && (
            <p className="font-mono text-sm text-teal">Message sent — thanks, I'll reply soon.</p>
          )}
          {status === "error" && (
            <p className="font-mono text-sm text-rose">{error}</p>
          )}
        </form>
      </div>
    </section>
  );
}
