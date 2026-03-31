import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi"

const Contact = () => {
  return (
    <section id="contact" className="section reveal">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="space-y-3 reveal-item">
            <p className="section-kicker">Contact</p>
            <h2 className="section-title">Let's build something ambitious.</h2>
          </div>
          <p className="reveal-item">
            Have an idea, a product to launch, or a team that needs extra engineering power? Let's
            talk about how we can ship it faster and smarter.
          </p>
          <div className="glass rounded-2xl p-6 space-y-4 reveal-item">
            <p className="text-sm text-slate-400">Socials</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <a
                href="https://github.com/HanzzzBD"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-slate-200 hover:text-accent-300"
              >
                <FiGithub />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/hadrian-rangga-4042b1332/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-slate-200 hover:text-accent-300"
              >
                <FiLinkedin />
                LinkedIn
              </a>
              <a
                href="mailto:hadrianrangga@gmail.com"
                className="inline-flex items-center gap-2 text-slate-200 hover:text-accent-300"
              >
                <FiMail />
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="glass rounded-3xl p-8 reveal-item">
          <form className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-slate-400">Name</label>
              <input type="text" placeholder="Your full name" className="input-field" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-400">Email</label>
              <input type="email" placeholder="you@email.com" className="input-field" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-400">Project brief</label>
              <textarea
                rows="5"
                placeholder="Tell me about your project goals"
                className="input-field resize-none"
              />
            </div>
            <button type="button" className="btn-primary w-full justify-center">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
