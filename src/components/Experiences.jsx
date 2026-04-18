const EXPERIENCES = [
  { icon: '🏝',          title: 'Viajes de lujo',        text: 'Hotels de 5 estrellas, traslados privados y experiencias exclusivas.' },
  { icon: '🎒',          title: 'Aventura y mochilero',  text: 'Rutas off-the-beaten-path para los que quieren lo auténtico.' },
  { icon: '💑',          title: 'Lunas de miel',         text: 'Momentos románticos e inolvidables para la pareja.' },
  { icon: '👨‍👩‍👧‍👦', title: 'Viajes en familia',      text: 'Itinerarios pensados para que todos, grandes y pequeños, disfruten.' },
]

export default function Experiences() {
  return (
    <section className="section experiencias">
      <div className="experiencias__bg">
        <img
          src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?w=1920&q=80&auto=format&fit=crop"
          alt="Experiencia de viaje"
        />
        <div className="experiencias__overlay"></div>
      </div>
      <div className="container experiencias__content">
        <p className="section__label section__label--light">Lo que ofrecemos</p>
        <h2 className="section__title section__title--light">
          Experiencias que<br />marcan la diferencia
        </h2>

        <div className="exp__grid">
          {EXPERIENCES.map(({ icon, title, text }) => (
            <div key={title} className="exp__item reveal">
              <div className="exp__icon">{icon}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
