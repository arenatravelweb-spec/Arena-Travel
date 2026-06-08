import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  HiArrowLeft, HiCalendarDays, HiMapPin, HiCheck, HiXMark,
  HiBuildingOffice2, HiClock, HiExclamationCircle, HiChatBubbleLeftRight,
  HiStar, HiCreditCard, HiReceiptPercent,
} from 'react-icons/hi2'
import { supabase } from '../lib/supabase'
import ItinerarioEditorial from '../components/reserva/ItinerarioEditorial'

const WA = 'https://wa.me/5493815477147'

const MESES = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']

function fmt(n) {
  return Number(n).toLocaleString('es-AR', { minimumFractionDigits: 0 })
}

function parseFecha(str) {
  if (!str) return ''
  const [y, m, d] = str.split('-')
  return `${parseInt(d)} ${MESES[parseInt(m) - 1]} ${y}`
}

function Stars({ count }) {
  return (
    <span className="pdetalle__stars">
      {Array.from({ length: Math.max(0, parseInt(count) || 0) }).map((_, i) => (
        <HiStar key={i} />
      ))}
    </span>
  )
}

function StatusBadge({ estado }) {
  const map = {
    ultimos_lugares: { label: 'Últimos lugares', cls: 'fechas__status--ultimos' },
    disponible:      { label: 'Disponible',      cls: 'fechas__status--disponible' },
    agotado:         { label: 'Agotado',          cls: 'fechas__status--agotado' },
  }
  const s = map[estado] || map.disponible
  return <span className={`fechas__status ${s.cls}`}><HiExclamationCircle /> {s.label}</span>
}

