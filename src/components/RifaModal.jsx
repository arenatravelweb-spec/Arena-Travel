import { useEffect, useState } from 'react'
import {
  HiXMark, HiTrophy, HiShieldCheck, HiTicket,
  HiMinus, HiPlus, HiCreditCard,
} from 'react-icons/hi2'
import { toast } from 'sonner'
import { supabase } from '../lib/supabase'

function fmt(n) {
  return Number(n).toLocaleString('es-AR')
}

const ORDEN_LABEL = { 1: '1er Premio', 2: '2do Premio', 3: '3er Premio' }

/* ── Reglas de validación ── */
const RULES = {
  nombre: {
    required: true,
    minLength: 3,
    maxLength: 60,
    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'-]+$/,
    patternMsg: 'Solo letras y espacios',
  },
  email: {
    required: true,
    maxLength: 100,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    patternMsg: 'Email inválido',
  },
  telefono: {
    required: true,
    minLength: 8,
    maxLength: 15,
    pattern: /^[0-9+\-\s()]+$/,
    patternMsg: 'Solo números, +, - y espacios',
  },
}

function validateField(name, value) {
  const r = RULES[name]
  const v = value.trim()
  if (r.required && !v)               return 'Campo requerido'
  if (r.minLength && v.length < r.minLength) return `Mínimo ${r.minLength} caracteres`
  if (r.maxLength && v.length > r.maxLength) return `Máximo ${r.maxLength} caracteres`
  if (r.pattern && !r.pattern.test(v)) return r.patternMsg
  return ''
}

