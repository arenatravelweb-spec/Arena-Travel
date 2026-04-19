const TESTIMONIALS = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&q=80&auto=format&fit=crop&crop=face',
    name: 'Laura Martínez',
    trip: 'Río de Janeiro',
    quote: 'El viaje superó todas mis expectativas. Cada detalle perfectamente organizado.',
    r: -15,
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&q=80&auto=format&fit=crop&crop=face',
    name: 'Sofía López',
    trip: 'Punta Cana',
    quote: 'Viajé sola por primera vez y me sentí segura en todo momento. ¡Increíble!',
    r: -5,
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=300&q=80&auto=format&fit=crop&crop=face',
    name: 'Ana Rodríguez',
    trip: 'Mar del Plata',
    quote: 'Las villas sobre el agua, los atardeceres... Una luna de miel perfecta.',
    r: 5,
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=300&h=300&q=80&auto=format&fit=crop&crop=face',
    name: 'Valeria Gómez',
    trip: 'Cancún',
    quote: 'Ver la gran migración en vivo es algo que no se puede describir con palabras.',
    r: 15,
  },
]

export default function Testimonials() {
  return (
    <section className="section testimonios">
      <div className="container">
        <div className="section__header reveal">
          <p className="section__label">Lo que dicen</p>
          <h2 className="section__title">Nuestros viajeros</h2>
        </div>

        <div className="testi-fan">
          {TESTIMONIALS.map(({ id, img, name, trip, quote, r }) => (
            <div
              key={id}
              className="testi-fan__card"
              style={{ '--r': r, '--img': `url(${img})` }}
            >
              <div className="testi-fan__quote">"{quote}"</div>
              <div className="testi-fan__label">
                <strong>{name}</strong>
                <span>{trip}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
