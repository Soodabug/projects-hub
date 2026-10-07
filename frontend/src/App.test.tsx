import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { projects } from "./data/projects";

// The project tiles on the page (none when the empty message is shown).
const cards = () => screen.queryAllByRole("article");

const search = () => screen.getByLabelText("Search");
const techOption = (name: string) => screen.getByRole("radio", { name });

beforeEach(() => {
  window.history.replaceState(null, "", "/");
});

describe("App", () => {
  it("shows every project at the start", () => {
    render(<App />);

    expect(cards()).toHaveLength(projects.length);
    expect(screen.getByRole("status")).toHaveTextContent(
      `${projects.length} projects`,
    );
    expect(techOption("All")).toBeChecked();
  });

  it("filters while typing in the search box", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(search(), "day planner");

    expect(cards()).toHaveLength(1);
    expect(
      screen.getByRole("heading", { name: "Day Planner" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("1 project");
  });

  it("filters by the selected tech", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(techOption("Cypress"));

    const expected = projects.filter((p) => p.tech.includes("Cypress"));
    expect(cards()).toHaveLength(expected.length);
    expect(techOption("Cypress")).toBeChecked();
    expect(screen.getByRole("status")).toHaveTextContent(
      "filtered by Cypress",
    );
  });

  it("offers one tech option per tech in the data, plus All", () => {
    render(<App />);

    const used = new Set(projects.flatMap((p) => p.tech));
    expect(screen.getAllByRole("radio")).toHaveLength(used.size + 1);
  });

  it("shows a message when nothing matches and can clear the filters", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(search(), "no such project");

    expect(cards()).toHaveLength(0);
    expect(
      screen.getByRole("heading", { name: "Nothing here." }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear filters" }));

    expect(cards()).toHaveLength(projects.length);
    expect(search()).toHaveValue("");
  });

  it("has a Show all shortcut only while something is filtered", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.queryByRole("button", { name: "Show all" })).toBeNull();

    await user.click(techOption("React"));
    await user.click(screen.getByRole("button", { name: "Show all" }));

    expect(techOption("All")).toBeChecked();
    expect(cards()).toHaveLength(projects.length);
  });

  it("starts with the filters from the address bar", () => {
    window.history.replaceState(null, "", "/?q=planner&tech=React");
    render(<App />);

    expect(search()).toHaveValue("planner");
    expect(techOption("React")).toBeChecked();
    expect(cards()).toHaveLength(1);
  });

  it("writes the filters to the address bar", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(search(), "hub");
    await user.click(techOption("TypeScript"));

    expect(window.location.search).toBe("?q=hub&tech=TypeScript");
  });

  it("gives every project a link to its code", () => {
    render(<App />);

    for (const card of cards()) {
      expect(within(card).getByRole("link", { name: /^Code/ })).toHaveAttribute(
        "href",
        expect.stringMatching(/^https:\/\/github\.com\//),
      );
    }
  });
});
