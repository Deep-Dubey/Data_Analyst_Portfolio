import { useState } from 'react'
import { FiMail, FiMapPin, FiPhone, FiSend, FiGithub, FiLinkedin, FiTwitter, FiCheckCircle, FiX } from 'react-icons/fi'
import emailjs from '@emailjs/browser'
import SectionParallax from './SectionParallax'

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setError('Email service is not configured yet.')
      return
    }

    try {
      setSending(true)

      await emailjs.send(
        serviceId,
        templateId,
        {
          // Template variables (as configured in EmailJS)
          title: form.subject,
          name: form.name,
          message: form.message,
          email: form.email,

          // Backward-compatible aliases (safe if unused)
          from_name: form.name,
          reply_to: form.email,
          subject: form.subject,
        },
        { publicKey }
      )

      setSent(true)
      setTimeout(() => setSent(false), 4000)
      setForm({ name:'', email:'', subject:'', message:'' })
    } catch (err) {
      console.error('EmailJS send failed:', err)
      setError('Failed to send. Please try again in a moment.')
    } finally {
      setSending(false)
    }
  }

  const inputCls = 'bg-white/[0.04] border border-accent-cyan/10 rounded-xl px-4 py-3 text-text-primary text-sm font-sans placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:border-accent-cyan/40 focus:bg-accent-cyan/[0.04] focus:shadow-[0_0_0_3px_rgba(0,255,65,0.08)] w-full'

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <SectionParallax color1="#bf00ff" color2="#00ff41" side="left" />
      <div className="relative z-10 max-w-[1200px] mx-auto px-8">
        {/* Header */}
        <div className="mb-14">
          <span className="inline-flex items-center gap-1.5 bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
            &#x25CF; Get In Touch
          </span>
          <h2 className="font-space text-4xl md:text-5xl font-bold leading-tight mb-2">
            Let&apos;s <span className="bg-gradient-to-br from-accent-cyan to-accent-purple bg-clip-text text-transparent">Work Together</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl">Have a data challenge? I&apos;d love to help turn your data into actionable insights.</p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-accent-cyan to-accent-purple rounded mt-4 shadow-[0_0_12px_#00ff41]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 items-start">
          {/* Info panel */}
          <div className="relative bg-bg-card border border-accent-cyan/10 rounded-2xl p-8 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-cyan to-accent-purple" />
            <h3 className="font-space text-xl font-bold text-text-primary mb-3">Contact Information</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-8">
              I&apos;m currently open to freelance projects and full-time opportunities. Let&apos;s connect!
            </p>

            <div className="flex flex-col gap-5 mb-8">
              {[
                { icon:<FiMail />,    label:'Email',    value:'deepdubey1995@gmail.com' },
                { icon:<FiPhone />,   label:'Phone',    value:'+91 90520 57751' },
                { icon:<FiMapPin />,  label:'Location', value:'India' },
              ].map(d => (
                <div key={d.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent-cyan/10 border border-accent-cyan/20 rounded-xl flex items-center justify-center text-accent-cyan flex-shrink-0">
                    {d.icon}
                  </div>
                  <div>
                    <p className="text-[0.7rem] text-text-muted font-semibold uppercase tracking-widest mb-0.5">{d.label}</p>
                    <p className="text-sm text-text-primary font-medium">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2.5 mb-6">
              {[
                { icon:<FiGithub />,   href:'https://github.com' },
                { icon:<FiLinkedin />, href:'https://linkedin.com' },
                { icon:<FiTwitter />,  href:'https://twitter.com' },
              ].map((s,i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  className="w-10 h-10 border border-accent-cyan/10 rounded-xl flex items-center justify-center text-text-secondary text-lg no-underline hover:text-accent-cyan hover:border-accent-cyan/30 hover:bg-accent-cyan/8 transition-all">
                  {s.icon}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2.5 text-accent-green text-sm font-semibold bg-accent-green/8 border border-accent-green/20 rounded-full px-4 py-2 w-fit">
              <span className="w-2 h-2 bg-accent-green rounded-full shadow-[0_0_8px_#10b981] animate-pulse-dot flex-shrink-0" />
              Available for freelance &amp; full-time roles
            </div>
          </div>

          {/* Form */}
          <form className="bg-bg-card border border-accent-cyan/10 rounded-2xl p-8 flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-text-secondary font-semibold" htmlFor="name">Your Name</label>
                <input id="name" name="name" type="text" placeholder="John Doe"
                  value={form.name} onChange={handleChange} required className={inputCls} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-text-secondary font-semibold" htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" placeholder="john@company.com"
                  value={form.email} onChange={handleChange} required className={inputCls} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-text-secondary font-semibold" htmlFor="subject">Subject</label>
              <input id="subject" name="subject" type="text" placeholder="Project Inquiry / Collaboration"
                value={form.subject} onChange={handleChange} required className={inputCls} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-text-secondary font-semibold" htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={6}
                placeholder="Tell me about your project, data needs, or how I can help..."
                value={form.message} onChange={handleChange} required className={`${inputCls} resize-y`} />
            </div>

            <button type="submit"
              disabled={sending}
              className={`inline-flex items-center gap-2 self-start px-8 py-3 rounded-xl font-semibold text-sm cursor-pointer border-none transition-all duration-300
                ${sent
                  ? 'bg-gradient-to-br from-accent-green to-[#059669] text-white shadow-[0_6px_20px_rgba(16,185,129,0.35)]'
                  : 'bg-gradient-to-br from-accent-cyan to-accent-blue text-bg-primary shadow-[0_6px_20px_rgba(0,212,255,0.35)] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,212,255,0.5)]'}
                ${sending ? 'opacity-70 cursor-not-allowed hover:translate-y-0 hover:shadow-[0_6px_20px_rgba(0,212,255,0.35)]' : ''}`}>
              {sent ? '✓ Message Sent!' : sending ? 'Sending…' : <><FiSend /> Send Message</>}
            </button>

            {error && (
              <p className="text-sm text-rose-400 font-semibold">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Success popup */}
      {sent && (
        <div
          className="fixed inset-0 z-[1200] flex items-end md:items-center justify-center p-5 pointer-events-none"
          aria-live="polite"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Message sent"
            className="pointer-events-auto w-full max-w-md rounded-2xl border border-accent-green/25 bg-bg-card/85 backdrop-blur-2xl
              shadow-[0_18px_80px_rgba(0,0,0,0.75),0_0_45px_rgba(0,255,65,0.14)] overflow-hidden animate-fade-in-up"
          >
            <div className="h-0.5 w-full bg-gradient-to-r from-accent-green via-accent-cyan to-accent-purple" />

            <div className="p-5 flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center
                bg-accent-green/10 border border-accent-green/25 text-accent-green flex-shrink-0">
                <FiCheckCircle className="text-2xl" />
              </div>

              <div className="flex-1">
                <p className="font-space text-base font-extrabold text-text-primary leading-snug">
                  Message sent successfully
                </p>
                <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                  Thanks for reaching out — I&apos;ll get back to you soon.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSent(false)}
                className="w-10 h-10 rounded-xl border border-white/10 text-text-secondary
                  hover:text-text-primary hover:border-accent-cyan/30 hover:bg-white/[0.04]
                  transition-all duration-200 flex items-center justify-center"
                aria-label="Close"
              >
                <FiX />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
