import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Spark { id: number; x: number; y: number; color: string; size: number }

const COLORS = ['#a855f7', '#3b82f6', '#22c55e', '#f59e0b', '#ec4899', '#ef4444']
let uid = 0

export default function CursorTrail() {
  const [sparks, setSparks] = useState<Spark[]>([])
  const last = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Only on pointer devices, not touch
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - last.current.x
      const dy = e.clientY - last.current.y
      if (dx * dx + dy * dy < 625) return // ~25px threshold
      last.current = { x: e.clientX, y: e.clientY }

      const spark: Spark = {
        id: uid++,
        x: e.clientX + (Math.random() * 8 - 4),
        y: e.clientY + (Math.random() * 8 - 4),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 3 + Math.random() * 4,
      }
      setSparks((prev) => [...prev.slice(-14), spark])
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
      <AnimatePresence>
        {sparks.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0.85, scale: 1, x: s.x, y: s.y }}
            animate={{ opacity: 0, scale: 0, y: s.y - 28 }}
            exit={{}}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: s.size,
              height: s.size,
              borderRadius: '50%',
              backgroundColor: s.color,
              marginLeft: -s.size / 2,
              marginTop: -s.size / 2,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
