export type Profile = {
  name: string;
  role: string;
  tagline: string;
  gender: string;
  birth: string;
  city: string;
  education: string;
  email: string;
  phone: string;
  photo: string;
  resumeFile: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type ExperienceItem = {
  period: string;
  org: string;
  role: string;
  stack?: string;
  bullets: string[];
};

export type ProjectSummary = {
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  cover: string;
};

export type ProjectDetail = ProjectSummary & {
  overview: string;
  background: string[];
  challenges: { title: string; detail: string }[];
  metrics: { label: string; value: string }[];
  architecture?: { label: string; nodes: string[]; note?: string }[];
  gallery?: { src: string; caption: string }[];
};
