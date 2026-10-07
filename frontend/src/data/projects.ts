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
    id: "day-planner",
    title: "Day Planner",
    description:
      "Full stack daily planner with accounts, tasks, password reset and push reminders that arrive when the tab is closed.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    repo: "https://github.com/Soodabug/day-planner",
    live: "https://day-planner-web.onrender.com",
  },
  {
    id: "flashcards",
    title: "Study Night Flashcards",
    description:
      "Flashcards app with Cypress and Mocha tests, and a GitHub Actions pipeline that tests and deploys it.",
    tech: ["JavaScript", "Cypress", "GitHub Actions"],
    repo: "https://github.com/Soodabug/study-night-flashcards",
    live: "https://soodabug.github.io/study-night-flashcards/",
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    description:
      "My personal site. Plain HTML, CSS and JavaScript, projects are loaded from a JSON file.",
    tech: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/Soodabug/portfolio-website",
    live: "https://soodabug.github.io/portfolio-website/",
  },
  {
    id: "hub",
    title: "Projects Hub",
    description:
      "This page: a projects gallery with search and tech filters, built with React and TypeScript.",
    tech: ["React", "TypeScript"],
    repo: "https://github.com/Soodabug/projects-hub",
    live: "https://soodabug.github.io/projects-hub/",
  },
];
