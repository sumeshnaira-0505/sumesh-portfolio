import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function AnimatedCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    document.body.style.cursor = 'none'

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    const down = () => setClicked(true)
    const up = () => setClicked(false)
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setHovered(!!target.closest('a, button, [data-cursor-hover]'))
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    window.addEventListener('mouseover', over)

    return () => {
      document.body.style.cursor = 'auto'
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border-2 border-primary mix-blend-difference"
        animate={{
          x: pos.x - 20,
          y: pos.y - 20,
          width: hovered ? 50 : clicked ? 22 : 40,
          height: hovered ? 50 : clicked ? 22 : 40,
          opacity: 1,
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 20, mass: 0.5 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-primary"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          width: 8,
          height: 8,
          scale: clicked ? 0.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 600, damping: 30 }}
      />
    </>
  )
}
