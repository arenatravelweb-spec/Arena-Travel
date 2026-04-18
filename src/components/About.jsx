const FEATURES = [
  { icon: '🔒', title: 'Viajes 100% seguros para ellas',  desc: 'Destinos verificados y acompañamiento real en cada etapa del viaje.' },
  { icon: '👩', title: 'Equipo femenino especializado',    desc: 'Te asesoramos mujeres viajeras que entienden lo que necesitas.' },
  { icon: '🤝', title: 'Comunidad de viajeras',           desc: 'Únete a miles de mujeres que ya descubrieron el mundo con nosotras.' },
]

export default function About() {
  return (
    <section className="section nosotros" id="nosotros">
      <div className="container nosotros__container">
        <div className="nosotros__media reveal">
          <div className="nosotros__img-main">
            <img
              src="https://i.pinimg.com/1200x/ea/96/2d/ea962d969c383e5576b3d2bdfd9821fc.jpg"
              alt="Viajeras felices"
              loading="lazy"
            />
          </div>
          <div className="nosotros__img-secondary">
            <img
              src="https://i.pinimg.com/736x/48/27/7a/48277a45a728554cb3d3fd5b62137655.jpg"
              alt="Mujer viajando sola"
              loading="lazy"
            />
          </div>
          <div className="nosotros__badge">
            <strong>+12</strong>
            <span>años con<br />ellas</span>
          </div>
        </div>

        <div className="nosotros__content reveal">
          <p className="section__label">Quiénes somos</p>
          <h2 className="section__title">Creadas por mujeres,<br /><em>para mujeres</em></h2>
          <p className="nosotros__text">
            Somos una agencia boutique fundada por mujeres viajeras. Sabemos lo que significa querer explorar el mundo con libertad, seguridad y autenticidad — porque nosotras también lo vivimos.
          </p>
          <p className="nosotros__text">
            No vendemos paquetes genéricos. Diseñamos cada itinerario pensando en ti: tus ritmos, tus intereses, tus sueños. Porque viajar es un acto de valentía, y mereces hacerlo en las mejores condiciones.
          </p>

          <ul className="nosotros__features">
            {FEATURES.map(({ icon, title, desc }) => (
              <li key={title}>
                <div className="feature-icon">{icon}</div>
                <div>
                  <strong>{title}</strong>
                  <p>{desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <a href="#contacto" className="btn btn--primary">Habla con nosotras</a>
        </div>
      </div>
    </section>
  )
}
