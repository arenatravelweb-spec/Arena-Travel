import { HiCheck } from 'react-icons/hi2'

export default function ItinerarioSimple({ itinerario = [] }) {
  if (!itinerario.length) return null

  return (
    <div className="itin-s">
      {itinerario.map((dia, i) => (
        <div key={i} className="itin-s__card">
          <div className="itin-s__head">
            <span className="itin-s__label">DÍA</span>
            <span className="itin-s__num">
              {String(dia.dia || i + 1).padStart(2, '0')}
            </span>
          </div>
          <div className="itin-s__body">
            <h4 className="itin-s__title">{dia.titulo}</h4>
            {dia.descripcion && (
              <p className="itin-s__desc">{dia.descripcion}</p>
            )}
            {dia.actividades?.length > 0 && (
              <ul className="itin-s__acts">
                {dia.actividades.map((a, j) => (
                  <li key={j}>
                    <HiCheck /> {a}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
