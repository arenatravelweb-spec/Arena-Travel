import { HiUsers, HiBuildingOffice2, HiTruck, HiCalendarDays } from 'react-icons/hi2'
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

const TIPO_LABEL = {
  single:    'Single',
  doble:     'Doble',
  triple:    'Triple',
  cuadruple: 'Cuádruple',
}

export default function SidebarReserva() {
  const {
    paquete, fecha, origen,
    pasajeros, transportes, habitaciones,
    pasajerosConAsiento,
    precioBase, calcTotal, calcTransporteCost, calcRecargo,
    opcionesTransporte,
    recargoSingle,
    step,
  } = useReserva()

  const total           = calcTotal()
  const transporteCost  = calcTransporteCost()
  const recargo         = calcRecargo()

  const transportLabel = Object.keys(transportes).length > 0
    ? Object.entries(transportes).map(([i, n]) => n).join(', ')
    : null

  return (
    <aside className="sidebar-res">
      {/* Price box */}
      <div className="sidebar-res__price-box">
        {precioBase > 0 ? (
          <>
            <span className="sidebar-res__total-label">TOTAL ESTIMADO</span>
            <p className="sidebar-res__total">${fmt(total)}</p>
            <span className="sidebar-res__per-person">Desde ${fmt(precioBase)} por persona</span>
          </>
        ) : (
          <>
            <span className="sidebar-res__total-label">PRECIO</span>
            <p className="sidebar-res__total sidebar-res__total--consultar">A consultar</p>
            <span className="sidebar-res__per-person">Precio a confirmar con el equipo</span>
          </>
        )}
      </div>

      {/* Package summary */}
      <div className="sidebar-res__body">
        <div className="sidebar-res__pkg">
          {paquete?.imagen_url && (
            <img src={paquete.imagen_url} alt={paquete?.nombre} className="sidebar-res__pkg-img" />
          )}
          <div className="sidebar-res__pkg-info">
            <strong className="sidebar-res__pkg-name">{paquete?.nombre}</strong>
            {origen && (
              <span className="sidebar-res__pkg-meta">
                {origen} – Tucumán <span className="sidebar-res__pkg-origen">(origen)</span>
              </span>
            )}
            {paquete?.destino_ciudad && (
              <span className="sidebar-res__pkg-meta">→ {paquete.destino_ciudad}
                {paquete.duracion_noches ? ` · ${paquete.duracion_noches} noches` : ''}
              </span>
            )}
            {fecha && (
              <span className="sidebar-res__pkg-meta">
                <HiCalendarDays style={{ display:'inline', verticalAlign:'middle' }} /> {parseFecha(fecha)}
              </span>
            )}
            {paquete?.duracion_dias && paquete?.duracion_noches && (
              <span className="sidebar-res__pkg-meta">
                {paquete.duracion_dias} días / {paquete.duracion_noches} noches
              </span>
            )}
          </div>
        </div>

        {/* Step-specific details */}
        {step >= 2 && pasajeros.length > 0 && (
          <div className="sidebar-res__section">
            <span className="sidebar-res__section-label">
              <HiUsers /> Pasajeros
            </span>
            <div className="sidebar-res__detail-row">
              <span>Adultos</span>
              <span>{pasajeros.filter(p => parseInt(p.edad) >= 12).length}</span>
            </div>
            {pasajeros.filter(p => parseInt(p.edad) >= 2 && parseInt(p.edad) < 12).length > 0 && (
              <div className="sidebar-res__detail-row">
                <span>Menores</span>
                <span>{pasajeros.filter(p => parseInt(p.edad) >= 2 && parseInt(p.edad) < 12).length}</span>
              </div>
            )}
          </div>
        )}

        {step >= 3 && habitaciones.length > 0 && (
          <div className="sidebar-res__section">
            <span className="sidebar-res__section-label">
              <HiBuildingOffice2 /> Habitaciones
            </span>
            {habitaciones.map((hab, i) => (
              <div key={i} className="sidebar-res__detail-row">
                <span>
                  Hab. {i + 1} · {TIPO_LABEL[hab.tipo] || hab.tipo} · {hab.pasajeros.length} pax
                </span>
                {hab.tipo === 'single' && (
                  <span className="sidebar-res__badge-single">+{recargoSingle}%</span>
                )}
              </div>
            ))}
          </div>
        )}

        {step >= 2 && pasajerosConAsiento.length > 0 && (
          <div className="sidebar-res__section">
            <span className="sidebar-res__section-label">
              <HiTruck /> Transporte
            </span>
            {pasajerosConAsiento.map((pax, i) => {
              const nombre = transportes[i] || '—'
              const op = opcionesTransporte.find(o => o.nombre === nombre)
              const costo = op?.precio > 0 ? `$${fmt(op.precio)}` : '$0'
              return (
                <div key={i} className="sidebar-res__detail-row">
                  <span>{pax.nombre || `Pax ${i+1}`} · {nombre}</span>
                  <span>{costo}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* Price breakdown */}
        {step >= 4 && (
          <div className="sidebar-res__breakdown">
            <div className="sidebar-res__breakdown-row">
              <span>Paquete base</span>
              <span>${fmt(precioBase * pasajeros.length)}</span>
            </div>
            {recargo > 0 && (
              <div className="sidebar-res__breakdown-row sidebar-res__breakdown-row--accent">
                <span>Recargo habitación</span>
                <span>+${fmt(recargo)}</span>
              </div>
            )}
            {transporteCost > 0 && (
              <div className="sidebar-res__breakdown-row">
                <span>Transporte</span>
                <span>${fmt(transporteCost)}</span>
              </div>
            )}
            <div className="sidebar-res__breakdown-total">
              <span>Total</span>
              <span>${fmt(total)}</span>
            </div>
          </div>
        )}

        {step < 4 && precioBase > 0 && (
          <div className="sidebar-res__breakdown">
            <div className="sidebar-res__breakdown-row">
              <span>Paquete base</span>
              <span>${fmt(precioBase * pasajeros.length)}</span>
            </div>
            <div className="sidebar-res__breakdown-total">
              <span>Total</span>
              <span>${fmt(total)}</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

