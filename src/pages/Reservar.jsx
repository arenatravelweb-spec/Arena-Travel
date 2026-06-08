import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { HiArrowLeft, HiChatBubbleLeftRight } from 'react-icons/hi2'
import { supabase } from '../lib/supabase'
import { ReservaProvider, useReserva } from '../context/ReservaContext'
import BookingStepper from '../components/reserva/BookingStepper'
import SidebarReserva from '../components/reserva/SidebarReserva'
import StepPasajeros from '../components/reserva/StepPasajeros'
import StepTransporte from '../components/reserva/StepTransporte'
import StepHabitaciones from '../components/reserva/StepHabitaciones'
import StepResumen from '../components/reserva/StepResumen'
import StepCheckout from '../components/reserva/StepCheckout'

const WA = 'https://wa.me/5493815477147'

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

function ReservaFlow({ paquete, fecha, origen }) {
  return (
    <ReservaProvider paquete={paquete} fechaInicial={fecha} origenInicial={origen}>
      <div className="reserva-page">
        <header className="pdetalle__header">
          <div className="container pdetalle__header-inner">
            <Link to={`/paquete/${paquete.id}`} className="pdetalle__back">
              <HiArrowLeft /> Volver al paquete
            </Link>
            <Link to="/" className="pdetalle__logo-link">
              <img
                src="/logo-candy.webp"
                alt="Arena Travel"
                className="pdetalle__logo"
                onError={e => { e.target.style.display = 'none' }}
              />
            </Link>
            <a href={WA} target="_blank" rel="noreferrer" className="btn btn--primary btn--sm">
              <HiChatBubbleLeftRight /> Ayuda
            </a>
          </div>
        </header>

        <div className="container reserva-page__container">
          <BookingStepper />
          <div className="reserva-page__layout">
            <div className="reserva-page__main">
              <Steps />
            </div>
            <div className="reserva-page__sidebar">
              <SidebarReserva />
            </div>
          </div>
        </div>
      </div>
    </ReservaProvider>
  )
}

export default function Reservar() {
  const [params]  = useSearchParams()
  const paqueteId = params.get('paquete')
  const fecha     = params.get('fecha')
  const origen    = params.get('origen') || 'San Miguel de Tucumán'

  const [paquete, setPaquete]   = useState(null)
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    if (!paqueteId) { setLoading(false); return }
    supabase.from('productos').select('*').eq('id', paqueteId).single()
      .then(({ data, error }) => {
        if (!error) setPaquete(data)
        setLoading(false)
      })
  }, [paqueteId])

  if (loading) {
    return (
      <div className="pdetalle-loading">
        <div className="adm-spinner" />
        <span>Cargando reserva…</span>
      </div>
    )
  }

  if (!paquete) {
    return (
      <div className="pdetalle-loading">
        <p>No se encontró el paquete solicitado.</p>
        <Link to="/" className="btn btn--outline btn--sm" style={{ marginTop: '1rem' }}>
          Volver al inicio
        </Link>
      </div>
    )
  }

  return <ReservaFlow paquete={paquete} fecha={fecha} origen={origen} />
}
