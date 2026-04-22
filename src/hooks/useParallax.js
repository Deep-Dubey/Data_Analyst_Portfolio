import { useEffect, useState, useCallback } from 'react'

/**
 * Returns a scroll-based Y offset for parallax layers.
 * @param {number} speed  — multiplier: positive = slower scroll (recede), negative = faster
 * @param {number} offset — starting scroll offset (default 0)
 */
export function useParallax(speed = 0.3, offset = 0) {
  const [y, setY] = useState(0)

  const handleScroll = useCallback(() => {
    setY((window.scrollY - offset) * speed)
  }, [speed, offset])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return y
}

/**
 * Returns multiple parallax Y values for different layers.
 * @param {number[]} speeds
 */
export function useParallaxLayers(speeds = []) {
  const [ys, setYs] = useState(speeds.map(() => 0))

  useEffect(() => {
    const handler = () => {
      setYs(speeds.map(s => window.scrollY * s))
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, []) // eslint-disable-line

  return ys
}
