import type { Project } from "../types";
import ProjectCard from "./ProjectCard";
import { useReveal } from "../hooks/useReveal";

export default function Projects({ projects }: { projects: Project[] }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  // Featured work first, so a first-time visitor sees the strongest proof
  // points before scrolling into prototypes and research pieces.
  const sorted = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <section id="projects" className="border-t border-border/70 bg-elevated/30">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div ref={ref} className={`reveal ${visible ? "is-visible" : ""}`}>
          <p className="font-mono text-xs uppercase tracking-widest text-teal">Projects</p>
          <h2 className="mt-2 font-mono text-2xl text-ink sm:text-3xl">Selected work.</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Agentic AI systems and automation pipelines in production, plus full-stack and
            computer vision work.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
