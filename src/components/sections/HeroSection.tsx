import { motion } from 'framer-motion'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import { Parallax } from 'react-scroll-parallax'
import { Button } from '@/components/ui/button'
import ParticlesBackground from '@/components/ui/ParticlesBackground'
import AnimatedMascot from '@/components/ui/AnimatedMascot'
import { useNavigate } from 'react-router-dom'
import { Github, Linkedin, Mail, Phone } from 'lucide-react'

const ROLES = [
  'Front-End Developer',
  'Angular Specialist',
  'TypeScript Expert',
  'UI/UX Developer',
]

const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com/sumeshnaira-0505', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/sumesh-nair-a-107sms0505', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:sumeshnaira@gmail.com', label: 'Email' },
  { icon: Phone, href: 'tel:+916381474524', label: 'Phone' },
]

export default function HeroSection() {
  const navigate = useNavigate()

  const [text] = useTypewriter({
    words: ROLES,
    loop: true,
    typeSpeed: 65,
    deleteSpeed: 35,
    delaySpeed: 2000,
  })

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden px-6">
      <ParticlesBackground />

      {/* Decorative blurred orbs */}
      <Parallax speed={5} className="absolute top-16 -left-16 pointer-events-none">
        <div className="w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
      </Parallax>
      <Parallax speed={-5} className="absolute bottom-16 -right-16 pointer-events-none">
        <div className="w-96 h-96 rounded-full bg-primary/8 blur-3xl" />
      </Parallax>

      {/* Mascot — desktop only, right side */}
      <motion.div
        className="absolute right-8 bottom-12 hidden xl:block pointer-events-none"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <AnimatedMascot className="w-36 h-auto" />
      </motion.div>

      <Parallax speed={-4} className="w-full max-w-3xl mx-auto text-center relative z-10">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-sm text-muted-foreground mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          4.8+ years · Angular &amp; TypeScript · Chennai, India
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
        >
          Hi, I&apos;m{' '}
          <span className="text-primary">Sumesh Nair</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground mb-6 h-9"
        >
          <span>{text}</span>
          <Cursor cursorStyle="|" cursorBlinking cursorColor="currentColor" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
        >
          I build scalable Angular applications with a strong focus on performance, reusability, and
          clean code. 4.8+ years delivering enterprise-grade solutions across healthcare, government,
          and commercial domains.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex gap-4 justify-center flex-wrap mb-10"
        >
          <Button size="lg" onClick={() => navigate('/projects')}>
            View My Work
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/contact')}>
            Let&apos;s Talk
          </Button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex gap-4 justify-center"
        >
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg border border-border bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </motion.div>
      </Parallax>
    </section>
  )
}
