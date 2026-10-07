import { describe, expect, it } from "vitest";
import type { Project } from "../data/projects";
import { ALL_TECH, filterProjects, techOptions } from "./filterProjects";

const sample: Project[] = [
  {
    id: "planner",
    title: "Day Planner",
    description: "Tasks and reminders.",
    tech: ["React", "TypeScript", "PostgreSQL"],
    repo: "https://github.com/example/planner",
  },
  {
    id: "cards",
    title: "Flashcards",
    description: "Study sets with tests.",
    tech: ["JavaScript", "Cypress"],
    repo: "https://github.com/example/cards",
  },
  {
    id: "site",
    title: "Portfolio",
    description: "Personal site.",
    tech: ["JavaScript", " React "],
    repo: "https://github.com/example/site",
  },
];

const ids = (projects: Project[]) => projects.map((p) => p.id);

describe("techOptions", () => {
  it("starts with All, then each tech once, sorted", () => {
    expect(techOptions(sample)).toEqual([
      ALL_TECH,
      "Cypress",
      "JavaScript",
      "PostgreSQL",
      "React",
      "TypeScript",
    ]);
  });

  it("is just All when there are no projects", () => {
    expect(techOptions([])).toEqual([ALL_TECH]);
  });
});

describe("filterProjects", () => {
  it("returns everything without filters", () => {
    expect(ids(filterProjects(sample, "", ALL_TECH))).toEqual([
      "planner",
      "cards",
      "site",
    ]);
  });

  it("matches the title, ignoring case", () => {
    expect(ids(filterProjects(sample, "FLASH", ALL_TECH))).toEqual(["cards"]);
  });

  it("matches the description", () => {
    expect(ids(filterProjects(sample, "reminders", ALL_TECH))).toEqual([
      "planner",
    ]);
  });

  it("matches a tech name", () => {
    expect(ids(filterProjects(sample, "cypress", ALL_TECH))).toEqual(["cards"]);
  });

  it("ignores spaces around the search text", () => {
    expect(ids(filterProjects(sample, "  portfolio  ", ALL_TECH))).toEqual([
      "site",
    ]);
  });

  it("filters by tech", () => {
    expect(ids(filterProjects(sample, "", "JavaScript"))).toEqual([
      "cards",
      "site",
    ]);
  });

  it("needs both the search text and the tech to match", () => {
    expect(ids(filterProjects(sample, "study", "JavaScript"))).toEqual([
      "cards",
    ]);
    expect(filterProjects(sample, "study", "React")).toEqual([]);
  });

  it("returns nothing when nothing matches", () => {
    expect(filterProjects(sample, "zzz", ALL_TECH)).toEqual([]);
  });
});
