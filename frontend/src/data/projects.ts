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
      "Flashcards app for study sets, covered by Cypress end-to-end tests and a lint and build setup.",
    tech: ["JavaScript", "Cypress"],
    repo: "https://github.com/Soodabug/nd0011-c4-starter",
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
    live: "https://projects-hub-woad.vercel.app",
  },
];
