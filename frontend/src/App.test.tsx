import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { projects } from "./data/projects";

const cards = () =>
  within(screen.getByRole("region", { name: "Projects" })).queryAllByRole(
    "article",
  );

beforeEach(() => {
  window.history.replaceState(null, "", "/");
});

describe("App", () => {
  it("shows every project at the start", () => {
    render(<App />);

    expect(cards()).toHaveLength(projects.length);
    expect(screen.getByRole("status")).toHaveTextContent(
      `${projects.length} project(s)`,
    );
  });

  it("filters while typing in the search box", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("Search"), "day planner");

    expect(cards()).toHaveLength(1);
    expect(
      screen.getByRole("heading", { name: "Day Planner" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("1 project(s)");
  });

  it("filters by the selected tech", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.selectOptions(screen.getByLabelText("Tech"), "Cypress");

    const expected = projects.filter((p) => p.tech.includes("Cypress"));
    expect(cards()).toHaveLength(expected.length);
    expect(screen.getByRole("status")).toHaveTextContent(
      "Filtered by: Cypress",
    );
  });

  it("shows a message when nothing matches and can clear the filters", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("Search"), "no such project");

    expect(cards()).toHaveLength(0);
    expect(
      screen.getByRole("heading", { name: "No results" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear filters" }));

    expect(cards()).toHaveLength(projects.length);
    expect(screen.getByLabelText("Search")).toHaveValue("");
  });

  it("starts with the filters from the address bar", () => {
    window.history.replaceState(null, "", "/?q=planner&tech=React");
    render(<App />);

    expect(screen.getByLabelText("Search")).toHaveValue("planner");
    expect(screen.getByLabelText("Tech")).toHaveValue("React");
    expect(cards()).toHaveLength(1);
  });

  it("writes the filters to the address bar", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("Search"), "hub");
    await user.selectOptions(screen.getByLabelText("Tech"), "TypeScript");

    expect(window.location.search).toBe("?q=hub&tech=TypeScript");
  });

  it("gives every project a link to its code", () => {
    render(<App />);

    for (const card of cards()) {
      expect(within(card).getByRole("link", { name: "GitHub" })).toHaveAttribute(
        "href",
        expect.stringMatching(/^https:\/\/github\.com\//),
      );
    }
  });
});
