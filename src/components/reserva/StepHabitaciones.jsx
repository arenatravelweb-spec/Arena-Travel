import { useEffect } from 'react'
import { HiBuildingOffice2, HiInformationCircle } from 'react-icons/hi2'
import { useReserva } from '../../context/ReservaContext'

const TIPOS = [
  { id: 'single',     label: 'Single',     capacidad: 1, desc: '1 persona · +50% recargo' },
  { id: 'doble',      label: 'Doble',      capacidad: 2, desc: '2 personas' },
  { id: 'triple',     label: 'Triple',     capacidad: 3, desc: '3 personas' },
  { id: 'cuadruple',  label: 'Cuádruple',  capacidad: 4, desc: '4 personas' },
]

const SUBTIPOS = [
  { id: 'twin',        label: 'Cama twin / separadas' },
  { id: 'matrimonial', label: 'Cama matrimonial' },
]

function distribuirPasajeros(pasajeros, habitaciones) {
  const asignados = new Set(habitaciones.flatMap(h => h.pasajeros))
  return pasajeros.map((_, i) => i).filter(i => !asignados.has(i))
}

export default function StepHabitaciones() {
  const { pasajeros, habitaciones, setHabitaciones, recargoSingle, precioBase, nextStep, prevStep, initHabitaciones } = useReserva()

  useEffect(() => {
    setHabitaciones(initHabitaciones(pasajeros.length))
  }, [pasajeros.length])

  const updateTipo = (idx, nuevoTipo) => {
    setHabitaciones(prev => {
      const habs = [...prev]
      const cap = TIPOS.find(t => t.id === nuevoTipo)?.capacidad ?? 2
      const pasActuales = habs[idx].pasajeros

      if (nuevoTipo === habs[idx].tipo) return prev

      let nuevosPasajeros = pasActuales.slice(0, cap)
      const sobrantes = pasActuales.slice(cap)

      habs[idx] = {
        pasajeros: nuevosPasajeros,
        tipo: nuevoTipo,
        subTipo: nuevoTipo === 'doble' ? 'twin' : null,
      }

      // Reasignar sobrantes distribuyendo en nuevas habitaciones dobles
      for (let i = 0; i < sobrantes.length; i += 2) {
        const grupo = sobrantes.slice(i, Math.min(i + 2, sobrantes.length))
        habs.splice(idx + 1 + Math.floor(i / 2), 0, {
          pasajeros: grupo,
          tipo: grupo.length === 1 ? 'single' : 'doble',
          subTipo: grupo.length === 1 ? null : 'twin',
        })
      }

      return habs
    })
  }

  const updateSubTipo = (idx, subTipo) => {
    setHabitaciones(prev => {
      const habs = [...prev]
      habs[idx] = { ...habs[idx], subTipo }
      return habs
    })
  }

  const sinAsignar = distribuirPasajeros(pasajeros, habitaciones)
  const todoAsignado = sinAsignar.length === 0

  const recargo = habitaciones
    .filter(h => h.tipo === 'single')
    .reduce((acc, h) => acc + h.pasajeros.length * (precioBase * recargoSingle) / 100, 0)

  return (
    <div className="paso">
      <h2 className="paso__title">Tipo de habitaciones</h2>
      <p className="paso__subtitle">
        Elegí el tipo de habitación para cada grupo. Las habitaciones single tienen un recargo del {recargoSingle}%.
      </p>

      <div className="habitaciones__rooms">
        {habitaciones.map((hab, idx) => {
          const tipoInfo = TIPOS.find(t => t.id === hab.tipo)

          return (
            <div key={idx} className="habitaciones__room-card">
              <div className="habitaciones__room-header">
                <HiBuildingOffice2 />
                <span className="habitaciones__room-num">Habitación {idx + 1}</span>
                <span className="habitaciones__room-pax-tag">
                  {hab.pasajeros.map(i => pasajeros[i]?.nombre || `Pasajero ${i + 1}`).join(', ')}
                </span>
              </div>

              <div className="habitaciones__tipo-grid">
                {TIPOS.map(tipo => {
                  const asignables = tipo.capacidad >= hab.pasajeros.length
                  if (!asignables && tipo.capacidad < hab.pasajeros.length) return null
                  return (
                    <label
                      key={tipo.id}
                      className={`habitaciones__tipo-opt${hab.tipo === tipo.id ? ' habitaciones__tipo-opt--selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name={`tipo-${idx}`}
                        value={tipo.id}
                        checked={hab.tipo === tipo.id}
                        onChange={() => updateTipo(idx, tipo.id)}
                      />
                      <span className="habitaciones__tipo-label">{tipo.label}</span>
                      <span className="habitaciones__tipo-desc">{tipo.desc}</span>
                    </label>
                  )
                })}
              </div>

              {hab.tipo === 'doble' && (
                <div className="habitaciones__subtipo">
                  <p className="habitaciones__subtipo-label">Tipo de cama:</p>
                  <div className="habitaciones__subtipo-opts">
                    {SUBTIPOS.map(st => (
                      <label
                        key={st.id}
                        className={`habitaciones__subtipo-opt${hab.subTipo === st.id ? ' habitaciones__subtipo-opt--selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name={`subtipo-${idx}`}
                          value={st.id}
                          checked={hab.subTipo === st.id}
                          onChange={() => updateSubTipo(idx, st.id)}
                        />
                        {st.label}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {hab.tipo === 'single' && precioBase > 0 && (
                <div className="habitaciones__single-info">
                  <HiInformationCircle />
                  <span>Recargo: +${(hab.pasajeros.length * precioBase * recargoSingle / 100).toLocaleString('es-AR')}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {sinAsignar.length > 0 && (
        <div className="habitaciones__warning">
          <HiInformationCircle />
          Pasajeros sin habitación asignada: {sinAsignar.map(i => pasajeros[i]?.nombre || `Pasajero ${i + 1}`).join(', ')}
        </div>
      )}

      {recargo > 0 && (
        <div className="habitaciones__recargo-info">
          Recargo total por habitaciones single: +${recargo.toLocaleString('es-AR')}
        </div>
      )}

      <div className="paso__actions">
        <button className="btn btn--outline" onClick={prevStep}>Volver</button>
        <button className="btn btn--primary" onClick={nextStep} disabled={!todoAsignado}>
          Continuar al resumen
        </button>
      </div>
    </div>
  )
}
