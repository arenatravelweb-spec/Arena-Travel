import { useState, useEffect } from 'react'
import { HiChevronDown } from 'react-icons/hi2'

const PALETTES = [
  { bg: '#FFF8EF', accent: '#F7931E', num: '#F7931E' },
  { bg: '#EFF9F8', accent: '#2EC4B6', num: '#2EC4B6' },
  { bg: '#FFFDF8', accent: '#F7931E', num: '#F7931E' },
  { bg: '#EAF6F5', accent: '#1CA7A6', num: '#1CA7A6' },
]

export default function ItinerarioEditorial({ itinerario = [], paquete = null }) {
  const [open, setOpen] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [])

  if (!itinerario.length) return null

  const destino = paquete?.destino_ciudad || paquete?.nombre || 'Destino'
  const dias    = paquete?.duracion_dias
  const noches  = paquete?.duracion_noches

  const toggle = (i) => setOpen(prev => prev === i ? null : i)

  return (
    <div className="itbento">

      {/* ── Header ── */}
      <div className="itbento__header">
        <div className="itbento__header-left">
          <p className="itbento__header-tag">ITINERARIO</p>
          <h2 className="itbento__header-title">{destino}</h2>
        </div>
        {(dias || noches) && (
          <div className="itbento__header-right">
            {dias   && <div className="itbento__pill">{dias}<span>días</span></div>}
            {noches && <div className="itbento__pill itbento__pill--b">{noches}<span>noches</span></div>}
          </div>
        )}
      </div>

      {/* ── Bento grid ── */}
      <div className="itbento__grid">
        {itinerario.map((dia, i) => {
          const pal   = PALETTES[i % PALETTES.length]
          const isOpen = open === i
          const wide   = i % 3 === 0          // every 3rd card spans full width
          const num    = String(dia.dia || i + 1).padStart(2, '0')

          return (
            <div
              key={i}
              className={`itbento__card${wide ? ' itbento__card--wide' : ''}${isOpen ? ' itbento__card--open' : ''}${mounted ? ' itbento__card--in' : ''}`}
              style={{
                '--pal-bg':     pal.bg,
                '--pal-accent': pal.accent,
                '--pal-num':    pal.num,
                animationDelay: `${i * 80}ms`,
              }}
              onClick={() => toggle(i)}
            >
              {/* Big decorative number */}
              <span className="itbento__num" aria-hidden="true">{num}</span>

              {/* Card content */}
              <div className="itbento__inner">
                <div className="itbento__top">
                  <span className="itbento__day-label">DÍA {num}</span>
                  <h3 className="itbento__title">{dia.titulo}</h3>
                </div>

                {/* Description — always visible */}
                {dia.descripcion && (
                  <p className="itbento__desc">{dia.descripcion}</p>
                )}

                {/* Activities — toggled */}
                {dia.actividades?.length > 0 && (
                  <>
                    <button
                      className="itbento__toggle"
                      onClick={e => { e.stopPropagation(); toggle(i) }}
                      aria-expanded={isOpen}
                    >
                      <span>{isOpen ? 'Ocultar' : `${dia.actividades.length} actividades`}</span>
                      <HiChevronDown className={`itbento__chevron${isOpen ? ' itbento__chevron--open' : ''}`} />
                    </button>

                    <div className={`itbento__acts${isOpen ? ' itbento__acts--open' : ''}`}>
                      <div className="itbento__acts-inner">
                        {dia.actividades.map((act, j) => (
                          <div key={j} className="itbento__act">
                            <span className="itbento__act-dot" />
                            <span className="itbento__act-text">{act}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Bottom accent bar */}
              <div className="itbento__bar" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
