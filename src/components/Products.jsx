import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { supabase } from '../lib/supabase'
import { formatPrecioDesde } from '../lib/pricing'
import AnimatedButton from './AnimatedButton'
import CompraModal from './CompraModal'
import ProductModal from './ProductModal'

const WA = 'https://wa.me/5493815477147'

const TABS = [
  { id: 'nacional',      label: 'Nacionales' },
  { id: 'internacional', label: 'Internacionales' },
  { id: 'egresados',     label: 'Egresados' },
]

async function crearPreferenciaMP(producto, comprador, setPagando, setPreferenceId) {
  setPagando(true)
  try {
    const res = await fetch('/api/crear-preferencia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre:      producto.nombre,
        precio:      producto.precio,
        descripcion: producto.descripcion ?? '',
        comprador,
      }),
    })
    const data = await res.json()
    console.log('Respuesta API pago:', data)
    if (data.preference_id) {
      setPreferenceId(data.preference_id)
    } else {
      throw new Error(data.error || 'No se recibió la preferencia de pago')
    }
  } catch (err) {
    console.error('Error pago:', err)
    toast.error('No se pudo iniciar el pago. Escribinos por WhatsApp.', { duration: 5000 })
  } finally {
    setPagando(false)
  }
}

const SUBCATS = [
  { id: 'primario',   label: 'Primario' },
  { id: 'secundario', label: 'Secundario' },
]

export default function Products() {
  const [products, setProducts]           = useState([])
  const [loading, setLoading]             = useState(true)
  const [error, setError]                 = useState('')
  const [active, setActive]               = useState('nacional')
  const [indicator, setIndicator]         = useState({ width: 0, left: 0 })
  const [subcat, setSubcat]               = useState('primario')
  const [subcatIndicator, setSubcatInd]   = useState({ width: 0, left: 0 })
  const [modalProducto, setModal]         = useState(null)
  const [detailProducto, setDetail]       = useState(null)
  const [pagando, setPagando]             = useState(false)
  const [preferenceId, setPreferenceId]   = useState(null)
  const tabsRef   = useRef(null)
  const subcatRef = useRef(null)

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

  const recalcIndicator = () => {
    if (tabsRef.current) {
      const el = tabsRef.current.querySelector(`[data-tab="${active}"]`)
      if (el) setIndicator({ width: el.offsetWidth, left: el.offsetLeft })
    }
    if (subcatRef.current && active === 'egresados') {
      const el = subcatRef.current.querySelector(`[data-subtab="${subcat}"]`)
      if (el) setSubcatInd({ width: el.offsetWidth, left: el.offsetLeft })
    }
  }

  useLayoutEffect(() => { recalcIndicator() }, [active, subcat, loading])

  useEffect(() => {
    window.addEventListener('resize', recalcIndicator)
    return () => window.removeEventListener('resize', recalcIndicator)
  }, [active, subcat])

  const handleTabChange = id => {
    setActive(id)
    if (id === 'egresados') setSubcat('primario')
  }

  const filtered = products.filter(p => {
    if (p.categoria !== active) return false
    if (active === 'egresados') return p.subcategoria === subcat
    return true
  })

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
                onClick={() => handleTabChange(id)}
              >
                {label}
              </button>
            ))}
            <span
              className="prod-pill__indicator"
              style={{ width: indicator.width, transform: `translateX(${indicator.left}px)` }}
            />
          </div>

          {active === 'egresados' && (
            <div className="prod-subpill" ref={subcatRef}>
              {SUBCATS.map(({ id, label }) => (
                <button
                  key={id}
                  data-subtab={id}
                  className={`prod-subpill__btn${subcat === id ? ' active' : ''}`}
                  onClick={() => setSubcat(id)}
                >
                  {label}
                </button>
              ))}
              <span
                className="prod-subpill__indicator"
                style={{ width: subcatIndicator.width, transform: `translateX(${subcatIndicator.left}px)` }}
              />
            </div>
          )}

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
                  {p.categoria === 'nacional' && p.precio && (
                    <p className="prod-card__price">
                      $ {Number(p.precio).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                      <span> / persona</span>
                    </p>
                  )}
                  {p.categoria === 'internacional' && p.precio_desde && (
                    <p className="prod-card__price">Precio: desde {formatPrecioDesde(p.nombre, p.precio_desde)}</p>
                  )}
                  <AnimatedButton
                    text="Ver destino"
                    size="sm"
                    color="var(--color-accent)"
                    onClick={e => { e.stopPropagation(); setDetail(p) }}
                  />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {detailProducto && (
        <ProductModal
          producto={detailProducto}
          onClose={() => setDetail(null)}
          onComprar={() => { setModal(detailProducto); setDetail(null) }}
        />
      )}

      {modalProducto && (
        <CompraModal
          producto={modalProducto}
          loading={pagando}
          preferenceId={preferenceId}
          onClose={() => { if (!pagando) { setModal(null); setPreferenceId(null) } }}
          onConfirm={comprador => crearPreferenciaMP(modalProducto, comprador, setPagando, setPreferenceId)}
        />
      )}
    </section>
  )
}
