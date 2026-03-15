import { useState } from 'react'
import { motion } from 'framer-motion'

interface Hobby {
  emoji: string
  title: string
  front: string
  back: string
  color: string
}

const HOBBIES: Hobby[] = [
  {
    emoji: '🎬',
    title: 'Movies',
    front: 'Five languages, one passion. Telugu, Tamil, Malayalam, Hindi, and Hollywood — no subtitles needed.',
    back: 'Malayalam cinema for the craft. Telugu for the mass entertainers. Tamil for the emotion. Hollywood for the scale. Hindi when the mood strikes. Always watching something.',
    color: '#f97316',
  },
  {
    emoji: '🏍️',
    title: 'Bike Travel',
    front: 'Long-distance bike rides are my reset button. The road is the best debugger — clears everything.',
    back: 'Longest ride: Chennai → Rameshwaram → Dhanushkodi → Sivakasi → Chennai. The stretch to Dhanushkodi — where the road ends and two seas meet — is something else entirely.',
    color: '#22c55e',
  },
  {
    emoji: '🎵',
    title: 'Music',
    front: 'From Tamil film music to old Hindi classics — music is the best background for long coding sessions.',
    back: 'A. R. Rahman is the GOAT. Carnatic classical on Sundays. Playlists change with the mood, never with the build status.',
    color: '#a855f7',
  },
  {
    emoji: '📚',
    title: 'Certifications',
    front: '13 certifications and counting. There\'s always something new to learn — the internet is basically a free university.',
    back: 'Scrum, Six Sigma, Postman, Google Analytics… the collection grows. The goal: make every new cert add real value, not just a badge.',
    color: '#3b82f6',
  },
]

function FlipCard({ hobby }: { hobby: Hobby }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="relative w-full cursor-pointer"
      style={{ perspective: 1000, height: 220 }}
      onClick={() => setFlipped((v) => !v)}
      title="Click to flip"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%', position: 'relative' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl border border-border bg-card p-6 flex flex-col items-center justify-center gap-3 text-center backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="text-5xl">{hobby.emoji}</span>
          <h3 className="text-lg font-bold" style={{ color: hobby.color }}>
            {hobby.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{hobby.front}</p>
          <span className="text-xs text-muted-foreground/50 mt-2">Click to flip</span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl border border-border p-6 flex flex-col items-center justify-center gap-3 text-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, ${hobby.color}18, ${hobby.color}08)`,
            borderColor: `${hobby.color}40`,
          }}
        >
          <span className="text-4xl">🔍</span>
          <p className="text-sm leading-relaxed">{hobby.back}</p>
          <span className="text-xs text-muted-foreground/50 mt-2">Click to flip back</span>
        </div>
      </motion.div>
    </div>
  )
}

export default function HobbyCards() {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">🙋 When I&apos;m Not Coding</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {HOBBIES.map((hobby) => (
          <FlipCard key={hobby.title} hobby={hobby} />
        ))}
      </div>
    </div>
  )
}
