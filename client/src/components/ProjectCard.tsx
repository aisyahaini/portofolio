import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { KeyboardEvent } from "react";
import type { Project } from "../types";

const STATUS_STYLE: Record<Project["status"], string> = {
  Production: "text-amber border-amber/40",
  Prototype: "text-teal border-teal/40",
  Research: "text-rose border-rose/40",
};

// Keep each card scannable in a 3-up grid: lead with the strongest
// highlights and fold the rest into a "+N more" note instead of letting
// one dense card tower over its row.
const VISIBLE_HIGHLIGHTS = 2;
const VISIBLE_STACK = 4;

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/** Shown when a project has no image yet, or the given path fails to load —
    keeps the same bounding-box/dot-grid language as the rest of the site
    instead of a broken-image icon. */
export function ImagePlaceholder({ name, boxClassName = "h-14 w-14" }: { name: string; boxClassName?: string }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{
        backgroundImage: "radial-gradient(circle, rgb(var(--color-border)) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    >
      <div className={`bbox bbox-static flex items-center justify-center text-amber/70 ${boxClassName}`}>
        <span className="font-mono text-lg text-muted">{initials(name)}</span>
      </div>
    </div>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const showImage = Boolean(project.image) && !imgError;
  const extraHighlights = project.highlights.length - VISIBLE_HIGHLIGHTS;
  const extraStack = project.stack.length - VISIBLE_STACK;
  const openProject = () => navigate(`/projects/${project.id}`);
  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject();
    }
  };

  return (
    <article
      className="bbox group flex h-full cursor-pointer flex-col overflow-hidden rounded border border-border bg-elevated/50 text-amber transition-all duration-200 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_12px_30px_-12px_rgba(95,199,190,0.18)]"
      role="link"
      tabIndex={0}
      aria-label={`Open project: ${project.name}`}
      onClick={openProject}
      onKeyDown={handleCardKeyDown}
    >
      <div className="aspect-[16/9] w-full overflow-hidden border-b border-border bg-bg">
        {showImage ? (
          <img
            src={project.image}
            alt={`${project.name} preview`}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <ImagePlaceholder name={project.name} />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3 className="flex items-center gap-2 font-mono text-[15px] text-ink transition-colors group-hover:text-teal">
            {project.featured && (
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber" aria-hidden="true" />
            )}
            {project.name}
          </h3>
          <span
            className={`shrink-0 rounded border px-2 py-0.5 font-mono text-[11px] ${STATUS_STYLE[project.status]}`}
          >
            {project.status}
          </span>
        </div>

        <p className="mt-2.5 line-clamp-3 text-[13.5px] leading-relaxed text-muted">
          {project.description}
        </p>

        <ul className="mt-3 space-y-1">
          {project.highlights.slice(0, VISIBLE_HIGHLIGHTS).map((h, i) => (
            <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-muted/90">
              <span className="mt-1 shrink-0 text-teal">·</span>
              <span className="line-clamp-2">{h}</span>
            </li>
          ))}
        </ul>
        {extraHighlights > 0 && (
          <p className="mt-1 pl-4 font-mono text-[11px] text-muted/70">+{extraHighlights} more</p>
        )}

        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3 border-t border-border/70 pt-3">
            {project.metrics.slice(0, 2).map((m, i) => (
              <div key={i} className="leading-tight">
                <p className="font-mono text-sm text-teal">{m.value}</p>
                <p className="font-mono text-[10.5px] text-muted/70">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* mt-auto pins the tags + link to the card's bottom edge, so
            cards with shorter copy still line up with taller neighbors
            in the same row. */}
        <div className="mt-auto pt-4">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, VISIBLE_STACK).map((tech) => (
              <span
                key={tech}
                className="rounded bg-bg px-2 py-0.5 font-mono text-[11px] text-muted"
              >
                {tech}
              </span>
            ))}
            {extraStack > 0 && (
              <span className="rounded bg-bg px-2 py-0.5 font-mono text-[11px] text-muted/70">
                +{extraStack}
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <Link
              to={`/projects/${project.id}`}
              className="inline-flex items-center gap-1.5 font-mono text-[13px] text-ink transition-colors hover:text-amber"
            >
              Lihat detail
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="inline-flex items-center gap-1.5 font-mono text-[13px] text-teal transition-colors hover:text-ink"
              >
                View project
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
