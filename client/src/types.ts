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
  /** Optional quantified results (accuracy, adoption, etc.) — shown as small stat chips. */
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
  /** Longer write-up shown on the project detail page. Falls back to `description` if omitted. */
  overview?: string;
  highlights: string[];
  stack: string[];
  featured: boolean;
  image?: string;
  /** Gallery for the project detail page slideshow. Falls back to a single-item array from `image` if omitted. */
  images?: string[];
  link?: string;
  /** Optional quantified results (accuracy, precision, adoption, etc.) — dummy values until real metrics are filled in. */
  metrics?: Metric[];
  /** Employer/org this project was built under — must match an `org` value in the experience list, so the card can link back to it. */
  org?: string;
}
