import { HiQuestionMarkCircle, HiMinus, HiPlus } from 'react-icons/hi2'
import { useReserva } from '../../context/ReservaContext'

const MAX_PASAJEROS = 12

export default function StepPasajeros() {
  const { pasajeros, setPasajeros, nextStep } = useReserva()

  const addPasajero = () => {
    if (pasajeros.length >= MAX_PASAJEROS) return
    setPasajeros(prev => [...prev, { edad: '', nombre: '' }])
  }

  const removePasajero = () => {
    if (pasajeros.length <= 1) return
    setPasajeros(prev => prev.slice(0, -1))
  }

  const updatePasajero = (i, field, value) => {
    setPasajeros(prev => prev.map((p, idx) => idx === i ? { ...p, [field]: value } : p))
  }

  const valid = pasajeros.every(p => p.edad !== '' && !isNaN(parseInt(p.edad)) && parseInt(p.edad) >= 0)

  return (
    <div className="paso">
      <h2 className="paso__title">¿Quiénes se vienen?</h2>
      <p className="paso__subtitle">Contanos cuántos viajan y la edad de cada uno — así armamos el precio justo para el grupo.</p>

      {/* Counter */}
      <div className="pasajeros__counter-wrap">
        <span className="pasajeros__counter-label">Pasajeros</span>
        <div className="pasajeros__counter">
          <button
            className="pasajeros__counter-btn"
            onClick={removePasajero}
            disabled={pasajeros.length <= 1}
            aria-label="Quitar pasajero"
          >
            <HiMinus />
          </button>
          <span className="pasajeros__count">{pasajeros.length}</span>
          <button
            className="pasajeros__counter-btn"
            onClick={addPasajero}
            disabled={pasajeros.length >= MAX_PASAJEROS}
            aria-label="Agregar pasajero"
          >
            <HiPlus />
          </button>
        </div>
      </div>

      {/* Per-passenger forms */}
      <div className="pasajeros__forms-grid">
      {pasajeros.map((pax, i) => (
        <div key={i} className="pasajero-form">
          <h3 className="pasajero-form__header">Pasajero {i + 1}</h3>
          <div className="pasajero-form__fields form__grid-1-2">
            <div className="form__group">
              <label>
                Edad al momento de viajar *{' '}
                <span className="pasajero-form__tooltip" title="La edad se usa para calcular tarifas y categorías">
                  <HiQuestionMarkCircle />
                </span>
              </label>
              <input
                type="number"
                min="0"
                max="120"
                placeholder="Ej: 30"
                value={pax.edad}
                onChange={e => updatePasajero(i, 'edad', e.target.value)}
                className={pax.edad === '' ? '' : 'touched'}
              />
            </div>
            <div className="form__group">
              <label>Nombre (opcional)</label>
              <input
                type="text"
                placeholder="Nombre"
                value={pax.nombre}
                onChange={e => updatePasajero(i, 'nombre', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
      </div>

      <button
        className={`btn btn--primary btn--full paso__btn${!valid ? ' paso__btn--disabled' : ''}`}
        onClick={nextStep}
        disabled={!valid}
      >
        Continuar a selección de transporte
      </button>
    </div>
  )
}
