import { useState } from 'react'

const DESTINATIONS = [
  {
    id: 1, category: 'europa', large: true,
    img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=900&q=80&auto=format&fit=crop',
    alt: 'París', tag: 'Europa', name: 'París, Francia',
    text: 'La ciudad del amor y la luz, con arte, gastronomía y la icónica Torre Eiffel.',
    price: '€ 890',
  },
  {
    id: 2, category: 'asia',
    img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=700&q=80&auto=format&fit=crop',
    alt: 'Tokio', tag: 'Asia', name: 'Tokio, Japón',
    text: 'Tradición y modernidad en perfecta armonía.',
    price: '€ 1.290',
  },
  {
    id: 3, category: 'america',
    img: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=700&q=80&auto=format&fit=crop',
    alt: 'Buenos Aires', tag: 'América', name: 'Buenos Aires',
    text: 'El tango, la arquitectura europea y la pasión porteña.',
    price: '€ 760',
  },
  {
    id: 4, category: 'asia',
    img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=700&q=80&auto=format&fit=crop',
    alt: 'Bali', tag: 'Asia', name: 'Bali, Indonesia',
    text: 'Templos, arrozales y playas de ensueño en la isla de los dioses.',
    price: '€ 1.050',
  },
  {
    id: 5, category: 'africa',
    img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=700&q=80&auto=format&fit=crop',
    alt: 'Safari Kenia', tag: 'África', name: 'Safari, Kenia',
    text: 'La gran migración y atardeceres sobre la sabana africana.',
    price: '€ 2.100',
  },
  {
    id: 6, category: 'europa',
    img: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=700&q=80&auto=format&fit=crop',
    alt: 'Santorini', tag: 'Europa', name: 'Santorini, Grecia',
    text: 'Casas blancas, puestas de sol y el Mediterráneo en su máximo esplendor.',
    price: '€ 980',
  },
]

const TABS = ['todos', 'europa', 'asia', 'america', 'africa']

export default function Destinations() {
  const [activeTab, setActiveTab] = useState('todos')

  const filtered = DESTINATIONS.filter(
    d => activeTab === 'todos' || d.category === activeTab
  )

  return (
    <section className="section destinos" id="destinos">
      <div className="container">
        <div className="section__header reveal">
          <p className="section__label">Explora el mundo</p>
          <h2 className="section__title">Destinos destacados</h2>
          <p className="section__desc">
            Desde playas paradisíacas hasta ciudades llenas de historia, tenemos el viaje perfecto para ti.
          </p>
        </div>

        <div className="destinos__tabs">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`tab-btn${activeTab === tab ? ' tab-btn--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="destinos__grid" id="destinos-grid">
          {filtered.map(dest => (
            <article
              key={dest.id}
              className={`dest-card${dest.large ? ' dest-card--large' : ''} reveal`}
              data-category={dest.category}
            >
              <div className="dest-card__img-wrap">
                <img src={dest.img} alt={dest.alt} loading="lazy" />
              </div>
              <div className="dest-card__body">
                <span className="dest-card__tag">{dest.tag}</span>
                <h3 className="dest-card__name">{dest.name}</h3>
                <p className="dest-card__text">{dest.text}</p>
                <div className="dest-card__footer">
                  <span className="dest-card__price">
                    Desde <strong>{dest.price}</strong>
                  </span>
                  <a href="#contacto" className="btn btn--sm btn--primary">Ver más</a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="section__cta">
          <a href="#contacto" className="btn btn--outline">Ver todos los destinos</a>
        </div>
      </div>
    </section>
  )
}
