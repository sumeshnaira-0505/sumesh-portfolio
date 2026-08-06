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

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'TAC Healthcare Application',
    client: 'Particle Black India',
    domain: 'Healthcare',
    color: '#3b82f6',
    description:
      'Enterprise clinic management platform built on an Angular front end and a NestJS microservices backend (API Gateway, Patient, Appointment, Form Builder, Superset, Wellness services) — real-time patient records, appointment scheduling, dynamic FormioJS intake forms, embedded Superset dashboards, and Twilio-powered collaboration.',
    techStack: ['Angular', 'TypeScript', 'NestJS', 'PostgreSQL', 'PrimeNG', 'FormioJS', 'Twilio', 'Superset'],
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
      'Enterprise Case Management System for Indiana Department of Child Services — form-builder driven applications, document and training-content management with OnlyOffice in-browser editing, real-time notifications via Socket.IO, a FullCalendar scheduling module, and multi-language (i18n) support, packaged as an installable PWA.',
    techStack: ['Angular', 'TypeScript', 'FullCalendar', 'Socket.IO', 'OnlyOffice', 'ngx-bootstrap'],
  },
  {
    id: '4',
    title: 'NextG Website',
    client: 'Particle Black India',
    domain: 'Corporate',
    color: '#f59e0b',
    description:
      'Marketing website for NextG — home, about, and team pages with an animated header/footer, newsletter subscribe capture, and scroll-to-top UX, built as a lightweight custom Angular app with pixel-perfect responsive SCSS styling.',
    techStack: ['Angular', 'TypeScript', 'SCSS', 'Responsive Design'],
  },
  {
    id: '5',
    title: 'Passing Porter Application',
    client: 'Particle Black India',
    domain: 'Digital Estate Planning',
    color: '#f43f5e',
    description:
      'A post-mortem digital estate platform (EchoSafe) where individuals record video/audio messages, journals, and funeral instructions, then configure granular recipient rules through author and receiver request flows — specifying exactly who receives each asset after their passing, with subscription billing via Stripe.',
    techStack: ['Angular', 'TypeScript', 'Angular Material', 'Stripe', 'RecordRTC', 'Syncfusion Rich Text Editor'],
  },
  {
    id: '6',
    title: 'Thereafter Website',
    client: 'Particle Black India',
    domain: 'Marketing',
    color: '#06b6d4',
    description:
      'Public marketing site for Thereafter — home, about, product, security, and pricing pages explaining the platform’s post-mortem digital estate planning and encryption/security practices, built with a responsive Bootstrap layout and Slick carousels.',
    techStack: ['HTML5', 'Bootstrap', 'jQuery', 'Slick Carousel', 'CSS3'],
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
  {
    id: '8',
    title: 'PropStream Web Client',
    client: 'Cardinality.ai',
    domain: 'Real Estate / PropTech',
    color: '#84cc16',
    description:
      'Enterprise real-estate data platform for property search and investor tooling — skip-traced contacts, marketing campaigns, ADU and rehab cost calculators, and property intelligence scoring, built on interactive Google Maps views and AG-Grid Enterprise data tables.',
    techStack: ['React', 'Redux', 'Redux-Form', 'AG-Grid Enterprise', 'Google Maps API', 'Formik', 'Yup', 'SCSS'],
  },
  {
    id: '9',
    title: 'TAC Data Export Tool',
    client: 'Particle Black India',
    domain: 'Healthcare / Internal Tooling',
    color: '#ec4899',
    description:
      'Internal data-export utility for the TAC Healthcare platform — pulls Form Builder submissions, patient records, appointment data, and uploaded files per client organisation, with one-click export from a Formio-driven interface.',
    techStack: ['React', 'Vite', 'Material UI', 'Formio React', 'jsPDF', 'Axios'],
  },
  {
    id: '10',
    title: 'iCOSHH — Chemical Safety Platform',
    client: 'Freelance Work',
    domain: 'EHS / Compliance',
    color: '#14b8a6',
    description:
      'Enterprise chemical safety and compliance platform for managing hazardous-substance inventories, Safety Data Sheets (SDS), risk assessments, and multi-step approval workflows — built on an Angular front end with a NestJS/TypeORM backend and S3-backed document storage.',
    techStack: ['Angular', 'TypeScript', 'NestJS', 'PostgreSQL', 'TypeORM', 'AWS S3'],
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
