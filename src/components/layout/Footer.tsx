import { useState } from 'react'
import { Github, Linkedin, Mail, Heart, Phone } from 'lucide-react'
import FlipText from '@/components/ui/FlipText'

const SOCIAL = [
  { icon: Github, href: 'https://github.com/sumeshnaira-0505', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/sumesh-nair-a-107sms0505', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:sumeshnaira@gmail.com', label: 'Email' },
  { icon: Phone, href: 'tel:+916381474524', label: 'Phone' },
]

const NAV = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Skills', href: '/skills' },
  { label: 'Certificates', href: '/certificates' },
  { label: 'Contact', href: '/contact' },
]

function FlipNavLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <li>
      <a
        href={href}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <FlipText text={label} trigger={hovered} speed={90} stagger={70} flipCount={12} />
      </a>
    </li>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <p className="font-bold text-lg mb-2">Sumesh Nair A</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Front-End Developer specialising in Angular &amp; TypeScript — building scalable,
              high-performance web applications.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Navigation
            </p>
            <ul className="space-y-2">
              {NAV.map((item) => (
                <FlipNavLink key={item.label} label={item.label} href={item.href} />
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Connect
            </p>
            <div className="flex gap-3">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg border border-border hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sumesh Nair. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart size={11} className="text-red-500 fill-red-500" /> using React &amp;
            TypeScript
          </p>
        </div>
      </div>
    </footer>
  )
}
