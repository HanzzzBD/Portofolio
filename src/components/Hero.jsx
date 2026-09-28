import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { cinematicEase } from "../utils/gsapEase"
import { getExperienceFlags } from "../utils/experienceMode"
import ThreeHeroScene from "./ThreeHeroScene"

const Hero = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!getExperienceFlags().canUseRichAnimations) {
        gsap.set([".hero-line", ".hero-cta", ".hero-panel", ".hero-scene-wrap"], {
          opacity: 1,
          y: 0,
          scale: 1,
        })
        return
      }

      gsap.set(".hero-line", { y: 24, opacity: 0 })
      gsap.set(".hero-cta", { y: 16, opacity: 0 })
      gsap.set(".hero-panel", { y: 24, opacity: 0, scale: 0.96 })
      gsap.set(".hero-scene-wrap", { y: 30, opacity: 0, scale: 0.92 })

      const tl = gsap.timeline({ defaults: { ease: cinematicEase, duration: 1.05 } })
      tl.to(".hero-line", { y: 0, opacity: 1, stagger: 0.15 })
        .to(".hero-cta", { y: 0, opacity: 1 }, "-=0.5")
        .to(".hero-scene-wrap", { y: 0, opacity: 1, scale: 1 }, "-=0.75")
        .to(".hero-panel", { y: 0, opacity: 1, scale: 1 }, "-=0.6")

      gsap.to(".hero-float", {
        y: -10,
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.2,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={heroRef} className="hero-section section min-h-[92svh] pt-28 md:min-h-screen">
      <div className="hero-ambient" aria-hidden="true" />
      <div className="mx-auto grid w-full max-w-[1680px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:px-8">
        <div className="hero-parallax-content relative z-10 max-w-5xl space-y-7">
          <p className="hero-line text-sm font-medium text-accent-300">
            RPL/PPLG student at SMKN 4 Bandung
          </p>
          <div className="space-y-5">
            <h1 className="hero-line text-balance text-5xl font-semibold leading-[0.95] tracking-normal sm:text-6xl lg:text-7xl xl:text-8xl">
              Hadrian Rangga builds web systems.
            </h1>
            <p className="hero-line max-w-2xl text-lg text-slate-300 md:text-xl">
              I am focused on web development, backend systems, and machine learning fundamentals.
              I like turning school, competition, and product ideas into working applications with
              clear interfaces and maintainable code.
            </p>
          </div>
          <div className="hero-cta flex flex-wrap items-center gap-4">
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn-outline">
              Contact
            </a>
          </div>
          <div className="hero-cta grid max-w-3xl gap-3 text-sm text-slate-400 sm:grid-cols-3">
            <div className="hero-stat">
              <p className="text-slate-100 font-semibold">Frontend</p>
              <p>React, Vite, Tailwind</p>
            </div>
            <div className="hero-stat">
              <p className="text-slate-100 font-semibold">Backend</p>
              <p>Laravel, Node, databases</p>
            </div>
            <div className="hero-stat">
              <p className="text-slate-100 font-semibold">Learning</p>
              <p>AI/ML foundations</p>
            </div>
          </div>
        </div>

        <div className="hero-parallax-card relative z-10">
          <div className="hero-scene-wrap hero-float">
            <ThreeHeroScene />
          </div>
          <div className="hero-panel glass">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Current focus</p>
                <p className="mt-2 text-xl font-semibold text-slate-50">Backend-ready web apps</p>
              </div>
              <span className="badge">Bandung</span>
            </div>
            <div className="mt-6 grid gap-3 text-sm">
              <div className="hero-panel-row">
                <span>School</span>
                <strong>SMKN 4 Bandung</strong>
              </div>
              <div className="hero-panel-row">
                <span>Program</span>
                <strong>RPL / PPLG</strong>
              </div>
              <div className="hero-panel-row">
                <span>Direction</span>
                <strong>Web, backend, AI/ML learning</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
