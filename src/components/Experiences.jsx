const EXPERIENCES = [
  { title: 'Viajes de amigos',      text: 'Aventuras grupales para vivir con tus amigos. Nuevos destinos, risas compartidas y recuerdos que duran para siempre.' },
  { title: 'Viajes de mujeres',     text: 'Escapadas diseñadas para mujeres que quieren explorar el mundo con libertad, seguridad y buena compañía.' },
  { title: 'Viajes en pareja',      text: 'Momentos románticos e inolvidables. Destinos soñados para compartir con quien más querés.' },
  { title: 'Viajes en familia',     text: 'Itinerarios pensados para que todos, grandes y pequeños, vivan aventuras juntos.' },
  { title: 'Viajes de Egresados',   text: 'Experiencias únicas para cerrar una etapa inolvidable, combinando diversión, aventura y momentos que quedan para toda la vida.', logo: null },
]

export default function Experiences() {
  return (
    <section className="section experiencias" id="experiencias">
      <div className="experiencias__bg">
        <img
          src="https://i.pinimg.com/1200x/ea/96/2d/ea962d969c383e5576b3d2bdfd9821fc.jpg"
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
          {EXPERIENCES.map(({ title, text, logo }) => (
            <div key={title} className="exp__card reveal">
              <div className="exp__card-glow" />
              <div className="exp__card-borderglow" />
              {logo && <img src={logo} alt={title} className="exp__card-logo" />}
              <p className="exp__card-title">{title}</p>
              <p className="exp__card-body">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
