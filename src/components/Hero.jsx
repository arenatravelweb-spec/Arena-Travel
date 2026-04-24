import { useState, useEffect } from 'react'
import AnimatedButton from './AnimatedButton'

const SLIDES = [
  {
    src:       'https://res.cloudinary.com/dabikk5ei/image/upload/f_webp,q_auto,w_1920/v1776866005/IMG_0493_vleqvb.jpg',
    mobileSrc: 'https://res.cloudinary.com/dabikk5ei/image/upload/f_webp,q_auto,w_750/v1776866005/IMG_0493_vleqvb.jpg',
    pos:       'center 28%',
    mobilePos: 'center 25%',
  },
  {
    src:       'https://res.cloudinary.com/dabikk5ei/image/upload/f_webp,q_auto,w_1920/v1776865977/IMG_1085_vzp1bq.jpg',
    mobileSrc: 'https://res.cloudinary.com/dabikk5ei/image/upload/f_webp,q_auto,w_750,h_1334,c_fill,g_center/v1776865977/IMG_1085_vzp1bq.jpg',
    pos:       'center 40%',
    mobilePos: 'center center',
  },
  {
    src:       'https://res.cloudinary.com/dabikk5ei/image/upload/f_webp,q_auto,w_1920/v1776865965/IMG_1086_zyqmnf.jpg',
    mobileSrc: 'https://res.cloudinary.com/dabikk5ei/image/upload/f_webp,q_auto,w_750/v1776865965/IMG_1086_zyqmnf.jpg',
    pos:       'center 30%',
    mobilePos: 'center 30%',
  },
]

const INTERVAL = 5000

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState(null)
  const [transitioning, setTransitioning] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(mq.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const id = setInterval(() => advance(1), INTERVAL)
    return () => clearInterval(id)
  }, [current])

  const advance = (dir) => {
    if (transitioning) return
    const next = (current + dir + SLIDES.length) % SLIDES.length
    setPrev(current)
    setCurrent(next)
    setTransitioning(true)
    setTimeout(() => { setPrev(null); setTransitioning(false) }, 900)
  }

  const slideStyle = (slide) => ({
    objectPosition: isMobile ? slide.mobilePos : slide.pos,
  })

  return (
    <section className="hero" id="inicio">

      <div className="hero__bg">
        {prev !== null && (
          <img
            key={`prev-${prev}`}
            src={isMobile ? SLIDES[prev].mobileSrc : SLIDES[prev].src}
            alt=""
            className="hero__slide hero__slide--out"
            style={slideStyle(SLIDES[prev])}
          />
        )}
        <img
          key={`cur-${current}`}
          src={isMobile ? SLIDES[current].mobileSrc : SLIDES[current].src}
          alt="Viajera explorando el mundo"
          className="hero__slide hero__slide--in"
          style={slideStyle(SLIDES[current])}
        />
        <div className="hero__overlay" />
      </div>

      <div className="hero__content container">
        <p className="hero__label">Agencia de turismo en Tucumán, Argentina</p>
        <h1 className="hero__title">
          El mundo es tuyo,
          <br />
          <em>atrévete a vivirlo</em>
        </h1>
        <p className="hero__desc">
          Somos una agencia de turismo dedicada a crear experiencias únicas para cada viajero. Te ofrecemos asesoramiento personalizado, paquetes nacionales e internacionales.
        </p>
        <div className="hero__actions">
          <AnimatedButton text="Explorar destinos" href="#productos" color="var(--color-accent)" />
          <AnimatedButton text="Escribinos" href="https://wa.me/5493815477147" color="var(--color-secondary)" />
        </div>
      </div>

      <div className="hero__dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero__dot${i === current ? ' hero__dot--active' : ''}`}
            aria-label={`Imagen ${i + 1}`}
            onClick={() => advance(i - current)}
          />
        ))}
      </div>

      <div className="hero__scroll">
        <span>Descubre más</span>
        <div className="hero__scroll-line" />
      </div>

    </section>
  )
}
