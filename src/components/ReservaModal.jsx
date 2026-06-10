import { useEffect } from 'react'
import {
  HiXMark, HiCalendarDays, HiMapPin, HiClock,
} from 'react-icons/hi2'
import { ReservaProvider, useReserva } from '../context/ReservaContext'
import BookingStepper from './reserva/BookingStepper'
import SidebarReserva from './reserva/SidebarReserva'
import ItinerarioEditorial from './reserva/ItinerarioEditorial'
import StepPasajeros from './reserva/StepPasajeros'
import StepTransporte from './reserva/StepTransporte'
import StepHabitaciones from './reserva/StepHabitaciones'
import StepResumen from './reserva/StepResumen'
import StepCheckout from './reserva/StepCheckout'

const MESES = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']

function parseFecha(str) {
  if (!str) return ''
  const [y, m, d] = str.split('-')
  return `${parseInt(d)} ${MESES[parseInt(m) - 1]} ${y}`
}

function Steps() {
  const { step } = useReserva()
  switch (step) {
    case 1: return <StepPasajeros />
    case 2: return <StepTransporte />
    case 3: return <StepHabitaciones />
    case 4: return <StepResumen />
    case 5: return <StepCheckout />
    default: return null
  }
}

function ModalInner({ producto, onClose }) {
  const itinerario  = producto?.itinerario   ?? []
  const fechas      = producto?.fechas_salida ?? []
  const primerFecha = fechas[0]?.fecha ?? null

  const categLabel =
    producto.categoria === 'egresados'     ? 'Viaje de egresados' :
    producto.categoria === 'internacional' ? 'Internacional'       : 'Nacional'

  return (
    <div className="rmodal__overlay" onClick={onClose}>
      <div className="rmodal" onClick={e => e.stopPropagation()}>

        {/* ── Header ── */}
        <header className="rmodal__header">
          <div className="rmodal__header-meta">
            <span className="rmodal__header-badge">{categLabel}</span>
            <h2 className="rmodal__title">{producto.nombre}</h2>
          </div>
          <button className="rmodal__close" onClick={onClose} aria-label="Cerrar">
            <HiXMark />
          </button>
        </header>

        {/* ── Body ── */}
        <div className="rmodal__body">

          {/* LEFT: itinerary + booking form */}
          <div className="rmodal__main">

            {/* Package banner */}
            {producto.imagen_url && (
              <div className="rmodal__banner">
                <img src={producto.imagen_url} alt={producto.nombre} className="rmodal__banner-img" />
                <div className="rmodal__banner-overlay" />
                <div className="rmodal__banner-info">
                  {(producto.duracion_dias || producto.duracion_noches) && (
                    <span className="rmodal__banner-chip">
                      <HiClock />
                      {producto.duracion_dias}d / {producto.duracion_noches}n
                    </span>
                  )}
                  {producto.origen_ciudad && (
                    <span className="rmodal__banner-chip">
                      <HiMapPin /> {producto.origen_ciudad}
                    </span>
                  )}
                  {primerFecha && (
                    <span className="rmodal__banner-chip">
                      <HiCalendarDays /> Próx. salida: {parseFecha(primerFecha)}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Itinerary */}
            {itinerario.length > 0 && (
              <div>
                <h3 className="rmodal__section-title">Itinerario día a día</h3>
                <ItinerarioEditorial itinerario={itinerario} paquete={producto} />
                {producto.categoria === 'internacional' && (
                  <a
                    href="https://wa.me/5493815477147"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--primary btn--full"
                    style={{ marginTop: '1.5rem' }}
                  >
                    Consultar por WhatsApp
                  </a>
                )}
              </div>
            )}

            {/* Botón CTA para nacionales */}
            {producto.categoria === 'nacional' && (
              <a
                href={`/reservar?paquete=${producto.id}`}
                className="btn btn--primary btn--full"
                style={{ marginTop: '1.5rem' }}
              >
                Reservar este paquete
              </a>
            )}

            {/* Booking flow — solo para egresados */}
            {producto.categoria === 'egresados' && (
              <div>
                <h3 className="rmodal__section-title">Completar reserva</h3>
                <BookingStepper />
                <Steps />
              </div>
            )}
          </div>

          {/* RIGHT: sticky price summary */}
          <div className="rmodal__sidebar">
            <SidebarReserva />
          </div>

        </div>
      </div>
    </div>
  )
}

export default function ReservaModal({ producto, onClose }) {
  const primerFecha = producto?.fechas_salida?.[0]?.fecha ?? null
  const origen      = producto?.origen_ciudad ?? 'San Miguel de Tucumán'

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <ReservaProvider paquete={producto} fechaInicial={primerFecha} origenInicial={origen}>
      <ModalInner producto={producto} onClose={onClose} />
    </ReservaProvider>
  )
}
