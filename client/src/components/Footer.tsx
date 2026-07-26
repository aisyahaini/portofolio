import type { Profile } from "../types";

export default function Footer({ profile }: { profile: Profile | null }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {profile?.name ?? "Aisyah"}. Built with React, Express &amp; Tailwind.
        </p>
        <div className="flex gap-4">
          {profile?.social.github && (
            <a href={profile.social.github} className="hover:text-ink" target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
          {profile?.social.linkedin && (
            <a href={profile.social.linkedin} className="hover:text-ink" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
          {profile?.social.email && (
            <a href={`mailto:${profile.social.email}`} className="hover:text-ink">
              Email
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
