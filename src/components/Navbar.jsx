import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { FiBarChart2, FiTrendingUp, FiHome, FiPieChart, FiCode, FiBriefcase, FiMail } from 'react-icons/fi'

const NAV_LINKS = [
  { label: 'Home',     to: 'hero' },
  { label: 'Stats',    to: 'stats' },
  { label: 'Skills',   to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'Contact',  to: 'contact' },
]

const BOTTOM_NAV = [
  { label: 'Home',     to: 'hero',     icon: FiHome },
  { label: 'Stats',    to: 'stats',    icon: FiPieChart },
  { label: 'Skills',   to: 'skills',   icon: FiCode },
  { label: 'Projects', to: 'projects', icon: FiBriefcase },
  { label: 'Contact',  to: 'contact',  icon: FiMail },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── Desktop: floating pill navbar ─────────────────────── */}
      <div className={`hidden md:flex fixed z-[1000] left-1/2 -translate-x-1/2 transition-all duration-500
        ${scrolled ? 'top-4' : 'top-6'}`}>
        <nav className={`flex items-center gap-1 px-3 py-2 rounded-2xl border transition-all duration-500
          backdrop-blur-2xl
          ${scrolled
            ? 'bg-white/[0.08] border-white/15 shadow-[0_8px_40px_rgba(0,255,65,0.12),inset_0_1px_0_rgba(255,255,255,0.1)]'
            : 'bg-white/[0.04] border-white/[0.07] shadow-[0_4px_24px_rgba(0,0,0,0.5)]'}`}>

          {/* Logo */}
          <Link to="hero" smooth duration={600}
            className="flex items-center gap-2 cursor-pointer px-3 py-1.5 mr-2 group">
            <div className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 border border-accent-cyan/30 group-hover:border-accent-cyan/60 transition-all duration-300">
              <FiBarChart2 className="text-accent-cyan text-base" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
            </div>
            <span className="font-space font-bold text-sm text-text-primary whitespace-nowrap">
              Deep<span className="text-accent-cyan">Dubey</span>
            </span>
          </Link>

          {/* Divider */}
          <div className="w-px h-5 bg-white/10 mx-1" />

          {/* Nav links */}
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to} smooth duration={600} offset={-80} spy
              onSetActive={() => setActive(l.to)}
              className={`relative px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 tracking-wide
                ${active === l.to
                  ? 'text-accent-cyan bg-accent-cyan/15'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.06]'}`}>
              {l.label}
              {active === l.to && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-cyan" />
              )}
            </Link>
          ))}

          {/* Divider */}
          <div className="w-px h-5 bg-white/10 mx-1" />

          {/* CTA */}
          <Link to="contact" smooth duration={600} offset={-80}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl cursor-pointer text-xs font-bold text-bg-primary
              bg-gradient-to-r from-accent-cyan to-accent-blue
              shadow-[0_0_16px_rgba(0,255,65,0.4)] hover:shadow-[0_0_24px_rgba(0,255,65,0.65)]
              hover:-translate-y-px transition-all duration-200 whitespace-nowrap">
            <FiTrendingUp className="text-sm" />
            Hire Me
          </Link>
        </nav>
      </div>

      {/* ── Mobile: slim top bar (logo only) ─────────────────── */}
      <nav className={`md:hidden fixed top-0 left-0 right-0 z-[1000] transition-all duration-300
        backdrop-blur-2xl
        ${scrolled
          ? 'bg-black/90 border-b border-[#00ff41]/20 py-3 shadow-[0_4px_20px_rgba(0,255,65,0.12)]'
          : 'bg-black/60 border-b border-white/[0.05] py-3'}`}>

        {/* Ghost text */}
        <span className="pointer-events-none select-none absolute inset-0 flex items-center justify-center
          text-[36px] font-black tracking-[0.3em] uppercase text-white/[0.025] whitespace-nowrap overflow-hidden font-space">
          DATA ANALYST
        </span>

        <div className="relative flex items-center justify-between px-5">
          <Link to="hero" smooth duration={600} className="flex items-center gap-2 cursor-pointer">
            <div className="relative w-8 h-8 flex items-center justify-center rounded-lg
              bg-gradient-to-br from-[#00ff41]/20 to-[#bf00ff]/15
              border border-[#00ff41]/40 shadow-[0_0_10px_rgba(0,255,65,0.3)]">
              <FiBarChart2 className="text-[#00ff41] text-sm" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-gradient-to-br from-[#00ff41] to-[#00e5ff] shadow-[0_0_6px_rgba(0,255,65,0.8)] animate-pulse" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-space font-black text-[13px] tracking-wide bg-gradient-to-r from-[#f0ffe8] via-[#00ff41] to-[#00e5ff] bg-clip-text text-transparent">
                Deep Dubey
              </span>
              <span className="text-[9px] tracking-[0.18em] text-[#00ff41]/60 uppercase font-medium">
                Data Analyst
              </span>
            </div>
          </Link>

          {/* Active section badge */}
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full
            bg-gradient-to-r from-[#00ff41]/15 to-[#bf00ff]/10
            border border-[#00ff41]/20 text-[10px] font-bold tracking-widest uppercase
            text-transparent bg-clip-text bg-gradient-to-r from-[#00ff41] to-[#00e5ff]">
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-violet-400 to-cyan-400 flex-shrink-0"
              style={{ WebkitTextFillColor: 'initial', background: 'linear-gradient(135deg,#00ff41,#00e5ff)', width: '6px', height: '6px', borderRadius: '9999px', display: 'inline-block' }} />
            <span className="bg-gradient-to-r from-[#00ff41] to-[#00e5ff] bg-clip-text text-transparent">
              {active.charAt(0).toUpperCase() + active.slice(1)}
            </span>
          </span>
        </div>
      </nav>
      {/* ── Mobile: bottom tab bar (always visible) ──────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[1000]
        backdrop-blur-2xl bg-black/90
        border-t border-white/10
        shadow-[0_-4px_30px_rgba(0,255,65,0.15)]
        pb-[env(safe-area-inset-bottom)]">
        {/* Top glow line */}
        <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff41]/50 to-transparent" />

        <div className="flex items-stretch justify-around px-2 pt-2 pb-3">
          {BOTTOM_NAV.map(({ label, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              smooth
              duration={600}
              offset={-80}
              spy
              onSetActive={() => setActive(to)}
              className={`relative flex flex-col items-center justify-center gap-1 flex-1 py-1 rounded-xl cursor-pointer transition-all duration-200 group
                ${active === to ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>

              {/* Active background pill */}
              {active === to && (
                <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#00ff41]/20 to-[#bf00ff]/10 border border-[#00ff41]/20" />
              )}

              {/* Icon */}
              <span className={`relative z-10 text-lg transition-all duration-200
                ${active === to
                  ? 'text-transparent bg-gradient-to-br from-[#00ff41] to-[#00e5ff] bg-clip-text drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]'
                  : 'group-hover:text-slate-300'}`}>
                <Icon style={active === to ? { filter: 'drop-shadow(0 0 6px rgba(0,255,65,0.9))' } : {}} />
              </span>

              {/* Label */}
              <span className={`relative z-10 text-[9px] font-bold tracking-widest uppercase transition-all duration-200
                ${active === to
                  ? 'bg-gradient-to-r from-[#00ff41] to-[#00e5ff] bg-clip-text text-transparent'
                  : ''}`}>
                {label}
              </span>

              {/* Active dot */}
              {active === to && (
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-gradient-to-r from-[#00ff41] to-[#00e5ff] shadow-[0_0_6px_rgba(0,255,65,0.8)]" />
              )}
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}
