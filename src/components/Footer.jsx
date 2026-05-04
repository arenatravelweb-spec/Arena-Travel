const NAV_LINKS = [
  { label: 'Inicio',       href: '#inicio' },
  { label: 'Nosotros',     href: '#nosotros' },
  { label: 'Productos',    href: '#productos' },
  { label: 'Experiencias', href: '#experiencias' },
  { label: 'Contacto',     href: '#contacto' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href="#inicio" className="nav__logo footer__logo">
          <img
            src="https://res.cloudinary.com/doxubzldn/image/upload/v1777911701/IMG_1469_ddi4a7.png"
            alt="Arena Travel"
            className="nav__logo-img"
          />
        </a>

        <div className="footer__right">
          <nav className="footer__nav">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href}>{label}</a>
            ))}
          </nav>
          <p className="footer__copy">© 2026 Arena Travel. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
