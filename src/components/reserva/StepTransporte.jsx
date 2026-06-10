import { HiCheck, HiExclamationCircle, HiTruck } from 'react-icons/hi2'
import { useReserva } from '../../context/ReservaContext'

const DEFAULT_OPTIONS = [
  { nombre: 'SEMICAMA',    precio: 0, incluido: true },
  { nombre: 'COCHE CAMA',  precio: 0, incluido: true },
  { nombre: 'PANORÁMICO',  precio: 0, incluido: true },
]

function fmt(n) {
  return Number(n).toLocaleString('es-AR', { minimumFractionDigits: 0 })
}

function edadLabel(edad) {
  const e = parseInt(edad)
  if (isNaN(e)) return 'Adulto'
  if (e >= 12) return 'Adulto (12+)'
  if (e >= 2)  return 'Menor (2-11)'
  return 'Bebé (0-1)'
}

export default function StepTransporte() {
  const {
    pasajeros, pasajerosConAsiento,
    transportes, setTransportes,
    opcionesTransporte,
    nextStep, prevStep,
  } = useReserva()

  const opciones = opcionesTransporte.length > 0 ? opcionesTransporte : DEFAULT_OPTIONS

  const selectTransporte = (paxIdx, nombre) => {
    setTransportes(prev => ({ ...prev, [paxIdx]: nombre }))
  }

  // Auto-select first option if not set
  const getSelected = (i) => {
    if (transportes[i]) return transportes[i]
    return opciones[0]?.nombre
  }

  const allSelected = pasajerosConAsiento.every((_, i) => getSelected(i))

  return (
    <div className="paso">
      <h2 className="paso__title">¿Cómo querés viajar?</h2>
      <p className="paso__subtitle">Cada uno elige su butaca — semicama, coche cama o panorámico. Los bebés viajan sin asiento asignado.</p>

      <div className="transporte__chip">
        <HiTruck />
        {pasajerosConAsiento.length} pasajero{pasajerosConAsiento.length !== 1 ? 's' : ''} con asiento
      </div>

      <div className="transporte__pasajeros-grid">
      {pasajerosConAsiento.map((pax, i) => {
        const selected = getSelected(i)
        return (
          <div key={i} className="transporte__pasajero">
            <div className="transporte__pax-header">
              <div>
                <strong>{pax.nombre || `Pasajero ${i + 1}`}</strong>
                <span className="transporte__pax-tipo">{edadLabel(pax.edad)} · {pax.edad} años</span>
              </div>
              <span className="transporte__badge">Transporte</span>
            </div>
            <div className="transporte__options">
              {opciones.map(op => {
                const isSelected = selected === op.nombre
                const agotado = op.cupos_disponibles === 0
                return (
                  <button
                    key={op.nombre}
                    className={`transporte__option${isSelected ? ' transporte__option--selected' : ''}${agotado ? ' transporte__option--agotado' : ''}`}
                    onClick={() => !agotado && selectTransporte(i, op.nombre)}
                    disabled={agotado}
                  >
                    {isSelected && (
                      <span className="transporte__option-check"><HiCheck /></span>
                    )}
                    <HiTruck className="transporte__option-icon" />
                    <span className="transporte__option-name">{op.nombre}</span>
                    <span className="transporte__option-price">
                      {op.incluido || op.precio === 0 ? 'Incluido' : `$${fmt(op.precio)} por pasajero`}
                    </span>
                    {op.cupos_disponibles > 0 && op.cupos_disponibles <= 5 && (
                      <span className="transporte__option-warn">
                        <HiExclamationCircle /> Quedan {op.cupos_disponibles} lugares
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
      </div>

      <div className="paso__actions">
        <button className="btn btn--outline" onClick={prevStep}>Volver</button>
        <button className="btn btn--primary" onClick={nextStep} disabled={!allSelected}>
          Continuar a habitaciones
        </button>
      </div>
    </div>
  )
}
