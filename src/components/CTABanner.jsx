import AnimatedButton from './AnimatedButton'

const LOGO = 'https://res.cloudinary.com/doxubzldn/image/upload/v1777320635/os9hwfzbwqdghhqrzfgz.webp'
const QR   = 'https://res.cloudinary.com/doxubzldn/image/upload/v1777320643/m0vn50bnamnbpgjbsfqk.png'

export default function CTABanner() {
  return (
    <section className="cta-banner">
      <div className="container cta-banner__content">
        <img src={LOGO} alt="Arena Travel" className="cta-banner__logo" />
        <div className="cta-banner__text">
          <h2>¿Lista para tu próxima aventura?</h2>
          <p>Contanos tu sueño y nosotras lo convertimos en realidad. Consulta gratuita y sin compromiso.</p>
          <AnimatedButton text="Comenzar a planificar" href="https://wa.me/5493815477147" size="lg" color="var(--color-accent)" />
        </div>
        <div className="cta-banner__qr">
          <img src={QR} alt="QR Arena Travel" className="cta-banner__qr-img" />
          <p className="cta-banner__qr-label">Agencia registrada con leg. 20593</p>
        </div>
      </div>
    </section>
  )
}
