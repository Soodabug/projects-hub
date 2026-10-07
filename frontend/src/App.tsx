import { useEffect, useMemo, useState } from "react";
import ProjectCard from "./components/ProjectCard";
import { projects } from "./data/projects";
import { ALL_TECH, filterProjects, techOptions } from "./lib/filterProjects";
import { readFilters, toSearchString } from "./lib/urlFilters";

const TECH_OPTIONS = techOptions(projects);

export default function App() {
  // The filters start from the address bar, so a filtered view can be shared as a link.
  const [initial] = useState(() =>
    readFilters(window.location.search, TECH_OPTIONS),
  );
  const [query, setQuery] = useState(initial.query);
  const [tech, setTech] = useState(initial.tech);

  const filtered = useMemo(
    () => filterProjects(projects, query, tech),
    [query, tech],
  );

  // Keep the address bar in step with the filters.
  useEffect(() => {
    const search = toSearchString({ query, tech });
    window.history.replaceState(
      null,
      "",
      window.location.pathname + search + window.location.hash,
    );
  }, [query, tech]);

  function clearFilters() {
    setQuery("");
    setTech(ALL_TECH);
  }

  const isFiltered = query.trim().length > 0 || tech !== ALL_TECH;

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <div>
            <p className="badge">React • TypeScript • Vite</p>
            <h1 className="title">Projects Hub</h1>
            <p className="subtitle">
              My projects in one place. Search by name or filter by the tech
              they use.
            </p>
          </div>

          <div className="actions">
            <a
              className="btn ghost"
              href="https://github.com/Soodabug"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="btn"
              href="https://soodabug.github.io/portfolio-website/"
              target="_blank"
              rel="noreferrer"
            >
              Portfolio
            </a>
          </div>
        </header>

        <section className="panel" aria-label="Filters">
          <div className="controls">
            <label className="field">
              <span className="label">Search</span>
              <input
                className="input"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, description or tech…"
              />
            </label>

            <label className="field">
              <span className="label">Tech</span>
              <select
                className="select"
                value={tech}
                onChange={(e) => setTech(e.target.value)}
              >
                {TECH_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* role="status": screen readers announce the new count after filtering */}
          <div className="meta" role="status">
            <span>{filtered.length} project(s)</span>
            {tech !== ALL_TECH ? <span className="dot">•</span> : null}
            {tech !== ALL_TECH ? <span>Filtered by: {tech}</span> : null}
          </div>
        </section>

        <section className="grid" aria-label="Projects">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </section>

        {filtered.length === 0 ? (
          <div className="empty">
            <h3>No results</h3>
            <p>Try a different keyword or change the tech filter.</p>
            {isFiltered ? (
              <button type="button" className="btn" onClick={clearFilters}>
                Clear filters
              </button>
            ) : null}
          </div>
        ) : null}

        <footer className="footer">
          <span>Built by Soodabeh • {new Date().getFullYear()}</span>
        </footer>
      </div>
    </div>
  );
}
