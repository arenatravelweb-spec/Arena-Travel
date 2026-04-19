import { useState, useEffect, useRef } from 'react'

const STATS = [
  { target: 4800, label: 'Viajeros felices' },
  { target: 63,   label: 'Destinos activos' },
  { target: 12,   label: 'Años de experiencia' },
  { target: 98,   label: '% satisfacción' },
]

function Counter({ target }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          const duration = 1800
          const start = performance.now()
          const step = (now) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const ease = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(ease * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
          obs.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])

  return (
    <span className="stats__number" ref={ref}>
      {count.toLocaleString('es-ES')}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats__grid">
          {STATS.map(({ target, label }) => (
            <div className="stats__item reveal" key={label}>
              <Counter target={target} />
              <span className="stats__label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
