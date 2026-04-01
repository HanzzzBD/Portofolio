import { useEffect, useMemo, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cinematicEase } from "../utils/gsapEase"
import { getAchievements } from "../services/portfolioService"
import proofImage from "../assets/achievement-proof.svg"

gsap.registerPlugin(ScrollTrigger)

const filters = [
  { key: "All", label: "All" },
  { key: "Competitive Programming", label: "Competitive Programming" },
  { key: "Web Development", label: "Web Development" },
  { key: "Business / Logic", label: "Business / Logic" },
]

const badgeStyles = {
  "3rd Place": "badge-bronze",
  Finalist: "badge-finalist",
  Winner: "badge-gold",
  "1st Place": "badge-gold",
}

const normalizeAchievementImage = (image) => {
  if (!image) return null
  if (image.startsWith("/src/assets/img")) {
    return image.replace("/src/assets/img", "/assets/img")
  }
  return image
}

const resolveImage = (image) => {
  const normalized = normalizeAchievementImage(image)
  if (!normalized || normalized === "/assets/img") return proofImage
  return encodeURI(normalized)
}

const resolveImages = (achievement) => {
  if (Array.isArray(achievement.images) && achievement.images.length > 0) {
    return achievement.images.map(resolveImage)
  }
  if (achievement.image) return [resolveImage(achievement.image)]
  return [proofImage]
}

const Achievements = () => {
  const rootRef = useRef(null)
  const [items, setItems] = useState([])
  const [activeFilter, setActiveFilter] = useState("All")
  const [activeImage, setActiveImage] = useState(null)

  useEffect(() => {
    getAchievements().then(setItems)
  }, [])

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return items
    if (activeFilter === "Business / Logic") {
      return items.filter((item) => /business|logic/i.test(item.category))
    }
    return items.filter((item) => item.category === activeFilter)
  }, [items, activeFilter])

  useEffect(() => {
    if (!activeImage) return
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveImage(null)
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [activeImage])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const listeners = []

    const ctx = gsap.context(() => {
      if (reduceMotion) return

      const line = root.querySelector(".timeline-line")
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.4,
            ease: cinematicEase,
            scrollTrigger: {
              trigger: root,
              start: "top 70%",
              end: "bottom 20%",
              scrub: 0.4,
            },
          },
        )
      }

      gsap.utils.toArray(".timeline-item").forEach((item) => {
        const side = item.dataset.side === "left" ? -70 : 70
        gsap.fromTo(
          item,
          { opacity: 0, x: side },
          {
            opacity: 1,
            x: 0,
            duration: 0.95,
            ease: cinematicEase,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          },
        )
      })

      gsap.utils.toArray(".badge-pulse").forEach((badge) => {
        gsap.to(badge, {
          scale: 1.06,
          boxShadow: "0 0 26px rgba(99, 245, 214, 0.55)",
          duration: 1.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        })
      })

      gsap.utils.toArray(".achievement-image").forEach((img) => {
        const onEnter = () =>
          gsap.to(img, {
            scale: 1.06,
            duration: 0.5,
            ease: cinematicEase,
          })
        const onLeave = () =>
          gsap.to(img, {
            scale: 1,
            duration: 0.6,
            ease: cinematicEase,
          })

        img.addEventListener("mouseenter", onEnter)
        img.addEventListener("mouseleave", onLeave)
        listeners.push({ img, onEnter, onLeave })
      })
    }, root)

    return () => {
      listeners.forEach(({ img, onEnter, onLeave }) => {
        img.removeEventListener("mouseenter", onEnter)
        img.removeEventListener("mouseleave", onLeave)
      })
      ctx.revert()
    }
  }, [filteredItems])

  return (
    <section id="achievements" className="section">
      <div className="mx-auto max-w-6xl px-6">
        <div ref={rootRef} className="achievement-shell">
          <div className="achievement-bg" aria-hidden="true">
            <div className="particle-field" />
            <div className="timeline-glow" />
          </div>

          <div className="relative z-10 space-y-8">
            <div className="space-y-3">
              <p className="section-kicker">Achievements</p>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <h2 className="section-title">High-impact accomplishments</h2>
                <p className="max-w-lg text-sm text-slate-400">
                  A premium timeline of competitive wins, accolades, and measurable milestones.
                </p>
              </div>
            </div>

            <div className="filter-tabs">
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

            <div className="timeline">
              <div className="timeline-line" aria-hidden="true" />
              {filteredItems.map((achievement, index) => {
                const side = index % 2 === 0 ? "left" : "right"
                const badgeClass = badgeStyles[achievement.result] || "badge-finalist"
                const imageList = resolveImages(achievement)

                return (
                  <div
                    key={achievement.title}
                    className={`timeline-row timeline-item ${side}`}
                    data-side={side}
                  >
                    <div className="timeline-content">
                      <div className="timeline-card">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <h3 className="text-2xl md:text-3xl font-semibold text-slate-50">
                              {achievement.title}
                            </h3>
                          </div>
                          <span className={`result-badge badge-pulse ${badgeClass}`}>
                            {achievement.result}
                          </span>
                        </div>

                        <div className="mt-3 timeline-meta">
                          <span className="timeline-tag">{achievement.category}</span>
                          <span className="timeline-tag">{achievement.level}</span>
                          <span className="timeline-tag">{achievement.date}</span>
                        </div>

                        <p className="mt-4 text-sm text-slate-300">
                          {achievement.description}
                        </p>

                        <div className="achievement-image-grid">
                          {imageList.map((src, photoIndex) => (
                            <button
                              type="button"
                              key={`${achievement.title}-${photoIndex}`}
                              className="achievement-image-wrap group"
                              onClick={() =>
                                setActiveImage({ src, title: achievement.title })
                              }
                            >
                              <img
                                src={src}
                                alt={`${achievement.title} proof ${photoIndex + 1}`}
                                className="achievement-image"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="timeline-node" aria-hidden="true" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {activeImage && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Achievement image preview"
          onClick={() => setActiveImage(null)}
        >
          <div className="modal-content" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between gap-4 mb-4">
              <p className="text-sm text-slate-400">{activeImage.title}</p>
              <button
                type="button"
                className="btn-outline text-xs"
                onClick={() => setActiveImage(null)}
              >
                Close
              </button>
            </div>
            <img src={activeImage.src} alt={activeImage.title} className="modal-image" />
          </div>
        </div>
      )}
    </section>
  )
}

export default Achievements

