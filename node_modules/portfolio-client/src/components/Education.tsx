import type { EducationItem } from "../types";
import { useReveal } from "../hooks/useReveal";

export default function Education({ items }: { items: EducationItem[] }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  if (items.length === 0) return null;

  return (
    <section id="education" className="mx-auto max-w-6xl px-6 py-16">
      <div ref={ref} className={`reveal ${visible ? "is-visible" : ""}`}>
        <p className="font-mono text-xs uppercase tracking-widest text-teal">Education</p>
        <h2 className="mt-2 font-mono text-2xl text-ink sm:text-3xl">Where it started.</h2>

        <ol className="mt-8 space-y-8 border-l border-border pl-6">
          {items.map((item) => (
            <li key={item.id} className="relative">
              <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-teal bg-bg" />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-mono text-base text-ink">{item.degree}</h3>
                {item.period && (
                  <span className="font-mono text-xs text-muted">{item.period}</span>
                )}
              </div>
              <p className="font-mono text-sm text-teal">{item.school}</p>
              {item.description && (
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
