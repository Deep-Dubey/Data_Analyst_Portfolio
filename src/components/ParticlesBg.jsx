import { useEffect, useRef, useMemo } from 'react'

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

export default function ParticlesBg() {
  const canvasRef = useRef(null)

  const particles = useMemo(() => {
    const COLORS = [
      '0,255,65',   // accent-cyan (green)
      '191,0,255',  // accent-purple
      '0,229,255',  // cyan
    ]
    return Array.from({ length: 55 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: randomBetween(0.5, 2),
      vx: randomBetween(-0.15, 0.15),
      vy: randomBetween(-0.15, 0.15),
      opacity: randomBetween(0.15, 0.7),
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
    }))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let w = window.innerWidth
    let h = window.innerHeight

    function resize() {
      const dpr = window.devicePixelRatio || 1
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    function draw() {
      ctx.clearRect(0, 0, w, h)

      particles.forEach((p) => {
        p.x += p.vx / 100
        p.y += p.vy / 100
        if (p.x < 0) p.x = 1
        if (p.x > 1) p.x = 0
        if (p.y < 0) p.y = 1
        if (p.y > 1) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.c}, ${p.opacity})`
        ctx.fill()
      })

      // draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = (particles[i].x - particles[j].x) * w
          const dy = (particles[i].y - particles[j].y) * h
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 115) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x * w, particles[i].y * h)
            ctx.lineTo(particles[j].x * w, particles[j].y * h)
            ctx.strokeStyle = `rgba(0,255,65, ${0.06 * (1 - dist / 115)})`
            ctx.lineWidth = 0.55
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [particles])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-55" />
}
