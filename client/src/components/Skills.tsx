import type { SkillGroup } from "../types";
import { useReveal } from "../hooks/useReveal";

export default function Skills({ groups }: { groups: SkillGroup[] }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="skills" className="border-t border-border/70 bg-elevated/30">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div ref={ref} className={`reveal ${visible ? "is-visible" : ""}`}>
          <p className="font-mono text-xs uppercase tracking-widest text-teal">Skills</p>
          <h2 className="mt-2 font-mono text-2xl text-ink sm:text-3xl">Working stack.</h2>

          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {groups.map((group) => (
              <div key={group.group}>
                <h3 className="font-mono text-[13px] text-muted">{group.group}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded border border-border bg-bg px-2.5 py-1 font-mono text-xs text-ink/90 transition-colors hover:border-teal/40 hover:text-teal"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
