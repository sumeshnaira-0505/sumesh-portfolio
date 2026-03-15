import type { Meta, StoryObj } from '@storybook/react'
import { AnimatePresence } from 'framer-motion'
import PageTransition from './PageTransition'

const meta: Meta<typeof PageTransition> = {
  title: 'UI/PageTransition',
  component: PageTransition,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Wraps every page with an entrance/exit animation. `variant="default"` slides up; `variant="bounce"` uses a spring for the Fun page.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'bounce'],
      description: 'Animation style — default (slide) or bounce (spring)',
    },
  },
}

export default meta
type Story = StoryObj<typeof PageTransition>

export const Default: Story = {
  args: {
    variant: 'default',
    children: (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-2">Default transition</h1>
        <p className="text-muted-foreground">Fade + slide up over 350ms.</p>
      </div>
    ),
  },
  render: (args) => (
    <AnimatePresence mode="wait">
      <PageTransition key="default" {...args} />
    </AnimatePresence>
  ),
}

export const Bounce: Story = {
  args: {
    variant: 'bounce',
    children: (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-2">Bounce transition</h1>
        <p className="text-muted-foreground">Spring entrance — used on the Fun page.</p>
      </div>
    ),
  },
  render: (args) => (
    <AnimatePresence mode="wait">
      <PageTransition key="bounce" {...args} />
    </AnimatePresence>
  ),
}
