import HoverCard from "./HoverCard"

const About = () => {
  return (
    <section id="about" className="section reveal">
      <div className="mx-auto grid w-full max-w-[1680px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div className="space-y-6">
          <div className="space-y-3 reveal-item">
            <p className="section-kicker">Profile</p>
            <h2 className="section-title">
              A software engineering student building practical systems while learning deeper
              computer science.
            </h2>
          </div>
          <p className="reveal-item">
            I'm Hadrian Rangga, an RPL/PPLG student at SMKN 4 Bandung. My current work centers on
            web applications, backend features, database-backed workflows, and interface polish.
          </p>
          <p className="reveal-item">
            My goal is to become a developer who can ship reliable products and understand the
            systems behind them. I am also building foundations in machine learning so I can connect
            software engineering with intelligent features over time.
          </p>
        </div>

        <div className="about-bento reveal-item grid grid-flow-dense gap-4 md:grid-cols-6">
          <HoverCard className="md:col-span-3 md:row-span-2">
            <p className="text-sm text-slate-400">Learning focus</p>
            <p className="mt-4 text-2xl font-semibold text-slate-50">Backend systems and AI/ML</p>
            <p className="mt-4 text-sm text-slate-400">
              Strengthening API design, data modeling, authentication flows, and Python-based
              machine learning fundamentals.
            </p>
          </HoverCard>
          <HoverCard className="md:col-span-3">
            <p className="text-sm text-slate-400">Education</p>
            <p className="mt-3 text-xl font-semibold text-slate-50">SMKN 4 Bandung</p>
            <p className="mt-2 text-sm text-slate-400">RPL / PPLG student</p>
          </HoverCard>
          <HoverCard className="md:col-span-3">
            <p className="text-sm text-slate-400">Builder profile</p>
            <p className="mt-3 text-xl font-semibold text-slate-50">
              Web apps, dashboards, attendance systems, and commerce workflows
            </p>
          </HoverCard>
          <HoverCard className="md:col-span-6">
            <div className="grid gap-4 text-sm sm:grid-cols-3">
              <div>
                <p className="text-slate-400">Core stack</p>
                <p className="mt-2 font-semibold text-slate-100">React, Laravel, Node.js</p>
              </div>
              <div>
                <p className="text-slate-400">Data</p>
                <p className="mt-2 font-semibold text-slate-100">MySQL, MongoDB</p>
              </div>
              <div>
                <p className="text-slate-400">Workflow</p>
                <p className="mt-2 font-semibold text-slate-100">Git, Vite, Tailwind</p>
              </div>
            </div>
          </HoverCard>
        </div>
      </div>
    </section>
  )
}

export default About
