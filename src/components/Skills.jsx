import { useEffect, useMemo, useState } from "react"
import HoverCard from "./HoverCard"
import { getSkills } from "../services/portfolioService"

const filters = [
  { key: "all", label: "All" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "game", label: "Game" },
]

const Skills = () => {
  const [items, setItems] = useState([])
  const [activeFilter, setActiveFilter] = useState("all")

  useEffect(() => {
    getSkills().then(setItems)
  }, [])

  const uniqueItems = useMemo(() => {
    const map = new Map()
    items.forEach((item) => {
      const key = item.name.trim().toLowerCase()
      if (!map.has(key)) {
        map.set(key, item)
      }
    })
    return Array.from(map.values())
  }, [items])

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return uniqueItems
    return uniqueItems.filter((item) => item.category === activeFilter)
  }, [uniqueItems, activeFilter])

  return (
    <section id="skills" className="section reveal">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 space-y-3 reveal-item">
          <p className="section-kicker">Skills</p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="section-title">Tech stack that powers the build.</h2>
          </div>
        </div>

        <div className="filter-tabs reveal-item mb-8">
          {filters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              className={`filter-tab ${activeFilter === filter.key ? "active" : ""}`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 reveal-item">
          {filteredItems.map((skill) => {
            const Icon = skill.icon
            return (
              <HoverCard key={skill.name}>
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-accent-300">
                    {Icon && <Icon size={22} />}
                  </div>
                  <span className="text-xs text-slate-500">{skill.focus}</span>
                </div>
                <p className="mt-4 text-lg font-semibold text-slate-50">{skill.name}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-slate-500">
                  {skill.category}
                </p>
              </HoverCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
