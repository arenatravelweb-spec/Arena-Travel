import { useState, useEffect, useRef } from 'react'

const TESTIMONIALS = [
  {
    id: 1, stars: '★★★★★',
    quote: '"El viaje a Japón superó todas mis expectativas. Cada detalle estaba perfectamente organizado. Nómada se encargó de todo y yo solo me dediqué a disfrutar."',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&q=80&auto=format&fit=crop&crop=face',
    name: 'Laura Martínez', trip: 'Tokio, Japón · 2024',
  },
  {
    id: 2, stars: '★★★★★',
    quote: '"Nuestra luna de miel en Maldivas fue perfecta. Las villas sobre el agua, los atardeceres... Lo recomendamos a todo el mundo. ¡Ya estamos planeando el próximo viaje!"',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&q=80&auto=format&fit=crop&crop=face',
    name: 'Carlos y Ana Rodríguez', trip: 'Maldivas · 2024',
  },
  {
    id: 3, stars: '★★★★★',
    quote: '"Viajé sola por primera vez a Costa Rica y gracias a Nómada me sentí segura en todo momento. El itinerario era flexible y los guías locales increíbles."',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&q=80&auto=format&fit=crop&crop=face',
    name: 'Sofía López', trip: 'Costa Rica · 2025',
  },
  {
    id: 4, stars: '★★★★★',
    quote: '"El safari en Kenia fue una experiencia transformadora. Ver la gran migración en vivo es algo que no se puede describir con palabras. Gracias Nómada por hacer posible este sueño."',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&q=80&auto=format&fit=crop&crop=face',
    name: 'Miguel Sánchez', trip: 'Kenia · 2025',
  },
]

function getPerView() {
  if (typeof window === 'undefined') return 3
  return window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [perView, setPerView] = useState(getPerView)
  const [resetKey, setResetKey] = useState(0)
  const trackRef = useRef(null)
  const total = Math.ceil(TESTIMONIALS.length / perView)

  useEffect(() => {
    if (!trackRef.current?.children[0]) return
    const cardW = trackRef.current.children[0].offsetWidth + 24
    trackRef.current.style.transform = `translateX(-${current * perView * cardW}px)`
  }, [current, perView])

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(prev => (prev + 1) % total)
    }, 5000)
    return () => clearInterval(id)
  }, [total, resetKey])

  useEffect(() => {
    const handleResize = () => {
      const newPer = getPerView()
      setPerView(prev => {
        if (newPer !== prev) {
          setCurrent(0)
          return newPer
        }
        return prev
      })
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const goTo = (index) => {
    setCurrent((index + total) % total)
    setResetKey(k => k + 1)
  }

  return (
    <section className="section testimonios">
      <div className="container">
        <div className="section__header reveal">
          <p className="section__label">Lo que dicen</p>
          <h2 className="section__title">Nuestros viajeros</h2>
        </div>

        <div className="testimonios__slider" id="testimonios-slider">
          <div className="testimonios__track" ref={trackRef} id="testimonios-track">
            {TESTIMONIALS.map(t => (
              <article key={t.id} className="testi-card">
                <div className="testi-card__stars">{t.stars}</div>
                <blockquote className="testi-card__quote">{t.quote}</blockquote>
                <div className="testi-card__author">
                  <img src={t.img} alt={t.name} />
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.trip}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="testimonios__controls">
          <button className="testi-btn" aria-label="Anterior" onClick={() => goTo(current - 1)}>
            &#8592;
          </button>
          <div className="testi-dots" id="testi-dots">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                className={`testi-dot${i === current ? ' testi-dot--active' : ''}`}
                aria-label={`Ir a slide ${i + 1}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button className="testi-btn" aria-label="Siguiente" onClick={() => goTo(current + 1)}>
            &#8594;
          </button>
        </div>
      </div>
    </section>
  )
}
