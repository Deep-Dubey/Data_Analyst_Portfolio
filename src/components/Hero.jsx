import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-scroll'
import { FiArrowDown, FiDownload, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { useParallaxLayers } from '../hooks/useParallax'
import './Hero.css'

const ROLES = [
  'Data Analyst',
  'Financial Data Analyst',
  'Risk Analytics Analyst',
  'Credit Risk Analyst',
  'Fraud Analytics Analyst',
  'Portfolio Analytics Analyst',
  'Reporting (MIS) Analyst',
  'Data Insights Analyst',
]

const CODE_SNIPPETS = [
  'SELECT AVG(revenue) FROM sales',      'df.groupby("region").sum()',
  'plt.plot(x, trend_line)',              'model.fit(X_train, y_train)',
  'PARTITION BY year ORDER BY month',    'sns.heatmap(corr_matrix)',
  'np.percentile(data, 95)',             'pd.read_csv("dataset.csv")',
  'accuracy_score(y_test, y_pred)',      'tableau.connect(datasource)',
]

function useTypewriter(words, typingSpeed=100, erasingSpeed=60, pause=1600) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const timer = useRef(null)

  useEffect(() => {
    const word = words[wordIdx % words.length]
    if (isTyping) {
      if (display.length < word.length) {
        timer.current = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), typingSpeed)
      } else {
        timer.current = setTimeout(() => setIsTyping(false), pause)
      }
    } else {
      if (display.length > 0) {
        timer.current = setTimeout(() => setDisplay(display.slice(0, -1)), erasingSpeed)
      } else {
        setWordIdx(i => i + 1)
        setIsTyping(true)
      }
    }
    return () => clearTimeout(timer.current)
  }, [display, isTyping, wordIdx, words, typingSpeed, erasingSpeed, pause])

  return display
}

