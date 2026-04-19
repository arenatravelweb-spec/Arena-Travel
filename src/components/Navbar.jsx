import { useState, useEffect, useRef } from 'react'
import {
  HiHome, HiUserGroup, HiShoppingBag, HiSparkles, HiEnvelope
} from 'react-icons/hi2'

const NAV_ITEMS = [
  { href: '#inicio',       label: 'Inicio',       id: 'inicio',       Icon: HiHome },
  { href: '#nosotros',     label: 'Nosotros',     id: 'nosotros',     Icon: HiUserGroup },
  { href: '#productos',    label: 'Productos',    id: 'productos',    Icon: HiShoppingBag },
  { href: '#experiencias', label: 'Experiencias', id: 'experiencias', Icon: HiSparkles },
  { href: '#contacto',     label: 'Contacto',     id: 'contacto',     Icon: HiEnvelope },
]

export default function Navbar() {
  const [scrolled, setScrolled]    = useState(false)
  const [activeSection, setActive] = useState('inicio')
  const [indicator, setIndicator]  = useState({ width: 0, left: 0, opacity: 0 })
  const pillRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!pillRef.current) return
    const el = pillRef.current.querySelector(`[data-id="${activeSection}"]`)
    if (!el) { setIndicator(p => ({ ...p, opacity: 0 })); return }
    setIndicator({ width: el.offsetWidth, left: el.offsetLeft, opacity: 1 })
  }, [activeSection, scrolled])

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`} id="header">
        <nav className="nav container">
          {/* ── Pill desktop ── */}
          <div className={`nav__pill${scrolled ? ' nav__pill--scrolled' : ''}`} ref={pillRef}>
            <a href="#inicio" className="nav__pill-logo">
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
              >
                {label}
              </a>
            ))}
            <span
              className="nav__pill-indicator"
              style={{
                width:     indicator.width,
                transform: `translateX(${indicator.left}px)`,
                opacity:   indicator.opacity,
              }}
            />
          </div>
        </nav>
      </header>

      {/* ── Bottom nav mobile ── */}
      <nav className="mobile-nav" aria-label="Navegación móvil">
        {NAV_ITEMS.map(({ href, id, Icon }) => (
          <a
            key={id}
            href={href}
            className={`mobile-nav__item${activeSection === id ? ' active' : ''}`}
            aria-label={id}
          >
            <Icon />
          </a>
        ))}
      </nav>
    </>
  )
}
