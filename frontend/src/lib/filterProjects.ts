import type { Project } from "../data/projects";

export const ALL_TECH = "All";

// Options for the tech dropdown: "All" first, then every tech used by a
// project, once, in alphabetical order.
export function techOptions(projects: Project[]): string[] {
  const unique = new Set(
    projects
      .flatMap((project) => project.tech)
      .map((tech) => tech.trim())
      .filter((tech) => tech.length > 0),
  );

  return [ALL_TECH, ...Array.from(unique).sort()];
}

// Projects that match both the search text and the selected tech.
// The search looks at title, description and tech names, ignoring case.
export function filterProjects(
  projects: Project[],
  query: string,
  tech: string,
): Project[] {
  const search = query.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesTech = tech === ALL_TECH || project.tech.includes(tech);
    if (!matchesTech) return false;
    if (search.length === 0) return true;

    const text = [project.title, project.description, ...project.tech]
      .join(" ")
      .toLowerCase();
    return text.includes(search);
  });
}
