import { useEffect, useState } from "react";
import type { EducationItem, ExperienceItem, Profile, Project, SkillGroup } from "./types";
import { api } from "./lib/api";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function LoadingScreen() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-24">
      <div className="skeleton h-4 w-24 rounded" />
      <div className="skeleton mt-4 h-12 w-64 rounded" />
      <div className="skeleton mt-4 h-6 w-full max-w-lg rounded" />
      <div className="mt-8 flex gap-3">
        <div className="skeleton h-10 w-32 rounded" />
        <div className="skeleton h-10 w-32 rounded" />
      </div>
      <div className="skeleton mt-12 h-24 w-full rounded" />
    </div>
  );
}

export default function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<SkillGroup[]>([]);
  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      api.getProfile(),
      api.getSkills(),
      api.getExperience(),
      api.getEducation(),
      api.getProjects(),
    ])
      .then(([p, s, e, edu, pr]) => {
        setProfile(p);
        setSkills(s);
        setExperience(e);
        setEducation(edu);
        setProjects(pr);
      })
      .catch(() => {
        setLoadError(
          "Couldn't reach the API. Make sure the backend server is running (see server/README or the project README)."
        );
      })
      .finally(() => setLoading(false));
  }, []);

  if (loadError) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
        <p className="font-mono text-sm text-rose">{loadError}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar name={profile?.name ?? "Aisyah"} />
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Hero profile={profile} />
          <About profile={profile} />
          <Skills groups={skills} />
          <Experience items={experience} />
          <Education items={education} />
          <Projects projects={projects} />
          <Contact profile={profile} />
          <Footer profile={profile} />
        </>
      )}
    </div>
  );
}
