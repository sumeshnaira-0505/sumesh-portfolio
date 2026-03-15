import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const STRINGS = [
  { note: 'E', label: 'E4', freq: 659.25, color: '#ef4444', thickness: 1.5 },
  { note: 'B', label: 'B3', freq: 493.88, color: '#f97316', thickness: 2.0 },
  { note: 'G', label: 'G3', freq: 392.00, color: '#eab308', thickness: 2.5 },
  { note: 'D', label: 'D3', freq: 293.66, color: '#22c55e', thickness: 3.0 },
  { note: 'A', label: 'A2', freq: 220.00, color: '#3b82f6', thickness: 3.5 },
  { note: 'E', label: 'E2', freq: 164.81, color: '#a855f7', thickness: 4.0 },
]

export default function GuitarStrings() {
  const [vibrating, setVibrating] = useState<Record<number, boolean>>({})
  const [lastNote, setLastNote] = useState<string | null>(null)
  const audioRef = useRef<AudioContext | null>(null)

  const getCtx = useCallback(() => {
    if (!audioRef.current) {
      const Cls = window.AudioContext ?? (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (Cls) audioRef.current = new Cls()
    }
    return audioRef.current
  }, [])

  const pluck = useCallback((index: number, freq: number, label: string) => {
    // Vibrate animation
    setVibrating((prev) => ({ ...prev, [index]: true }))
    setLastNote(label)
    setTimeout(() => setVibrating((prev) => ({ ...prev, [index]: false })), 600)

    // Play sound
    try {
      const ctx = getCtx()
      if (!ctx) return

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      osc.type = 'sawtooth'
      osc.frequency.value = freq
      filter.type = 'lowpass'
      filter.frequency.value = freq * 8
      gain.gain.setValueAtTime(0.25, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.2)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 2.2)
    } catch {
      // Audio not supported
    }
  }, [getCtx])

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">🎸 Try the Guitar</h3>
        <motion.span
          key={lastNote}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="text-sm font-mono text-primary font-bold w-10 text-center"
        >
          {lastNote}
        </motion.span>
      </div>

      {/* Fretboard */}
      <div
        className="relative rounded-xl overflow-hidden border border-border"
        style={{ background: 'linear-gradient(to right, #292524, #44403c, #292524)' }}
      >
        {/* Frets */}
        {[0.18, 0.34, 0.50, 0.66, 0.82].map((pos) => (
          <div
            key={pos}
            className="absolute top-0 bottom-0 w-px bg-white/10"
            style={{ left: `${pos * 100}%` }}
          />
        ))}

        {/* Nut */}
        <div className="absolute top-0 bottom-0 left-0 w-2 bg-white/20" />

        <div className="px-6 py-5 space-y-3">
          {STRINGS.map((s, i) => (
            <div key={i} className="relative flex items-center gap-3">
              {/* Note label */}
              <span className="w-5 text-xs font-mono text-white/50 text-right shrink-0">{s.note}</span>

              {/* The string */}
              <div className="relative flex-1 flex items-center cursor-pointer" onClick={() => pluck(i, s.freq, s.label)}>
                <motion.div
                  className="w-full rounded-full"
                  style={{ height: s.thickness, backgroundColor: s.color }}
                  animate={
                    vibrating[i]
                      ? { scaleY: [1, 3, 1, 2.5, 1, 1.8, 1], scaleX: [1, 0.98, 1] }
                      : { scaleY: 1 }
                  }
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  whileHover={{ scaleY: 2, opacity: 0.9 }}
                  whileTap={{ scale: 0.98 }}
                />
                {/* Ripple on pluck */}
                {vibrating[i] && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: s.color }}
                    initial={{ opacity: 0.4, scaleX: 1 }}
                    animate={{ opacity: 0, scaleX: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
              </div>

              {/* Frequency label */}
              <span className="w-10 text-xs font-mono text-white/30 shrink-0">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2 text-center">
        Click or tap a string to play it 🎵
      </p>
    </div>
  )
}
