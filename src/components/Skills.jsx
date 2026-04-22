import { useInView } from 'react-intersection-observer'
import SectionParallax from './SectionParallax'

const SKILLS = [
  {
    category: 'Query & Databases',
    icon: '🗄️',
    color: '#00ff41',
    gradient: 'from-[#00ff41]/20 to-[#00ff41]/5',
    border: 'border-[#00ff41]/25',
    items: ['SQL (PostgreSQL/MySQL)', 'Redshift', 'Snowflake', 'MongoDB', 'dbt'],
  },
  {
    category: 'Programming',
    icon: '💻',
    color: '#bf00ff',
    gradient: 'from-[#bf00ff]/20 to-[#bf00ff]/5',
    border: 'border-[#bf00ff]/25',
    items: ['Python (Pandas/NumPy)', 'DAX / M-Language', 'Excel VBA', 'Scikit-learn', 'Jupyter'],
  },
  {
    category: 'Visualisation',
    icon: '📊',
    color: '#00e5ff',
    gradient: 'from-[#00e5ff]/20 to-[#00e5ff]/5',
    border: 'border-[#00e5ff]/25',
    items: ['Tableau', 'Power BI', 'Matplotlib / Seaborn', 'Excel Charts', 'D3.js'],
  },
  {
    category: 'ML & Statistics',
    icon: '🤖',
    color: '#ff4500',
    gradient: 'from-[#ff4500]/20 to-[#ff4500]/5',
    border: 'border-[#ff4500]/25',
    items: ['Statistical Analysis', 'A/B Testing', 'Time-Series Forecast', 'Regression Models', 'Clustering', 'Feature Engineering'],
  },
  {
    category: 'Cloud & Tools',
    icon: '☁️',
    color: '#ff2079',
    gradient: 'from-[#ff2079]/20 to-[#ff2079]/5',
    border: 'border-[#ff2079]/25',
    items: ['AWS (S3, Redshift)', 'Git & GitHub', 'Jupyter Notebooks', 'Excel (Advanced)', 'Google Sheets'],
  },
  {
    category: 'Soft Skills',
    icon: '🧠',
    color: '#ffe600',
    gradient: 'from-[#ffe600]/20 to-[#ffe600]/5',
    border: 'border-[#ffe600]/25',
    items: ['Data Storytelling', 'Stakeholder Mgmt', 'Problem Solving', 'Business Acumen', 'Communication'],
  },
]

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.06 })

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      <SectionParallax color1="#00ff41" color2="#bf00ff" side="right" />
      <div className="relative z-10 max-w-[1200px] mx-auto px-8" ref={ref}>

        {/* Header */}
        <div className="mb-14">
          <span className="inline-flex items-center gap-1.5 bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
            &#x25CF; Technical Arsenal
          </span>
          <h2 className="font-space text-4xl md:text-5xl font-bold leading-tight mb-2">
            Skills &amp; <span className="bg-gradient-to-br from-accent-cyan to-accent-purple bg-clip-text text-transparent">Expertise</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl">The tools and technologies I use to turn raw data into decisions.</p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-accent-cyan to-accent-purple rounded mt-4 shadow-[0_0_12px_#00ff41]" />
        </div>

        {/* Skill category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((cat, ci) => (
            <div
              key={cat.category}
              className={`relative rounded-2xl border ${cat.border} bg-gradient-to-br ${cat.gradient} p-6 backdrop-blur-sm
                transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${ci * 0.08}s` }}
            >
              {/* Glow orb */}
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20 blur-2xl pointer-events-none"
                style={{ background: cat.color }}
              />

              {/* Card header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: `${cat.color}22`, border: `1px solid ${cat.color}44` }}
                >
                  {cat.icon}
                </div>
                <h3 className="font-space font-bold text-sm uppercase tracking-widest text-white/80">
                  {cat.category}
                </h3>
              </div>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 cursor-default hover:-translate-y-0.5"
                    style={{
                      background: `${cat.color}14`,
                      border: `1px solid ${cat.color}30`,
                      color: cat.color,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
