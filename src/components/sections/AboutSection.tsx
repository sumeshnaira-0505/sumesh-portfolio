import { useSpring, animated } from '@react-spring/web'
import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { Download, MapPin, GraduationCap, Building2, BookOpen, FlaskConical } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import LottieAnimation from '@/components/ui/LottieAnimation'
import SectionHeading from '@/components/ui/SectionHeading'
import { SKILLS } from '@/components/sections/SkillsSection'
import { PROJECTS } from '@/components/sections/ProjectsSection'
import { CERTIFICATES } from '@/pages/CertificatesPage'

const STATS = [
  { label: 'Years Experience', value: 5,   decimals: 0, suffix: '+', percentage: 83, color: '#a855f7' },
  { label: 'Projects Delivered', value: PROJECTS.length, decimals: 0, suffix: '+', percentage: 70, color: '#10b981' },
  { label: 'Technologies',       value: SKILLS.length,       decimals: 0, suffix: '+', percentage: 90, color: '#3b82f6' },
  { label: 'Certifications',     value: CERTIFICATES.length, decimals: 0, suffix: '',  percentage: 87, color: '#f59e0b' },
]

const EDUCATION = [
  {
    degree: 'M.Sc. — Computer Science',
    short: 'MSc',
    university: 'Annamalai University',
    location: 'Chidambaram, Tamilnadu',
    year: '2026',
    color: '#a855f7',
    icon: FlaskConical,
    description: 'PG Project: Alumni Information Database Management System — Java-based CRUD app with JDBC, SQL Server, and MS Access.',
    tags: ['Java', 'JDBC', 'SQL Server', 'MS Access', 'CRUD', 'OOP'],
  },
  {
    degree: 'B.A. — English & Communications',
    short: 'BA',
    university: 'Annamalai University',
    location: 'Chidambaram, Tamilnadu',
    year: '2018',
    color: '#f59e0b',
    icon: BookOpen,
    description: 'Business Communication, Structure of Modern English, Communication Skills in English and Linguistics.',
    tags: ['Communication', 'Linguistics', 'Business English', 'Modern English'],
  },
]

const HIGHLIGHTS = [
  { icon: GraduationCap, text: 'M.Sc. Computer Science — Annamalai University' },
  { icon: Building2, text: 'Software Developer at Particle Black India Pvt. Ltd.' },
  { icon: MapPin, text: 'Based in Chennai, Tamilnadu · Open to remote roles' },
]

const EXPERIENCE = [
  {
    company: 'Particle Black India Pvt. Ltd.',
    role: 'Software Developer',
    period: 'Jun 2022 – Present',
    location: 'Chennai, Tamilnadu',
    current: true,
    bullets: [
      'Developed and maintained scalable Angular (v2+) applications using TypeScript, implementing modular and reusable components that improved UI maintainability by 30% and reduced code duplication by 25%.',
      'Designed responsive, cross-browser compatible UIs using HTML5, CSS3, SCSS, and Angular Material, improving compatibility across devices by 35%.',
      'Integrated secure third-party services including Stripe Payment APIs and Twilio SMS APIs, and implemented authentication using SAML and AWS Cognito.',
      'Implemented real-time features using Socket.IO and integrated collaboration tools such as Jitsi and OnlyOffice.',
      'Built dynamic dashboards and reporting modules using Highcharts, ApexCharts, Chart.js, and Superset.',
      'Developed dynamic form solutions using FormioJS, advanced data grids with AG-Grid, and enterprise UI components with PrimeNG and Syncfusion.',
      'Developed and maintained backend services using NestJS, Node.js, and TypeScript, building RESTful APIs and microservice-based solutions.',
      'Designed API Gateway integrations and implemented secure authentication and authorization using JWT and Passport.js.',
      'Built database-driven features using PostgreSQL and TypeORM, including entity modeling, data validation, and API integration.',
      'Created API documentation using Swagger/OpenAPI and containerized services using Docker for consistent development and deployment workflows.',
      'Optimized application performance, debugging production issues and resolving bottlenecks, reducing UI-related defects by 40%.',
      'Collaborated within Agile/Scrum environments, participating in requirement analysis, sprint planning, and client discussions to deliver high-quality solutions.',
    ],
    projects: ['TAC Healthcare', 'Child Welfare — Wyoming', 'ECMS — Indiana DCS', 'NextG Website', 'Passing Porter', 'Thereafter Website', 'PB Website'],
  },
  {
    company: 'Elixir Softlab Solutions Pvt. Ltd. (Cardinality.ai)',
    role: 'Junior Software Developer',
    period: 'Jul 2021 – May 2022',
    location: 'Chennai, Tamilnadu',
    current: false,
    bullets: [
      'Accelerated Angular feature delivery by ~20% through efficient development and testing practices.',
      'Achieved 100% design compliance by converting wireframes into fully responsive UIs.',
      'Integrated RESTful APIs, ensuring stable and seamless data flow across applications.',
      'Implemented on-page SEO and UI structure optimization, improving visibility and usability.',
      'Designed reusable UI components/libraries, reducing development effort by ~25%.',
      'Built and maintained unit/integration tests and contributed to technical documentation for better maintainability.',
      'Gained hands-on experience with CI/CD pipelines, supporting automated builds and deployments.',
      'Applied async programming, code reviews, and Agile practices to improve performance and code quality.',
    ],
    projects: ['PropStream Web Client'],
  },
]

