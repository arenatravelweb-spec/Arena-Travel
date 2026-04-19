import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import AnimatedButton from './AnimatedButton'

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
          <p className="section__desc">Descubrí nuestra selección de experiencias y paquetes de viaje.</p>
        </div>

        <div className="prod-grid">
          {products.map(p => (
            <article
              key={p.id}
              className="prod-card reveal"
              style={p.imagen_url ? { '--img': `url(${p.imagen_url})` } : undefined}
            >
              {p.imagen_url && <img src={p.imagen_url} alt={p.nombre} loading="lazy" className="prod-card__img" />}

              <h3 className="prod-card__title">{p.nombre}</h3>

              <div className="prod-card__details">
                {p.descripcion && <p className="prod-card__desc">{p.descripcion}</p>}
                <p className="prod-card__price">
                  € {Number(p.precio).toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                  <span> / persona</span>
                </p>
                <AnimatedButton text="Reservar" href="https://wa.me/5493815477147" size="sm" color="var(--color-accent)" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
