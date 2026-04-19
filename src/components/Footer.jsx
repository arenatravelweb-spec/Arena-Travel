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
            src="https://res.cloudinary.com/dabikk5ei/image/upload/f_webp,q_auto/v1776605663/Dise%C3%B1o_sin_t%C3%ADtulo_8_phoytl.png"
            alt="Arena Travel"
            className="nav__logo-img"
          />
        </a>

        <nav className="footer__nav">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href}>{label}</a>
          ))}
        </nav>

        <p className="footer__copy">© 2026 Arena Travel. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
