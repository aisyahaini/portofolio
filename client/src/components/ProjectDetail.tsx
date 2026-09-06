import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Project } from "../types";
import { api } from "../lib/api";
import ProjectGallery from "./ProjectGallery";

const STATUS_STYLE: Record<Project["status"], string> = {
  Production: "text-amber border-amber/40",
  Prototype: "text-teal border-teal/40",
  Research: "text-rose border-rose/40",
};

function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="skeleton h-4 w-32 rounded" />
      <div className="skeleton mt-6 aspect-[21/9] w-full rounded" />
      <div className="skeleton mt-6 h-8 w-2/3 rounded" />
      <div className="skeleton mt-4 h-4 w-full max-w-xl rounded" />
    </div>
  );
}

/** Sticky "browse other projects" rail — reuses the same status color
    language as the cards so jumping between detail pages feels continuous
    with the grid view instead of like a separate section of the site. */
function ProjectRail({ projects, activeId }: { projects: Project[]; activeId: string }) {
  return (
    <nav aria-label="Other projects" className="lg:sticky lg:top-24">
      <p className="font-mono text-xs uppercase tracking-widest text-teal">All projects</p>
      <ul className="mt-4 space-y-1">
        {projects.map((p) => {
          const isActive = p.id === activeId;
          return (
            <li key={p.id}>
              <Link
                to={`/projects/${p.id}`}
                className={`group flex items-center gap-2.5 rounded border px-3 py-2.5 transition-colors ${
                  isActive
                    ? "border-teal/40 bg-elevated/60 text-ink"
                    : "border-transparent text-muted hover:border-border hover:bg-elevated/40 hover:text-ink"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                    isActive ? "bg-teal" : "bg-border group-hover:bg-teal/60"
                  }`}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1 truncate font-mono text-[13px]">{p.name}</span>
                <span
                  className={`shrink-0 rounded border px-1.5 py-0.5 font-mono text-[10px] ${STATUS_STYLE[p.status]}`}
                >
                  {p.status}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function ProjectDetail({ projects = [] }: { projects?: Project[] }) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setNotFound(false);
    const projectFromLoadedData = projects.find((item) => item.id === id);
    const projectsRequest = projects.length > 0 ? Promise.resolve(projects) : api.getProjects();
    const projectRequest = projectFromLoadedData ? Promise.resolve(projectFromLoadedData) : api.getProject(id);

    Promise.all([projectRequest, projectsRequest])
      .then(([p, all]) => {
        setProject(p);
        setAllProjects(all);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));

    // Land on the hero, not wherever the user scrolled to on the grid page.
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [id, projects]);

  if (loading) return <DetailSkeleton />;

  if (notFound || !project) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center">
        <p className="font-mono text-sm text-rose">Project not found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 rounded border border-border px-4 py-2 font-mono text-sm text-ink transition-colors hover:border-teal/40 hover:text-teal"
        >
          ← Back to portfolio
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Landing / hero block: image slideshow */}
      <div className="relative aspect-[21/9] w-full overflow-hidden border-b border-border bg-elevated/50 sm:aspect-[3/1]">
        <ProjectGallery
          images={project.images && project.images.length > 0 ? project.images : project.image ? [project.image] : []}
          name={project.name}
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/60 to-transparent">
          <div className="mx-auto max-w-6xl px-6 py-4">
            <Link
              to="/"
              className="pointer-events-auto inline-flex items-center gap-1.5 font-mono text-[13px] text-white/80 transition-colors hover:text-white"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to portfolio
            </Link>
          </div>
        </div>
      </div>

      {/* Title block, sits right under the hero rather than overlaid on it
          so it never competes with the slideshow's own dots/arrows. */}
      <div className="border-b border-border bg-elevated/30">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-mono text-2xl text-ink sm:text-3xl">{project.name}</h1>
            <span
              className={`rounded border px-2 py-0.5 font-mono text-[11px] ${STATUS_STYLE[project.status]}`}
            >
              {project.status}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded bg-bg px-2 py-0.5 font-mono text-[11px] text-muted">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 pt-10 lg:grid-cols-[220px_1fr]">
          <ProjectRail projects={allProjects} activeId={project.id} />

          <div className="min-w-0">
            {/* Overview */}
            <section>
              <p className="font-mono text-xs uppercase tracking-widest text-teal">Overview</p>
              <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted">
                {project.overview || project.description}
              </p>
            </section>

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <section className="mt-10">
                <p className="font-mono text-xs uppercase tracking-widest text-teal">Results</p>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {project.metrics.map((m, i) => (
                    <div key={i} className="bbox rounded border border-border bg-elevated/50 p-4 text-amber">
                      <p className="font-mono text-xl text-ink">{m.value}</p>
                      <p className="mt-1 font-mono text-[11.5px] leading-snug text-muted">{m.label}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Highlights */}
            {project.highlights.length > 0 && (
              <section className="mt-10">
                <p className="font-mono text-xs uppercase tracking-widest text-teal">
                  Key contributions
                </p>
                <ul className="mt-4 space-y-2.5">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                      <span className="mt-1 shrink-0 text-teal">·</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Tech stack */}
            <section className="mt-10">
              <p className="font-mono text-xs uppercase tracking-widest text-teal">Tech stack</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-border bg-elevated/50 px-3 py-1 font-mono text-[12.5px] text-ink"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Links */}
            <div className="mt-10 flex flex-wrap gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded border border-amber/40 px-4 py-2 font-mono text-[13px] text-amber transition-colors hover:bg-amber/10"
                >
                  View live / repo
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
              <Link
                to="/#contact"
                className="inline-flex items-center gap-1.5 rounded border border-border px-4 py-2 font-mono text-[13px] text-ink transition-colors hover:border-teal/40 hover:text-teal"
              >
                Discuss this project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
