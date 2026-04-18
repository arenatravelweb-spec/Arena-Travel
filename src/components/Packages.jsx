const PACKAGES = [
  {
    id: 1,
    badge: 'Más popular',
    img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=700&q=80&auto=format&fit=crop',
    alt: 'Maldivas',
    duration: '8 días / 7 noches',
    tags: ['✈ Vuelo incluido', '🏨 Hotel 5★', '🍽 Todo incluido'],
    name: 'Luna de miel en Maldivas',
    text: 'Villas sobre el agua, arrecifes de coral y privacidad absoluta para dos.',
    stars: '★★★★★', reviews: '(128 reseñas)',
    oldPrice: '€ 3.800', newPrice: '€ 2.990',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&q=80&auto=format&fit=crop',
    alt: 'Dubái',
    duration: '6 días / 5 noches',
    tags: ['✈ Vuelo incluido', '🏨 Hotel 5★', '🚌 Excursiones'],
    name: 'Dubái: lujo en el desierto',
    text: 'Rascacielos icónicos, desierto infinito y shopping de lujo en la ciudad del futuro.',
    stars: '★★★★★', reviews: '(94 reseñas)',
    newPrice: '€ 1.890',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=700&q=80&auto=format&fit=crop',
    alt: 'Costa Rica',
    duration: '10 días / 9 noches',
    tags: ['✈ Vuelo incluido', '🌿 Ecoturismo', '🏄 Aventura'],
    name: 'Aventura en Costa Rica',
    text: 'Volcanes, selva tropical, playas y biodiversidad única en el corazón de Centroamérica.',
    stars: '★★★★☆', reviews: '(76 reseñas)',
    newPrice: '€ 2.250',
  },
]

export default function Packages() {
  return (
    <section className="section paquetes" id="paquetes">
      <div className="container">
        <div className="section__header reveal">
          <p className="section__label">Nuestras ofertas</p>
          <h2 className="section__title">Paquetes populares</h2>
          <p className="section__desc">Todo incluido para que solo te preocupes de disfrutar.</p>
        </div>

        <div className="paquetes__grid">
          {PACKAGES.map(pkg => (
            <article key={pkg.id} className="pkg-card reveal">
              {pkg.badge && <div className="pkg-card__badge">{pkg.badge}</div>}
              <div className="pkg-card__img-wrap">
                <img src={pkg.img} alt={pkg.alt} loading="lazy" />
                <span className="pkg-card__duration">{pkg.duration}</span>
              </div>
              <div className="pkg-card__body">
                <div className="pkg-card__tags">
                  {pkg.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
                <h3 className="pkg-card__name">{pkg.name}</h3>
                <p className="pkg-card__text">{pkg.text}</p>
                <div className="pkg-card__rating">
                  <span className="stars">{pkg.stars}</span>
                  <span className="reviews">{pkg.reviews}</span>
                </div>
                <div className="pkg-card__footer">
                  <div className="pkg-card__price">
                    {pkg.oldPrice && <span className="old-price">{pkg.oldPrice}</span>}
                    <span className="new-price">{pkg.newPrice}</span>
                    <span className="per-person">por persona</span>
                  </div>
                  <a href="#contacto" className="btn btn--primary">Reservar</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
