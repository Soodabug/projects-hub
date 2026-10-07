import { describe, expect, it } from "vitest";
import { projects } from "./projects";

// The list is edited by hand, so these checks catch the usual slips:
// a copied id, a placeholder link, a test value left behind.
describe("projects data", () => {
  it("has at least one project", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("has unique ids", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(projects)("$title is complete", (project) => {
    expect(project.title.trim()).not.toBe("");
    expect(project.description.trim()).not.toBe("");
    expect(project.tech.length).toBeGreaterThan(0);
    for (const tech of project.tech) {
      expect(tech).toBe(tech.trim());
      expect(tech).not.toMatch(/test|todo|placeholder/i);
    }
  });

  it.each(projects)("$title links to its own repository", (project) => {
    // Not just the profile page: github.com/<user>/<repo>
    expect(project.repo).toMatch(/^https:\/\/github\.com\/[\w-]+\/[\w.-]+$/);
    if (project.live !== undefined) {
      expect(project.live).toMatch(/^https:\/\//);
    }
  });
});
