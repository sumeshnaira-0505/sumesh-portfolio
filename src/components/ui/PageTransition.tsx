import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const defaultVariants = {
  initial: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.2, ease: 'easeIn' as const } },
}

const bounceVariants = {
  initial: { opacity: 0, scale: 0.94, y: 24 },
  enter: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 20, delay: 0.05 },
  },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2, ease: 'easeIn' as const } },
}

interface PageTransitionProps {
  children: ReactNode
  variant?: 'default' | 'bounce'
}

export default function PageTransition({ children, variant = 'default' }: PageTransitionProps) {
  const variants = variant === 'bounce' ? bounceVariants : defaultVariants

  return (
    <motion.main
      id="main-content"
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="pt-16 min-h-[calc(100vh-4rem)]"
      tabIndex={-1}
    >
      {children}
    </motion.main>
  )
}
