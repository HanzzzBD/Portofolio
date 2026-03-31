import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { cinematicEase } from "../utils/gsapEase"

const Hero = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduceMotion) {
        gsap.set([".hero-line", ".hero-cta", ".hero-card"], {
          opacity: 1,
          y: 0,
          scale: 1,
        })
        return
      }

      gsap.set(".hero-line", { y: 24, opacity: 0 })
      gsap.set(".hero-cta", { y: 16, opacity: 0 })
      gsap.set(".hero-card", { y: 24, opacity: 0, scale: 0.96 })

      const tl = gsap.timeline({ defaults: { ease: cinematicEase, duration: 1.05 } })
      tl.to(".hero-line", { y: 0, opacity: 1, stagger: 0.15 })
        .to(".hero-cta", { y: 0, opacity: 1 }, "-=0.5")
        .to(".hero-card", { y: 0, opacity: 1, scale: 1 }, "-=0.6")

      gsap.to(".hero-float", {
        y: -10,
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.2,
      })

      gsap.to(".hero-orb", {
        x: 10,
        y: -8,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.6,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={heroRef} className="section min-h-screen pt-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="hero-parallax-content space-y-6">
          <span className="badge hero-line">Building web apps & interactive games</span>
          <div className="space-y-4">
            <h1 className="hero-line text-4xl md:text-6xl">
              Hi, I'm <span className="text-gradient">Hadrian Rangga Ardiantara</span>
            </h1>
            <p className="hero-line text-lg md:text-xl text-slate-300">
              I build modern web applications using the MERN stack and create interactive experiences through game development. I enjoy turning ideas into real projects while continuously improving my engineering skills.
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
          <div className="hero-cta flex flex-wrap gap-6 text-sm text-slate-400">
            <div>
              <p className="text-slate-100 font-semibold">4+ Years</p>
              <p>Product engineering</p>
            </div>
            <div>
              <p className="text-slate-100 font-semibold">1 Projects</p>
              <p>end-to-end app</p>
            </div>
            <div>
              <p className="text-slate-100 font-semibold">8 Tools</p>
              <p>Personal utilities</p>
            </div>
            <div>
              <p className="text-slate-100 font-semibold">Based In</p>
              <p>Bandung, ID</p>
            </div>
          </div>
        </div>

        <div className="hero-parallax-card">
          <div className="hero-card hero-float relative">
            <div className="hero-orb absolute -top-8 -left-8 h-32 w-32 rounded-full bg-accent-400/30 blur-3xl" />
            <div className="hero-orb absolute -bottom-10 -right-6 h-32 w-32 rounded-full bg-neon-500/20 blur-3xl" />
            <div className="glass relative overflow-hidden rounded-3xl p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Status</p>
                  <p className="text-lg font-semibold text-slate-50">Student Developer</p>
                </div>
                <span className="badge">2026</span>
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Current focus</span>
                  <span className="text-slate-100">Web Apps & Game Development</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Tooling</span>
                  <span className="text-slate-100">React / Vite / Unity / Laravel</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Workstyle</span>
                  <span className="text-slate-100">Curious / Builder mindset</span>
                </div>
              </div>
              <div className="mt-8 h-32 rounded-2xl bg-base-800/60 p-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Energy</span>
                  <span>100%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-[100%] rounded-full bg-gradient-to-r from-accent-400 via-neon-500 to-accent-300" />
                </div>
                <p className="mt-4 text-xs text-slate-400">
                  Building web apps, tools, and interactive games.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

