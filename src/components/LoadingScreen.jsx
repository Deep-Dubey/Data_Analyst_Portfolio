import { useEffect, useState } from 'react'

const LOADING_STEPS = [
  'Initializing data pipeline...',
  'Loading datasets...',
  'Running statistical models...',
  'Rendering visualizations...',
  'Portfolio ready.',
]

const BAR_HEIGHTS = [60, 85, 45, 70, 90, 55, 75, 40, 95, 65]

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const totalDuration = 2800
    const interval = 30
    const increment = 100 / (totalDuration / interval)

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = Math.min(prev + increment, 100)
        setStepIndex(Math.floor((next / 100) * (LOADING_STEPS.length - 1)))
        if (next >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setFadeOut(true)
            setTimeout(onComplete, 600)
          }, 300)
        }
        return next
      })
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <>
      {/* Scoped keyframes for animations that need CSS custom props */}
      <style>{`
        @keyframes gridPan   { to { transform: translateY(50px); } }
        @keyframes barWave   { 0%,100% { transform:scaleY(0.4); } 50% { transform:scaleY(1); } }
        @keyframes cardIn    { from { opacity:0; transform:translateY(22px) scale(.97); } to { opacity:1; transform:none; } }
        @keyframes iconPulse { 0%,100% { box-shadow:0 0 0 0 rgba(0,212,255,.22); } 50% { box-shadow:0 0 0 14px rgba(0,212,255,0); } }
        @keyframes particleRise { 0%{opacity:0;transform:translateY(0) scale(1)} 10%{opacity:.7} 90%{opacity:.2} 100%{opacity:0;transform:translateY(-100vh) scale(.4)} }
        .loader-grid { animation: gridPan 8s linear infinite; }
        .loader-bar  { transform-origin:bottom; animation: barWave 1.8s ease-in-out infinite alternate; }
        .loader-card { animation: cardIn .6s ease both; }
        .loader-icon-wrap { animation: iconPulse 2.4s ease-in-out infinite; }
        .loader-particle {
          position:absolute;
          width:3px; height:3px;
          border-radius:9999px;
          background:#00d4ff;
          bottom:-6px;
          opacity:0;
          left: calc(var(--i) * 5.7% + 4%);
          animation: particleRise calc(4s + var(--i) * .35s) ease-in infinite;
          animation-delay: calc(var(--i) * .22s);
        }
        .loader-particle:nth-child(odd) { background:#7c3aed; width:4px; height:4px; }
      `}</style>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[9999] bg-bg-primary flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
          fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Moving grid */}
        <div
          className="loader-grid absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,212,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,.05) 1px,transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Background decorative bar chart */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(700px,90vw)] h-[45%] flex items-end gap-3 opacity-[0.12] pointer-events-none">
          {BAR_HEIGHTS.map((h, i) => (
            <div
              key={i}
              className="loader-bar flex-1 rounded-t"
              style={{
                height: `${h}%`,
                background: 'linear-gradient(to top, #00d4ff, #7c3aed)',
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))}
        </div>

        {/* Central card */}
        <div className="loader-card relative z-10 flex flex-col items-center gap-3 px-12 py-10 rounded-2xl border border-accent-cyan/15 backdrop-blur-xl text-center min-w-[320px] bg-white/[0.03] shadow-[0_0_60px_rgba(0,212,255,0.08),0_0_120px_rgba(124,58,237,0.06)]">

          {/* Icon */}
          <div className="loader-icon-wrap w-[72px] h-[72px] rounded-full flex items-center justify-center p-3 bg-accent-cyan/[0.08] border border-accent-cyan/20">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect x="4"  y="36" width="10" height="24" rx="2" fill="#00d4ff" opacity="0.9"/>
              <rect x="18" y="24" width="10" height="36" rx="2" fill="#7c3aed" opacity="0.9"/>
              <rect x="32" y="14" width="10" height="46" rx="2" fill="#00d4ff" opacity="0.9"/>
              <rect x="46" y="28" width="10" height="32" rx="2" fill="#7c3aed" opacity="0.9"/>
              <polyline points="9,34 23,20 37,10 51,24" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="9"  cy="34" r="3" fill="#fff"/>
              <circle cx="23" cy="20" r="3" fill="#fff"/>
              <circle cx="37" cy="10" r="3" fill="#fff"/>
              <circle cx="51" cy="24" r="3" fill="#fff"/>
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-[1.75rem] font-bold tracking-wide text-text-primary leading-tight">
            Data{' '}
            <span
              className="bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent"
            >
              Analyst
            </span>
          </h1>
          <p className="text-[0.75rem] tracking-[0.28em] uppercase text-text-primary/40 -mt-2">
            Portfolio
          </p>

          {/* Progress bar */}
          <div className="relative w-full h-1 rounded-full bg-white/[0.06] mt-2 overflow-visible">
            <div
              className="h-full rounded-full transition-[width] duration-[60ms] linear"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg,#00d4ff,#7c3aed)',
              }}
            />
            {/* Glowing dot */}
            <div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent-cyan transition-[left] duration-[60ms] linear"
              style={{
                left: `${progress}%`,
                boxShadow: '0 0 12px 4px rgba(0,212,255,0.6)',
              }}
            />
          </div>

          {/* Step label */}
          <p className="text-[0.78rem] text-text-primary/50 tracking-wide min-h-[1.2em] animate-blink">
            {LOADING_STEPS[stepIndex]}
          </p>

          {/* Percentage */}
          <span className="text-[0.72rem] font-semibold tracking-widest text-accent-cyan tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className="loader-particle" style={{ '--i': i }} />
          ))}
        </div>
      </div>
    </>
  )
}
