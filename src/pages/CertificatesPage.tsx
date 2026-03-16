import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Award } from 'lucide-react'
import PageTransition from '@/components/ui/PageTransition'
import SectionHeading from '@/components/ui/SectionHeading'

/**
 * HOW TO ADD YOUR CERTIFICATES
 * ─────────────────────────────────────────────────────────────────────
 * 1. Drop your PDF or image file into:  public/certificates/
 *    e.g. public/certificates/postman-api.pdf
 *         public/certificates/scrum-fundamentals.jpg
 *
 * 2. Update the `file` field in the CERTIFICATES array below to match.
 * 3. Set `type` to 'pdf' or 'image' accordingly.
 * ─────────────────────────────────────────────────────────────────────
 */

interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  category: string
  file: string
  type: 'pdf' | 'image'
  color: string
}

const BASE = import.meta.env.BASE_URL

const CERTIFICATES: Certificate[] = [
  // ── Technical ──────────────────────────────────────────────────────
  {
    id: 'postman-api',
    title: 'Postman API Fundamentals Student Expert',
    issuer: 'Postman',
    date: 'Feb 2026',
    category: 'Technical',
    file: `${BASE}certificates/Postman API Fundamentals Student Expert - 2026-02-07.pdf`,
    type: 'pdf',
    color: '#f97316',
  },
  {
    id: 'responsive-web-design',
    title: 'Legacy Responsive Web Design V8',
    issuer: 'freeCodeCamp',
    date: '2022',
    category: 'Technical',
    file: `${BASE}certificates/Legacy Responsive Web Design V8 Certification.png`,
    type: 'image',
    color: '#a855f7',
  },
  // ── Analytics & Marketing ──────────────────────────────────────────
  {
    id: 'google-analytics',
    title: 'Google Analytics Certification',
    issuer: 'Google',
    date: '2024',
    category: 'Analytics & Marketing',
    file: `${BASE}certificates/Google Analytics Certification.pdf`,
    type: 'pdf',
    color: '#f59e0b',
  },
  {
    id: 'ga4-get-started',
    title: 'Get Started using Google Analytics (GA4)',
    issuer: 'Google',
    date: '2024',
    category: 'Analytics & Marketing',
    file: `${BASE}certificates/Get Started using Google Analytics (GA4).pdf`,
    type: 'pdf',
    color: '#f59e0b',
  },
  {
    id: 'ga4-dive-deeper',
    title: 'Dive Deeper into GA4 Data and Reports',
    issuer: 'Google',
    date: '2024',
    category: 'Analytics & Marketing',
    file: `${BASE}certificates/Dive Deeper into GA4 Data and Reports.pdf`,
    type: 'pdf',
    color: '#f59e0b',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Fundamentals',
    issuer: 'VMEdu Inc.',
    date: '2024',
    category: 'Analytics & Marketing',
    file: `${BASE}certificates/DigitalMarketingFundamentals-SumeshNairA-1145438.pdf`,
    type: 'pdf',
    color: '#f59e0b',
  },
  {
    id: 'marketing-strategy',
    title: 'Marketing Strategy Fundamentals',
    issuer: 'VMEdu Inc.',
    date: '2024',
    category: 'Analytics & Marketing',
    file: `${BASE}certificates/MarketingStrategyFundamentals-SumeshNairA-1145331 (1).pdf`,
    type: 'pdf',
    color: '#f59e0b',
  },
  {
    id: 'marketing-research',
    title: 'Marketing Research Fundamentals',
    issuer: 'VMEdu Inc.',
    date: '2024',
    category: 'Analytics & Marketing',
    file: `${BASE}certificates/MarketingResearchFundamentals-SumeshNairA-1145507.pdf`,
    type: 'pdf',
    color: '#f59e0b',
  },
  // ── Agile & Project Management ─────────────────────────────────────
  {
    id: 'kanban-ai',
    title: 'Kanban Essentials with AI Certified',
    issuer: 'VMEdu Inc.',
    date: '2024',
    category: 'Agile & PM',
    file: `${BASE}certificates/KanbanEssentialswithAICertified-SumeshNairA-1144991.pdf`,
    type: 'pdf',
    color: '#22c55e',
  },
  {
    id: 'scrum-fundamentals',
    title: 'Scrum Fundamentals Certified',
    issuer: 'SCRUMstudy',
    date: '2024',
    category: 'Agile & PM',
    file: `${BASE}certificates/ScrumFundamentalsCertified-SumeshNairA-1144801.pdf`,
    type: 'pdf',
    color: '#22c55e',
  },
  {
    id: 'okr-fundamentals',
    title: 'OKR Fundamentals with AI Certified',
    issuer: 'VMEdu Inc.',
    date: '2024',
    category: 'Agile & PM',
    file: `${BASE}certificates/OKRFundamentalswithAICertified-SumeshNairA-1145193.pdf`,
    type: 'pdf',
    color: '#22c55e',
  },
  // ── Business Skills ────────────────────────────────────────────────
  {
    id: 'six-sigma',
    title: 'Six Sigma Yellow Belt',
    issuer: 'VMEdu Inc.',
    date: '2024',
    category: 'Business Skills',
    file: `${BASE}certificates/SixSigmaYellowBelt-SumeshNairA-1144981.pdf`,
    type: 'pdf',
    color: '#3b82f6',
  },
  {
    id: 'business-analysis-ai',
    title: 'Business Analysis Fundamentals with AI Certified',
    issuer: 'VMEdu Inc.',
    date: '2024',
    category: 'Business Skills',
    file: `${BASE}certificates/BusinessAnalysisFundamentalswithAICertified-SumeshNairA-1145188.pdf`,
    type: 'pdf',
    color: '#3b82f6',
  },
  {
    id: 'corporate-sales',
    title: 'Corporate Sales Fundamentals',
    issuer: 'VMEdu Inc.',
    date: '2024',
    category: 'Business Skills',
    file: `${BASE}certificates/CorporateSalesFundamentals-SumeshNairA-1145511.pdf`,
    type: 'pdf',
    color: '#3b82f6',
  },
  {
    id: 'negotiation',
    title: 'Negotiation Associate',
    issuer: 'VMEdu Inc.',
    date: '2024',
    category: 'Business Skills',
    file: `${BASE}certificates/NegotiationAssociate-SumeshNairA-1145741.pdf`,
    type: 'pdf',
    color: '#3b82f6',
  },
]

