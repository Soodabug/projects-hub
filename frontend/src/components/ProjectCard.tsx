import { motion } from "motion/react";
import type { Project } from "../data/projects";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  return (
    // layout: when the filters change, the remaining tiles slide to their new place.
    <motion.article
      className="card"
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
    >
      <div className="cardBody">
        <h2 className="cardTitle">{project.title}</h2>
        <p className="cardDesc">{project.description}</p>
      </div>

      <ul className="cardTech" aria-label="Built with">
        {project.tech.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <div className="cardLinks">
        <a
          className="cardLink"
          href={project.repo}
          target="_blank"
          rel="noreferrer"
        >
          Code
          <span className="srOnly"> of {project.title} on GitHub</span>
        </a>
        {project.live ? (
          <a
            className="cardLink live"
            href={project.live}
            target="_blank"
            rel="noreferrer"
          >
            <span className="liveDot" aria-hidden="true" />
            Live
            <span className="srOnly"> version of {project.title}</span>
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}
