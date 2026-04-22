import AnimatedButton from './AnimatedButton'

const LOGO = 'https://res.cloudinary.com/dabikk5ei/image/upload/f_webp,q_auto,w_220/v1776865905/logoAT_adrvvs.jpg'

export default function CTABanner() {
  return (
    <section className="cta-banner">
      <div className="container cta-banner__content">
        <img src={LOGO} alt="Arena Travel" className="cta-banner__logo" />
        <div className="cta-banner__text">
          <h2>¿Lista para tu próxima aventura?</h2>
          <p>Contanos tu sueño y nosotras lo convertimos en realidad. Consulta gratuita y sin compromiso.</p>
        </div>
        <AnimatedButton text="Comenzar a planificar" href="https://wa.me/5493815477147" size="lg" color="var(--color-accent)" />
      </div>
    </section>

  )
}
