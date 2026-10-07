import { ALL_TECH } from "./filterProjects";

export type Filters = {
  query: string;
  tech: string;
};

// Reads the filters from the address bar, e.g. "?q=planner&tech=React".
// A tech that no project uses falls back to "All".
export function readFilters(search: string, validTech: string[]): Filters {
  const params = new URLSearchParams(search);
  const tech = params.get("tech") ?? ALL_TECH;

  return {
    query: params.get("q") ?? "",
    tech: validTech.includes(tech) ? tech : ALL_TECH,
  };
}

// The query string for the given filters. Empty when nothing is filtered,
// so the plain address stays clean.
export function toSearchString({ query, tech }: Filters): string {
  const params = new URLSearchParams();
  if (query.trim().length > 0) params.set("q", query.trim());
  if (tech !== ALL_TECH) params.set("tech", tech);

  const text = params.toString();
  return text.length > 0 ? `?${text}` : "";
}
