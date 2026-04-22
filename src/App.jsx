import { useState, useCallback, useEffect } from 'react'
import { FiArrowUp } from 'react-icons/fi'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParticlesBg from './components/ParticlesBg'
import LoadingScreen from './components/LoadingScreen'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const handleLoadComplete = useCallback(() => setLoading(false), [])

  // Update URL hash as user scrolls through sections
  useEffect(() => {
    const SECTIONS = ['hero', 'stats', 'skills', 'projects', 'contact']
    const observers = []

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const hash = id === 'hero' ? '#' : `#${id}`
            window.history.replaceState(null, '', hash)
            document.title = id === 'hero'
              ? 'Deep Dubey | Data Analyst'
              : `${id.charAt(0).toUpperCase() + id.slice(1)} | Deep Dubey`
          }
        },
        { threshold: 0.4 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [loading])

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 520)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadComplete} />}
      <div className="app-wrapper" style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <ParticlesBg />
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />

        <button
          type="button"
          aria-label="Scroll to top"
          onClick={scrollToTop}
          className={`fixed right-5 z-[1100] rounded-2xl border border-accent-cyan/20
            bg-gradient-to-br from-accent-cyan/15 to-accent-purple/10 backdrop-blur-xl
            text-accent-cyan shadow-[0_8px_30px_rgba(0,255,65,0.18)]
            hover:border-accent-cyan/45 hover:shadow-[0_12px_40px_rgba(0,255,65,0.28)]
            transition-all duration-300
            ${showScrollTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'}
            bottom-24 md:bottom-8`}
        >
          <span className="flex items-center gap-2 px-4 py-3 text-xs font-bold tracking-widest uppercase">
            <FiArrowUp className="text-base" />
            Top
          </span>
        </button>
      </div>
    </>
  )
}

export default App
