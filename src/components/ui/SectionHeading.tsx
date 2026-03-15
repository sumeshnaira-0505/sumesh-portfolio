import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  as?: 'h1' | 'h2'
  /** Override the container bottom margin class. Default: 'mb-14' */
  className?: string
}

/**
 * Scroll-triggered heading with a masked text-reveal and animated underline bar.
 * Uses useInView so each heading fires independently as the user scrolls.
 */
export default function SectionHeading({
  title,
  subtitle,
  as: Tag = 'h2',
  className = 'mb-14',
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })

  return (
    <div ref={ref} className={`text-center ${className}`}>
      {/* Overflow-hidden mask — text slides up into view */}
      <div className="overflow-hidden mb-4">
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1] }}
        >
          <Tag className={`${Tag === 'h1' ? 'text-4xl' : 'text-3xl'} font-bold`}>
            {title}
          </Tag>
        </motion.div>
      </div>

      {/* Accent bar draws from left → right */}
      <div className="flex justify-center mb-0">
        <motion.div
          className="h-1 bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: 64 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
        />
      </div>

      {subtitle && (
        <motion.p
          className="text-muted-foreground max-w-md mx-auto mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
