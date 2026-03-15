import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { ParallaxProvider } from 'react-scroll-parallax'
import ContactSection from '@/components/sections/ContactSection'

function renderContact() {
  return render(
    <MemoryRouter>
      <ParallaxProvider>
        <ContactSection />
      </ParallaxProvider>
    </MemoryRouter>,
  )
}

describe('ContactSection', () => {
  it('renders all form fields', () => {
    renderContact()
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    renderContact()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('shows validation error for empty name', async () => {
    const user = userEvent.setup()
    renderContact()
    await user.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByText(/at least 2 characters/i)).toBeInTheDocument()
    })
  })

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup()
    renderContact()
    await user.type(screen.getByLabelText(/name/i), 'Alex')
    await user.type(screen.getByLabelText(/email/i), 'not-an-email')
    await user.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument()
    })
  })

  it('inputs have aria-invalid when validation fails', async () => {
    const user = userEvent.setup()
    renderContact()
    await user.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toHaveAttribute('aria-invalid', 'true')
    })
  })

  it('error paragraphs have role="alert"', async () => {
    const user = userEvent.setup()
    renderContact()
    await user.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      const alerts = screen.getAllByRole('alert')
      expect(alerts.length).toBeGreaterThan(0)
    })
  })
})
