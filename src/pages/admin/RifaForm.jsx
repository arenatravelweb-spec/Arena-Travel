import { useState, useRef } from 'react'
import { HiPlus, HiTrash, HiPhoto, HiXMark } from 'react-icons/hi2'
import { uploadToCloudinary } from '../../lib/cloudinary'

const EMPTY = {
  titulo:           '',
  descripcion:      '',
  imagen_url:       '',
  precio_numero:    '',
  total_numeros:    300,
  fecha_limite:     '',
  activa:           true,
  premios:          [{ orden: 1, descripcion: '' }, { orden: 2, descripcion: '' }],
  caracteristicas:  [
    'Solo 300 números disponibles',
    'Sorteo al vender todos los números',
    'Transparencia y seguridad',
    'Comunicación constante con cada participante',
  ],
}

function Section({ title, children }) {
  return (
    <div className="rifa-form__section">
      <p className="rifa-form__section-title">{title}</p>
      {children}
    </div>
  )
}

export default function RifaForm({ initial, onSave, onCancel }) {
  const [form, setForm]   = useState(() => initial
    ? {
        ...EMPTY,
        ...initial,
        premios:         Array.isArray(initial.premios)         ? initial.premios         : EMPTY.premios,
        caracteristicas: Array.isArray(initial.caracteristicas) ? initial.caracteristicas : EMPTY.caracteristicas,
      }
    : { ...EMPTY }
  )
  const [saving, setSaving]       = useState(false)
  const [uploading, setUploading] = useState(false)
  const [errors, setErrors]       = useState({})
  const fileRef = useRef()

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }))

  const handleImageFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setErrors(prev => ({ ...prev, imagen: null }))
    try {
      const url = await uploadToCloudinary(file)
      set('imagen_url', url)
    } catch (err) {
      setErrors(prev => ({ ...prev, imagen: err.message }))
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const setPremio = (i, field, val) => {
    const premios = [...form.premios]
    premios[i] = { ...premios[i], [field]: val }
    set('premios', premios)
  }
  const addPremio    = () => set('premios', [...form.premios, { orden: form.premios.length + 1, descripcion: '' }])
  const removePremio = i  => set('premios', form.premios.filter((_, j) => j !== i))

  const setCaract    = (i, val) => { const c = [...form.caracteristicas]; c[i] = val; set('caracteristicas', c) }
  const addCaract    = () => set('caracteristicas', [...form.caracteristicas, ''])
  const removeCaract = i  => set('caracteristicas', form.caracteristicas.filter((_, j) => j !== i))

  const validate = () => {
    const errs = {}
    if (!form.titulo.trim())  errs.titulo        = 'Requerido'
    if (!form.precio_numero)  errs.precio_numero = 'Requerido'
    if (!form.total_numeros)  errs.total_numeros = 'Requerido'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setSaving(true)
    await onSave({
      titulo:          form.titulo.trim(),
      descripcion:     form.descripcion.trim() || null,
      imagen_url:      form.imagen_url.trim()  || null,
      precio_numero:   Number(form.precio_numero),
      total_numeros:   Number(form.total_numeros),
      fecha_limite:    form.fecha_limite || null,
      activa:          form.activa,
      premios:         form.premios.filter(p => p.descripcion.trim()),
      caracteristicas: form.caracteristicas.filter(c => c.trim()),
    })
    setSaving(false)
  }

  return (
    <div className="product-form">

      <Section title="Datos básicos">
        <div className="form__group">
          <label>Título *</label>
          <input
            type="text"
            value={form.titulo}
            placeholder="Viaje al Caribe para 2"
            className={errors.titulo ? 'error' : ''}
            onChange={e => set('titulo', e.target.value)}
          />
          {errors.titulo && <span className="form__error">{errors.titulo}</span>}
        </div>
        <div className="form__group">
          <label>Descripción</label>
          <textarea rows={3} value={form.descripcion} placeholder="Descripción breve de la rifa…" onChange={e => set('descripcion', e.target.value)} />
        </div>
        <div className="form__group">
          <label>Imagen</label>
          {form.imagen_url ? (
            <div className="product-form__preview">
              <img src={form.imagen_url} alt="Preview" />
              <button
                type="button"
                className="product-form__clear-media"
                onClick={() => set('imagen_url', '')}
                title="Quitar imagen"
              >
                <HiXMark />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="rifa-form__upload-btn"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
            >
              <HiPhoto />
              {uploading ? 'Subiendo…' : 'Subir imagen'}
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageFile}
          />
          {errors.imagen && <span className="form__error">{errors.imagen}</span>}
        </div>
      </Section>

      <Section title="Configuración">
        <div className="form__row">
          <div className="form__group">
            <label>Precio por número (ARS) *</label>
            <input
              type="number" min="0"
              value={form.precio_numero} placeholder="5000"
              className={errors.precio_numero ? 'error' : ''}
              onChange={e => set('precio_numero', e.target.value)}
            />
            {errors.precio_numero && <span className="form__error">{errors.precio_numero}</span>}
          </div>
          <div className="form__group">
            <label>Total de números *</label>
            <input
              type="number" min="1"
              value={form.total_numeros}
              className={errors.total_numeros ? 'error' : ''}
              onChange={e => set('total_numeros', e.target.value)}
            />
            {errors.total_numeros && <span className="form__error">{errors.total_numeros}</span>}
          </div>
        </div>
        <div className="form__row">
          <div className="form__group">
            <label>Fecha límite</label>
            <input type="date" value={form.fecha_limite} onChange={e => set('fecha_limite', e.target.value)} />
          </div>
          <div className="form__group" style={{ justifyContent: 'flex-end', paddingTop: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.activa} onChange={e => set('activa', e.target.checked)} style={{ width: 'auto' }} />
              Rifa activa (visible en el sitio)
            </label>
          </div>
        </div>
      </Section>

      <Section title="Premios">
        {form.premios.map((p, i) => (
          <div key={i} className="rifa-form__row">
            <div className="form__group" style={{ width: '80px', flexShrink: 0, marginBottom: 0 }}>
              <label>N° orden</label>
              <input type="number" min="1" value={p.orden} onChange={e => setPremio(i, 'orden', parseInt(e.target.value))} />
            </div>
            <div className="form__group" style={{ flex: 1, marginBottom: 0 }}>
              <label>Descripción</label>
              <input type="text" value={p.descripcion} placeholder="Viaje al Caribe para 2 personas" onChange={e => setPremio(i, 'descripcion', e.target.value)} />
            </div>
            <button type="button" className="btn btn--danger btn--sm rifa-form__del" onClick={() => removePremio(i)}>
              <HiTrash />
            </button>
          </div>
        ))}
        <button type="button" className="btn btn--ghost btn--sm" onClick={addPremio}>
          <HiPlus /> Agregar premio
        </button>
      </Section>

      <Section title="Características">
        {form.caracteristicas.map((c, i) => (
          <div key={i} className="rifa-form__row">
            <div className="form__group" style={{ flex: 1, marginBottom: 0 }}>
              <input type="text" value={c} placeholder="Característica" onChange={e => setCaract(i, e.target.value)} />
            </div>
            <button type="button" className="btn btn--danger btn--sm rifa-form__del" onClick={() => removeCaract(i)}>
              <HiTrash />
            </button>
          </div>
        ))}
        <button type="button" className="btn btn--ghost btn--sm" onClick={addCaract}>
          <HiPlus /> Agregar característica
        </button>
      </Section>

      <div className="product-form__actions">
        <button type="button" className="btn btn--outline" onClick={onCancel} disabled={saving}>Cancelar</button>
        <button type="button" className="btn btn--primary" onClick={handleSubmit} disabled={saving}>
          {saving ? 'Guardando…' : 'Guardar rifa'}
        </button>
      </div>
    </div>
  )
}
