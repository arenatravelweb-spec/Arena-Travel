import AnimatedButton from './AnimatedButton'

export default function CTABanner() {
  return (
    <section className="cta-banner">
      <div className="container cta-banner__content">
        <div className="cta-banner__text">
          <h2>¿Lista para tu próxima aventura?</h2>
          <p>Contanos tu sueño y nosotras lo convertimos en realidad. Consulta gratuita y sin compromiso.</p>
        </div>
        <AnimatedButton text="Comenzar a planificar" href="https://wa.me/5493815477147" size="lg" color="var(--color-accent)" />
      </div>
    </section>
  )
}
