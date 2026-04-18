import { useState, useEffect } from 'react'

const SLIDES = [
  'https://i.pinimg.com/736x/bd/36/58/bd3658daca9df60f29769f02e3259c65.jpg',
  'https://i.pinimg.com/1200x/70/31/5c/70315cdf5b5388dfb6926723734e6fc3.jpg',
  'https://i.pinimg.com/736x/28/7c/20/287c20d2d3fc875477ad4fe8312e3487.jpg',
  'https://i.pinimg.com/736x/48/27/7a/48277a45a728554cb3d3fd5b62137655.jpg',
  'https://i.pinimg.com/1200x/ee/fd/6f/eefd6fb704c0e7d208a7f53cda0564c4.jpg',
  'https://i.pinimg.com/1200x/ea/96/2d/ea962d969c383e5576b3d2bdfd9821fc.jpg',
]

const INTERVAL = 5000

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState(null)
  const [transitioning, setTransitioning] = useState(false)

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

  return (
    <section className="hero" id="inicio">

      <div className="hero__bg">
        {prev !== null && (
          <img key={`prev-${prev}`} src={SLIDES[prev]} alt="" className="hero__slide hero__slide--out" />
        )}
        <img key={`cur-${current}`} src={SLIDES[current]} alt="Viajera explorando el mundo" className="hero__slide hero__slide--in" />
        <div className="hero__overlay" />
      </div>

      <div className="hero__content container">
        <p className="hero__label">Viajes diseñados para mujeres que se atreven</p>
        <h1 className="hero__title">
          El mundo es tuyo,<br />
          <em>atrévete a vivirlo</em>
        </h1>
        <p className="hero__desc">
          Experiencias seguras, auténticas y transformadoras, diseñadas especialmente para mujeres como tú.
        </p>
        <div className="hero__actions">
          <a href="#destinos" className="btn btn--primary">Explorar destinos</a>
          <a href="#paquetes" className="btn btn--ghost">Ver paquetes</a>
        </div>
      </div>

      <div className="hero__search container">
        <div className="search-bar">
          <div className="search-bar__field">
            <label>Destino</label>
            <input type="text" placeholder="¿A dónde quieres ir?" />
          </div>
          <div className="search-bar__divider" />
          <div className="search-bar__field">
            <label>Fecha</label>
            <input type="date" />
          </div>
          <div className="search-bar__divider" />
          <div className="search-bar__field">
            <label>Viajeras</label>
            <select>
              <option>1 persona</option>
              <option>2 personas</option>
              <option>3-5 personas</option>
              <option>Grupo +6</option>
            </select>
          </div>
          <button className="btn btn--primary search-bar__btn">Buscar</button>
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

      <button className="hero__arrow hero__arrow--prev" aria-label="Anterior" onClick={() => advance(-1)}>&#8592;</button>
      <button className="hero__arrow hero__arrow--next" aria-label="Siguiente" onClick={() => advance(1)}>&#8594;</button>

      <div className="hero__scroll">
        <span>Descubre más</span>
        <div className="hero__scroll-line" />
      </div>

    </section>
  )
}
