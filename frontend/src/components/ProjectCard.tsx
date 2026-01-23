import type { Project } from "../data/projects";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  return (
    <article className="card">
      <div className="cardTop">
        <h3 className="cardTitle">{project.title}</h3>
        <p className="cardDesc">{project.description}</p>
      </div>

      <div className="chips">
        {project.tech.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      <div className="links">
        <a
          className="link"
          href={project.repo}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        {project.live ? (
          <a
            className="link"
            href={project.live}
            target="_blank"
            rel="noreferrer"
          >
            Live
          </a>
        ) : null}
      </div>
    </article>
  );
}
