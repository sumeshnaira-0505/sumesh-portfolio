import { motion } from 'framer-motion'

interface DevSpinnerProps {
  /** Outer diameter in px */
  size?: number
  /** Any valid CSS color — defaults to the theme primary */
  color?: string
  className?: string
}

export default function DevSpinner({
  size = 88,
  color = 'hsl(var(--primary))',
  className = '',
}: DevSpinnerProps) {
  const cx = size / 2
  const cy = size / 2

  // Three concentric ring radii
  const rOuter  = size * 0.43
  const rMiddle = size * 0.31
  const rInner  = size * 0.18

  // Arc lengths
  const cOuter  = 2 * Math.PI * rOuter
  const cMiddle = 2 * Math.PI * rMiddle
  const cInner  = 2 * Math.PI * rInner

  const fontSize = size * 0.175

  return (
    <div className={`flex flex-col items-center gap-5 ${className}`}>
      {/* ── Spinner rings ── */}
      <div style={{ width: size, height: size }} className="relative">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          aria-hidden="true"
        >
          {/* ── Static track rings ── */}
          <circle
            cx={cx} cy={cy} r={rOuter}
            fill="none"
            stroke="currentColor"
            strokeWidth={size * 0.035}
            className="text-border"
          />
          <circle
            cx={cx} cy={cy} r={rMiddle}
            fill="none"
            stroke="currentColor"
            strokeWidth={size * 0.03}
            className="text-border/60"
          />
          <circle
            cx={cx} cy={cy} r={rInner}
            fill="none"
            stroke="currentColor"
            strokeWidth={size * 0.025}
            className="text-border/40"
          />

          {/* ── Outer arc — rotates CW fast ── */}
          <motion.circle
            cx={cx} cy={cy} r={rOuter}
            fill="none"
            stroke={color}
            strokeWidth={size * 0.045}
            strokeLinecap="round"
            strokeDasharray={`${cOuter * 0.32} ${cOuter * 0.68}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: `${cx}px ${cy}px`, filter: `drop-shadow(0 0 ${size * 0.04}px ${color})` }}
          />

          {/* ── Middle arc — rotates CCW medium ── */}
          <motion.circle
            cx={cx} cy={cy} r={rMiddle}
            fill="none"
            stroke={color}
            strokeWidth={size * 0.038}
            strokeLinecap="round"
            strokeDasharray={`${cMiddle * 0.22} ${cMiddle * 0.78}`}
            animate={{ rotate: -360 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: `${cx}px ${cy}px`, opacity: 0.75 }}
          />

          {/* ── Inner arc — rotates CW slow ── */}
          <motion.circle
            cx={cx} cy={cy} r={rInner}
            fill="none"
            stroke={color}
            strokeWidth={size * 0.03}
            strokeLinecap="round"
            strokeDasharray={`${cInner * 0.45} ${cInner * 0.55}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: `${cx}px ${cy}px`, opacity: 0.5 }}
          />

          {/* ── Orbiting dot on outer ring ── */}
          <motion.circle
            r={size * 0.038}
            fill={color}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
            cx={cx}
            cy={cy - rOuter}
          />
        </svg>

        {/* ── Centre code brackets ── */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="font-mono font-bold select-none"
            style={{ fontSize, color, lineHeight: 1 }}
            animate={{ opacity: [1, 0.35, 1], scale: [1, 0.92, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            {'</>'}
          </motion.span>
        </div>
      </div>

      {/* ── Terminal-style loading text ── */}
      <div className="font-mono text-xs text-muted-foreground flex items-center gap-0.5 tracking-wide">
        <span className="text-primary/60 mr-1">{'>'}</span>
        <span>Compiling</span>
        {[0, 0.25, 0.5].map((delay) => (
          <motion.span
            key={delay}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.05, repeat: Infinity, delay, ease: 'easeInOut' }}
          >
            .
          </motion.span>
        ))}
        {/* blinking cursor */}
        <motion.span
          className="ml-0.5 text-primary"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        >
          ▋
        </motion.span>
      </div>
    </div>
  )
}
