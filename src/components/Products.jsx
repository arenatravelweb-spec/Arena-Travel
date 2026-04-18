import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase
      .from('productos')
      .select('id, nombre, precio, descripcion, imagen_url')
      .order('created_at', { ascending: false })
      .then(({ data, error: dbErr }) => {
        if (dbErr) setError(dbErr.message)
        else setProducts(data)
        setLoading(false)
      })
  }, [])

  if (loading) return (
    <section className="section productos" id="productos">
      <div className="container">
        <p className="productos__status">Cargando productos…</p>
      </div>
    </section>
  )

  if (error) return (
    <section className="section productos" id="productos">
      <div className="container">
        <p className="productos__status productos__status--error">Error al cargar productos.</p>
      </div>
    </section>
  )

  if (products.length === 0) return null

  return (
    <section className="section productos" id="productos">
      <div className="container">
        <div className="section__header reveal">
          <p className="section__label">Catálogo</p>
          <h2 className="section__title">Nuestros productos</h2>
          <p className="section__desc">
            Descubre nuestra selección de experiencias y paquetes de viaje.
          </p>
        </div>

        <div className="paquetes__grid">
          {products.map(p => (
            <article key={p.id} className="pkg-card reveal">
              <div className="pkg-card__img-wrap">
                {p.imagen_url
                  ? <img src={p.imagen_url} alt={p.nombre} loading="lazy" />
                  : <div className="pkg-card__img-placeholder" aria-hidden="true" />
                }
              </div>
              <div className="pkg-card__body">
                <h3 className="pkg-card__name">{p.nombre}</h3>
                {p.descripcion && <p className="pkg-card__text">{p.descripcion}</p>}
                <div className="pkg-card__footer">
                  <div className="pkg-card__price">
                    <span className="new-price">
                      € {Number(p.precio).toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="per-person">por persona</span>
                  </div>
                  <a href="#contacto" className="btn btn--primary btn--sm">Reservar</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
