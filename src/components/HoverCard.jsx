import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { cinematicEase, cinematicEaseSoft } from "../utils/gsapEase"

const HoverCard = ({ children, className = "" }) => {
  const cardRef = useRef(null)
  const xToRef = useRef(null)
  const yToRef = useRef(null)
  const reduceMotionRef = useRef(false)

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const card = cardRef.current
    if (!card || reduceMotionRef.current) return

    xToRef.current = gsap.quickTo(card, "x", {
      duration: 0.6,
      ease: cinematicEaseSoft,
    })
    yToRef.current = gsap.quickTo(card, "y", {
      duration: 0.6,
      ease: cinematicEaseSoft,
    })
  }, [])

  const handleEnter = () => {
    if (!cardRef.current || reduceMotionRef.current) return

    gsap.to(cardRef.current, {
      scale: 1.02,
      boxShadow: "0 24px 70px rgba(43, 188, 255, 0.18)",
      duration: 0.35,
      ease: cinematicEase,
    })

    if (yToRef.current) {
      yToRef.current(-6)
    }
  }

  const handleMove = (event) => {
    if (!cardRef.current || reduceMotionRef.current) return
    if (!xToRef.current || !yToRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const relX = event.clientX - rect.left
    const relY = event.clientY - rect.top
    const percentX = relX / rect.width - 0.5
    const percentY = relY / rect.height - 0.5
    const max = 14

    xToRef.current(percentX * 2 * max)
    yToRef.current(-6 + percentY * 2 * max)
  }

  const handleLeave = () => {
    if (!cardRef.current || reduceMotionRef.current) return

    gsap.to(cardRef.current, {
      scale: 1,
      boxShadow: "0 18px 50px rgba(2, 8, 23, 0.55)",
      duration: 0.4,
      ease: cinematicEase,
    })

    if (xToRef.current) {
      xToRef.current(0)
    }
    if (yToRef.current) {
      yToRef.current(0)
    }
  }

  return (
    <div
      ref={cardRef}
      className={`card ${className}`}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  )
}

export default HoverCard
