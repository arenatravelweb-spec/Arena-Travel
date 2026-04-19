import { useState, useEffect, useRef } from 'react'

const NAV_ITEMS = [
  { href: '#inicio',       label: 'Inicio',       id: 'inicio' },
  { href: '#nosotros',     label: 'Nosotros',     id: 'nosotros' },
  { href: '#productos',    label: 'Productos',    id: 'productos' },
  { href: '#experiencias', label: 'Experiencias', id: 'experiencias' },
  { href: '#contacto',     label: 'Contacto',     id: 'contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [activeSection, setActive]  = useState('inicio')
  const [indicator, setIndicator]   = useState({ width: 0, left: 0, opacity: 0 })
  const pillRef = useRef(null)

  /* ── scroll → header compacto ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── sección activa via IntersectionObserver ── */
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  /* ── posición del indicador ── */
  useEffect(() => {
    if (!pillRef.current) return
    const el = pillRef.current.querySelector(`[data-id="${activeSection}"]`)
    if (!el) { setIndicator(p => ({ ...p, opacity: 0 })); return }
    setIndicator({ width: el.offsetWidth, left: el.offsetLeft, opacity: 1 })
  }, [activeSection, scrolled])

  const closeMenu = () => { setMenuOpen(false); document.body.style.overflow = '' }
  const toggleMenu = () => {
    const next = !menuOpen
    setMenuOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`} id="header">
      <nav className="nav container">

        {/* ── Pill desktop ── */}
        <div className={`nav__pill${scrolled ? ' nav__pill--scrolled' : ''}`} ref={pillRef}>

          {/* Logo dentro de la pill */}
          <a href="#inicio" className="nav__pill-logo" onClick={closeMenu}>
            <img
              src="https://res.cloudinary.com/dabikk5ei/image/upload/f_webp,q_auto/v1776605663/Dise%C3%B1o_sin_t%C3%ADtulo_8_phoytl.png"
              alt="Arena Travel"
              className="nav__logo-img"
            />
          </a>

          <div className="nav__pill-divider" />

          {NAV_ITEMS.map(({ href, label, id }) => (
            <a
              key={id}
              href={href}
              data-id={id}
              className={`nav__pill-link${activeSection === id ? ' active' : ''}`}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}

          {/* Indicador deslizante */}
          <span
            className="nav__pill-indicator"
            style={{
              width:     indicator.width,
              transform: `translateX(${indicator.left}px)`,
              opacity:   indicator.opacity,
            }}
          />
        </div>

        {/* ── Derecha: hamburger ── */}
        <div className="nav__actions">
          <button
            className="nav__toggle"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <span /><span /><span />
          </button>
        </div>

        {/* ── Menú mobile ── */}
        <ul className={`nav__list${menuOpen ? ' open' : ''}`} id="nav-list">
          {NAV_ITEMS.map(({ href, label, id }) => (
            <li key={id}>
              <a
                href={href}
                className={`nav__link${activeSection === id ? ' active' : ''}`}
                onClick={closeMenu}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

      </nav>
    </header>
  )
}
