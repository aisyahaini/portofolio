import type { Profile } from "../types";
import { useReveal } from "../hooks/useReveal";

export default function About({ profile }: { profile: Profile | null }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const summaryParagraphs = Array.isArray(profile?.summary)
    ? profile.summary
    : profile?.summary
    ? [profile.summary]
    : [];

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-16">
      <div ref={ref} className={`reveal ${visible ? "is-visible" : ""}`}>
        <p className="font-mono text-xs uppercase tracking-widest text-teal">About</p>
        <h2 className="mt-2 max-w-2xl font-mono text-2xl text-ink sm:text-3xl">
          AI Engineer, shipped in production.
        </h2>
        <div className="mt-5 max-w-3xl space-y-4">
          {summaryParagraphs.map((para, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-muted sm:text-base">
              {para}
            </p>
          ))}
        </div>
        {profile?.focus && (
          <div className="mt-6 flex max-w-3xl items-start gap-2 rounded border border-border bg-elevated/50 p-4 text-sm text-muted">
            <span className="mt-0.5 font-mono text-amber">→</span>
            <span>{profile.focus}</span>
          </div>
        )}
      </div>
    </section>
  );
}