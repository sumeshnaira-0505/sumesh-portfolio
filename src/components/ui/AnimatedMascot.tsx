import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Code lines shown on robot's chest screen
const IDLE = [20, 32, 14, 26]
const ACTIVE = [28, 18, 36, 12]

export default function AnimatedMascot({ className = '' }: { className?: string }) {
  const [blink, setBlink] = useState(false)
  const [typing, setTyping] = useState(false)
  const [hover, setHover] = useState(false)

  // Random blink
  useEffect(() => {
    let id: ReturnType<typeof setTimeout>
    const schedule = () => {
      id = setTimeout(() => {
        setBlink(true)
        setTimeout(() => { setBlink(false); schedule() }, 130)
      }, 2200 + Math.random() * 4000)
    }
    schedule()
    return () => clearTimeout(id)
  }, [])

  // Typing pulse every 3.5s
  useEffect(() => {
    const iv = setInterval(() => {
      setTyping(true)
      setTimeout(() => setTyping(false), 900)
    }, 3500)
    return () => clearInterval(iv)
  }, [])

  const lines = typing ? ACTIVE : IDLE

  return (
    <motion.div
      className={`relative select-none ${className}`}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      title="Hi! I'm Robo-Alex 🤖"
    >
      <svg viewBox="0 0 100 168" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
        {/* Antenna */}
        <line x1="50" y1="7" x2="50" y2="18" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" />
        <motion.circle
          cx="50" cy="4" r="4"
          fill="#a855f7"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.75, 1.25, 0.75] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />

        {/* Head */}
        <rect x="22" y="18" width="56" height="44" rx="10" fill="#374151" />
        <rect x="26" y="22" width="48" height="36" rx="8" fill="#1f2937" />

        {/* Left eye */}
        <circle cx="38" cy="38" r="7.5" fill="white" />
        <motion.ellipse
          cx="38" cy="38" rx="4.5" ry={blink ? 0.5 : 4.5}
          fill="#111827"
          transition={{ duration: 0.07 }}
        />
        <circle cx="39.5" cy="36" r="1.4" fill="white" opacity="0.7" />

        {/* Right eye */}
        <circle cx="62" cy="38" r="7.5" fill="white" />
        <motion.ellipse
          cx="62" cy="38" rx="4.5" ry={blink ? 0.5 : 4.5}
          fill="#111827"
          transition={{ duration: 0.07 }}
        />
        <circle cx="63.5" cy="36" r="1.4" fill="white" opacity="0.7" />

        {/* Smile */}
        <path d="M 40 52 Q 50 60 60 52" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />

        {/* Neck */}
        <rect x="43" y="62" width="14" height="8" rx="3" fill="#374151" />

        {/* Body */}
        <rect x="18" y="70" width="64" height="56" rx="10" fill="#374151" />
        <rect x="23" y="75" width="54" height="46" rx="7" fill="#1f2937" />

        {/* Chest screen */}
        <rect x="27" y="80" width="46" height="32" rx="5" fill="#0a0f1e" />
        {/* Code lines */}
        <rect x="31" y="86" width={lines[0]} height="2.2" rx="1" fill="#22d3ee" opacity={typing ? 0.95 : 0.45} />
        <rect x="31" y="92" width={lines[1]} height="2.2" rx="1" fill="#a855f7" opacity={typing ? 0.95 : 0.45} />
        <rect x="31" y="98" width={lines[2]} height="2.2" rx="1" fill="#22c55e" opacity={typing ? 0.95 : 0.45} />
        <rect x="31" y="104" width={lines[3]} height="2.2" rx="1" fill="#f59e0b" opacity={typing ? 0.95 : 0.45} />
        {/* Cursor blink */}
        <motion.rect
          x="31" y="104" width="4.5" height="2.2" rx="0.5"
          fill="white"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.75, repeat: Infinity }}
        />

        {/* Left arm (static) */}
        <rect x="4" y="74" width="14" height="36" rx="7" fill="#374151" />
        <rect x="2" y="104" width="16" height="10" rx="5" fill="#4b5563" />

        {/* Right arm — waves on hover */}
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: 'top center' }}
          animate={hover ? { rotate: [0, -38, 8, -32, 0] } : { rotate: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <rect x="82" y="74" width="14" height="36" rx="7" fill="#374151" />
          <rect x="82" y="104" width="16" height="10" rx="5" fill="#4b5563" />
        </motion.g>

        {/* Left leg */}
        <rect x="30" y="124" width="16" height="28" rx="7" fill="#374151" />
        <rect x="25" y="146" width="22" height="10" rx="5" fill="#4b5563" />

        {/* Right leg */}
        <rect x="54" y="124" width="16" height="28" rx="7" fill="#374151" />
        <rect x="53" y="146" width="22" height="10" rx="5" fill="#4b5563" />
      </svg>
    </motion.div>
  )
}