export default function Hero() {
  const role = useTypewriter(ROLES)
  // layers: [orb-top-left, orb-top-right, orb-bottom, ghost-code, dashboard]
  const [p0, p1, p2, p3, p4] = useParallaxLayers([-0.18, -0.12, -0.08, -0.25, -0.1])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center py-32 overflow-hidden">
      {/* Ghost code background */}
      <div className="ghost-code absolute inset-0 overflow-hidden pointer-events-none z-0"
        aria-hidden="true"
        style={{ transform: `translateY(${p3}px)` }}>
        {CODE_SNIPPETS.map((snippet, i) => (
          <span key={i} className="ghost-line"
            style={{ top:`${8 + i * 9}%`, animationDelay:`${i * 0.7}s`, animationDuration:`${14 + i * 2}s` }}>
            {snippet}
          </span>
        ))}
      </div>

      {/* Glow orbs — each on its own parallax layer */}
      <div className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-accent-cyan/[0.07] blur-[80px] pointer-events-none"
        style={{ transform: `translateY(${p0}px)`, willChange: 'transform' }} />
      <div className="absolute top-24 -right-20 w-[400px] h-[400px] rounded-full bg-accent-purple/[0.07] blur-[80px] pointer-events-none"
        style={{ transform: `translateY(${p1}px)`, willChange: 'transform' }} />
      <div className="absolute bottom-0 left-[40%] w-[300px] h-[300px] rounded-full bg-accent-green/[0.05] blur-[80px] pointer-events-none"
        style={{ transform: `translateY(${p2}px)`, willChange: 'transform' }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: content */}
        <div className="animate-fade-in-up" style={{ transform: `translateY(${p0 * 0.4}px)` }}>
          <span className="inline-flex items-center gap-1.5 bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
            &#x25CF; Available for hire
          </span>

          <h1 className="font-space text-5xl md:text-6xl font-extrabold leading-tight mb-3">
            Hi, I&apos;m{' '}
            <span className="bg-gradient-to-br from-accent-cyan to-accent-purple bg-clip-text text-transparent">Deep Dubey</span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-text-secondary mb-6 flex items-center flex-wrap min-h-[3rem]">
            <span>I&apos;m a&nbsp;</span>
            <span className="text-accent-cyan">{role}</span>
            <span className="inline-block w-0.5 ml-0.5 text-accent-cyan animate-blink">|</span>
          </h2>

          <p className="text-text-secondary text-lg leading-relaxed max-w-[520px] mb-8">
            Transforming raw data into compelling stories and actionable insights.
            Specialised in <em className="text-accent-cyan not-italic">SQL, Python, Tableau, Power BI, AWS &amp; ML</em> — building
            dashboards that drive real business decisions.
          </p>

          <div className="flex gap-4 flex-wrap mb-8">
            <Link to="projects" smooth duration={600} offset={-80}>
              <button className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-br from-accent-cyan to-accent-blue text-bg-primary font-bold rounded-xl shadow-[0_6px_20px_rgba(0,212,255,0.35)] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,212,255,0.5)] transition-all duration-300 cursor-pointer border-none">
                View My Work
              </button>
            </Link>
            <a href="/resume.pdf" download
              className="inline-flex items-center gap-2 px-7 py-3 bg-transparent border border-accent-cyan/12 text-text-primary font-semibold rounded-xl hover:border-accent-cyan hover:text-accent-cyan hover:bg-accent-cyan/6 transition-all duration-300 no-underline">
              <FiDownload /> Download CV
            </a>
          </div>

          <div className="flex gap-3">
            {[
              { icon:<FiGithub />,   href:'https://github.com' },
              { icon:<FiLinkedin />, href:'https://linkedin.com' },
              { icon:<FiTwitter />,  href:'https://twitter.com' },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer"
                className="w-11 h-11 border border-accent-cyan/12 rounded-xl flex items-center justify-center text-text-secondary text-lg no-underline hover:text-accent-cyan hover:border-accent-cyan hover:bg-accent-cyan/8 hover:-translate-y-0.5 transition-all">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right: mini dashboard */}
        <div className="animate-fade-in-right" style={{ transform: `translateY(${p4}px)` }}>
          <HeroDashboardMini />
        </div>
      </div>

      {/* Scroll hint */}
      <Link to="stats" smooth duration={600}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-text-muted text-[0.7rem] uppercase tracking-widest cursor-pointer z-10 no-underline">
        <span>Scroll</span>
        <FiArrowDown className="text-xl animate-bounce-y" />
      </Link>
    </section>
  )
}

const BASE_METRICS = [
  { label:'Total Revenue', base:4.2, unit:'$', suffix:'M', min:2.8, max:6.4, color:'#00ff41' },
  { label:'Avg Deal',      base:12,  unit:'$', suffix:'K', min:8,   max:18,  color:'#00e5ff' },
  { label:'Win Rate',      base:63,  unit:'',  suffix:'%', min:52,  max:79,  color:'#bf00ff' },
]

function randomMetrics(prev) {
  return prev.map((m, idx) => {
    const base = BASE_METRICS[idx]
    const raw = parseFloat(m.value.replace(/[^0-9.]/g, ''))
    const swing = (base.max - base.min) * 0.38
    const delta = (Math.random() - 0.45) * swing
    const next = Math.min(base.max, Math.max(base.min, parseFloat((raw + delta).toFixed(1))))
    const pct = ((next - raw) / raw * 100).toFixed(1)
    const sign = pct >= 0 ? '+' : ''
    return { ...m, value: `${base.unit}${next}${base.suffix}`, delta: `${sign}${pct}%` }
  })
}

function randomBars(prev) {
  return prev.map(v => {
    const delta = (Math.random() - 0.5) * 24
    return Math.min(98, Math.max(12, Math.round(v + delta)))
  })
}

function barsToPoints(bars) {
  const w = 220, h = 80
  const step = w / (bars.length - 1)
  return bars.map((b, i) => `${Math.round(i * step)},${Math.round(h - b * h / 100)}`).join(' ')
}

