import type { Profile } from "../types";

const DEFAULT_FOCUS_AREAS = ["agentic ai", "mcp & automation", "transformer nlp", "explainable ai"];

function GithubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.47c.52.1.72-.23.72-.5v-1.95c-2.93.64-3.55-1.31-3.55-1.31-.48-1.22-1.17-1.54-1.17-1.54-.96-.66.07-.64.07-.64 1.06.07 1.62 1.09 1.62 1.09.94 1.62 2.47 1.15 3.08.88.1-.68.37-1.15.67-1.42-2.34-.27-4.8-1.17-4.8-5.22 0-1.15.41-2.09 1.08-2.83-.11-.27-.47-1.35.1-2.81 0 0 .88-.28 2.88 1.08a10 10 0 0 1 5.24 0c2-1.36 2.88-1.08 2.88-1.08.57 1.46.21 2.54.1 2.81.68.74 1.08 1.68 1.08 2.83 0 4.06-2.47 4.95-4.82 5.21.38.33.72.97.72 1.96v2.9c0 .28.2.61.73.5A10.5 10.5 0 0 0 12 1.5Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.94 8.5H3.56V20.5H6.94V8.5ZM5.25 3.5a1.97 1.97 0 1 0 0 3.94 1.97 1.97 0 0 0 0-3.94ZM20.44 20.5h-3.37v-6.28c0-1.5-.03-3.42-2.08-3.42-2.09 0-2.41 1.63-2.41 3.32v6.38H9.21V8.5h3.24v1.64h.05c.45-.86 1.56-1.76 3.2-1.76 3.43 0 4.06 2.25 4.06 5.19v6.93Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 6.5 12 13l8.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Hero({ profile }: { profile: Profile | null }) {
  const initial = (profile?.name ?? "Aisyah Nuraini").trim().charAt(0).toUpperCase();

  const socialLinks = [
    { href: profile?.social.github, label: "GitHub", icon: <GithubIcon /> },
    { href: profile?.social.linkedin, label: "LinkedIn", icon: <LinkedinIcon /> },
    {
      href: profile?.social.email ? `mailto:${profile.social.email}` : undefined,
      label: "Email",
      icon: <MailIcon />,
    },
  ].filter((link) => link.href);

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Faint dot-grid — echoes the detection/annotation motif without competing with content */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]"
        style={{
          backgroundImage: "radial-gradient(circle, rgb(var(--color-border)) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-24">
        <div className="flex flex-col items-start gap-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-teal">
              {profile?.location ?? "Portfolio"}
            </p>

            <h1 className="mt-3 font-mono text-4xl font-semibold leading-tight text-ink sm:text-6xl">
              {profile?.name ?? "Aisyah"}
            </h1>

            {socialLinks.length > 0 && (
              <ul className="mt-4 flex flex-wrap items-center gap-4">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.label === "Email" ? undefined : "_blank"}
                      rel={link.label === "Email" ? undefined : "noreferrer"}
                      aria-label={link.label}
                      title={link.label}
                      className="flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-teal"
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <p className="mt-3 max-w-2xl text-lg text-muted sm:text-xl">
              {profile?.title ?? "AI Engineer & Full-Stack Developer"}
              {profile?.tagline ? (
                <>
                  {" "}
                  — <span className="text-ink/80">{profile.tagline}</span>
                </>
              ) : null}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="group relative overflow-hidden rounded bg-amber px-5 py-2.5 font-mono text-sm font-medium text-bg transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="relative">View projects</span>
              </a>
              <a
                href="#contact"
                className="rounded border border-border px-5 py-2.5 font-mono text-sm text-ink transition-colors hover:border-teal/60 hover:text-teal"
              >
                Get in touch
              </a>
            </div>
          </div>

          {/* Signature avatar mark — a bounding-box target lock around an initial,
              the same visual language as the favicon and the project-card corners. */}
          <div className="hidden shrink-0 sm:block">
            <div className="bbox bbox-static relative flex h-32 w-32 items-center justify-center text-amber">
              <span className="absolute inset-0 rounded-full border border-border" />
              <span className="absolute inset-3 rounded-full border border-teal/30" />
              <span className="font-mono text-4xl text-ink">{initial}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-2.5">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Focus areas
          </span>
          {(profile?.focusAreas ?? DEFAULT_FOCUS_AREAS).map((line) => (
            <span
              key={line}
              className="rounded border border-border bg-elevated px-2.5 py-1 font-mono text-xs text-ink/90"
            >
              {line}
            </span>
          ))}
        </div>

        <a
          href="#about"
          aria-label="Scroll to About section"
          className="mt-14 hidden animate-bounce items-center justify-center text-muted transition-colors hover:text-teal sm:flex"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 4v15M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