export default function RifaModal({ rifa, onClose, numerosPreseleccionados = [] }) {
  const tieneSeleccion = numerosPreseleccionados.length > 0

  const [form, setForm]     = useState({ nombre: '', email: '', telefono: '' })
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})
  const [cantidad, setCantidad] = useState(tieneSeleccion ? numerosPreseleccionados.length : 1)
  const [loading, setLoading]   = useState(false)

  const disponibles = (rifa.total_numeros || 300) - (rifa.numeros_vendidos || 0)
  const maxCompra   = Math.min(5, disponibles)
  const total       = Number(rifa.precio_numero) * (tieneSeleccion ? numerosPreseleccionados.length : cantidad)
  const premios     = Array.isArray(rifa.premios) ? rifa.premios : []
  const caract      = Array.isArray(rifa.caracteristicas) ? rifa.caracteristicas : []

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }))
    if (touched[field]) {
      const err = validateField(field, value)
      setErrors(prev => ({ ...prev, [field]: err }))
    }
  }

  const handleBlur = field => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const err = validateField(field, form[field])
    setErrors(prev => ({ ...prev, [field]: err }))
  }

  const validateAll = () => {
    const errs = {}
    let hasEmpty = false
    let hasFormat = false

    for (const field of ['nombre', 'email', 'telefono']) {
      const err = validateField(field, form[field])
      if (err) {
        errs[field] = err
        if (err === 'Campo requerido') hasEmpty = true
        else hasFormat = true
      }
    }

    setErrors(errs)
    setTouched({ nombre: true, email: true, telefono: true })

    if (hasEmpty) {
      toast.warning('Completá todos los campos requeridos')
      return false
    }
    if (hasFormat) {
      toast.error('Revisá los datos ingresados')
      return false
    }
    return true
  }

  const handlePagar = async () => {
    if (!validateAll()) return
    setLoading(true)
    const id = toast.loading('Generando enlace de pago…')
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const anonKey     = import.meta.env.VITE_SUPABASE_ANON_KEY
      const res = await fetch(`${supabaseUrl}/functions/v1/crear-rifa-pago`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token || anonKey}`,
        },
        body: JSON.stringify({
          rifa_id:          rifa.id,
          nombre:           form.nombre.trim(),
          email:            form.email.trim(),
          telefono:         form.telefono.trim(),
          cantidad_numeros: tieneSeleccion ? numerosPreseleccionados.length : cantidad,
          numeros_elegidos: tieneSeleccion ? numerosPreseleccionados : [],
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'No se pudo procesar el pago')
      toast.success('¡Todo listo! Redirigiendo a MercadoPago…', { id })
      setTimeout(() => { window.location.href = data.init_point }, 800)
    } catch (err) {
      toast.error(err.message, { id })
      setLoading(false)
    }
  }

  return (
    <div className="rfmodal__overlay" onClick={onClose}>
      <div className="rfmodal" onClick={e => e.stopPropagation()}>

        {/* Close */}
        <button className="rfmodal__x" onClick={onClose} aria-label="Cerrar">
          <HiXMark />
        </button>

        {/* ── Imagen lateral izquierda ── */}
        <div className="rfmodal__img-col">
          {rifa.imagen_url && (
            <div
              className="rfmodal__img-blur"
              style={{ backgroundImage: `url(${rifa.imagen_url})` }}
            />
          )}
          {rifa.imagen_url
            ? <img src={rifa.imagen_url} alt={rifa.titulo} className="rfmodal__img" />
            : <div className="rfmodal__img-placeholder"><HiTicket /></div>
          }
          <div className="rfmodal__img-overlay" />
          <div className="rfmodal__img-text">
            <span className="rfmodal__tag">RIFA OFICIAL</span>
            <h2 className="rfmodal__title">{rifa.titulo}</h2>
            <p className="rfmodal__img-disp">
              {disponibles > 0 ? `${disponibles} números disponibles` : '¡Agotado!'}
            </p>
          </div>
        </div>

        {/* ── Contenido derecho ── */}
        <div className="rfmodal__content">

          <div className="rfmodal__scroll">

            {/* Premios */}
            {premios.length > 0 && (
              <div className="rfmodal__block">
                <h3 className="rfmodal__block-title"><HiTrophy /> Premios</h3>
                <div className="rfmodal__premios">
                  {premios.map((p, i) => (
                    <div key={i} className={`rfmodal__premio rfmodal__premio--${p.orden || i + 1}`}>
                      <span className="rfmodal__premio-badge">
                        {ORDEN_LABEL[p.orden || i + 1] || `Premio ${p.orden || i + 1}`}
                      </span>
                      <p className="rfmodal__premio-desc">{p.descripcion}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Condiciones */}
            {caract.length > 0 && (
              <div className="rfmodal__block">
                <h3 className="rfmodal__block-title"><HiShieldCheck /> Condiciones</h3>
                <ul className="rfmodal__caract">
                  {caract.map((c, i) => (
                    <li key={i}><HiShieldCheck /> {c}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Datos */}
            <div className="rfmodal__block">
              <h3 className="rfmodal__block-title"><HiTicket /> Tus datos</h3>

              <div className="form__group">
                <label>Nombre y apellido *</label>
                <input
                  type="text"
                  value={form.nombre}
                  placeholder="Ana García"
                  minLength={3}
                  maxLength={60}
                  required
                  className={errors.nombre ? 'error' : ''}
                  onChange={e => handleChange('nombre', e.target.value)}
                  onBlur={() => handleBlur('nombre')}
                />
                {errors.nombre && <span className="form__error">{errors.nombre}</span>}
              </div>

              <div className="form__row">
                <div className="form__group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    placeholder="ana@email.com"
                    maxLength={100}
                    required
                    className={errors.email ? 'error' : ''}
                    onChange={e => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                  />
                  {errors.email && <span className="form__error">{errors.email}</span>}
                </div>
                <div className="form__group">
                  <label>Teléfono *</label>
                  <input
                    type="tel"
                    value={form.telefono}
                    placeholder="381 1234567"
                    minLength={8}
                    maxLength={15}
                    required
                    className={errors.telefono ? 'error' : ''}
                    onChange={e => handleChange('telefono', e.target.value)}
                    onBlur={() => handleBlur('telefono')}
                  />
                  {errors.telefono && <span className="form__error">{errors.telefono}</span>}
                </div>
              </div>

              {/* Números elegidos o selector de cantidad */}
              {tieneSeleccion ? (
                <div className="rfmodal__nums-wrap">
                  <p className="rfmodal__qty-label">Tus números elegidos</p>
                  <div className="rfmodal__nums-tags">
                    {numerosPreseleccionados.sort((a, b) => a - b).map(n => (
                      <span key={n} className="rfmodal__num-tag">{n}</span>
                    ))}
                  </div>
                  <p className="rfmodal__qty-hint">{numerosPreseleccionados.length} número{numerosPreseleccionados.length > 1 ? 's' : ''} seleccionado{numerosPreseleccionados.length > 1 ? 's' : ''}</p>
                </div>
              ) : (
                <div className="rfmodal__qty-wrap">
                  <p className="rfmodal__qty-label">Cantidad de números</p>
                  <div className="rfmodal__qty-row">
                    <button className="rfmodal__qty-btn" onClick={() => setCantidad(c => Math.max(1, c - 1))} disabled={cantidad <= 1}><HiMinus /></button>
                    <span className="rfmodal__qty-val">{cantidad}</span>
                    <button className="rfmodal__qty-btn" onClick={() => setCantidad(c => Math.min(maxCompra, c + 1))} disabled={cantidad >= maxCompra}><HiPlus /></button>
                  </div>
                  <p className="rfmodal__qty-hint">Cuantos más números, más chances. Máx. {maxCompra} por compra.</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer de pago */}
          <div className="rfmodal__footer">
            <div className="rfmodal__footer-row">
              <div>
                <p className="rfmodal__price-label">Total</p>
                <p className="rfmodal__price-val">$ {fmt(total)}</p>
              </div>
              <button
                className="btn btn--primary rfmodal__pay-btn"
                onClick={handlePagar}
                disabled={loading || disponibles === 0}
              >
                {loading ? 'Procesando…' : <><HiCreditCard /> Pagar con MercadoPago</>}
              </button>
            </div>
            <p className="rfmodal__secure"><HiShieldCheck /> Pago 100% seguro con MercadoPago</p>
          </div>

        </div>
      </div>
    </div>
  )
}
