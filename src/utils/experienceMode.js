const getConnection = () => {
  if (typeof navigator === "undefined") return null
  return navigator.connection || navigator.mozConnection || navigator.webkitConnection || null
}

export const getExperienceFlags = () => {
  if (typeof window === "undefined") {
    return {
      canUseHoverEffects: false,
      canUseRichAnimations: false,
      shouldSkipLockscreen: true,
    }
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches
  const smallViewport = window.matchMedia("(max-width: 768px)").matches
  const connection = getConnection()
  const saveData = connection?.saveData === true
  const lowMemory = typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 4
  const lowCpu = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4
  const lowPower = saveData || lowMemory || lowCpu

  return {
    canUseHoverEffects: canHover && !reducedMotion && !lowPower && !smallViewport,
    canUseRichAnimations: canHover && !reducedMotion && !lowPower && !smallViewport,
    shouldSkipLockscreen: saveData || smallViewport || !canHover,
  }
}
