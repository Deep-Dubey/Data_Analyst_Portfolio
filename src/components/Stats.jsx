import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { FiTrendingUp, FiDatabase, FiAward, FiBriefcase } from 'react-icons/fi'
import SectionParallax from './SectionParallax'

const STATS = [
  { icon: <FiTrendingUp />, value: 120, suffix: '+',  label: 'Dashboards Built',    desc: 'Interactive BI dashboards delivered',    color: '#00ff41' },
  { icon: <FiDatabase />,   value: 50,  suffix: 'M+', label: 'Rows Processed',      desc: 'Data rows cleaned & analysed',           color: '#bf00ff' },
  { icon: <FiAward />,      value: 98,  suffix: '%',  label: 'Client Satisfaction', desc: 'Based on post-project surveys',          color: '#bfff00' },
  { icon: <FiBriefcase />,  value: 4,   suffix: '+',  label: 'Years Experience',    desc: 'In data analytics & BI',                 color: '#ffe600' },
]

export default function Stats() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false })

  return (
    <section id="stats" className="relative py-24 overflow-hidden">
      <SectionParallax color1="#00ff41" color2="#bf00ff" side="left" />
      <div className="relative z-10 max-w-[1200px] mx-auto px-8" ref={ref}>
        {/* Header */}
        <div className="mb-14">
          <span className="inline-flex items-center gap-1.5 bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
            &#x25CF; By the Numbers
          </span>
          <h2 className="font-space text-4xl md:text-5xl font-bold leading-tight mb-2">
            Impact That <span className="bg-gradient-to-br from-accent-cyan to-accent-purple bg-clip-text text-transparent">Speaks</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-accent-cyan to-accent-purple rounded mt-4 shadow-[0_0_12px_#00ff41]" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <div key={s.label}
              className="bg-bg-card border border-accent-cyan/10 rounded-2xl p-8 text-center hover:-translate-y-1.5 hover:border-accent-cyan/25 hover:shadow-card transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.12}s` }}>
              <div className="text-4xl flex justify-center mb-4" style={{ color: s.color, filter: `drop-shadow(0 0 10px ${s.color})` }}>
                {s.icon}
              </div>
              <div className="font-space text-5xl font-extrabold leading-none mb-2" style={{ color: s.color }}>
                {inView ? <CountUp end={s.value} duration={2.2} delay={i * 0.15} /> : 0}
                <span className="text-3xl">{s.suffix}</span>
              </div>
              <p className="font-bold text-base text-text-primary mb-1">{s.label}</p>
              <p className="text-xs text-text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
