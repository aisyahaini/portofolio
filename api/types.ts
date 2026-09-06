export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  summary: string;
  focus: string;
  focusAreas?: string[];
  social: {
    github: string;
    linkedin: string;
    email: string;
  };
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export interface Metric {
  label: string;
  value: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  period: string;
  points: string[];
  metrics?: Metric[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  period: string;
  description?: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  authors: string[];
  role: string;
  summary: string;
  status: "Published" | "Under Review" | "Under Revision";
  period?: string;
  link?: string;
}

export interface Project {
  id: string;
  name: string;
  tags: string[];
  status: "Production" | "Prototype" | "Research";
  description: string;
  overview?: string;
  highlights: string[];
  stack: string[];
  featured: boolean;
  image?: string;
  images?: string[];
  link?: string;
  metrics?: Metric[];
  org?: string;
}

export interface ContentData {
  profile: Profile;
  skills: SkillGroup[];
  experience: ExperienceItem[];
  education: EducationItem[];
  research: ResearchItem[];
  projects: Project[];
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  receivedAt: string;
}
