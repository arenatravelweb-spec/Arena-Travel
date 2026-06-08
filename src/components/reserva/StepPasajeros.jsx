import { HiMinus, HiPlus, HiUsers } from 'react-icons/hi2'
import { useReserva } from '../../context/ReservaContext'

const MAX_PASAJEROS = 12

export default function StepPasajeros() {
  const { pasajeros, setPasajeros, nextStep } = useReserva()

  const add = () => {
    if (pasajeros.length >= MAX_PASAJEROS) return
    setPasajeros(prev => [...prev, { edad: '25', nombre: '' }])
  }

  const remove = () => {
    if (pasajeros.length <= 1) return
    setPasajeros(prev => prev.slice(0, -1))
  }

  return (
    <div className="paso">
      <h2 className="paso__title">¿Quiénes se vienen?</h2>
      <p className="paso__subtitle">Elegí cuántos viajan — podés agregar hasta {MAX_PASAJEROS} pasajeros.</p>

      <div className="pasajeros__counter-wrap">
        <span className="pasajeros__counter-label">Pasajeros</span>
        <div className="pasajeros__counter">
          <button
            className="pasajeros__counter-btn"
            onClick={remove}
            disabled={pasajeros.length <= 1}
            aria-label="Quitar pasajero"
          >
            <HiMinus />
          </button>
          <span className="pasajeros__count">{pasajeros.length}</span>
          <button
            className="pasajeros__counter-btn"
            onClick={add}
            disabled={pasajeros.length >= MAX_PASAJEROS}
            aria-label="Agregar pasajero"
          >
            <HiPlus />
          </button>
        </div>
      </div>

      <div className="pasajeros__chips">
        {pasajeros.map((_, i) => (
          <span key={i} className="pasajeros__chip">
            <HiUsers /> Pasajero {i + 1}
          </span>
        ))}
      </div>

      <button
        className="btn btn--primary btn--full paso__btn"
        onClick={nextStep}
      >
        Continuar a selección de transporte
      </button>
    </div>
  )
}
