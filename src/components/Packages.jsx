import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import ProductModal from './ProductModal'
import ReservaModal from './ReservaModal'

export default function Packages() {
  const navigate = useNavigate()
  const [packages, setPackages] = useState([])
  const [loading, setLoading]   = useState(true)
  const [detailProducto, setDetail]  = useState(null)
  const [reservaProducto, setReserva] = useState(null)

  useEffect(() => {
    supabase
      .from('productos')
      .select('*')
      .eq('categoria', 'nacional')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setPackages(data ?? [])
        setLoading(false)
      })
  }, [])

  if (loading || packages.length === 0) return null

  return (
    <section className="section paquetes" id="paquetes">
      <div className="container">
        <div className="section__header reveal">
          <p className="section__label">Nuestras ofertas</p>
          <h2 className="section__title">Paquetes populares</h2>
          <p className="section__desc">Todo incluido para que solo te preocupes de disfrutar.</p>
        </div>

        <div className="paquetes__grid">
          {packages.map(pkg => (
            <article key={pkg.id} className="pkg-card reveal">
              <div className="pkg-card__img-wrap">
                {pkg.imagen_url
                  ? <img src={pkg.imagen_url} alt={pkg.nombre} loading="lazy" />
                  : <div className="pkg-card__img-placeholder" />
                }
              </div>
              <div className="pkg-card__body">
                <h3 className="pkg-card__name">{pkg.nombre}</h3>
                {pkg.descripcion && <p className="pkg-card__text">{pkg.descripcion}</p>}
                <div className="pkg-card__footer">
                  <div className="pkg-card__price">
                    <span className="new-price">
                      $ {Number(pkg.precio).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="per-person">por persona</span>
                  </div>
                  <div className="pkg-card__btns">
                    <button
                      className="btn btn--outline btn--sm"
                      onClick={() => setReserva(pkg)}
                    >
                      Ver itinerario
                    </button>
                    <button
                      className="btn btn--primary btn--sm"
                      onClick={() => setDetail(pkg)}
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {detailProducto && (
        <ProductModal
          producto={detailProducto}
          onClose={() => setDetail(null)}
          onComprar={() => {
            setDetail(null)
            navigate(`/reservar?paquete=${detailProducto.id}`)
          }}
        />
      )}

      {reservaProducto && (
        <ReservaModal
          producto={reservaProducto}
          onClose={() => setReserva(null)}
        />
      )}
    </section>
  )
}
