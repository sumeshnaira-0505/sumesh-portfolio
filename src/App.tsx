import { useEffect, useRef, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnimatedCursor from '@/components/ui/AnimatedCursor'
import CursorTrail from '@/components/ui/CursorTrail'
import KonamiCode from '@/components/easter-eggs/KonamiCode'
import ScrollToTop from '@/components/ui/ScrollToTop'
import DevSpinner from '@/components/ui/DevSpinner'

// Lazy-loaded pages — each becomes its own JS chunk
const HomePage = lazy(() => import('@/pages/HomePage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'))
const SkillsPage = lazy(() => import('@/pages/SkillsPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const FunPage = lazy(() => import('@/pages/FunPage'))
const CertificatesPage = lazy(() => import('@/pages/CertificatesPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

function PageLoader() {
  return (
    <div className="pt-16 min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <DevSpinner size={88} />
    </div>
  )
}

function App() {
  const location = useLocation()

  // Console easter egg for curious devs — ref guard prevents StrictMode double-fire
  const consoleFired = useRef(false)
  useEffect(() => {
    if (consoleFired.current) return
    consoleFired.current = true
    const style = (color: string) => `color:${color};font-weight:bold;font-size:14px`
    console.log('%c👋 Hey, you found the console!', style('#a855f7'))
    console.log('%cYou must be a developer. I respect that.', style('#3b82f6'))
    console.log('%c🕹️  Try typing: S-U-M-E-S-H anywhere on the page...', style('#22c55e'))
    console.log('%c🎸  Or click the logo 5 times...', style('#f59e0b'))
    console.log('%c📬  sumeshnaira@gmail.com — let\'s build something cool.', style('#ec4899'))
  }, [])

  return (
    <>
      {/* Skip to main content — keyboard / screen reader nav */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:text-sm focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>

      <AnimatedCursor />
      <CursorTrail />
      <KonamiCode />
      <ScrollToTop />

      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/fun" element={<FunPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
        <Footer />
      </div>
    </>
  )
}

export default App
