import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import type {
  EducationItem,
  ExperienceItem,
  Profile,
  Project,
  ResearchItem,
  SkillGroup,
} from "./types";
import { api } from "./lib/api";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Research from "./components/Research";
import Projects from "./components/Projects";
import ProjectDetail from "./components/ProjectDetail";
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

/** Scrolls to top on route change, and to the matching #hash (e.g. from
    ProjectDetail's "Discuss this project" link back to /#contact) once
    the home page content has actually rendered. */
function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname, location.hash]);

  return null;
}

function HomePage({
  profile,
  skills,
  experience,
  education,
  research,
  projects,
}: {
  profile: Profile | null;
  skills: SkillGroup[];
  experience: ExperienceItem[];
  education: EducationItem[];
  research: ResearchItem[];
  projects: Project[];
}) {
  return (
    <>
      <Hero profile={profile} />
      <About profile={profile} />
      <Skills groups={skills} />
      <Experience items={experience} />
      <Education items={education} />
      <Research items={research} />
      <Projects projects={projects} />
      <Contact profile={profile} />
      <Footer profile={profile} />
    </>
  );
}

export default function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<SkillGroup[]>([]);
  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [research, setResearch] = useState<ResearchItem[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      api.getProfile(),
      api.getSkills(),
      api.getExperience(),
      api.getEducation(),
      api.getResearch(),
      api.getProjects(),
    ])
      .then(([p, s, e, edu, res, pr]) => {
        setProfile(p);
        setSkills(s);
        setExperience(e);
        setEducation(edu);
        setResearch(res);
        setProjects(pr);
      })
      .catch(() => {
        setLoadError(
          "Couldn't reach the API. If you're on a custom domain, make sure it's added under this project in Vercel (Settings → Domains) and DNS points to Vercel, not a redirect/forwarding service."
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
      <ScrollManager />
      <Navbar name={profile?.name ?? "Aisyah Nuraini"} />
      {loading ? (
        <LoadingScreen />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                profile={profile}
                skills={skills}
                experience={experience}
                education={education}
                research={research}
                projects={projects}
              />
            }
          />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      )}
    </div>
  );
}
