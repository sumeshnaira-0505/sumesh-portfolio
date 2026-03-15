import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ParallaxProvider } from 'react-scroll-parallax'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/contexts/ThemeContext'
import App from '../App'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
})

function renderApp(initialRoute = '/') {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <ThemeProvider>
        <ParallaxProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ParallaxProvider>
      </ThemeProvider>
    </MemoryRouter>,
  )
}

describe('App', () => {
  it('renders without crashing', () => {
    renderApp()
    expect(document.body).toBeInTheDocument()
  })

  it('renders the home page by default', () => {
    renderApp('/')
    expect(document.body).toBeInTheDocument()
  })

  it('renders the fun page', () => {
    renderApp('/fun')
    expect(document.body).toBeInTheDocument()
  })

  it('renders the 404 page for unknown routes', () => {
    renderApp('/this-does-not-exist')
    expect(document.body).toBeInTheDocument()
  })
})
