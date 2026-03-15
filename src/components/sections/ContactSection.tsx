import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Send, Linkedin, Mail, Phone } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { Button } from '@/components/ui/button'
import SectionHeading from '@/components/ui/SectionHeading'

// ── EmailJS config ────────────────────────────────────────────────────────────
// Replace these three values with your own from https://emailjs.com
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(4, 'Subject must be at least 4 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const INPUT_CLASS =
  'w-full px-4 py-2.5 rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors text-sm'

const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Email',
    value: 'sumeshnaira@gmail.com',
    href: 'mailto:sumeshnaira@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 63814 74524',
    href: 'tel:+916381474524',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/sumesh-nair-a',
    href: 'https://www.linkedin.com/in/sumesh-nair-a-107sms0505',
  },
]

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data: ContactFormData) => {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name:  data.name,
        from_email: data.email,
        subject:    data.subject,
        message:    data.message,
      },
      EMAILJS_PUBLIC_KEY,
    )
    reset()
  }

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a project in mind, a role to discuss, or just want to connect? My inbox is always open."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="font-semibold mb-1">Let&apos;s build something together</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I&apos;m open to new opportunities and interesting projects. Response time is
                usually within 24 hours.
              </p>
            </div>

            <div className="space-y-4">
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <span className="p-2 rounded-lg border border-border bg-card group-hover:border-primary/40 transition-colors">
                    <Icon size={15} />
                  </span>
                  <div>
                    <div className="text-xs text-muted-foreground/60 font-medium">{label}</div>
                    <div>{value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="pt-2 text-xs text-muted-foreground/60 font-mono">
              📍 Chennai, Tamilnadu, India
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-3"
          >
            {isSubmitSuccessful && (
              <div
                role="status"
                aria-live="polite"
                className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm text-center font-medium"
              >
                ✓ Message sent! I&apos;ll get back to you within 24 hours.
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    {...register('name')}
                    className={INPUT_CLASS}
                    placeholder="Your name"
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="mt-1 text-xs text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={INPUT_CLASS}
                    placeholder="you@example.com"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1 text-xs text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" htmlFor="subject">
                  Subject
                </label>
                <input
                  id="subject"
                  {...register('subject')}
                  className={INPUT_CLASS}
                  placeholder="Project inquiry / Role opportunity / Just saying hi"
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                  aria-invalid={!!errors.subject}
                />
                {errors.subject && (
                  <p id="subject-error" role="alert" className="mt-1 text-xs text-destructive">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={5}
                  className={`${INPUT_CLASS} resize-none`}
                  placeholder="Tell me about your project, timeline, or anything else…"
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p id="message-error" role="alert" className="mt-1 text-xs text-destructive">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                <Send size={15} />
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
