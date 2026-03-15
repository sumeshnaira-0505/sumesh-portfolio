import type { Meta, StoryObj } from '@storybook/react'
import AnimatedMascot from './AnimatedMascot'

const meta: Meta<typeof AnimatedMascot> = {
  title: 'UI/AnimatedMascot',
  component: AnimatedMascot,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'SVG robot mascot "Robo-Alex". Floats vertically, blinks at random intervals, shows typing animation on the chest screen, and waves on hover.',
      },
    },
  },
  argTypes: {
    className: { control: 'text', description: 'Tailwind classes for sizing/positioning' },
  },
}

export default meta
type Story = StoryObj<typeof AnimatedMascot>

export const Default: Story = {
  args: { className: 'w-40 h-auto' },
}

export const Small: Story = {
  args: { className: 'w-20 h-auto' },
}

export const Large: Story = {
  args: { className: 'w-64 h-auto' },
}

export const HeroPlacement: Story = {
  render: () => (
    <div className="relative w-[320px] h-[400px] border border-dashed border-border rounded-xl flex items-end justify-center p-4">
      <p className="absolute top-4 left-4 text-xs text-muted-foreground font-mono">
        Hero section preview
      </p>
      <AnimatedMascot className="w-48 h-auto" />
    </div>
  ),
}
