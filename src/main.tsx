import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ParallaxProvider } from 'react-scroll-parallax'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './contexts/ThemeContext'
import { queryClient } from './lib/queryClient'
import { reportWebVitals } from './lib/vitals'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ParallaxProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ParallaxProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)

// Report Core Web Vitals (CLS, FID, FCP, LCP, TTFB)
import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
  onCLS(reportWebVitals)
  onFCP(reportWebVitals)
  onLCP(reportWebVitals)
  onTTFB(reportWebVitals)
  onINP(reportWebVitals)
})
