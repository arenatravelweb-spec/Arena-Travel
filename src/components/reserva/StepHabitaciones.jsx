import { HiBuildingOffice2, HiExclamationCircle } from 'react-icons/hi2'
import { useReserva } from '../../context/ReservaContext'

const MAX_POR_HAB = 3

function edadLabel(edad) {
  const e = parseInt(edad)
  if (isNaN(e)) return 'Adulto'
  if (e >= 12) return 'Adulto (12+)'
  if (e >= 2)  return 'Menor (2-11)'
  return 'Bebé (0-1)'
}

function buildDistribution(pasajeros, singleRooms) {
  const noSingle = pasajeros.filter((_, i) => !singleRooms.includes(i))
  const habs = []

  singleRooms.forEach(i => {
    habs.push([pasajeros[i]])
  })

  for (let i = 0; i < noSingle.length; i += 2) {
    habs.push(noSingle.slice(i, Math.min(i + 2, noSingle.length)))
  }

  return habs
}

export default function StepHabitaciones() {
  const { pasajeros, singleRooms, setSingleRooms, nextStep, prevStep } = useReserva()

  const toggleSingle = (i) => {
    setSingleRooms(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    )
  }

  const noSinglePax = pasajeros.filter((_, i) => !singleRooms.includes(i))
  const distribucionCompleta = noSinglePax.length <= MAX_POR_HAB
    || (noSinglePax.length % 2 === 0 || noSinglePax.length % 3 === 0)
  const necesitaMasInfo = noSinglePax.length === 1 && pasajeros.length > 1

  const distrib = buildDistribution(pasajeros, singleRooms)

  return (
    <div className="paso">
      <h2 className="paso__title">¿Cómo se acomodan?</h2>
      <p className="paso__subtitle">
        Si alguien necesita su propio cuarto, marcalo acá. Al resto lo agrupamos para que salga más económico.
      </p>

      <div className="habitaciones__cap-row">
        <span className="habitaciones__cap-badge">
          <HiBuildingOffice2 /> Capacidad máx. por habitación: {MAX_POR_HAB}
        </span>
        <span className="habitaciones__cap-info">Se pueden combinar habitaciones de 2 a {MAX_POR_HAB} pasajeros.</span>
      </div>

      <div className="habitaciones__pax-grid">
      {pasajeros.map((pax, i) => (
        <div key={i} className="habitaciones__pax">
          <div>
            <strong>{pax.nombre || `Pasajero ${i + 1}`}</strong>
            <span className="habitaciones__pax-tipo">{edadLabel(pax.edad)} · {pax.edad} años</span>
          </div>
          <label className="habitaciones__toggle">
            <input
              type="checkbox"
              checked={singleRooms.includes(i)}
              onChange={() => toggleSingle(i)}
            />
            <span className="habitaciones__toggle-track" />
            <span className="habitaciones__toggle-text">Habitación single</span>
          </label>
        </div>
      ))}
      </div>

      {/* Distribution suggestion */}
      {distrib.length > 0 && !necesitaMasInfo && (
        <div className="habitaciones__distrib">
          <h4 className="habitaciones__distrib-title">
            <HiBuildingOffice2 /> Distribución sugerida
          </h4>
          {distrib.map((hab, i) => (
            <div key={i} className="habitaciones__distrib-row">
              <span className="habitaciones__distrib-num">Hab. {i + 1}</span>
              <span>{hab.map(p => p.nombre || 'Pasajero').join(' · ')}</span>
              {singleRooms.includes(pasajeros.indexOf(hab[0])) && (
                <span className="habitaciones__single-tag">Single +50%</span>
              )}
            </div>
          ))}
          <p className="habitaciones__distrib-note">
            * La distribución puede cambiar según la disponibilidad de habitaciones.
          </p>
        </div>
      )}

      {necesitaMasInfo && (
        <div className="habitaciones__warning">
          <HiExclamationCircle />
          Para completar la distribución, hacé que algún pasajero adicional solicite habitación single.
        </div>
      )}

      <div className="paso__actions">
        <button className="btn btn--outline" onClick={prevStep}>Volver</button>
        <button className="btn btn--primary" onClick={nextStep}>
          Continuar al resumen
        </button>
      </div>
    </div>
  )
}
