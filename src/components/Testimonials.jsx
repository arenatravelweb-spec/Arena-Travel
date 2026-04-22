const TESTIMONIALS = [
  {
    id: 1,
    quote: 'Me gustó mucho el detalle y el acompañamiento de la empresa. Primera vez que viajé tan lejos y me sentí confiada y segura.',
    r: -15,
  },
  {
    id: 2,
    quote: 'Un viaje inolvidable. Llegué con dudas e indecisa, pero la calidez y amabilidad de Verónica fue suficiente para lanzarme a la aventura. La organización de Vero y Nadia hicieron de esto unas hermosas vacaciones. ¡Lo volvería hacer!',
    r: -5,
  },
  {
    id: 3,
    quote: 'Excelente experiencia en Punta Cana con las chicas de Arena Travel. Súper recomendable, la amabilidad y buen trato hacen que quieras seguir viajando con ellas.',
    r: 5,
  },
  {
    id: 4,
    quote: 'El viaje a Mar del Plata fue una hermosa experiencia. El hotel muy bueno con media pensión, la cena abundante, rica y saludable, y el desayuno completo.',
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
          {TESTIMONIALS.map(({ id, quote, r }) => (
            <div
              key={id}
              className="testi-fan__card"
              style={{ '--r': r }}
            >
              <div className="testi-fan__quote">"{quote}"</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
