import type { EducationItem, ExperienceItem, Profile, Project, SkillGroup } from "../types";

// Empty string = same-origin relative fetch ("/api/..."). This works in
// both places without any extra config:
//  - local dev: Vite's dev server proxies /api/* to the local function
//    runner (see vite.config.ts)
//  - production on Vercel: the client and the /api serverless functions
//    are served from the same domain, so a relative path just works.
// VITE_API_URL is only needed if the API is ever hosted on a different
// origin than the client.
const API_BASE = import.meta.env.VITE_API_URL ?? "";

async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error(`Request to ${path} failed with ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  getProfile: () => getJSON<Profile>("/api/profile"),
  getSkills: () => getJSON<SkillGroup[]>("/api/skills"),
  getExperience: () => getJSON<ExperienceItem[]>("/api/experience"),
  getEducation: () => getJSON<EducationItem[]>("/api/education"),
  getProjects: () => getJSON<Project[]>("/api/projects"),
  sendContact: async (payload: { name: string; email: string; message: string }) => {
    const res = await fetch(`${API_BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error ?? "Failed to send message.");
    }
    return data;
  },
};