export default function PaqueteDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [paquete, setPaquete] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fechasVisible, setFechasVisible] = useState(5)
  const [selectedFecha, setSelectedFecha] = useState(null)

  useEffect(() => {
    supabase.from('productos').select('*').eq('id', id).single()
      .then(({ data, error }) => {
        if (!error) setPaquete(data)
        setLoading(false)
      })
  }, [id])

  // Pre-select first date
  useEffect(() => {
    if (paquete?.fechas_salida?.length > 0 && !selectedFecha) {
      setSelectedFecha(paquete.fechas_salida[0].fecha)
    }
  }, [paquete])

  const handleReservar = (fecha) => {
    const f = fecha || selectedFecha
    const origen = paquete?.origen_ciudad || 'San Miguel de Tucumán'
    navigate(`/reservar?paquete=${id}&fecha=${f}&origen=${encodeURIComponent(origen)}`)
  }

  if (loading) {
    return (
      <div className="pdetalle-loading">
        <div className="adm-spinner" />
        <span>Cargando paquete…</span>
      </div>
    )
  }

  if (!paquete) {
    return (
      <div className="pdetalle-loading">
        <p>Paquete no encontrado.</p>
        <Link to="/" className="btn btn--outline btn--sm" style={{ marginTop: '1rem' }}>
          Volver al inicio
        </Link>
      </div>
    )
  }

  const itinerario       = paquete.itinerario       ?? []
  const fechasSalida     = paquete.fechas_salida     ?? []
  const alojamiento      = paquete.alojamiento       ?? null
  const incluye          = paquete.incluye           ?? []
  const noIncluye        = paquete.no_incluye        ?? []
  const precioDesde      = paquete.precio || paquete.precio_desde || 0
  const esInternacional  = paquete.categoria === 'internacional'

  // Next 3 upcoming dates for sidebar
  const proximasFechas = fechasSalida.slice(0, 3)

  return (
    <>
      {/* Simple header */}
      <header className="pdetalle__header">
        <div className="container pdetalle__header-inner">
          <button className="pdetalle__back" onClick={() => navigate(-1)}>
            <HiArrowLeft /> Volver
          </button>
          <Link to="/" className="pdetalle__logo-link">
            <img src="/logo-candy.webp" alt="Arena Travel" className="pdetalle__logo"
              onError={e => { e.target.style.display='none' }} />
          </Link>
          <a
            href={WA}
            target="_blank"
            rel="noreferrer"
            className="btn btn--primary btn--sm"
          >
            <HiChatBubbleLeftRight /> Consultar
          </a>
        </div>
      </header>

      {/* Hero */}
      <div className="pdetalle__hero">
        {paquete.imagen_url ? (
          <img src={paquete.imagen_url} alt={paquete.nombre} className="pdetalle__hero-img" />
        ) : (
          <div className="pdetalle__hero-placeholder" />
        )}
        <div className="pdetalle__hero-overlay" />
        <div className="container pdetalle__hero-content">
          {paquete.categoria && (
            <span className="pdetalle__hero-badge">
              {paquete.categoria.charAt(0).toUpperCase() + paquete.categoria.slice(1)}
            </span>
          )}
          <h1 className="pdetalle__hero-title">{paquete.nombre}</h1>
          {(paquete.duracion_dias || paquete.duracion_noches) && (
            <span className="pdetalle__hero-meta">
              <HiCalendarDays />
              {paquete.duracion_dias} días / {paquete.duracion_noches} noches
            </span>
          )}
          {paquete.destino_ciudad && (
            <span className="pdetalle__hero-meta">
              <HiMapPin /> {paquete.origen_ciudad || 'Tucumán'} → {paquete.destino_ciudad}
            </span>
          )}
        </div>
      </div>

      {/* Main layout */}
      <div className="container">
        <div className="pdetalle__layout">
          {/* ── LEFT: main content ── */}
          <main className="pdetalle__main">

            {/* Internacionales: CTA de consulta, sin itinerario en página */}
            {esInternacional && (
              <section className="pdetalle__section pdetalle__section--intl-cta">
                <p className="pdetalle__intl-msg">
                  Para ver el itinerario completo y consultar disponibilidad, escribinos por WhatsApp o hacé click en <strong>Comprar ahora</strong> desde la página principal.
                </p>
                <a
                  href={WA}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--primary"
                >
                  <HiChatBubbleLeftRight /> Consultar por WhatsApp
                </a>
              </section>
            )}

            {/* Itinerary — solo nacionales/egresados en la página */}
            {!esInternacional && itinerario.length > 0 && (
              <section className="pdetalle__section">
                <h2 className="pdetalle__section-title">Itinerario día a día</h2>
                <ItinerarioEditorial itinerario={itinerario} paquete={paquete} />
              </section>
            )}

            {/* Accommodation */}
            {!esInternacional && alojamiento && (
              <section className="pdetalle__section">
                <h2 className="pdetalle__section-title">
                  Tu alojamiento en {paquete.destino_ciudad || ''}
                </h2>
                <div className="aloj__card">
                  <div className="aloj__icon"><HiBuildingOffice2 /></div>
                  <div className="aloj__info">
                    <div className="aloj__name-row">
                      <strong className="aloj__name">{alojamiento.nombre}</strong>
                      {alojamiento.estrellas > 0 && <Stars count={alojamiento.estrellas} />}
                    </div>
                    {alojamiento.descripcion && (
                      <p className="aloj__desc">{alojamiento.descripcion}</p>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Includes / Excludes — solo para nacionales/egresados */}
            {!esInternacional && (incluye.length > 0 || noIncluye.length > 0) && (
              <section className="pdetalle__section">
                <div className="aloj__includes">
                  {incluye.length > 0 && (
                    <div>
                      <h3 className="aloj__includes-title aloj__includes-title--ok">
                        <HiCheck /> Incluye
                      </h3>
                      <ul className="aloj__list">
                        {incluye.map((item, i) => (
                          <li key={i} className="aloj__list-item aloj__list-item--ok">
                            <HiCheck /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {noIncluye.length > 0 && (
                    <div>
                      <h3 className="aloj__includes-title aloj__includes-title--no">
                        <HiXMark /> No incluye
                      </h3>
                      <ul className="aloj__list">
                        {noIncluye.map((item, i) => (
                          <li key={i} className="aloj__list-item aloj__list-item--no">
                            <HiXMark /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Dates table — solo para nacionales/egresados */}
            {!esInternacional && fechasSalida.length > 0 && (
              <section className="pdetalle__section">
                <h2 className="pdetalle__section-title">Fechas disponibles</h2>
                <div className="fechas__table">
                  <div className="fechas__thead">
                    <span>Fecha</span>
                    <span>Precio final</span>
                    <span>Valor por día</span>
                    <span>Estado</span>
                    <span />
                  </div>
                  {fechasSalida.slice(0, fechasVisible).map((f, i) => {
                    const precio   = f.precio || precioDesde
                    const dias     = paquete.duracion_dias || 1
                    const porDia   = Math.round(precio / dias)
                    const agotado  = f.estado === 'agotado'
                    return (
                      <div
                        key={i}
                        className={`fechas__row${selectedFecha === f.fecha ? ' fechas__row--selected' : ''}`}
                        onClick={() => !agotado && setSelectedFecha(f.fecha)}
                      >
                        <div className="fechas__date-cell">
                          <div className="fechas__date-icon"><HiCalendarDays /></div>
                          <div>
                            <strong className="fechas__date">{parseFecha(f.fecha)}</strong>
                            <span className="fechas__duration">
                              {paquete.duracion_dias} días / {paquete.duracion_noches} noches
                            </span>
                          </div>
                        </div>
                        <div>
                          <span className="fechas__price">${fmt(precio)}</span>
                          <span className="fechas__per-person">Precio por persona</span>
                        </div>
                        <div className="fechas__per-day">
                          <HiClock /> ${fmt(porDia)}/día
                        </div>
                        <StatusBadge estado={f.estado || 'disponible'} />
                        <button
                          className="btn btn--primary btn--sm fechas__btn"
                          disabled={agotado}
                          onClick={e => { e.stopPropagation(); handleReservar(f.fecha) }}
                        >
                          Reservar
                        </button>
                      </div>
                    )
                  })}
                </div>
                {fechasSalida.length > fechasVisible && (
                  <button
                    className="fechas__more"
                    onClick={() => setFechasVisible(v => v + 10)}
                  >
                    Ver más fechas ({fechasSalida.length - fechasVisible})
                  </button>
                )}
              </section>
            )}

            {/* Fallback when no structured data exists yet */}
            {itinerario.length === 0 && !alojamiento && fechasSalida.length === 0 && (
              <section className="pdetalle__section pdetalle__section--fallback">
                {paquete.descripcion && (
                  <>
                    <h2 className="pdetalle__section-title">Descripción del paquete</h2>
                    <p className="pdetalle__fallback-desc">{paquete.descripcion}</p>
                  </>
                )}
                <div className="pdetalle__fallback-cta">
                  <p>Para ver las fechas y reservar este paquete, consultanos por WhatsApp.</p>
                  <a href={WA} target="_blank" rel="noreferrer" className="btn btn--primary">
                    <HiChatBubbleLeftRight /> Consultar disponibilidad
                  </a>
                </div>
              </section>
            )}
          </main>

          {/* ── RIGHT: sticky sidebar ── */}
          <aside className="pdetalle__sidebar">
            <>
              <div className="sidebar-det__price-box">
                <span className="sidebar-det__price-label">PRECIO POR PERSONA DESDE</span>
                {precioDesde > 0
                  ? <p className="sidebar-det__price-amount">${fmt(precioDesde)}</p>
                  : <p className="sidebar-det__price-amount sidebar-det__price-amount--consultar">A consultar</p>
                }
                <span className="sidebar-det__price-note">* Tarifa base doble / triple</span>
              </div>

              <div className="sidebar-det__body">
                {!esInternacional && proximasFechas.length > 0 && (
                  <div className="sidebar-det__section">
                    <span className="sidebar-det__section-label">PRÓXIMAS SALIDAS</span>
                    <div className="sidebar-det__dates">
                      {proximasFechas.map((f, i) => (
                        <button
                          key={i}
                          className={`sidebar-det__date-chip${selectedFecha === f.fecha ? ' sidebar-det__date-chip--selected' : ''}`}
                          onClick={() => setSelectedFecha(f.fecha)}
                        >
                          <HiCalendarDays /> {parseFecha(f.fecha)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {!esInternacional && paquete.origen_ciudad && (
                  <div className="sidebar-det__section">
                    <span className="sidebar-det__section-label">SALIDAS DISPONIBLES DESDE</span>
                    <div className="sidebar-det__city">
                      <HiMapPin />
                      <span>{paquete.origen_ciudad}</span>
                      <span className="sidebar-det__city-badge">base</span>
                    </div>
                  </div>
                )}

                {!esInternacional && (
                  <button
                    className="btn btn--primary btn--full sidebar-det__btn"
                    onClick={() => handleReservar()}
                    disabled={!selectedFecha && fechasSalida.length > 0}
                  >
                    Reservar ahora
                  </button>
                )}
                <a
                  href={WA}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--primary btn--full sidebar-det__btn"
                >
                  <HiChatBubbleLeftRight /> Consultar por WhatsApp
                </a>

                {!esInternacional && (
                  <div className="sidebar-det__perks">
                    <span><HiReceiptPercent /> Reservá con seña</span>
                    <span><HiCreditCard /> Hasta 6 cuotas sin interés</span>
                  </div>
                )}
              </div>

                <p className="sidebar-det__disclaimer">
                  Precio sujeto a modificación. Las tasas e impuestos se calculan al momento de reservar.
                </p>
              </>
          </aside>
        </div>
      </div>
    </>
  )
}
