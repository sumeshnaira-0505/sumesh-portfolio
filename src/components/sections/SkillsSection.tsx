import { motion } from 'framer-motion'
import type { Skill } from '@/types'
import SectionHeading from '@/components/ui/SectionHeading'

export const SKILLS: Skill[] = [
  // Core Frontend Technologies
  { name: 'Angular (v2+)', category: 'frontend', level: 'expert' },
  { name: 'TypeScript', category: 'frontend', level: 'expert' },
  { name: 'JavaScript (ES6+)', category: 'frontend', level: 'expert' },
  { name: 'HTML5 / CSS3', category: 'frontend', level: 'expert' },
  { name: 'SCSS / SASS', category: 'frontend', level: 'expert' },
  { name: 'React', category: 'frontend', level: 'beginner' },
  { name: 'jQuery', category: 'frontend', level: 'intermediate' },
  // UI Libraries & Data Visualization
  { name: 'Angular Material', category: 'libraries', level: 'advanced' },
  { name: 'PrimeNG', category: 'libraries', level: 'advanced' },
  { name: 'AG-Grid', category: 'libraries', level: 'advanced' },
  { name: 'Bootstrap', category: 'libraries', level: 'advanced' },
  { name: 'FormioJS', category: 'libraries', level: 'advanced' },
  { name: 'Syncfusion', category: 'libraries', level: 'intermediate' },
  { name: 'Highcharts', category: 'libraries', level: 'advanced' },
  { name: 'ApexCharts', category: 'libraries', level: 'advanced' },
  { name: 'Chart.js', category: 'libraries', level: 'advanced' },
  { name: 'FullCalendar', category: 'libraries', level: 'advanced' },
  // Backend & Database
  { name: 'NestJS', category: 'backend', level: 'intermediate' },
  { name: 'Node.js', category: 'backend', level: 'intermediate' },
  { name: 'Express.js', category: 'backend', level: 'intermediate' },
  { name: 'PostgreSQL', category: 'backend', level: 'intermediate' },
  { name: 'TypeORM', category: 'backend', level: 'intermediate' },
  { name: 'Microservices Architecture', category: 'backend', level: 'advanced' },
  { name: 'API Gateway', category: 'backend', level: 'advanced' },
  { name: 'Swagger / OpenAPI', category: 'backend', level: 'advanced' },
  { name: 'Axios', category: 'backend', level: 'advanced' },
  { name: 'Docker', category: 'backend', level: 'advanced' },
  // Integrations & Services
  { name: 'RESTful APIs', category: 'integrations', level: 'expert' },
  { name: 'Socket.IO', category: 'integrations', level: 'advanced' },
  { name: 'AWS Cognito', category: 'integrations', level: 'advanced' },
  { name: 'SAML Integration', category: 'integrations', level: 'advanced' },
  { name: 'JWT Authentication', category: 'integrations', level: 'advanced' },
  { name: 'Stripe Payments', category: 'integrations', level: 'advanced' },
  { name: 'Twilio SMS', category: 'integrations', level: 'intermediate' },
  { name: 'Jitsi', category: 'integrations', level: 'intermediate' },
  { name: 'OnlyOffice', category: 'integrations', level: 'intermediate' },
  { name: 'Superset', category: 'integrations', level: 'intermediate' },
  { name: 'Miniature Earth', category: 'integrations', level: 'intermediate' },
  { name: 'Encryption / Decryption', category: 'integrations', level: 'advanced' },
  { name: 'API Rate Limiting', category: 'integrations', level: 'intermediate' },
  // Tools & Workflow
  { name: 'Git', category: 'tools', level: 'expert' },
  { name: 'Figma', category: 'tools', level: 'intermediate' },
  { name: 'Jira', category: 'tools', level: 'expert' },
  { name: 'Responsive Design', category: 'tools', level: 'expert' },
  { name: 'jsPDF', category: 'tools', level: 'intermediate' },
  { name: 'DTO Validation', category: 'tools', level: 'intermediate' },
  { name: 'Environment Configuration', category: 'tools', level: 'advanced' },
]

const CATEGORIES: { key: Skill['category']; label: string; emoji: string }[] = [
  { key: 'frontend', label: 'Core Technologies', emoji: '⚡' },
  { key: 'libraries', label: 'UI Libraries & Visualization', emoji: '🎨' },
  { key: 'backend', label: 'Backend & Database', emoji: '🖥️' },
  { key: 'integrations', label: 'Integrations & APIs', emoji: '🔌' },
  { key: 'tools', label: 'Tools & Workflow', emoji: '🛠️' },
]

const LEVEL_STYLES: Record<Skill['level'], string> = {
  beginner: 'bg-muted text-muted-foreground',
  intermediate:
    'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50',
  advanced:
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50',
  expert:
    'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/50 font-semibold',
}

const LEVEL_LABELS: Record<Skill['level'], string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
}

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="Skills"
          subtitle="Technologies and tools I work with across frontend development, backend services, and integrations."
        />

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {(Object.entries(LEVEL_LABELS) as [Skill['level'], string][]).map(([level, label]) => (
            <span key={level} className={`text-xs px-3 py-1 rounded-full ${LEVEL_STYLES[level]}`}>
              {label}
            </span>
          ))}
        </motion.div>

        <div className="space-y-10">
          {CATEGORIES.map((cat) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                {cat.emoji} {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {SKILLS.filter((s) => s.category === cat.key).map((skill, i) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    title={LEVEL_LABELS[skill.level]}
                    className={`px-4 py-2 rounded-full text-sm cursor-default ${LEVEL_STYLES[skill.level]}`}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
