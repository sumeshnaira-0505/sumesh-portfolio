import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Briefcase, ArrowUpRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  client: string
  domain: string
  color: string
}

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'TAC Healthcare Application',
    client: 'Particle Black India',
    domain: 'Healthcare',
    color: '#3b82f6',
    description:
      'Enterprise healthcare management platform with real-time patient data, appointment scheduling, dynamic reporting dashboards, and live collaboration features.',
    techStack: ['Angular', 'TypeScript', 'PrimeNG', 'AG-Grid', 'Chart.js', 'Socket.IO', 'Jitsi'],
  },
  {
    id: '2',
    title: 'Child Welfare — Wyoming',
    client: 'Wyoming State Government',
    domain: 'Government',
    color: '#10b981',
    description:
      'Government child welfare case management system for Wyoming state. Secure workflows with SAML authentication, dynamic form-driven data entry, and compliance-ready reporting.',
    techStack: ['Angular', 'TypeScript', 'FormioJS', 'Highcharts', 'SAML', 'AG-Grid', 'SCSS'],
  },
  {
    id: '3',
    title: 'ECMS — Indiana DCS',
    client: 'Indiana Dept. of Child Services',
    domain: 'Government',
    color: '#a855f7',
    description:
      'Enterprise Case Management System for Indiana Department of Child Services. Complex multi-step workflows, role-based access, data grids, and integrated document handling.',
    techStack: ['Angular', 'TypeScript', 'AG-Grid', 'Highcharts', 'RESTful APIs', 'Bootstrap'],
  },
  {
    id: '4',
    title: 'NextG Website',
    client: 'Particle Black India',
    domain: 'Corporate',
    color: '#f59e0b',
    description:
      'Modern corporate website with pixel-perfect responsive design, SEO-optimised structure, animated UI components, and CMS-driven content management.',
    techStack: ['Angular', 'TypeScript', 'Angular Material', 'SCSS', 'Responsive Design'],
  },
  {
    id: '5',
    title: 'Passing Porter Application',
    client: 'Particle Black India',
    domain: 'Digital Estate Planning',
    color: '#f43f5e',
    description:
      'A post-mortem digital estate platform where individuals securely store personal documents, media, and sensitive information, then configure granular access rules — specifying exactly who can view, receive, or manage each asset after their passing.',
    techStack: ['Angular', 'TypeScript', 'Stripe', 'Twilio', 'Socket.IO', 'AWS Cognito'],
  },
  {
    id: '6',
    title: 'Thereafter Website',
    client: 'Particle Black India',
    domain: 'Platform',
    color: '#06b6d4',
    description:
      'Multi-functional web platform featuring user authentication via AWS Cognito, real-time communication, integrated collaboration tools, and advanced charting and analytics.',
    techStack: ['Angular', 'TypeScript', 'AWS Cognito', 'Socket.IO', 'OnlyOffice', 'Superset'],
  },
  {
    id: '7',
    title: 'PB Website',
    client: 'Particle Black India',
    domain: 'Corporate',
    color: '#f97316',
    description:
      'Company flagship website for Particle Black India — showcasing services, team, and portfolio with polished animations, performance-optimised assets, and a responsive layout.',
    techStack: ['Angular', 'TypeScript', 'Angular Material', 'SCSS', 'ApexCharts'],
  },
]

async function fetchProjects(): Promise<Project[]> {
  return PROJECTS
}

export default function ProjectsSection() {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  })

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Projects"
          subtitle="Enterprise and commercial projects delivered across healthcare, government, and business domains."
        />

        {isLoading ? (
          <div className="text-center text-muted-foreground py-20">Loading projects…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group relative rounded-2xl border border-border bg-card overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Coloured accent bar */}
                <div
                  className="h-1 w-full"
                  style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}88)` }}
                />

                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{ boxShadow: `inset 0 0 40px 0 ${project.color}12` }}
                />

                <div className="flex flex-col flex-1 p-6 gap-4">
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-3">
                    {/* Domain badge */}
                    <span
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0"
                      style={{ backgroundColor: `${project.color}18`, color: project.color }}
                    >
                      {project.domain}
                    </span>

                    {/* Arrow icon */}
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shrink-0"
                      style={{ backgroundColor: `${project.color}18` }}
                    >
                      <ArrowUpRight size={14} style={{ color: project.color }} />
                    </div>
                  </div>

                  {/* Title + client */}
                  <div>
                    <h3 className="text-base font-bold leading-snug mb-1.5 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
                      <Briefcase size={11} />
                      {project.client}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
