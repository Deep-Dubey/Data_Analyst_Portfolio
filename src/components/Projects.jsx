import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { FiExternalLink, FiGithub, FiBarChart2, FiDatabase, FiTrendingUp, FiPieChart } from 'react-icons/fi'
import SectionParallax from './SectionParallax'

const PROJECTS = [
  {
    id:1, tag:'Dashboard', icon:<FiBarChart2 />, featured:true,
    title:'Executive Revenue Dashboard',
    desc:'End-to-end Tableau dashboard tracking $50M+ revenue pipeline with drill-down across 12 regions. Reduced reporting time by 75%.',
    tags:['Tableau','SQL','Redshift','dbt'],
    metrics:['+75% faster reports','12 regions','$50M pipeline'],
    color:'#00ff41', github:'#', live:'#',
  },
  {
    id:2, tag:'Machine Learning', icon:<FiTrendingUp />, featured:true,
    title:'Customer Churn Predictor',
    desc:'ML model using gradient boosting to predict churn with 91% accuracy. Integrated into Power BI for real-time CX monitoring.',
    tags:['Python','Scikit-learn','Power BI','AWS SageMaker'],
    metrics:['91% accuracy','15K customers','↓30% churn'],
    color:'#bf00ff', github:'#', live:'#',
  },
  {
    id:3, tag:'ETL Pipeline', icon:<FiDatabase />, featured:false,
    title:'Automated Data Pipeline',
    desc:'Automated ETL processing 20M+ rows daily from 8 sources into Snowflake. Zero downtime for 14 months.',
    tags:['Python','Snowflake','AWS','dbt'],
    metrics:['20M+ rows/day','8 sources','14 mo uptime'],
    color:'#00e5ff', github:'#', live:'#',
  },
  {
    id:4, tag:'Analytics', icon:<FiPieChart />, featured:false,
    title:'Marketing Attribution Model',
    desc:'Multi-touch attribution across 9 channels via Monte Carlo simulation. 40% better spend allocation and $1.2M incremental revenue.',
    tags:['Python','SQL','Tableau','Monte Carlo'],
    metrics:['+40% ROI','$1.2M revenue','9 channels'],
    color:'#ffe600', github:'#', live:'#',
  },
  {
    id:5, tag:'Reporting', icon:<FiBarChart2 />, featured:false,
    title:'Financial Anomaly Detection',
    desc:'Z-score and IQR anomaly detection flagging suspicious transactions in real-time with 97% precision across 3 BUs.',
    tags:['Python','SQL','Power BI','Statistics'],
    metrics:['97% precision','3 BUs','Real-time'],
    color:'#ff4500', github:'#', live:'#',
  },
  {
    id:6, tag:'NLP', icon:<FiTrendingUp />, featured:false,
    title:'Customer Feedback NLP Analyser',
    desc:'Sentiment analysis on 500K+ reviews using BERT. Live Power BI feed surfaces product issues 48h before support tickets.',
    tags:['Python','BERT','Power BI','NLP'],
    metrics:['500K+ reviews','48h early alert','Sentiment+NPS'],
    color:'#ff2079', github:'#', live:'#',
  },
]

const FILTERS = ['All','Dashboard','Machine Learning','ETL Pipeline','Analytics','Reporting','NLP']

export default function Projects() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.tag === active)
  const { ref, inView } = useInView({ threshold: 0.05 })

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <SectionParallax color1="#ff4500" color2="#ff2079" side="center" />
      <div className="relative z-10 max-w-[1200px] mx-auto px-8" ref={ref}>
        {/* Header */}
        <div className="mb-14">
          <span className="inline-flex items-center gap-1.5 bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
            &#x25CF; Portfolio
          </span>
          <h2 className="font-space text-4xl md:text-5xl font-bold leading-tight mb-2">
            Featured <span className="bg-gradient-to-br from-accent-cyan to-accent-purple bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl">Real-world projects spanning dashboards, ML models, ETL pipelines and analytics.</p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-accent-cyan to-accent-purple rounded mt-4 shadow-[0_0_12px_#00ff41]" />
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActive(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200
                ${active === f
                  ? 'bg-accent-cyan/12 border-accent-cyan text-accent-cyan'
                  : 'border-accent-cyan/10 text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/30'}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <div key={p.id}
              className={`relative flex flex-col gap-3 rounded-2xl p-7 border transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card-hover hover:border-accent-cyan/22
                ${p.featured ? 'bg-gradient-to-br from-bg-card to-accent-cyan/[0.03] border-accent-cyan/20' : 'bg-bg-card border-accent-cyan/10'}
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 0.08}s`, '--accent': p.color }}>

              {p.featured && (
                <span className="absolute top-4 right-4 bg-accent-cyan/12 border border-accent-cyan/30 text-accent-cyan text-[0.65rem] font-bold px-2.5 py-0.5 rounded-full">
                  ★ Featured
                </span>
              )}

              <div className="text-3xl" style={{ color: p.color, filter: `drop-shadow(0 0 10px ${p.color})` }}>
                {p.icon}
              </div>

              <span className="text-[0.7rem] font-bold uppercase tracking-widest" style={{ color: p.color }}>{p.tag}</span>
              <h3 className="font-space text-lg font-bold text-text-primary leading-snug">{p.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed flex-1">{p.desc}</p>

              {/* Metrics */}
              <div className="flex flex-wrap gap-1.5">
                {p.metrics.map(m => (
                  <span key={m} className="text-xs font-bold font-space px-2.5 py-1 bg-white/[0.04] border border-white/[0.06] rounded-md" style={{ color: p.color }}>
                    {m}
                  </span>
                ))}
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map(t => (
                  <span key={t} className="text-[0.7rem] font-semibold px-2 py-0.5 bg-white/[0.05] border border-white/[0.08] text-text-muted rounded-md">{t}</span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3 mt-1">
                <a href={p.github} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border border-accent-cyan/10 text-text-secondary no-underline hover:text-accent-cyan hover:border-accent-cyan/30 hover:bg-accent-cyan/6 transition-all">
                  <FiGithub /> GitHub
                </a>
                <a href={p.live} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-accent-cyan/10 border border-accent-cyan/25 text-accent-cyan no-underline hover:bg-accent-cyan/20 hover:shadow-[0_4px_15px_rgba(0,212,255,0.25)] transition-all">
                  <FiExternalLink /> Live Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
