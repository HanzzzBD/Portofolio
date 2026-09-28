import { useEffect, useState } from "react"
import { FiExternalLink, FiGithub } from "react-icons/fi"
import HoverCard from "./HoverCard"
import { getProjects, getProjectsSnapshot, hasPortfolioApi } from "../services/portfolioService"

const isRealLink = (url) => {
  if (!url || typeof url !== "string") return false
  if (url.includes("yourname") || url.includes("your-username")) return false
  return /^https?:\/\//i.test(url)
}

const Projects = () => {
  const [items, setItems] = useState(() => getProjectsSnapshot())

  useEffect(() => {
    if (!hasPortfolioApi()) return undefined

    let active = true
    getProjects().then((data) => {
      if (active) {
        setItems(data)
      }
    })

    return () => {
      active = false
    }
  }, [])

  const visibleItems = items.filter((project) => project?.title && project?.description)

  return (
    <section id="projects" className="section reveal">
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 reveal-item lg:grid-cols-[0.8fr_1fr]">
          <div className="space-y-3">
            <p className="section-kicker">Works</p>
            <h2 className="section-title">Selected projects with real code paths.</h2>
          </div>
          <p className="max-w-2xl text-sm text-slate-400 lg:pt-4">
            Each project keeps the original portfolio data editable. Cards only show live or GitHub
            links when a usable URL exists.
          </p>
        </div>

        {visibleItems.length > 0 ? (
          <div className="project-grid reveal-item grid gap-5 lg:grid-cols-12">
            {visibleItems.map((project, index) => {
              const hasGithub = isRealLink(project.github)
              const hasDemo = isRealLink(project.demo)
              const role = project.role || "Developer"
              const isLastSingle =
                visibleItems.length % 2 === 1 && index === visibleItems.length - 1
              const isWide = index % 4 === 0 || index % 4 === 3

              return (
                <HoverCard
                  key={project.title}
                  className={`project-card ${
                    isLastSingle ? "lg:col-span-12" : isWide ? "lg:col-span-7" : "lg:col-span-5"
                  }`}
                >
                  <div className="project-card-sheen" aria-hidden="true" />
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="card-title text-2xl">{project.title}</p>
                        <p className="mt-2 text-sm text-slate-400">Role: {role}</p>
                      </div>
                      <span className="badge">{project.tech?.[0] || "Project"}</span>
                    </div>

                    <p className="mt-5 text-sm text-slate-300">{project.description}</p>

                    {Array.isArray(project.tech) && project.tech.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span key={tech} className="badge">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto flex flex-wrap items-center gap-4 pt-8 text-sm">
                      {hasGithub && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="project-link"
                        >
                          <FiGithub />
                          GitHub
                        </a>
                      )}
                      {hasDemo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="project-link"
                        >
                          <FiExternalLink />
                          Live Demo
                        </a>
                      )}
                      {!hasGithub && !hasDemo && (
                        <span className="text-sm text-slate-500">No public link added yet</span>
                      )}
                    </div>
                  </div>
                </HoverCard>
              )
            })}
          </div>
        ) : (
          <div className="glass reveal-item rounded-3xl p-8 text-sm text-slate-400">
            Project data is ready, but no public projects are available yet.
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
