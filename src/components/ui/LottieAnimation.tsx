import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LottieAnimationProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animationData?: any
  className?: string
  loop?: boolean
}

const PHRASES = [
  '> init Sumesh.js',
  'const passion = ∞',
  'git commit -m "life"',
  'while(alive) { code() }',
  'npm i confidence',
  '// TODO: change world',
  'export default greatWork',
]

export default function LottieAnimation({ className = '' }: LottieAnimationProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % PHRASES.length), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative w-48 h-48">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-2 border-primary/60"
            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.4, delay: i * 0.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        <motion.div
          className="absolute inset-6 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden"
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="flex items-center justify-center w-full px-3">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                className="font-mono text-primary text-[10px] font-semibold text-center leading-tight whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                {PHRASES[index]}
              </motion.span>
            </AnimatePresence>

            {/* blinking cursor */}
            <motion.span
              className="font-mono text-primary text-[10px] font-bold ml-0.5 shrink-0"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.55, repeat: Infinity, repeatType: 'reverse' }}
            >
              ▋
            </motion.span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
