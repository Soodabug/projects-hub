import { useEffect, useMemo, useState } from "react";
import { MotionConfig, motion } from "motion/react";
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
  const countText =
    filtered.length === 1 ? "1 project" : `${filtered.length} projects`;

  return (
    // reducedMotion="user": no movement for people who turned animations off.
    <MotionConfig reducedMotion="user">
      <div className="field">
        <header className="wrap topbar">
          <p className="brand">
            <span className="brandMark" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </span>
            Projects Hub
          </p>
          <nav className="toplinks" aria-label="Elsewhere">
            <a
              href="https://github.com/Soodabug"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://soodabug.github.io/portfolio-website/"
              target="_blank"
              rel="noreferrer"
            >
              Portfolio
            </a>
          </nav>
        </header>

        <div className="wrap">
          <div className="hero">
            <motion.h1
              className="headline"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
            >
              Things I built.
            </motion.h1>
            <motion.p
              className="lede"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 22,
                delay: 0.08,
              }}
            >
              Every project has its code and, where there is one, a live
              version. Search by name or pick a technology.
            </motion.p>
          </div>

          <section className="filters" aria-label="Filters">
            <label className="searchField">
              <span className="fieldLabel">Search</span>
              <input
                className="search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Title, description or tech"
              />
            </label>

            <fieldset className="techGroup">
              <legend className="fieldLabel">Tech</legend>
              <div className="chips">
                {TECH_OPTIONS.map((option) => (
                  <label key={option} className="chip">
                    <input
                      type="radio"
                      name="tech"
                      value={option}
                      checked={tech === option}
                      onChange={() => setTech(option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </section>
        </div>

        <div className="statusbar">
          <div className="wrap">
            {/* role="status": screen readers announce the new count after filtering */}
            <p role="status">
              {countText}
              {tech !== ALL_TECH ? `, filtered by ${tech}` : ""}
            </p>
            {isFiltered ? (
              <button type="button" className="clearLink" onClick={clearFilters}>
                Show all
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <main className="wrap">
        {filtered.length > 0 ? (
          <section className="grid" aria-label="Projects">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </section>
        ) : (
          <div className="empty">
            <h2>Nothing here.</h2>
            <p>No project matches that. Try another word or technology.</p>
            <button type="button" className="button" onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="wrap">
          <p>Built by Soodabeh Malekzadeh, {new Date().getFullYear()}</p>
          <p>React, TypeScript, Vite</p>
        </div>
      </footer>
    </MotionConfig>
  );
}
