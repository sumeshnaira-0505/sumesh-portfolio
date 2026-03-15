import PageTransition from '@/components/ui/PageTransition'
import GuitarStrings from '@/components/interactive/GuitarStrings'
import HobbyCards from '@/components/interactive/HobbyCards'
import BugSquasher from '@/components/interactive/BugSquasher'
import AnimatedMascot from '@/components/ui/AnimatedMascot'
import { motion } from 'framer-motion'

export default function FunPage() {
  return (
    <PageTransition variant="bounce">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-12">
          <AnimatedMascot className="w-28 h-auto shrink-0" />
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-4xl font-bold mb-2"
            >
              The Fun Zone 🎉
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-muted-foreground leading-relaxed"
            >
              You found the secret page! This is where the real Sumesh lives —
              a developer who watches movies in five languages, rides bikes to
              where the road literally ends, and squashes bugs for fun (both kinds).
            </motion.p>
          </div>
        </div>

        {/* Konami hint */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-10 p-4 rounded-xl border border-border bg-card text-sm text-muted-foreground font-mono text-center"
        >
          🕹️ You got here via the Konami code? You&apos;re a legend.
          <br />
          <span className="text-xs opacity-60">Typing: S-U-M-E-S-H — always works.</span>
        </motion.div>

        {/* Grid of goodies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <GuitarStrings />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            <BugSquasher />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="lg:col-span-2"
          >
            <HobbyCards />
          </motion.div>
        </div>

        {/* Footer nudge */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="text-center text-xs text-muted-foreground/50 mt-12 font-mono"
        >
          Psst — try clicking the logo 5 times on any page 😏
        </motion.p>
      </div>
    </PageTransition>
  )
}
