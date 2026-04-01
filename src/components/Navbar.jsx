import { useEffect, useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"
import ModeSwitch from "./mode"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
]

const getInitialTheme = () => {
  if (typeof window === "undefined") return "dark"

  const storedTheme = window.localStorage.getItem("theme")
  if (storedTheme === "light" || storedTheme === "dark") return storedTheme

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  return prefersDark ? "dark" : "light"
}

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.style.colorScheme = theme
    window.localStorage.setItem("theme", theme)
  }, [theme])

  const handleThemeChange = (event) => {
    setTheme(event.target.checked ? "dark" : "light")
  }

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="glass flex w-full items-center justify-between rounded-full px-5 py-3">
          <a href="#home" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-400 text-base-900 font-semibold">
              HR
            </span>
            <div className="text-sm leading-tight">
              <p className="text-white font-semibold">Hadrian Rangga Ardiantara</p>
              <p className="text-xs text-slate-400">Web & Game dev</p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-300 transition hover:text-accent-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <ModeSwitch
              className="scale-75 origin-right"
              checked={theme === "dark"}
              onChange={handleThemeChange}
            />
            <a href="#contact" className="btn-outline text-sm">
              Let's Talk
            </a>
          </div>

          <button
            type="button"
            className="md:hidden text-slate-200"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ${
          open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-4"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="glass rounded-2xl p-5">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-300 transition hover:text-accent-300"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3">
                <ModeSwitch
                  className="scale-75 origin-left"
                  checked={theme === "dark"}
                  onChange={handleThemeChange}
                />
                <span className="text-xs text-slate-400">Mode</span>
              </div>
              <a href="#contact" className="btn-outline text-sm">
                Let's Talk
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar

