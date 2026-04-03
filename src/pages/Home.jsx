import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cinematicEase } from "../utils/gsapEase"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import About from "../components/About"
import Skills from "../components/Skills"
import Projects from "../components/Projects"
import Achievements from "../components/Achievements"
import Contact from "../components/Contact"

gsap.registerPlugin(ScrollTrigger)

const LOCK_LINES = [
  "Initializing system...",
  "Access restricted.",
  "Type 'unlock' to continue.",
]

const ACCESS_COMMAND = "unlock"

const Home = () => {
  const rootRef = useRef(null)
  const inputRef = useRef(null)
  const [phase, setPhase] = useState("locked")
  const [typedLines, setTypedLines] = useState(() => LOCK_LINES.map(() => ""))
  const [typingComplete, setTypingComplete] = useState(false)
  const [command, setCommand] = useState("")
  const [status, setStatus] = useState("idle")

  const isUnlocked = phase === "unlocked"
  const isUnlocking = phase === "unlocking"

  useEffect(() => {
    const root = rootRef.current
    if (!root || !isUnlocked) return

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduceMotion) return

      const sections = gsap.utils.toArray(root.querySelectorAll(".reveal"))

      sections.forEach((section) => {
        const items = section.querySelectorAll(".reveal-item")
        const target = items.length ? items : [section]

        gsap.fromTo(
          target,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: cinematicEase,
            stagger: items.length ? 0.12 : 0,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          },
        )
      })

      const grid = root.querySelector(".bg-grid")
      if (grid) {
        gsap.to(grid, {
          y: 120,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        })
      }

      const hero = root.querySelector("#home")
      if (hero) {
        const content = hero.querySelector(".hero-parallax-content")
        const card = hero.querySelector(".hero-parallax-card")

        if (content) {
          gsap.to(content, {
            y: -32,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          })
        }

        if (card) {
          gsap.to(card, {
            y: 44,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          })
        }
      }
    }, root)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [isUnlocked])

  useEffect(() => {
    if (isUnlocked) return undefined

    let timeoutId
    let cancelled = false
    let lineIndex = 0
    let charIndex = 0

    const typeNext = () => {
      if (cancelled) return

      const currentLine = LOCK_LINES[lineIndex]
      setTypedLines((prev) => {
        const next = [...prev]
        next[lineIndex] = currentLine.slice(0, charIndex + 1)
        return next
      })

      charIndex += 1

      if (charIndex < currentLine.length) {
        timeoutId = window.setTimeout(typeNext, 40 + Math.random() * 30)
        return
      }

      lineIndex += 1
      charIndex = 0

      if (lineIndex < LOCK_LINES.length) {
        timeoutId = window.setTimeout(typeNext, 420)
        return
      }

      setTypingComplete(true)
    }

    timeoutId = window.setTimeout(typeNext, 320)

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [isUnlocked])

  useEffect(() => {
    if (isUnlocked) {
      document.body.style.overflow = ""
      return undefined
    }

    document.body.style.overflow = "hidden"

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus()
    }, typingComplete ? 150 : 900)

    return () => {
      document.body.style.overflow = ""
      window.clearTimeout(focusTimer)
    }
  }, [isUnlocked, typingComplete])

  useEffect(() => {
    if (status !== "denied") return undefined

    const clearTimer = window.setTimeout(() => {
      setStatus("idle")
    }, 900)

    return () => window.clearTimeout(clearTimer)
  }, [status])

  const unlock = () => {
    if (isUnlocking || isUnlocked) return
    setStatus("granted")
    setPhase("unlocking")

    window.setTimeout(() => {
      setPhase("unlocked")
    }, 1000)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (isUnlocking || isUnlocked) return

    const normalized = command.trim().toLowerCase()
    if (normalized === ACCESS_COMMAND) {
      unlock()
      return
    }

    setStatus("denied")
    setCommand("")
  }

  return (
    <div ref={rootRef}>
      {!isUnlocked && (
        <div className={`lockscreen ${isUnlocking ? "lockscreen--unlocking" : ""}`}>
          <button type="button" className="lockscreen__skip" onClick={unlock}>
            Skip
          </button>
          <div
            className={`lockscreen__terminal ${
              status === "denied" ? "lockscreen__terminal--error" : ""
            }`}
          >
            <div className="lockscreen__titlebar">
              <div className="lockscreen__title">
                <span className="lockscreen__title-text">Aether Secure Console</span>
                <span className="lockscreen__title-dot" />
              </div>
              <span className="lockscreen__badge">
                {isUnlocking ? "UNLOCKING" : "LOCKED"}
              </span>
            </div>
            <div className="lockscreen__lines" aria-live="polite">
              {typedLines.map((line, index) => (
                <p key={index} className="lockscreen__line">
                  {line}
                </p>
              ))}
            </div>
            <form className="lockscreen__input" onSubmit={handleSubmit}>
              <span className="lockscreen__prompt">&gt;</span>
              <span className={`lockscreen__typed ${command ? "" : "is-empty"}`}>
                {command || "\u00A0"}
              </span>
              <span className="lockscreen__cursor" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                className="lockscreen__input-field"
                value={command}
                onChange={(event) => setCommand(event.target.value)}
                autoComplete="off"
                spellCheck="false"
                autoCapitalize="off"
                aria-label="Terminal command"
                disabled={isUnlocking}
              />
            </form>
            {status === "granted" && (
              <p className="lockscreen__status lockscreen__status--granted">
                Access granted. Preparing workspace...
              </p>
            )}
            {status === "denied" && (
              <p className="lockscreen__status lockscreen__status--denied">
                {`Access denied. Try "${ACCESS_COMMAND}".`}
              </p>
            )}
            {typingComplete && status === "idle" && (
              <p className="lockscreen__hint">Press Enter to execute.</p>
            )}
          </div>
        </div>
      )}
      <div className="bg-grid" aria-hidden="true" />
      <Navbar />
      <main className="pt-6">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <footer className="border-t border-white/5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 md:flex-row">
          <p>Copyright 2026 Aether Dev. All rights reserved.</p>
          <p className="text-slate-500">Crafted with React, Vite, Tailwind, GSAP.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home


