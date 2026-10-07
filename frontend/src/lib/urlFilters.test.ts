import { describe, expect, it } from "vitest";
import { ALL_TECH } from "./filterProjects";
import { readFilters, toSearchString } from "./urlFilters";

const tech = [ALL_TECH, "React", "TypeScript"];

describe("readFilters", () => {
  it("is empty for a plain address", () => {
    expect(readFilters("", tech)).toEqual({ query: "", tech: ALL_TECH });
  });

  it("reads the search text and the tech", () => {
    expect(readFilters("?q=day+planner&tech=React", tech)).toEqual({
      query: "day planner",
      tech: "React",
    });
  });

  it("falls back to All for a tech no project uses", () => {
    expect(readFilters("?tech=Cobol", tech).tech).toBe(ALL_TECH);
  });
});

describe("toSearchString", () => {
  it("is empty when nothing is filtered", () => {
    expect(toSearchString({ query: "  ", tech: ALL_TECH })).toBe("");
  });

  it("writes only the filters that are set", () => {
    expect(toSearchString({ query: "planner", tech: ALL_TECH })).toBe(
      "?q=planner",
    );
    expect(toSearchString({ query: "", tech: "React" })).toBe("?tech=React");
  });

  it("round-trips through readFilters", () => {
    const filters = { query: "c# & more", tech: "TypeScript" };
    expect(readFilters(toSearchString(filters), tech)).toEqual(filters);
  });
});
