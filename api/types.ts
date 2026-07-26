export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  summary: string;
  focus: string;
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

export interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  period: string;
  points: string[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  period: string;
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  tags: string[];
  status: "Production" | "Prototype" | "Research";
  description: string;
  highlights: string[];
  stack: string[];
  featured: boolean;
  image?: string;
  link?: string;
}

export interface ContentData {
  profile: Profile;
  skills: SkillGroup[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: Project[];
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  receivedAt: string;
}
