import { gsap } from "gsap"
import { CustomEase } from "gsap/CustomEase"

gsap.registerPlugin(CustomEase)

CustomEase.create("cinematic", "0.16, 1, 0.3, 1")
CustomEase.create("cinematicSoft", "0.22, 1, 0.36, 1")

export const cinematicEase = "cinematic"
export const cinematicEaseSoft = "cinematicSoft"
