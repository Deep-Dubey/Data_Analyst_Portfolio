import { useParallaxLayers } from '../hooks/useParallax'

/**
 * Floating parallax ambient orbs — drop inside any section.
 * @param {string} color1, color2  — tailwind color stops (e.g. "#8b5cf6")
 * @param {string} side            — "left" | "right" | "center"
 */
export default function ParallaxBg({ color1 = '#00d4ff', color2 = '#8b5cf6', side = 'right' }) {
  const [slow, fast, tilt] = useParallaxLayers([-0.06, -0.12, -0.04])

  const positions = {
    left:   { orb1: '-left-32 top-0', orb2: 'left-16 bottom-8' },
    right:  { orb1: '-right-32 top-8', orb2: 'right-16 bottom-0' },
    center: { orb1: 'left-1/4 -top-8', orb2: 'right-1/4 bottom-0' },
  }
  const pos = positions[side] || positions.right

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className={`absolute w-[340px] h-[340px] rounded-full blur-[90px] opacity-[0.07] ${pos.orb1}`}
        style={{ background: color1, transform: `translateY(${slow}px)`, willChange: 'transform' }}
      />
      <div
        className={`absolute w-[260px] h-[260px] rounded-full blur-[70px] opacity-[0.06] ${pos.orb2}`}
        style={{ background: color2, transform: `translateY(${fast}px)`, willChange: 'transform' }}
      />
      {/* Very subtle diagonal streak */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          background: `linear-gradient(135deg, ${color1}22 0%, transparent 50%, ${color2}22 100%)`,
          transform: `translateY(${tilt}px) skewY(-3deg)`,
          willChange: 'transform',
        }}
      />
    </div>
  )
}
