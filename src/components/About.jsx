const FEATURES = [
  { icon: '🗺', title: 'Itinerarios personalizados', desc: 'Diseñados desde cero según tus preferencias.' },
  { icon: '🛡', title: 'Asistencia 24/7',            desc: 'Siempre disponibles durante tu viaje.' },
  { icon: '💎', title: 'Calidad garantizada',         desc: 'Solo los mejores hoteles, guías y experiencias.' },
]

export default function About() {
  return (
    <section className="section nosotros" id="nosotros">
      <div className="container nosotros__container">
        <div className="nosotros__media reveal">
          <div className="nosotros__img-main">
            <img
              src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80&auto=format&fit=crop"
              alt="Viajeros felices"
              loading="lazy"
            />
          </div>
          <div className="nosotros__img-secondary">
            <img
              src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=500&q=80&auto=format&fit=crop"
              alt="Destino exótico"
              loading="lazy"
            />
          </div>
          <div className="nosotros__badge">
            <strong>+12</strong>
            <span>años creando<br />memorias</span>
          </div>
        </div>

        <div className="nosotros__content reveal">
          <p className="section__label">Quiénes somos</p>
          <h2 className="section__title">Viajamos contigo,<br /><em>no por ti</em></h2>
          <p className="nosotros__text">
            Somos una agencia boutique especializada en viajes a medida. Creemos que cada viajero es único y merece una experiencia diseñada específicamente para ellos: sus ritmos, sus intereses, sus sueños.
          </p>
          <p className="nosotros__text">
            Nuestro equipo de expertos viajeros conoce cada destino de primera mano. No vendemos catálogos — construimos itinerarios con alma.
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

          <a href="#contacto" className="btn btn--primary">Habla con un experto</a>
        </div>
      </div>
    </section>
  )
}
