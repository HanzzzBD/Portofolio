import profileImg from "../assets/pro.svg"
import HoverCard from "./HoverCard"

const About = () => {
  return (
    <section id="about" className="section reveal">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="space-y-3 reveal-item">
            <p className="section-kicker">About Me</p>
            <h2 className="section-title">Fullstack developer & game developer crafting interactive experiences.</h2>
          </div>
          <p className="reveal-item">
            I'm a Bandung-based student and developer focused on web and game development. 
            I work with MERN stack to build web applications, and also explore game development 
            to create interactive and immersive experiences.
          </p>
          <p className="reveal-item">
I enjoy building projects and personal tools that solve real problems, while continuously improving my skills in both software engineering and game development.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 reveal-item">
            <HoverCard>
              <p className="text-sm text-slate-400">Tech Background</p>
              <p className="mt-2 text-base text-slate-100 font-semibold">MERN, Laravel, Game Dev</p>
              <p className="mt-3 text-sm text-slate-400">
                Student building web & game projects
              </p>
            </HoverCard>
            <HoverCard>
              <p className="text-sm text-slate-400">Focus</p>
              <p className="mt-2 text-base text-slate-100 font-semibold">Web Apps & Game Development</p>
              <p className="mt-3 text-sm text-slate-400">
                Interactive & scalable systems
              </p>
            </HoverCard>
          </div>
        </div>

        <div className="relative reveal-item">
          <div className="absolute -top-10 -left-6 h-32 w-32 rounded-full bg-neon-500/20 blur-3xl" />
          <div className="glass relative overflow-hidden rounded-3xl p-6">
            <img
              src={profileImg}
              alt="Developer profile illustration"
              className="mx-auto w-full max-w-sm rounded-2xl"
            />
            <div className="mt-6 grid gap-3 text-sm text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Current role</span>
                <span className="text-slate-100">Student Developer</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Focus</span>
                <span className="text-slate-100">Web Apps & Game Development</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Available</span>
                <span className="text-slate-100">Open for projects & collaboration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