const ALL_CATEGORIES = ['All', ...Array.from(new Set(CERTIFICATES.map((c) => c.category)))]

function CertCard({ cert, onClick }: { cert: Certificate; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="group border-border bg-card hover:border-primary/40 flex cursor-pointer flex-col gap-3 rounded-xl border p-5 transition-all duration-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${cert.color}22` }}
        >
          <Award size={18} style={{ color: cert.color }} />
        </div>
        <span
          className="rounded-full px-2 py-0.5 text-xs font-semibold"
          style={{ backgroundColor: `${cert.color}22`, color: cert.color }}
        >
          {cert.category}
        </span>
      </div>

      <div>
        <h3 className="group-hover:text-primary mb-1 text-sm leading-tight font-semibold transition-colors">
          {cert.title}
        </h3>
        <p className="text-muted-foreground text-xs">{cert.issuer}</p>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <span className="text-muted-foreground/60 font-mono text-xs">{cert.date}</span>
        <span className="text-primary flex items-center gap-1 text-xs opacity-0 transition-opacity group-hover:opacity-100">
          View <ExternalLink size={10} />
        </span>
      </div>
    </motion.div>
  )
}

function CertModal({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className="bg-card border-border flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="border-border flex shrink-0 items-center justify-between border-b px-6 py-4">
          <div>
            <h3 className="text-lg font-bold">{cert.title}</h3>
            <p className="text-muted-foreground text-sm">
              {cert.issuer} · {cert.date}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary border-border hover:bg-accent flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs transition-colors hover:underline"
            >
              Open <ExternalLink size={11} />
            </a>
            <button
              onClick={onClose}
              className="hover:bg-accent text-muted-foreground hover:text-foreground rounded-lg p-2 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Preview area */}
        <div className="bg-muted/30 flex min-h-[400px] flex-1 items-center justify-center overflow-hidden rounded-b-2xl">
          {cert.type === 'pdf' ? (
            <iframe
              src={`${cert.file}#toolbar=0`}
              className="h-full min-h-[400px] w-full"
              title={cert.title}
            />
          ) : (
            <img
              src={cert.file}
              alt={cert.title}
              className="max-h-full max-w-full object-contain p-4"
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function CertificatesPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selected, setSelected] = useState<Certificate | null>(null)

  const filtered =
    activeCategory === 'All'
      ? CERTIFICATES
      : CERTIFICATES.filter((c) => c.category === activeCategory)

  return (
    <PageTransition>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading
          as="h1"
          title="Certificates"
          subtitle={`${CERTIFICATES.length} certifications across technical, analytics, agile, and business domains. Click any card to preview.`}
          className="mb-12"
        />

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/40 border'
              }`}
            >
              {cat}
              {cat === 'All' ? (
                <span className="ml-1.5 opacity-60">({CERTIFICATES.length})</span>
              ) : (
                <span className="ml-1.5 opacity-60">
                  ({CERTIFICATES.filter((c) => c.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((cert) => (
              <CertCard key={cert.id} cert={cert} onClick={() => setSelected(cert)} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}