const RADIUS = 44
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function TimelineLine({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <div ref={ref} className="relative">
      <motion.div
        className="absolute left-4 top-0 bottom-0 w-px bg-primary/30 hidden sm:block origin-top"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.4, ease: [0.33, 1, 0.68, 1] }}
      />
      {children}
    </div>
  )
}

function RadialStat({ stat, delay }: { stat: (typeof STATS)[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const targetOffset = CIRCUMFERENCE * (1 - stat.percentage / 100)

  const { strokeDashoffset, opacity, number } = useSpring({
    from: { strokeDashoffset: CIRCUMFERENCE, opacity: 0, number: 0 },
    to: inView
      ? { strokeDashoffset: targetOffset, opacity: 1, number: stat.value }
      : { strokeDashoffset: CIRCUMFERENCE, opacity: 0, number: 0 },
    delay,
    config: { tension: 55, friction: 16 },
  })

  return (
    <animated.div ref={ref} style={{ opacity }} className="flex flex-col items-center gap-3">
      <div className="relative w-32 h-32">
        {/* Subtle glow behind the ring */}
        <div
          className="absolute inset-3 rounded-full blur-xl opacity-20"
          style={{ backgroundColor: stat.color }}
        />

        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {/* Track */}
          <circle
            cx="50" cy="50" r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-border"
          />
          {/* Progress */}
          <animated.circle
            cx="50" cy="50" r={RADIUS}
            fill="none"
            stroke={stat.color}
            strokeWidth="6"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Centre value — animated counter */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <animated.span
            className="text-2xl font-bold leading-none"
            style={{ color: stat.color }}
          >
            {number.to((n) => `${n.toFixed(stat.decimals)}${stat.suffix}`)}
          </animated.span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground font-medium text-center leading-tight">
        {stat.label}
      </p>
    </animated.div>
  )
}

function EducationCard({
  edu,
  delay,
}: {
  edu: (typeof EDUCATION)[0]
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const Icon = edu.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.55, delay, ease: [0.33, 1, 0.68, 1] }}
      className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-transparent transition-all duration-300"
      style={{
        boxShadow: `0 0 0 0 ${edu.color}00`,
      }}
      whileHover={{
        boxShadow: `0 0 0 1.5px ${edu.color}55, 0 8px 32px -8px ${edu.color}40`,
        y: -4,
      }}
    >
      {/* ── Banner ── */}
      <div
        className="relative h-28 overflow-hidden px-5"
        style={{ background: `linear-gradient(135deg, ${edu.color}22 0%, ${edu.color}0a 100%)` }}
      >
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(${edu.color}40 1px, transparent 1px), linear-gradient(90deg, ${edu.color}40 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Glow blob */}
        <div
          className="absolute -top-6 -right-6 w-32 h-32 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: edu.color }}
        />

        {/* Large watermark year */}
        <span
          className="absolute right-4 top-3 font-black leading-none select-none pointer-events-none"
          style={{ fontSize: '3.5rem', color: edu.color, opacity: 0.12 }}
        >
          {edu.year}
        </span>

        {/* Short label badge */}
        <span
          className="absolute top-4 left-5 text-[10px] font-bold px-2 py-0.5 rounded-full border font-mono tracking-widest"
          style={{ color: edu.color, borderColor: `${edu.color}55`, background: `${edu.color}15` }}
        >
          {edu.short}
        </span>
      </div>

      {/* ── Icon badge — outside banner so overflow-hidden doesn't clip it ── */}
      <div className="px-5 -mt-5 mb-1">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center border-2 border-card shadow-md"
          style={{ backgroundColor: edu.color }}
        >
          <Icon size={17} className="text-white" />
        </div>
      </div>

      {/* ── Body ── */}
      <div className="px-5 pb-5 space-y-3">
        {/* Degree + university */}
        <div>
          <h3 className="font-bold text-base leading-snug">{edu.degree}</h3>
          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            <GraduationCap size={12} className="text-muted-foreground/60 shrink-0" />
            <span className="text-sm font-medium" style={{ color: edu.color }}>
              {edu.university}
            </span>
            <span className="text-muted-foreground/40 text-xs">·</span>
            <span className="text-xs text-muted-foreground">{edu.location}</span>
          </div>
          {/* Year pill */}
          <span
            className="inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full font-mono"
            style={{ background: `${edu.color}18`, color: edu.color }}
          >
            Class of {edu.year}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed">{edu.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {edu.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full font-medium border"
              style={{
                color: edu.color,
                borderColor: `${edu.color}40`,
                background: `${edu.color}10`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="About Me" className="mb-16" />

        {/* Bio + Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16"
        >
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed text-lg">
              I&apos;m <strong className="text-foreground">Sumesh Nair A</strong>, a Senior
              Software Engineer with 5+ years of experience building scalable, high-performance web
              applications using Angular, TypeScript, JavaScript (ES6+), HTML5, and CSS3. I&apos;m
              experienced in developing responsive user interfaces, integrating RESTful APIs, and
              delivering enterprise-grade solutions across healthcare, government, and business
              domains.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I also bring hands-on experience with NestJS, Node.js, PostgreSQL, TypeORM,
              Microservices, API Gateway, JWT Authentication, and Docker, enabling effective
              collaboration across full-stack development initiatives. I hold a Master&apos;s degree
              in Computer Science and a background in Communications, and I&apos;m a strong advocate
              of clean code, Agile methodologies, and cross-functional teamwork.
            </p>

            <ul className="space-y-3">
              {HIGHLIGHTS.map(({ icon: Icon, text }) => (
                <li key={text} className="text-sm text-muted-foreground flex items-center gap-2.5">
                  <span className="p-1.5 rounded-md bg-primary/10 text-primary shrink-0">
                    <Icon size={13} />
                  </span>
                  {text}
                </li>
              ))}
            </ul>

            <a
              href="/resume/sumesh-nair-resume.pdf"
              download="Sumesh_Nair_Resume.pdf"
              className={buttonVariants({ variant: 'outline' }) + ' gap-2'}
            >
              <Download size={15} />
              Download Résumé
            </a>
          </div>

          <LottieAnimation className="w-full max-w-sm mx-auto" />
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 py-4">
          {STATS.map((stat, i) => (
            <RadialStat key={stat.label} stat={stat} delay={i * 150} />
          ))}
        </div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionHeading title="Experience" className="mb-12" />

          <TimelineLine>
            <div className="space-y-10">
              {EXPERIENCE.map((job, idx) => (
                <motion.div
                  key={job.company}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="sm:pl-12 relative"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-0 top-1.5 w-8 h-8 rounded-full border-2 items-center justify-center hidden sm:flex ${
                      job.current
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'bg-card border-border text-muted-foreground'
                    }`}
                  >
                    <Building2 size={13} />
                  </div>

                  <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-base">{job.role}</h3>
                          {job.current && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-medium text-primary mt-0.5">{job.company}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{job.location}</p>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground/70 whitespace-nowrap shrink-0 mt-1">
                        {job.period}
                      </span>
                    </div>

                    {/* Bullets */}
                    <ul className="space-y-1.5 mb-4">
                      {job.bullets.map((b) => (
                        <li key={b} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary/60 mt-1 shrink-0">▸</span>
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* Projects involved */}
                    {job.projects.length > 0 && (
                      <div className="pt-3 border-t border-border">
                        <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2">
                          Projects Involved
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {job.projects.map((p) => (
                            <span
                              key={p}
                              className="text-xs px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </TimelineLine>
        </motion.div>

        {/* Education */}
        <div className="mt-16">
          <SectionHeading title="Education" className="mb-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {EDUCATION.map((edu, idx) => (
              <EducationCard key={edu.degree} edu={edu} delay={idx * 0.15} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
