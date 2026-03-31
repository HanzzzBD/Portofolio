import { useEffect, useState } from "react"
import { FiExternalLink, FiGithub } from "react-icons/fi"
import HoverCard from "./HoverCard"
import { getProjects } from "../services/portfolioService"

const Projects = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    getProjects().then(setItems)
  }, [])

  return (
    <section id="projects" className="section reveal">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 space-y-3 reveal-item">
          <p className="section-kicker">Projects</p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="section-title">Selected MERN experiences.</h2>
            <p className="max-w-lg text-sm text-slate-400">
              A snapshot of production-ready products built with modern architecture and immersive
              interfaces.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 reveal-item">
          {items.map((project) => (
            <HoverCard key={project.title}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="card-title">{project.title}</p>
                  <p className="mt-3 text-sm text-slate-300">{project.description}</p>
                </div>
                <span className="badge">Case Study</span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="badge">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-slate-200 hover:text-accent-300"
                >
                  <FiGithub />
                  GitHub
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-slate-200 hover:text-accent-300"
                >
                  <FiExternalLink />
                  Live Demo
                </a>
              </div>
            </HoverCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
