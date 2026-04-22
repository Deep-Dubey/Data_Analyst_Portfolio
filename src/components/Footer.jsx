import { FiBarChart2, FiHeart, FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi'
import { Link } from 'react-scroll'

const NAV = [
  { label:'Home',     to:'hero' },
  { label:'Stats',    to:'stats' },
  { label:'Skills',   to:'skills' },
  { label:'Projects', to:'projects' },
  { label:'Contact',  to:'contact' },
]

export default function Footer() {
  return (
    <footer className="relative bg-bg-secondary border-t border-accent-cyan/10 pt-20 z-[1] overflow-hidden">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-accent-cyan to-transparent shadow-[0_0_40px_10px_rgba(0,255,65,0.15)]" />

      <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] gap-12 pb-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 font-space text-xl font-bold text-text-primary mb-4">
            <FiBarChart2 className="text-accent-cyan text-2xl" />
            <span>Deep<span className="text-accent-cyan ml-1">Dubey</span></span>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed mb-5 max-w-[260px]">
            Turning data into decisions — one insight at a time.
          </p>
          <div className="flex gap-2.5">
            {[
              { icon:<FiGithub />,   href:'https://github.com' },
              { icon:<FiLinkedin />, href:'https://linkedin.com' },
              { icon:<FiTwitter />,  href:'https://twitter.com' },
              { icon:<FiMail />,     href:'mailto:deepdubey1995@gmail.com' },
            ].map((s,i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer"
                className="w-9 h-9 border border-accent-cyan/10 rounded-lg flex items-center justify-center text-text-secondary no-underline hover:text-accent-cyan hover:border-accent-cyan/30 hover:bg-accent-cyan/8 transition-all text-base">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-[0.72rem] font-bold uppercase tracking-widest text-accent-cyan mb-4">Navigation</p>
          <div className="flex flex-col gap-2">
            {NAV.map(l => (
              <Link key={l.to} to={l.to} smooth duration={600} offset={-80}
                className="text-text-muted text-sm cursor-pointer hover:text-text-secondary transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Expertise */}
        <div>
          <p className="text-[0.72rem] font-bold uppercase tracking-widest text-accent-cyan mb-4">Expertise</p>
          <div className="flex flex-col gap-2">
            {['SQL & Databases','Python Analytics','Tableau / Power BI','ML & Forecasting','ETL Pipelines','A/B Testing'].map(s => (
              <span key={s} className="text-text-muted text-sm">{s}</span>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <p className="text-[0.72rem] font-bold uppercase tracking-widest text-accent-cyan mb-4">Status</p>
          <div className="flex items-center gap-2 text-accent-green text-sm mb-3">
            <span className="w-2 h-2 bg-accent-green rounded-full shadow-[0_0_8px_#00ff41] animate-pulse-dot flex-shrink-0" />
            Open to opportunities
          </div>
          <p className="text-text-muted text-xs leading-relaxed mb-4">
            Available for freelance projects and full-time positions in data analytics &amp; BI.
          </p>
          <a href="mailto:deepdubey1995@gmail.com"
            className="text-accent-cyan text-sm font-semibold no-underline border-b border-accent-cyan/30 pb-0.5 hover:border-accent-cyan transition-all">
            Get In Touch →
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-accent-cyan/10 max-w-[1200px] mx-auto px-8 py-6 flex flex-wrap items-center justify-between gap-2">
        <p className="text-text-muted text-xs flex items-center gap-1">
          © {new Date().getFullYear()} Deep Dubey. Built with
          <FiHeart className="text-red-500 animate-heartbeat" /> using React &amp; Vite.
        </p>
        <p className="text-text-muted text-xs">React · Vite · Recharts · Tailwind CSS</p>
      </div>
    </footer>
  )
}
