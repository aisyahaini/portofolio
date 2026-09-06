import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#research", label: "Research" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const location = useLocation();
  const isHome = location.pathname === "/";

  // On any page other than the homepage (e.g. a project detail page), the
  // section anchors don't exist on the current page — route home first,
  // then let the browser resolve the #hash once there.
  const linkTo = (hash: string) => (isHome ? hash : `/${hash}`);

  // Highlight the link for whichever section is currently in view, so the
  // nav also works as a lightweight "you are here" map of the page.
  useEffect(() => {
    if (!isHome) {
      setActive("");
      return;
    }

    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome, location.pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/85 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to={linkTo("#top")} className="font-mono text-sm font-medium tracking-tight text-ink">
          {name.toLowerCase().replace(/\s+/g, "_")}
          <span className="text-amber">'s portfolio</span>
        </Link>

        <ul className="hidden gap-7 font-mono text-[13px] sm:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                to={linkTo(link.href)}
                className={`relative py-1 transition-colors ${
                  active === link.href ? "text-amber" : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-[1px] left-0 h-px bg-amber transition-all duration-300 ${
                    active === link.href ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Link
            to={linkTo("#contact")}
            className="hidden rounded border border-amber/40 px-3 py-1.5 font-mono text-[13px] text-amber transition-colors hover:bg-amber/10 sm:inline-block"
          >
            Say hi
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-9 w-9 items-center justify-center rounded border border-border text-ink sm:hidden"
          >
            <span className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-full bg-current transition-all duration-300 ${
                  open ? "top-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] h-[1.5px] w-full bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-3 h-[1.5px] w-full bg-current transition-all duration-300 ${
                  open ? "top-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <div
        className={`grid overflow-hidden border-b border-border/80 bg-bg/95 backdrop-blur-sm transition-[grid-template-rows] duration-300 ease-out sm:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-1 px-6 py-3 font-mono text-sm">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  to={linkTo(link.href)}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 rounded px-2 py-2.5 transition-colors ${
                    active === link.href ? "text-amber" : "text-muted hover:text-ink"
                  }`}
                >
                  <span className="text-teal">→</span>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to={linkTo("#contact")}
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center justify-center rounded border border-amber/40 px-3 py-2.5 text-amber"
              >
                Say hi
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
