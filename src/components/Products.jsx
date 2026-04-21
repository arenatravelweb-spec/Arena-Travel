import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { supabase } from '../lib/supabase'
import AnimatedButton from './AnimatedButton'
import CompraModal from './CompraModal'

const WA = 'https://wa.me/5493815477147'

const TABS = [
  { id: 'nacional',      label: 'Nacionales' },
  { id: 'internacional', label: 'Internacionales' },
]

async function iniciarPagoMP(producto, comprador, setPagando) {
  setPagando(true)
  try {
    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/crear-preferencia-mp`,
      {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          nombre:      producto.nombre,
          precio:      producto.precio,
          descripcion: producto.descripcion ?? '',
          comprador,
        }),
      }
    )
    const data = await res.json()
    if (data.init_point) {
      window.location.href = data.init_point
    } else {
      throw new Error(data.error || 'No se recibió el link de pago')
    }
  } catch {
    toast.error('No se pudo iniciar el pago. Escribinos por WhatsApp.', { duration: 5000 })
    setPagando(false)
  }
}

export default function Products() {
  const [products, setProducts]       = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState('')
  const [active, setActive]           = useState('nacional')
  const [indicator, setIndicator]     = useState({ width: 0, left: 0 })
  const [modalProducto, setModal]     = useState(null)
  const [pagando, setPagando]         = useState(false)
  const tabsRef = useRef(null)

  useEffect(() => {
    supabase
      .from('productos')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error: dbErr }) => {
        if (dbErr) setError(dbErr.message)
        else setProducts(data)
        setLoading(false)
      })
  }, [])

  useLayoutEffect(() => {
    if (!tabsRef.current) return
    const el = tabsRef.current.querySelector(`[data-tab="${active}"]`)
    if (el) setIndicator({ width: el.offsetWidth, left: el.offsetLeft })
  }, [active, loading])

  const filtered = products.filter(p => p.categoria === active)

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

        <div className="prod-filter">
          <div className="prod-pill" ref={tabsRef}>
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                data-tab={id}
                className={`prod-pill__btn${active === id ? ' active' : ''}`}
                onClick={() => setActive(id)}
              >
                {label}
              </button>
            ))}
            <span
              className="prod-pill__indicator"
              style={{ width: indicator.width, transform: `translateX(${indicator.left}px)` }}
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="productos__status">No hay productos en esta categoría todavía.</p>
        ) : (
          <div className="prod-grid">
            {filtered.map(p => (
              <article
                key={p.id}
                className="prod-card"
                style={p.imagen_url ? { '--img': `url(${p.imagen_url})` } : undefined}
              >
                {p.imagen_url && (
                  <img src={p.imagen_url} alt={p.nombre} loading="lazy" className="prod-card__img" />
                )}
                <h3 className="prod-card__title">{p.nombre}</h3>
                <div className="prod-card__details">
                  {p.descripcion && <p className="prod-card__desc">{p.descripcion}</p>}
                  <p className="prod-card__price">
                    $ {Number(p.precio).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    <span> / persona</span>
                  </p>
                  {p.categoria === 'nacional'
                    ? <AnimatedButton
                        text="Comprar"
                        size="sm"
                        color="var(--color-accent)"
                        onClick={() => setModal(p)}
                      />
                    : <AnimatedButton
                        text="Reservar"
                        href={WA}
                        size="sm"
                        color="var(--color-accent)"
                      />
                  }
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {modalProducto && (
        <CompraModal
          producto={modalProducto}
          loading={pagando}
          onClose={() => { if (!pagando) setModal(null) }}
          onConfirm={comprador => iniciarPagoMP(modalProducto, comprador, setPagando)}
        />
      )}
    </section>
  )
}
