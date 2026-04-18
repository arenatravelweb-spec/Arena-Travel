const FOOTER_COLS = [
  {
    title: 'Destinos',
    links: ['Europa', 'Asia', 'América Latina', 'África', 'Oceanía'],
  },
  {
    title: 'Viajes',
    links: ['Viajes de lujo', 'Lunas de miel', 'Aventura', 'Familia', 'Solo viajero'],
  },
  {
    title: 'Agencia',
    links: ['Quiénes somos', 'Blog de viajes', 'Trabaja con nosotros', 'Política de privacidad', 'Términos y condiciones'],
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <a href="#" className="nav__logo">
              <span className="nav__logo-icon">✦</span>
              Nómada
            </a>
            <p>Agencia de viajes boutique especializada en experiencias únicas y personalizadas desde 2012.</p>
            <div className="footer__social">
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="TikTok">🎵</a>
              <a href="#" aria-label="YouTube">▶</a>
            </div>
          </div>

          {FOOTER_COLS.map(({ title, links }) => (
            <div key={title} className="footer__col">
              <h4>{title}</h4>
              <ul>
                {links.map(link => (
                  <li key={link}><a href="#">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <p>© 2025 Nómada Agencia. Todos los derechos reservados.</p>
          <p>Diseñado con ♥ para los viajeros del mundo</p>
        </div>
      </div>
    </footer>
  )
}
