import { HiShieldCheck, HiUserGroup, HiHeart } from 'react-icons/hi2'
import AnimatedButton from './AnimatedButton'

const FEATURES = [
  { Icon: HiShieldCheck, title: 'Viajes 100% seguros para ellas',  desc: 'Destinos verificados y acompañamiento real en cada etapa del viaje.' },
  { Icon: HiUserGroup,   title: 'Equipo femenino especializado',    desc: 'Te asesoramos mujeres viajeras que entienden lo que necesitás.' },
  { Icon: HiHeart,       title: 'Comunidad de viajeras',           desc: 'Unite a miles de mujeres que ya descubrieron el mundo con nosotras.' },
]

export default function About() {
  return (
    <section className="section nosotros" id="nosotros">
      <div className="container nosotros__container">
        <div className="nosotros__media reveal">
          <div className="nosotros__img-main nos-card">
            <img
              src="https://res.cloudinary.com/doxubzldn/image/upload/v1777320641/ssssaw7izgvfdursw9oe.webp"
              alt="Viajeras felices"
              loading="lazy"
              style={{ objectPosition: 'center 25%' }}
            />
          </div>
          <div className="nosotros__img-secondary nos-card">
            <img
              src="https://res.cloudinary.com/doxubzldn/image/upload/v1777320642/lsvvrqlkjum3mlyg1k9r.webp"
              alt="Mujer viajando sola"
              loading="lazy"
              style={{ objectPosition: 'center 55%' }}
            />
          </div>
        </div>

        <div className="nosotros__content reveal">
          <p className="section__label">Quiénes somos</p>
          <h2 className="section__title">Creada por mujeres,<br /><em>para mujeres</em></h2>
          <p className="nosotros__text">
            Somos una agencia fundada por mujeres viajeras. Sabemos lo que significa querer explorar el mundo con libertad, seguridad y autenticidad — porque nosotras también lo vivimos.
          </p>
          <p className="nosotros__text">
            No vendemos paquetes genéricos. Diseñamos cada itinerario pensando en vos: tus ritmos, tus intereses, tus sueños. Porque viajar es un acto de valentía, y merecés hacerlo en las mejores condiciones.
          </p>

          <ul className="nosotros__features">
            {FEATURES.map(({ Icon, title, desc }) => (
              <li key={title}>
                <div className="feature-icon"><Icon /></div>
                <div>
                  <strong>{title}</strong>
                  <p>{desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <AnimatedButton text="Hablá con nosotras" href="https://wa.me/5493815477147" />
        </div>
      </div>
    </section>
  )
}
