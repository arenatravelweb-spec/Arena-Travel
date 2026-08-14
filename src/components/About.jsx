import { HiShieldCheck, HiUserGroup, HiHeart } from 'react-icons/hi2'
import AnimatedButton from './AnimatedButton'

const FEATURES = [
  { Icon: HiShieldCheck, title: 'Viajes 100% seguros y acompañados', desc: 'Destinos verificados y acompañamiento real en cada etapa del viaje.' },
  { Icon: HiUserGroup,   title: 'Equipo especializado y cercano',    desc: 'Te asesora gente que entiende lo que necesitás y arma tu viaje a medida.' },
  { Icon: HiHeart,       title: 'Comunidad de viajeros',             desc: 'Unite a miles de personas que ya vivieron su historia con nosotros.' },
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
          <h2 className="section__title">Arena Travel: hacemos<br />de cada viaje <em>una historia</em></h2>
          <p className="nosotros__text">
            Cada viaje que armamos es único, como quien lo vive. Escuchamos tus tiempos, tus gustos y tus sueños para diseñar una experiencia que se sienta tuya de principio a fin — no un itinerario más, sino un recuerdo que vas a contar toda la vida.
          </p>
          <p className="nosotros__text">
            Detrás de cada destino hay un equipo que se involucra de verdad: te acompañamos antes, durante y después de viajar, para que solo tengas que preocuparte de disfrutar. Porque para nosotros, viajar bien es viajar con quienes convierten cada paso del camino en parte de tu historia.
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

          <AnimatedButton text="Contanos tu historia" href="https://wa.me/5493815477147" />
        </div>
      </div>
    </section>
  )
}
