import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageTransition from '@/components/ui/PageTransition'

const GLITCH_VARIANTS = {
  animate: {
    x: [0, -3, 3, -2, 0],
    skewX: [0, -2, 2, 0],
    transition: { duration: 0.25, repeat: Infinity, repeatDelay: 3.5 },
  },
}

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        {/* Floating background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span
            className="text-[30vw] font-black text-muted-foreground/5 leading-none"
            aria-hidden="true"
          >
            404
          </span>
        </div>

        {/* Glitchy 404 */}
        <motion.h1
          className="text-8xl md:text-[10rem] font-black leading-none mb-2 relative"
          style={{ color: 'var(--color-primary)' }}
          variants={GLITCH_VARIANTS}
          animate="animate"
        >
          404
        </motion.h1>

        {/* Floating astronaut */}
        <motion.div
          className="text-6xl my-6"
          animate={{ y: [0, -18, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          🧑‍🚀
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-2xl font-bold mb-3"
        >
          Lost in space
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="text-muted-foreground max-w-sm leading-relaxed mb-8"
        >
          Houston, we have a problem. The page you&apos;re looking for has drifted
          off into the void. Maybe it was never here, maybe it just rage-quit.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="flex gap-3 flex-wrap justify-center"
        >
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            🏠 Take me home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 rounded-lg border border-border bg-card text-sm font-semibold hover:bg-accent transition-colors"
          >
            ← Go back
          </button>
        </motion.div>

        {/* Tiny easter egg */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.2 }}
          className="text-xs text-muted-foreground/40 font-mono mt-12"
        >
          Error code: USER_TYPED_WRONG_URL_AGAIN
        </motion.p>
      </div>
    </PageTransition>
  )
}
