import { useState } from 'react'
import {
  HiMapPin, HiUsers, HiTruck, HiBuildingOffice2,
  HiChevronDown, HiChevronUp,
} from 'react-icons/hi2'
import { useReserva } from '../../context/ReservaContext'

function fmt(n) {
  return Number(n).toLocaleString('es-AR', { minimumFractionDigits: 0 })
}

function parseFecha(str) {
  if (!str) return ''
  const [y, m, d] = str.split('-')
  const meses = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
  return `${parseInt(d)} ${meses[parseInt(m) - 1]} ${y}`
}

function addDias(str, dias) {
  if (!str || !dias) return ''
  const [y, m, d] = str.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  date.setDate(date.getDate() + dias - 1)
  const meses = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
  return `${date.getDate()} ${meses[date.getMonth()]} ${date.getFullYear()}`
}

function edadLabel(edad) {
  const e = parseInt(edad)
  if (isNaN(e)) return 'Adulto'
  if (e >= 12) return 'Adulto (12+)'
  if (e >= 2)  return 'Menor (2-11)'
  return 'Bebé (0-1)'
}

function Accordion({ icon: Icon, title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="resumen__accordion">
      <button className="resumen__acc-header" onClick={() => setOpen(o => !o)}>
        <span className="resumen__acc-title">
          {Icon && <Icon />} {title}
        </span>
        {open ? <HiChevronUp /> : <HiChevronDown />}
      </button>
      {open && <div className="resumen__acc-body">{children}</div>}
    </div>
  )
}

export default function StepResumen() {
  const {
    paquete, fecha, origen,
    pasajeros, transportes, singleRooms,
    opcionesTransporte,
    precioBase, calcTotal, calcTransporteCost, calcRecargo,
    nextStep, prevStep,
  } = useReserva()

  const total          = calcTotal()
  const transporteCost = calcTransporteCost()
  const recargo        = calcRecargo()
  const fechaFin       = addDias(fecha, paquete?.duracion_dias)

  const habsData = buildHabs(pasajeros, singleRooms)

  return (
    <div className="paso">
      <h2 className="paso__title">¿Todo como lo querés?</h2>
      <p className="paso__subtitle">Mirá bien cada detalle antes de confirmar — si hay algo para ajustar, todavía podés volver.</p>

      {/* Paquete y fecha — full width horizontal */}
      <Accordion icon={HiMapPin} title="Paquete y fecha">
        <div className="resumen__pkg-row">
          {paquete?.imagen_url && (
            <img src={paquete.imagen_url} alt={paquete?.nombre} className="resumen__pkg-img" />
          )}
          <div className="resumen__pkg-info">
            <strong>{paquete?.nombre}</strong>
            <div className="resumen__pkg-meta-grid">
              {paquete?.duracion_dias && paquete?.duracion_noches && (
                <span className="resumen__meta">{paquete.duracion_dias} días / {paquete.duracion_noches} noches</span>
              )}
              {fecha && (
                <span className="resumen__meta">
                  {parseFecha(fecha)}{fechaFin ? ` → ${fechaFin}` : ''}
                </span>
              )}
              {origen && (
                <span className="resumen__meta">
                  <HiMapPin style={{ display:'inline', verticalAlign:'middle' }} /> {origen} <em>(origen)</em>
                </span>
              )}
              {paquete?.destino_ciudad && (
                <span className="resumen__meta">→ {paquete.destino_ciudad}
                  {paquete.duracion_noches ? ` · ${paquete.duracion_noches} noches` : ''}
                </span>
              )}
            </div>
          </div>
        </div>
      </Accordion>

      {/* Pasajeros + Transporte: 2 columnas */}
      <div className="resumen__mid-grid">
        <Accordion icon={HiUsers} title={`Pasajeros (${pasajeros.length})`} defaultOpen={true}>
          {pasajeros.map((pax, i) => (
            <div key={i} className="resumen__row resumen__row--col">
              <span className="resumen__row-name">{pax.nombre || `Pasajero ${i + 1}`}</span>
              <span className="resumen__row-detail">
                {pax.edad} años · {edadLabel(pax.edad)}
              </span>
              <span className="resumen__row-detail">
                {singleRooms.includes(i) ? 'Habitación single' : 'Hab. compartida'}
              </span>
            </div>
          ))}
        </Accordion>

        <Accordion icon={HiTruck} title="Transporte" defaultOpen={true}>
          {pasajeros.filter((p) => {
            const e = parseInt(p.edad)
            return !isNaN(e) && e >= 2
          }).map((pax, i) => {
            const nombre = transportes[i] || (opcionesTransporte[0]?.nombre ?? 'SEMICAMA')
            return (
              <div key={i} className="resumen__row resumen__row--col">
                <span className="resumen__row-name">{pax.nombre || `Pasajero ${i + 1}`}</span>
                <span className="resumen__row-detail">{nombre}</span>
              </div>
            )
          })}
        </Accordion>
      </div>

      {/* Habitaciones — full width */}
      <Accordion icon={HiBuildingOffice2} title={`Habitaciones (${habsData.length})`}>
        <div className="resumen__habs-grid">
          {habsData.map((hab, i) => (
            <div key={i} className="resumen__hab-card">
              <div className="resumen__hab-header">
                <span>Hab. {i + 1} · {hab.tipo}</span>
                {hab.single && <span className="resumen__badge-single">Single +50%</span>}
              </div>
              {hab.pasajeros.map((p, j) => (
                <span key={j} className="resumen__hab-pax">
                  {p.nombre || 'Pasajero'} · {edadLabel(p.edad)}
                </span>
              ))}
            </div>
          ))}
        </div>
      </Accordion>

      {/* Price breakdown — 2 cols izq/der */}
      <div className="resumen__breakdown">
        <div className="resumen__breakdown-grid">
          <div className="resumen__breakdown-row">
            <span>Alojamiento + paquete base</span>
            <span>${fmt(precioBase * pasajeros.length + recargo)}</span>
          </div>
          <div className="resumen__breakdown-row">
            <span>Transporte</span>
            <span>{transporteCost > 0 ? `$${fmt(transporteCost)}` : '$0'}</span>
          </div>
        </div>
        <div className="resumen__breakdown-total">
          <span>Total</span>
          <span>${fmt(total)}</span>
        </div>
        <p className="resumen__cuotas">Hasta 6 cuotas sin interés. Precios sujetos a disponibilidad.</p>
      </div>

      <div className="paso__actions">
        <button className="btn btn--outline" onClick={prevStep}>Volver</button>
        <button className="btn btn--primary" onClick={nextStep}>Continuar al pago</button>
      </div>
    </div>
  )
}

function buildHabs(pasajeros, singleRooms) {
  const habs = []
  singleRooms.forEach(i => {
    habs.push({ tipo: 'Habitación single', single: true, pasajeros: [pasajeros[i]] })
  })
  const noSingle = pasajeros.filter((_, i) => !singleRooms.includes(i))
  for (let i = 0; i < noSingle.length; i += 2) {
    habs.push({
      tipo: 'Habitación doble',
      single: false,
      pasajeros: noSingle.slice(i, Math.min(i + 2, noSingle.length)),
    })
  }
  return habs
}
