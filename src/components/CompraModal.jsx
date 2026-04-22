import { useState } from 'react'

export default function CompraModal({ producto, onConfirm, onClose, loading }) {
  const [form, setForm]     = useState({ nombre: '', email: '', telefono: '' })
  const [errors, setErrors] = useState({})

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const errs = {}
    if (!form.nombre.trim()) errs.nombre = true
    if (!form.email.trim())  errs.email  = true
    if (Object.keys(errs).length) { setErrors(errs); return }
    onConfirm(form)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">✕</button>

        <p className="modal-label">Completá tus datos</p>
        <h3 className="modal-title">{producto.nombre}</h3>
        <p className="modal-price">
          $ {Number(producto.precio).toLocaleString('es-AR')} <span>/ persona</span>
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form__group">
            <label htmlFor="cm-nombre">Nombre completo *</label>
            <input
              id="cm-nombre" name="nombre" type="text"
              placeholder="Tu nombre"
              value={form.nombre} onChange={handleChange}
              className={errors.nombre ? 'error' : ''}
            />
          </div>
          <div className="form__group">
            <label htmlFor="cm-email">Email *</label>
            <input
              id="cm-email" name="email" type="email"
              placeholder="tu@email.com"
              value={form.email} onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
          </div>
          <div className="form__group">
            <label htmlFor="cm-tel">Teléfono</label>
            <input
              id="cm-tel" name="telefono" type="tel"
              placeholder="+54 9 381 000-0000"
              value={form.telefono} onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn--primary btn--full" disabled={loading}>
            {loading ? 'Procesando…' : 'Continuar al pago →'}
          </button>
          <p className="modal-note">Vas a ser redirigida a Mercado Pago para completar el pago.</p>
        </form>
      </div>
    </div>
  )
}
