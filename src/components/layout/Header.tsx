import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavLink, useNavigate } from 'react-router-dom'
import { Sun, Moon, Menu, X, User, FolderGit2, Cpu, Award, Mail } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

const NAV_ITEMS = [
  { label: 'About',        to: '/about',        icon: User },
  { label: 'Projects',     to: '/projects',     icon: FolderGit2 },
  { label: 'Skills',       to: '/skills',       icon: Cpu },
  { label: 'Certificates', to: '/certificates', icon: Award },
  { label: 'Contact',      to: '/contact',      icon: Mail },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [logoHints, setLogoHints] = useState(0)
  const [logoShake, setLogoShake] = useState(false)
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const clickCountRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLogoClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    if (resetRef.current) clearTimeout(resetRef.current)
    clickCountRef.current += 1
    const count = clickCountRef.current
    if (count >= 5) {
      clickCountRef.current = 0
      setLogoHints(0)
      setLogoShake(true)
      navigate('/')
      setTimeout(() => { setLogoShake(false); navigate('/fun') }, 500)
    } else {
      setLogoHints(count)
      resetRef.current = setTimeout(() => {
        clickCountRef.current = 0
        setLogoHints(0)
      }, 2000)
    }
  }, [navigate])

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-background/90 backdrop-blur-md shadow-sm border-b border-border'
          : ''
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">

        {/* ── Logo ── */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          animate={logoShake ? { x: [-4, 4, -4, 4, 0] } : { x: 0 }}
          transition={logoShake ? { duration: 0.4 } : {}}
        >
          <NavLink
            to="/"
            onClick={handleLogoClick}
            className="inline-flex items-baseline gap-1.5 group"
          >
            <span className="text-xl font-black tracking-tight text-foreground">
              {'<'}
              <span className="text-primary">SN</span>
              {'/>'}
            </span>
            {logoHints > 0 && logoHints < 5 && (
              <span className="text-xs text-primary font-mono opacity-70">
                {5 - logoHints}×
              </span>
            )}
          </NavLink>
        </motion.div>

        {/* ── Desktop nav pill ── */}
        <ul
          className="hidden md:flex items-center list-none m-0 p-0 gap-0 rounded-full border border-border/60 bg-background/50 backdrop-blur-sm px-1 py-1"
          onMouseLeave={() => setHoveredNav(null)}
        >
          {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
            <li key={to} className="relative">
              <NavLink to={to}>
                {({ isActive }) => (
                  <div
                    className="relative px-3.5 py-1.5 rounded-full cursor-pointer"
                    onMouseEnter={() => setHoveredNav(to)}
                  >
                    {/* Hover ghost */}
                    {hoveredNav === to && !isActive && (
                      <motion.div
                        layoutId="nav-hover-ghost"
                        className="absolute inset-0 rounded-full bg-accent"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}

                    {/* Active sliding pill */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-primary"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}

                    {/* Label + icon */}
                    <span
                      className={`relative z-10 flex items-center gap-1.5 text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-primary-foreground'
                          : 'text-muted-foreground'
                      }`}
                    >
                      <Icon size={13} className="shrink-0" />
                      {label}
                    </span>
                  </div>
                )}
              </NavLink>
            </li>
          ))}

          {/* Theme toggle inside the pill bar */}
          <li className="ml-1 pl-1 border-l border-border/50">
            <ThemeToggle theme={theme} toggle={toggle} />
          </li>
        </ul>

        {/* ── Mobile controls ── */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle theme={theme} toggle={toggle} />
          <motion.button
            onClick={() => setMobileOpen((v) => !v)}
            className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle mobile menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-md"
          >
            <ul className="px-4 py-3 space-y-1 list-none m-0">
              {NAV_ITEMS.map(({ label, to, icon: Icon }, idx) => (
                <motion.li
                  key={to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <NavLink
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                      }`
                    }
                  >
                    <Icon size={15} />
                    {label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function ThemeToggle({ theme, toggle }: { theme: string; toggle: () => void }) {
  return (
    <motion.button
      onClick={toggle}
      className="relative p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors overflow-hidden"
      whileTap={{ scale: 0.85 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -16, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 16, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.18 }}
          className="block"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
