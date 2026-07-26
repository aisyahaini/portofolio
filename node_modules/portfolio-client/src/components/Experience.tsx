import type { ExperienceItem } from "../types";
import { useReveal } from "../hooks/useReveal";

export default function Experience({ items }: { items: ExperienceItem[] }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-16">
      <div ref={ref} className={`reveal ${visible ? "is-visible" : ""}`}>
        <p className="font-mono text-xs uppercase tracking-widest text-teal">Experience</p>
        <h2 className="mt-2 font-mono text-2xl text-ink sm:text-3xl">Where the work happened.</h2>

        <ol className="mt-8 space-y-8 border-l border-border pl-6">
          {items.map((item) => (
            <li key={item.id} className="relative">
              <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-amber bg-bg" />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-mono text-base text-ink">{item.role}</h3>
                {item.period && (
                  <span className="font-mono text-xs text-muted">{item.period}</span>
                )}
              </div>
              <p className="font-mono text-sm text-teal">{item.org}</p>
              <ul className="mt-2 space-y-1.5">
                {item.points.map((point, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted">
                    <span className="mt-1 text-amber">·</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
