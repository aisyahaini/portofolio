import type { Profile } from "../types";
import { useReveal } from "../hooks/useReveal";

export default function About({ profile }: { profile: Profile | null }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-16">
      <div ref={ref} className={`reveal ${visible ? "is-visible" : ""}`}>
        <p className="font-mono text-xs uppercase tracking-widest text-teal">About</p>
        <h2 className="mt-2 max-w-2xl font-mono text-2xl text-ink sm:text-3xl">
          Research that ships.
        </h2>
        <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-muted sm:text-base">
          {profile?.summary}
        </p>
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
