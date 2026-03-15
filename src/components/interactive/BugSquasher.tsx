import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Bug {
  id: number
  x: number
  y: number
  emoji: string
  speed: number
}

const BUG_EMOJIS = ['🐛', '🐞', '🦟', '🪲', '🦗']
const GAME_DURATION = 30

let nextId = 0

export default function BugSquasher() {
  const [phase, setPhase] = useState<'idle' | 'playing' | 'over'>('idle')
  const [bugs, setBugs] = useState<Bug[]>([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [squashed, setSquashed] = useState<number[]>([])
  const [highScore, setHighScore] = useState(() => {
    try { return parseInt(localStorage.getItem('bugSquasherHigh') ?? '0', 10) } catch { return 0 }
  })

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const spawnRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const areaRef = useRef<HTMLDivElement>(null)

  const spawnBug = useCallback(() => {
    const area = areaRef.current
    if (!area) return
    const { width, height } = area.getBoundingClientRect()
    setBugs((prev) => [
      ...prev.slice(-14),
      {
        id: nextId++,
        x: Math.random() * (width - 48),
        y: Math.random() * (height - 48),
        emoji: BUG_EMOJIS[Math.floor(Math.random() * BUG_EMOJIS.length)],
        speed: 0.4 + Math.random() * 0.5,
      },
    ])
  }, [])

  const startGame = useCallback(() => {
    setBugs([])
    setScore(0)
    setSquashed([])
    setTimeLeft(GAME_DURATION)
    setPhase('playing')
  }, [])

  const squash = useCallback((id: number) => {
    setSquashed((prev) => [...prev, id])
    setBugs((prev) => prev.filter((b) => b.id !== id))
    setScore((s) => s + 1)
    setTimeout(() => setSquashed((prev) => prev.filter((x) => x !== id)), 350)
  }, [])

  // Countdown
  useEffect(() => {
    if (phase !== 'playing') return
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setPhase('over')
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [phase])

  // Spawn bugs
  useEffect(() => {
    if (phase !== 'playing') return
    spawnBug()
    spawnRef.current = setInterval(spawnBug, 900)
    return () => { if (spawnRef.current) clearInterval(spawnRef.current) }
  }, [phase, spawnBug])

  // Save high score
  useEffect(() => {
    if (phase === 'over' && score > highScore) {
      setHighScore(score)
      try { localStorage.setItem('bugSquasherHigh', String(score)) } catch { /* ignore */ }
    }
  }, [phase, score, highScore])

  const urgentColor = timeLeft <= 5 ? 'text-red-500' : timeLeft <= 10 ? 'text-amber-500' : 'text-foreground'

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">🐛 Bug Squasher</h3>
        <span className="text-xs text-muted-foreground font-mono">Best: {highScore}</span>
      </div>

      {/* Game arena */}
      <div
        ref={areaRef}
        className="relative rounded-xl border border-border bg-card overflow-hidden select-none"
        style={{ height: 260 }}
      >
        {phase === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span className="text-5xl">🐞</span>
            <p className="text-sm text-muted-foreground text-center px-4">
              Squash as many bugs as you can in {GAME_DURATION} seconds!
            </p>
            <button
              onClick={startGame}
              className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Start Game
            </button>
          </div>
        )}

        {phase === 'over' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm z-10">
            <span className="text-5xl">{score >= highScore && score > 0 ? '🏆' : '💀'}</span>
            <p className="text-xl font-bold">{score >= highScore && score > 0 ? 'New High Score!' : 'Time\'s Up!'}</p>
            <p className="text-3xl font-mono font-bold text-primary">{score}</p>
            <button
              onClick={startGame}
              className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Play Again
            </button>
          </div>
        )}

        {phase === 'playing' && (
          <AnimatePresence>
            {bugs.map((bug) => (
              <motion.button
                key={bug.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ position: 'absolute', left: bug.x, top: bug.y, fontSize: 28, lineHeight: 1 }}
                onClick={() => squash(bug.id)}
                className="w-10 h-10 flex items-center justify-center cursor-pointer hover:scale-125 transition-transform"
                aria-label="Squash bug"
              >
                {bug.emoji}
              </motion.button>
            ))}
          </AnimatePresence>
        )}

        {/* HUD */}
        {phase === 'playing' && (
          <div className="absolute top-2 left-0 right-0 flex justify-between px-4 pointer-events-none">
            <span className="text-sm font-mono font-bold bg-card/80 px-2 py-0.5 rounded-md">
              🎯 {score}
            </span>
            <span className={`text-sm font-mono font-bold bg-card/80 px-2 py-0.5 rounded-md ${urgentColor}`}>
              ⏱ {timeLeft}s
            </span>
          </div>
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-2 text-center">
        Click/tap bugs to squash them before time runs out!
      </p>
    </div>
  )
}
