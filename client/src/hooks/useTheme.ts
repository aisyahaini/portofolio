import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "theme";

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  // index.html already set this attribute before first paint (see the
  // inline script in <head>) — read it back instead of hitting
  // localStorage again, so this hook and the pre-paint script never
  // disagree about the current theme.
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" ? "light" : "dark";
}

/** Site defaults to dark; the toggle lets a visitor opt into light and
    remembers that choice on their next visit via localStorage. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore write failures (e.g. Safari private mode) — theme still
      // works for the current session, it just won't persist.
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, toggleTheme };
}