function HeroDashboardMini() {
  const [animated, setAnimated] = useState(false)
  const [bars, setBars] = useState([30, 50, 70, 45, 90, 60, 80, 55, 95, 75])
  const [metrics, setMetrics] = useState([
    { label:'Total Revenue', value:'$4.2M', delta:'+18%', color:'#00ff41' },
    { label:'Avg Deal',      value:'$12K',  delta:'+7%',  color:'#00e5ff' },
    { label:'Win Rate',      value:'63%',   delta:'+5%',  color:'#bf00ff' },
  ])

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!animated) return
    const id = setInterval(() => {
      setBars(prev => randomBars(prev))
      setMetrics(prev => randomMetrics(prev))
    }, 1800)
    return () => clearInterval(id)
  }, [animated])

  return (
    <div className="relative bg-bg-card border border-accent-cyan/12 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,255,65,0.2),0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/[0.04] to-transparent pointer-events-none" />

      {/* Header row */}
      <div className="flex items-center gap-2 text-xs text-text-secondary font-space font-semibold mb-5">
        <span className="w-2 h-2 rounded-full bg-accent-green shadow-[0_0_8px_#00ff41]" />
        Revenue Analytics — 2024
        <span className="w-2 h-2 rounded-full bg-accent-yellow shadow-[0_0_8px_#ffe600] ml-auto" />
      </div>

      {/* Metric row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {metrics.map(m => (
          <div key={m.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 flex flex-col gap-0.5">
            <span className="font-space text-xl font-bold transition-all duration-700" style={{ color: m.color }}>{m.value}</span>
            <span className={`text-[0.65rem] font-bold transition-all duration-700 ${m.delta.startsWith('-') ? 'text-rose-400' : 'text-accent-green'}`}>{m.delta}</span>
            <span className="text-[0.62rem] text-text-muted mt-0.5">{m.label}</span>
          </div>
        ))}
      </div>

      {/* Bar + trend chart */}
      <div className="relative h-24 mb-2">
        <div className="flex items-end gap-1.5 h-full">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 h-full flex items-end">
              <div
                className="w-full rounded-t transition-[height] duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] opacity-80"
                style={{
                  height: animated ? `${h}%` : '0%',
                  transitionDelay: `${i * 80}ms`,
                  background: 'linear-gradient(to top, #00ff41, #bf00ff)',
                  minHeight: 4,
                }}
              />
            </div>
          ))}
        </div>
        {/* Trend line SVG */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 220 80" preserveAspectRatio="none">
          <defs>
            <linearGradient id="tg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#ffe600" />
              <stop offset="100%" stopColor="#ff2079" />
            </linearGradient>
            <style>{`
              .trend-flow {
                stroke-dasharray: 40 12;
                stroke-dashoffset: 0;
                animation: trendScroll 1.2s linear infinite;
              }
              @keyframes trendScroll {
                to { stroke-dashoffset: -52; }
              }
              .trend-base {
                transition: d 700ms ease, stroke-dashoffset 700ms ease;
              }
            `}</style>
          </defs>
          {/* Static base line */}
          <polyline
            points={animated ? barsToPoints(bars) : '0,64 22,52 44,42 66,54 88,18 110,36 132,24 154,46 176,10 198,22'}
            fill="none" stroke="url(#tg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            opacity="0.35"
            style={{ transition: 'points 700ms ease' }}
          />
          {/* Flowing animated overlay */}
          {animated && (
            <polyline
              className="trend-flow"
              points={barsToPoints(bars)}
              fill="none" stroke="url(#tg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ transition: 'points 700ms ease' }}
            />
          )}
        </svg>
      </div>

      {/* Month labels */}
      <div className="flex justify-between text-[0.58rem] text-text-muted">
        {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct'].map(m => <span key={m}>{m}</span>)}
      </div>
    </div>
  )
}
