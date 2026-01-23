import { useMemo, useState } from "react";
import ProjectCard from "./components/ProjectCard";
import { projects } from "./data/projects";

function uniqueTech(all: typeof projects) {
  const set = new Set<string>();
  all.forEach((p) => p.tech.forEach((t) => set.add(t)));
  return ["All", ...Array.from(set).sort()];
}

export default function App() {
  const [query, setQuery] = useState("");
  const [tech, setTech] = useState("All");

  const techOptions = useMemo(() => uniqueTech(projects), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesTech = tech === "All" ? true : p.tech.includes(tech);
      const matchesQuery =
        q.length === 0
          ? true
          : (p.title + " " + p.description).toLowerCase().includes(q);
      return matchesTech && matchesQuery;
    });
  }, [query, tech]);

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <div>
            <p className="badge">React • TypeScript • Vite</p>
            <h1 className="title">Projects Hub</h1>
            <p className="subtitle">
              A small, polished gallery showcasing frontend practice projects
              with search and tech filters.
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
              href="https://projects-hub-woad.vercel.app"
              target="_blank"
              rel="noreferrer"
            >
              Live Demo
            </a>
          </div>
        </header>

        <section className="panel">
          <div className="controls">
            <label className="field">
              <span className="label">Search</span>
              <input
                className="input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title or description…"
              />
            </label>

            <label className="field">
              <span className="label">Tech</span>
              <select
                className="select"
                value={tech}
                onChange={(e) => setTech(e.target.value)}
              >
                {techOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="meta">
            <span>{filtered.length} project(s)</span>
            {tech !== "All" ? <span className="dot">•</span> : null}
            {tech !== "All" ? <span>Filtered by: {tech}</span> : null}
          </div>
        </section>

        <section className="grid">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </section>

        {filtered.length === 0 ? (
          <div className="empty">
            <h3>No results</h3>
            <p>Try a different keyword or change the tech filter.</p>
          </div>
        ) : null}

        <footer className="footer">
          <span>Built by Soodabeh • {new Date().getFullYear()}</span>
          <span className="dot">•</span>
          <span>Deployed on Vercel</span>
        </footer>
      </div>
    </div>
  );
}
