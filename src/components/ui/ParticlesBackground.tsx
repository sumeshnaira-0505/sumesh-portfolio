import { useEffect, useState, useCallback } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadFull } from 'tsparticles'

/**
 * tsparticles v3 requires a one-time engine init via initParticlesEngine()
 * before any <Particles> component can render. The init prop was removed in v3.
 */
export default function ParticlesBackground() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine)
    }).then(() => setReady(true))
  }, [])

  // Stable options ref — no need to recreate on each render
  const particlesLoaded = useCallback(() => Promise.resolve(), [])

  if (!ready) return null

  return (
    <Particles
      id="hero-particles"
      className="absolute inset-0 -z-10"
      particlesLoaded={particlesLoaded}
      options={{
        fullScreen: { enable: false },
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'repulse' },
          },
          modes: {
            repulse: { distance: 80, duration: 0.4 },
          },
        },
        particles: {
          color: { value: '#888888' },
          links: {
            color: '#888888',
            distance: 140,
            enable: true,
            opacity: 0.25,
            width: 1,
          },
          move: { enable: true, speed: 0.8, outModes: { default: 'bounce' } },
          number: { value: 60, density: { enable: true, width: 800, height: 800 } },
          opacity: { value: 0.4 },
          shape: { type: 'circle' },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
    />
  )
}
