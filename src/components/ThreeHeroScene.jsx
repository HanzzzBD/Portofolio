import { useEffect, useRef } from "react"
import * as THREE from "three"
import { getExperienceFlags } from "../utils/experienceMode"

const ThreeHeroScene = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount || typeof window === "undefined") return undefined

    const flags = getExperienceFlags()
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const smallViewport = window.matchMedia("(max-width: 767px)").matches
    const shouldSimplify = reducedMotion || smallViewport || !flags.canUseRichAnimations

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.set(0, 0.15, 7)

    const renderer = new THREE.WebGLRenderer({
      antialias: !shouldSimplify,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, shouldSimplify ? 1.35 : 1.8))
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const crystalGeometry = new THREE.IcosahedronGeometry(1.75, shouldSimplify ? 1 : 2)
    const crystalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x8bdfff,
      roughness: 0.24,
      metalness: 0.18,
      transmission: 0.4,
      transparent: true,
      opacity: 0.36,
      clearcoat: 0.8,
      clearcoatRoughness: 0.22,
      emissive: 0x173f7a,
      emissiveIntensity: 0.2,
    })
    const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial)
    group.add(crystal)

    const wireGeometry = new THREE.IcosahedronGeometry(2.15, 1)
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x63f5d6,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    })
    const wire = new THREE.Mesh(wireGeometry, wireMaterial)
    group.add(wire)

    const ringMaterial = new THREE.LineBasicMaterial({
      color: 0xff7bbd,
      transparent: true,
      opacity: 0.36,
    })
    const rings = [2.45, 2.95].map((radius, index) => {
      const points = []
      for (let i = 0; i <= 160; i += 1) {
        const angle = (i / 160) * Math.PI * 2
        points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0))
      }
      const ring = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), ringMaterial)
      ring.rotation.x = index === 0 ? 1.1 : -0.72
      ring.rotation.y = index === 0 ? 0.18 : 0.95
      group.add(ring)
      return ring
    })

    const particleCount = shouldSimplify ? 70 : 150
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.8 + Math.random() * 2.2
      const angle = Math.random() * Math.PI * 2
      const height = (Math.random() - 0.5) * 4.2
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = height
      positions[i * 3 + 2] = Math.sin(angle) * radius
    }
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x9defff,
      size: shouldSimplify ? 0.025 : 0.032,
      transparent: true,
      opacity: 0.62,
      depthWrite: false,
    })
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    scene.add(new THREE.AmbientLight(0x7dcfff, 1.2))
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4)
    keyLight.position.set(3, 4, 5)
    scene.add(keyLight)
    const rimLight = new THREE.PointLight(0xff7bbd, 1.6, 12)
    rimLight.position.set(-3, -2, 3)
    scene.add(rimLight)

    const pointer = { x: 0, y: 0 }
    const handlePointerMove = (event) => {
      const rect = mount.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    }

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect()
      renderer.setSize(width, height, false)
      camera.aspect = width / Math.max(height, 1)
      camera.updateProjectionMatrix()
      group.scale.setScalar(width < 520 ? 0.74 : 1)
    }

    resize()
    window.addEventListener("resize", resize)
    mount.addEventListener("pointermove", handlePointerMove)

    const startedAt = performance.now()
    let frameId = 0

    const render = () => {
      const elapsed = (performance.now() - startedAt) / 1000
      const drift = shouldSimplify ? 0.12 : 0.32

      group.rotation.y = elapsed * drift + pointer.x * 0.12
      group.rotation.x = Math.sin(elapsed * 0.35) * 0.12 + pointer.y * 0.08
      wire.rotation.z = elapsed * 0.18
      rings[0].rotation.z = elapsed * 0.16
      rings[1].rotation.z = -elapsed * 0.13
      particles.rotation.y = elapsed * 0.035
      particles.rotation.x = Math.sin(elapsed * 0.15) * 0.08

      renderer.render(scene, camera)

      if (!shouldSimplify) {
        frameId = window.requestAnimationFrame(render)
      }
    }

    render()
    if (shouldSimplify) {
      const intervalId = window.setInterval(render, 120)
      frameId = intervalId
    }

    return () => {
      if (shouldSimplify) {
        window.clearInterval(frameId)
      } else {
        window.cancelAnimationFrame(frameId)
      }
      window.removeEventListener("resize", resize)
      mount.removeEventListener("pointermove", handlePointerMove)
      crystalGeometry.dispose()
      crystalMaterial.dispose()
      wireGeometry.dispose()
      wireMaterial.dispose()
      ringMaterial.dispose()
      rings.forEach((ring) => ring.geometry.dispose())
      particleGeometry.dispose()
      particleMaterial.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="hero-scene"
      aria-hidden="true"
    />
  )
}

export default ThreeHeroScene
