import { useEffect, useRef } from "react"
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

const Home = () => {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

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
  }, [])

  return (
    <div ref={rootRef}>
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
