import { useState } from "react"
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi"
import { contactEmail, sendContactMessage } from "../services/contactService"

const INITIAL_FORM = {
  name: "",
  email: "",
  message: "",
  website: "",
}

const Contact = () => {
  const [form, setForm] = useState(INITIAL_FORM)
  const [status, setStatus] = useState("idle")
  const [feedback, setFeedback] = useState("")

  const isSending = status === "sending"

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (isSending) return

    if (form.website) {
      setStatus("success")
      setFeedback("Message sent successfully.")
      setForm(INITIAL_FORM)
      return
    }

    setStatus("sending")
    setFeedback("Sending your message...")

    try {
      await sendContactMessage({
        name: form.name,
        email: form.email,
        message: form.message,
        formUrl:
          typeof window !== "undefined"
            ? `${window.location.origin}${window.location.pathname}#contact`
            : "portfolio-contact",
      })

      setStatus("success")
      setFeedback("Message sent successfully. I'll get back to you soon.")
      setForm(INITIAL_FORM)
    } catch {
      setStatus("error")
      setFeedback(`Message failed to send. Please email me directly at ${contactEmail}.`)
    }
  }

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
          <div className="glass space-y-4 rounded-2xl p-6 reveal-item">
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
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-2 text-slate-200 hover:text-accent-300"
              >
                <FiMail />
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="glass rounded-3xl p-8 reveal-item">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                value={form.website}
                onChange={handleChange}
                autoComplete="off"
                tabIndex="-1"
              />
            </div>
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-sm text-slate-400">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Your full name"
                className="input-field"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block text-sm text-slate-400">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="you@email.com"
                className="input-field"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                inputMode="email"
                required
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-2 block text-sm text-slate-400">
                Project brief
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                placeholder="Tell me about your project goals"
                className="input-field resize-none"
                value={form.message}
                onChange={handleChange}
                minLength="10"
                required
              />
            </div>
            <button
              type="submit"
              className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>
            <p
              className={`text-sm ${
                status === "error"
                  ? "text-rose-300"
                  : status === "success"
                    ? "text-emerald-300"
                    : "text-slate-400"
              }`}
              aria-live="polite"
            >
              {feedback || `Messages from this form are delivered to ${contactEmail}.`}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
