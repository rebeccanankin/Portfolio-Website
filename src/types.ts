export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: "Software Engineering" | "Algorithm" | "Web App" | "Python CLI";
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: "completed" | "in-progress" | "concept";
  level: "Beginner" | "Intermediate" | "Advanced";
  demoType: "triangle-checker" | "palindrome-checker";
}

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  status: "completed" | "current" | "future";
}

export interface GuestbookEntry {
  id: string;
  name: string;
  role: string;
  message: string;
  createdAt: string;
}

export interface SkillGroup {
  category: string;
  icon: string;
  skills: { name: string; level: number; description: string }[];
}
