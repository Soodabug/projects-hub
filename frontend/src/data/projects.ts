export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  repo: string;
  live?: string;
};

export const projects: Project[] = [
  {
    id: "hub",
    title: "Projects Hub (React + TS)",
    description:
      "A projects gallery with search and tech filters, built with React + TypeScript.",
    tech: ["React", "TypeScript", "TEST123"],

    repo: "https://github.com/Soodabug",
  },
  {
    id: "ui",
    title: "UI Components Playground",
    description:
      "Reusable UI components built with React, focusing on layout and basic accessibility.",
    tech: ["React", "UI"],
    repo: "https://github.com/Soodabug",
  },
  {
    id: "practice",
    title: "Frontend Practice Exercises",
    description:
      "Small frontend exercises to practice state, events, and component composition.",
    tech: ["JavaScript", "React"],
    repo: "https://github.com/Soodabug",
  },
  {
    id: "todo",
    title: "Todo App (React + TypeScript)",
    description:
      "A simple todo application to practice state management, events, and TypeScript typing.",
    tech: ["React", "TypeScript"],
    repo: "https://github.com/Soodabug",
  },
];
