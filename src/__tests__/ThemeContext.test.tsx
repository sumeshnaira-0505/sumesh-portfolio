import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext'

function ThemeConsumer() {
  const { theme, toggle } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggle}>Toggle</button>
    </div>
  )
}

function renderWithProvider() {
  return render(
    <ThemeProvider>
      <ThemeConsumer />
    </ThemeProvider>,
  )
}

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('defaults to light when no localStorage value', () => {
    renderWithProvider()
    expect(screen.getByTestId('theme').textContent).toBe('light')
  })

  it('reads dark from localStorage', () => {
    localStorage.setItem('theme', 'dark')
    renderWithProvider()
    expect(screen.getByTestId('theme').textContent).toBe('dark')
  })

  it('toggles from light to dark', async () => {
    const user = userEvent.setup()
    renderWithProvider()
    expect(screen.getByTestId('theme').textContent).toBe('light')
    await user.click(screen.getByRole('button', { name: /toggle/i }))
    expect(screen.getByTestId('theme').textContent).toBe('dark')
  })

  it('applies .dark class to <html> on toggle', async () => {
    const user = userEvent.setup()
    renderWithProvider()
    await user.click(screen.getByRole('button', { name: /toggle/i }))
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('persists theme choice to localStorage', async () => {
    const user = userEvent.setup()
    renderWithProvider()
    await user.click(screen.getByRole('button', { name: /toggle/i }))
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('toggles back to light on second toggle', async () => {
    const user = userEvent.setup()
    renderWithProvider()
    await act(async () => {
      await user.click(screen.getByRole('button', { name: /toggle/i }))
      await user.click(screen.getByRole('button', { name: /toggle/i }))
    })
    expect(screen.getByTestId('theme').textContent).toBe('light')
  })
})
