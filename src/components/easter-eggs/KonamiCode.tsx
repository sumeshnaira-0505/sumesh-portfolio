import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useNavigate } from 'react-router-dom'

const SEQUENCE = ['s','u','m','e','s','h']

function burst() {
  const opts = { colors: ['#a855f7', '#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#ec4899'] }
  confetti({ ...opts, particleCount: 180, spread: 100, origin: { y: 0.55 } })
  setTimeout(() => confetti({ ...opts, particleCount: 80, angle: 60, spread: 60, origin: { x: 0, y: 0.6 } }), 200)
  setTimeout(() => confetti({ ...opts, particleCount: 80, angle: 120, spread: 60, origin: { x: 1, y: 0.6 } }), 350)
}

export default function KonamiCode() {
  const buf = useRef<string[]>([])
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const fire = useCallback(() => {
    burst()
    setOpen(true)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Normalise letter keys so B/b and A/a both match regardless of Caps Lock
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      buf.current = [...buf.current, key].slice(-SEQUENCE.length)
      if (buf.current.join(',') === SEQUENCE.join(',')) {
        buf.current = []
        fire()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [fire])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/60 backdrop-blur-sm cursor-pointer"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            className="bg-card border border-border rounded-2xl p-8 max-w-sm mx-6 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, -15, 15, -15, 0] }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              🕹️
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Hey, you typed my name! 👀</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              S-U-M-E-S-H — you&apos;re either very curious
              <br />
              or you&apos;re a developer poking around.
              <br />
              <strong className="text-foreground">Either way, I respect it. 🤝</strong>
            </p>
            <p className="text-xs text-muted-foreground/60 mb-6 font-mono">
              Psst… there&apos;s a secret page at{' '}
              <button
                className="text-primary hover:underline cursor-pointer"
                onClick={() => { setOpen(false); navigate('/fun') }}
              >
                /fun
              </button>
            </p>
            <button
              onClick={() => setOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕ Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
