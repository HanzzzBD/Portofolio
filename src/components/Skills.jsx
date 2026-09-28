import { useEffect, useMemo, useState } from "react"
import HoverCard from "./HoverCard"
import { getSkills, getSkillsSnapshot, hasPortfolioApi } from "../services/portfolioService"

const categoryMeta = {
  frontend: {
    title: "Frontend",
    description: "Accessible interfaces, interaction polish, animation, and fast Vite workflows.",
  },
  backend: {
    title: "Backend",
    description: "APIs, authentication flows, database-backed features, and admin panels.",
  },
  database: {
    title: "Database",
    description: "Relational and document data modeling for application workflows.",
  },
  tools: {
    title: "Tools",
    description: "Architecture, version control, containers, Android basics, and build tooling.",
  },
  aiml: {
    title: "AI/ML learning",
    description: "Python foundations, machine learning exploration, and Gemini API integration.",
  },
  game: {
    title: "Interactive systems",
    description: "Unity scripting and 3D basics used for interactive experiments.",
  },
}

const categoryOrder = ["frontend", "backend", "database", "tools", "aiml", "game"]

const normalizeSkillCategory = (skill) => {
  const name = skill.name.toLowerCase()

  if (["mysql", "mongodb", "postgresql", "redis"].includes(name)) return "database"
  if (["python"].includes(name)) return "aiml"
  return skill.category
}

const Skills = () => {
  const [items, setItems] = useState(() => getSkillsSnapshot())

  useEffect(() => {
    if (!hasPortfolioApi()) return undefined

    let active = true
    getSkills().then((data) => {
      if (active) {
        setItems(data)
      }
    })

    return () => {
      active = false
    }
  }, [])

  const groups = useMemo(() => {
    const unique = new Map()
    items.forEach((item) => {
      const key = item.name.trim().toLowerCase()
      if (!unique.has(key)) {
        unique.set(key, item)
      }
    })

    return Array.from(unique.values()).reduce((acc, skill) => {
      const category = normalizeSkillCategory(skill)
      if (!acc[category]) acc[category] = []
      acc[category].push(skill)
      return acc
    }, {})
  }, [items])

  return (
    <section id="skills" className="section reveal">
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 reveal-item lg:grid-cols-[0.72fr_1fr]">
          <div className="space-y-3">
            <p className="section-kicker">Skills</p>
            <h2 className="section-title">A stack organized around real project work.</h2>
          </div>
          <p className="max-w-2xl text-sm text-slate-400 lg:pt-4">
            Tools are grouped by how I use them: building interfaces, shipping backend features,
            modeling data, and learning AI/ML fundamentals.
          </p>
        </div>

        <div className="skills-grid reveal-item grid grid-flow-dense gap-4 md:grid-cols-2 xl:grid-cols-6">
          {categoryOrder.map((category) => {
            const skills = groups[category] || []
            if (skills.length === 0) return null

            const meta = categoryMeta[category] || {
              title: category,
              description: "Project skills and tooling.",
            }
            const featured = category === "frontend" || category === "backend"

            return (
              <HoverCard
                key={category}
                className={featured ? "xl:col-span-3" : "xl:col-span-2"}
              >
                <div className="flex h-full flex-col">
                  <div>
                    <p className="text-2xl font-semibold text-slate-50">{meta.title}</p>
                    <p className="mt-3 text-sm text-slate-400">{meta.description}</p>
                  </div>
                  <div className="mt-6 grid gap-3">
                    {skills.map((skill) => {
                      const Icon = skill.icon
                      return (
                        <div key={skill.name} className="skill-row">
                          <div className="flex items-center gap-3">
                            <span className="skill-icon">{Icon && <Icon size={18} />}</span>
                            <span className="font-medium text-slate-100">{skill.name}</span>
                          </div>
                          <span className="text-right text-xs text-slate-500">{skill.focus}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </HoverCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
