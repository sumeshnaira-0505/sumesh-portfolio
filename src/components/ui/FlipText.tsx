/**
 * FlipText — split-flap / departure-board letter animation.
 *
 * Each character independently cycles through random glyphs at `speed` ms
 * intervals (staggered by `stagger` ms per position) before snapping to the
 * correct letter.  Trigger a new animation by toggling `trigger`.
 */
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

// Glyph pool used while scrambling
const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&!'
const randomChar = () => CHARSET[Math.floor(Math.random() * CHARSET.length)]

// ── Single character cell ────────────────────────────────────────────────────

interface FlipCharProps {
  target: string
  triggerKey: number   // increment to re-run the scramble
  delay: number        // stagger delay in ms
  speed: number        // ms between glyph changes while scrambling
  flipCount: number    // how many random glyphs before settling
}

function FlipChar({ target, triggerKey, delay, speed, flipCount }: FlipCharProps) {
  const [{ glyph, tick }, set] = useState({ glyph: target, tick: 0 })
  const delayRef    = useRef<ReturnType<typeof setTimeout>  | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    // skip the very first render — show the real text immediately
    if (triggerKey === 0) return

    if (delayRef.current)    clearTimeout(delayRef.current)
    if (intervalRef.current) clearInterval(intervalRef.current)

    delayRef.current = setTimeout(() => {
      let count = 0
      intervalRef.current = setInterval(() => {
        if (count < flipCount) {
          set(prev => ({ glyph: randomChar(), tick: prev.tick + 1 }))
          count++
        } else {
          clearInterval(intervalRef.current!)
          set(prev => ({ glyph: target, tick: prev.tick + 1 }))
        }
      }, speed)
    }, delay)

    return () => {
      if (delayRef.current)    clearTimeout(delayRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerKey])

  // spaces are rendered as a fixed-width gap — no animation needed
  if (target === ' ') return <span className="inline-block" style={{ width: '0.35em' }} />

  return (
    // perspective wrapper so rotateX has 3-D depth
    <span className="inline-block overflow-visible" style={{ perspective: '300px' }}>
      <motion.span
        key={tick}
        className="inline-block font-mono"
        initial={{ rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0,   opacity: 1 }}
        transition={{ duration: 0.14, ease: 'easeOut' }}
        style={{ transformOrigin: '50% 60%', display: 'inline-block' }}
      >
        {glyph}
      </motion.span>
    </span>
  )
}

// ── Public component ─────────────────────────────────────────────────────────

export interface FlipTextProps {
  text: string
  /** Increment to re-trigger the scramble. Managed by the parent. */
  triggerKey: number
  /** Milliseconds between glyph changes while scrambling (default 50) */
  speed?: number
  /** Milliseconds added per character position for stagger (default 60) */
  stagger?: number
  /** How many random glyphs each char cycles through before settling (default 9) */
  flipCount?: number
  className?: string
}

export default function FlipText({
  text,
  triggerKey,
  speed    = 50,
  stagger  = 60,
  flipCount = 9,
  className = '',
}: FlipTextProps) {
  return (
    <span className={`inline-flex ${className}`} aria-label={text}>
      {text.split('').map((char, i) => (
        <FlipChar
          key={i}
          target={char}
          triggerKey={triggerKey}
          delay={i * stagger}
          speed={speed}
          flipCount={flipCount}
        />
      ))}
    </span>
  )
}
