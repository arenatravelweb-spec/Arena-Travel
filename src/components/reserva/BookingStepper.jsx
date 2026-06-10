import { useState, useEffect, useRef } from 'react'
import {
  HiCheck,
  HiUsers,
  HiTruck,
  HiBuildingOffice2,
  HiDocumentText,
  HiCreditCard,
} from 'react-icons/hi2'
import { useReserva } from '../../context/ReservaContext'

const STEPS = [
  { id: 1, label: '¿Quiénes van?', desc: 'Cuántos viajan y la edad de cada uno', Icon: HiUsers },
  { id: 2, label: 'Tu asiento',    desc: 'Elegí el tipo de transporte para cada pasajero', Icon: HiTruck },
  { id: 3, label: 'Tu cuarto',     desc: 'Cómo se distribuyen las habitaciones', Icon: HiBuildingOffice2 },
  { id: 4, label: 'Confirmá',      desc: 'Revisá todos los detalles del viaje', Icon: HiDocumentText },
  { id: 5, label: '¡A viajar!',    desc: 'Tus datos de contacto y método de pago', Icon: HiCreditCard },
]

const RADIUS = 95

export default function BookingStepper() {
  const { step } = useReserva()
  const [rotationAngle, setRotationAngle] = useState(0)
  const [expandedId, setExpandedId]       = useState(null)
  const containerRef = useRef(null)
  const timerRef     = useRef(null)

  const autoRotate = expandedId === null

  useEffect(() => {
    if (autoRotate) {
      timerRef.current = setInterval(() => {
        setRotationAngle(prev => Number(((prev + 0.25) % 360).toFixed(3)))
      }, 50)
    }
    return () => clearInterval(timerRef.current)
  }, [autoRotate])

  const calcPos = (index, total) => {
    const angle  = ((index / total) * 360 + rotationAngle) % 360
    const rad    = (angle * Math.PI) / 180
    const x      = RADIUS * Math.cos(rad)
    const y      = RADIUS * Math.sin(rad)
    const zIndex = Math.round(100 + 50 * Math.cos(rad))
    const opacity = Math.max(0.45, Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(rad)) / 2)))
    return { x, y, zIndex, opacity }
  }

  const getStatus = (id) => {
    if (id < step)  return 'done'
    if (id === step) return 'active'
    return 'pending'
  }

  const handleNodeClick = (e, id) => {
    e.stopPropagation()
    setExpandedId(prev => prev === id ? null : id)
  }

  const handleContainerClick = () => {
    setExpandedId(null)
  }

  return (
    <>
      {/* Orbital stepper — desktop */}
      <div className="orb-stepper" ref={containerRef} onClick={handleContainerClick}>
        <div className="orb-stepper__center">
          <div className="orb-stepper__center-ring orb-stepper__center-ring--1" />
          <div className="orb-stepper__center-ring orb-stepper__center-ring--2" />
          <div className="orb-stepper__center-core" />
        </div>
        <div className="orb-stepper__ring" />
        {STEPS.map((s, index) => {
          const pos      = calcPos(index, STEPS.length)
          const status   = getStatus(s.id)
          const expanded = expandedId === s.id
          const Icon     = s.Icon
          return (
            <div
              key={s.id}
              className={`orb-stepper__node orb-stepper__node--${status}`}
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
                zIndex:    expanded ? 200 : pos.zIndex,
                opacity:   expanded ? 1   : pos.opacity,
              }}
              onClick={(e) => handleNodeClick(e, s.id)}
            >
              {status === 'active' && <div className="orb-stepper__glow" />}
              <div className={`orb-stepper__dot${expanded ? ' orb-stepper__dot--exp' : ''}`}>
                {status === 'done' ? <HiCheck /> : <Icon />}
              </div>
              <span className="orb-stepper__label">{s.label}</span>
              {expanded && (
                <div className="orb-stepper__card" onClick={e => e.stopPropagation()}>
                  <div className="orb-stepper__card-top" />
                  <span className={`orb-stepper__badge orb-stepper__badge--${status}`}>
                    {status === 'done' ? 'Completado' : status === 'active' ? 'En curso' : 'Pendiente'}
                  </span>
                  <strong className="orb-stepper__card-title">{s.label}</strong>
                  <p className="orb-stepper__card-desc">{s.desc}</p>
                  <div className="orb-stepper__card-bar">
                    <div className="orb-stepper__card-fill"
                      style={{ width: status === 'done' ? '100%' : status === 'active' ? '50%' : '0%' }} />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Linear stepper — mobile */}
      <div className="lin-stepper">
        {STEPS.map((s, i) => {
          const status = getStatus(s.id)
          const Icon   = s.Icon
          return (
            <div key={s.id} className="lin-stepper__item">
              <div className={`lin-stepper__circle lin-stepper__circle--${status}`}>
                {status === 'done' ? <HiCheck /> : <Icon />}
              </div>
              <span className={`lin-stepper__label lin-stepper__label--${status}`}>{s.label}</span>
              {i < STEPS.length - 1 && (
                <div className={`lin-stepper__line${status === 'done' ? ' lin-stepper__line--done' : ''}`} />
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
