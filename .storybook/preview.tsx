import type { Preview } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '../src/contexts/ThemeContext'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0a0a0a' },
      ],
    },
    layout: 'centered',
    a11y: {
      // axe-core config — enforce WCAG 2.1 AA
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <ThemeProvider>
          <div className="min-h-screen bg-background text-foreground p-8">
            <Story />
          </div>
        </ThemeProvider>
      </MemoryRouter>
    ),
  ],
}

export default preview
