import type { ResearchItem } from "../types";
import { useReveal } from "../hooks/useReveal";

const STATUS_STYLE: Record<ResearchItem["status"], string> = {
  Published: "text-teal border-teal/40",
  "Under Review": "text-amber border-amber/40",
  "Under Revision": "text-rose border-rose/40",
};

export default function Research({ items }: { items: ResearchItem[] }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  if (items.length === 0) return null;

  return (
    <section id="research" className="mx-auto max-w-6xl px-6 py-16">
      <div ref={ref} className={`reveal ${visible ? "is-visible" : ""}`}>
        <p className="font-mono text-xs uppercase tracking-widest text-teal">
          Research &amp; Publications
        </p>
        <h2 className="mt-2 font-mono text-2xl text-ink sm:text-3xl">Papers, not just projects.</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Peer-reviewed and in-progress work spanning explainable AI, medical imaging, and NLP.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.id}
              className="bbox flex flex-col rounded border border-border bg-elevated/50 p-5 text-amber transition-colors hover:border-teal/40"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-mono text-[15px] leading-snug text-ink">{item.title}</h3>
                <span
                  className={`shrink-0 rounded border px-2 py-0.5 font-mono text-[11px] ${STATUS_STYLE[item.status]}`}
                >
                  {item.status}
                </span>
              </div>

              <p className="mt-2 font-mono text-[12.5px] text-teal">{item.role}</p>

              <p className="mt-3 text-[13.5px] leading-relaxed text-muted">{item.summary}</p>

              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-fit items-center gap-1.5 rounded border border-teal/40 px-3 py-1.5 font-mono text-[13px] text-teal transition-colors hover:bg-teal/10 hover:text-ink"
                >
                  More details
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ) : (
                <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded border border-border px-3 py-1.5 font-mono text-[13px] text-muted/50">
                  More details
                </span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
