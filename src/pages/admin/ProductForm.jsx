import { useState } from 'react'
import { toast } from 'sonner'
import { HiPlus, HiTrash } from 'react-icons/hi2'
import { uploadToCloudinary, uploadVideoToCloudinary, VIDEO_MAX_BYTES } from '../../lib/cloudinary'
import { getMoneda } from '../../lib/pricing'

const EMPTY_DIA        = { titulo: '', descripcion: '', actividades_txt: '' }
const EMPTY_FECHA      = { fecha: '', estado: 'disponible', precio: '' }
const EMPTY_TRANSPORTE = { nombre: '', precio_adicional: '', incluido: false }

const EMPTY = {
  nombre: '', precio: '', precio_desde: '', descripcion: '',
  imagen_url: '', video_url: '', categoria: 'nacional', subcategoria: '', hot_sale: false,
  origen_ciudad: '', destino_ciudad: '',
  duracion_dias: '', duracion_noches: '', precio_single_recargo: '50',
  itin_dias:         [],
  fechas_lista:      [],
  aloj_nombre: '', aloj_estrellas: '', aloj_desc: '',
  transporte_lista:  [],
  incluye_texto: '', no_incluye_texto: '',
}

function fromInitial(initial) {
  return {
    nombre:       initial.nombre        ?? '',
    precio:       initial.precio        ?? '',
    precio_desde: initial.precio_desde  ?? '',
    descripcion:  initial.descripcion   ?? '',
    imagen_url:   initial.imagen_url    ?? '',
    video_url:    initial.video_url     ?? '',
    categoria:    initial.categoria     ?? 'nacional',
    subcategoria: initial.subcategoria  ?? '',
    hot_sale:     initial.hot_sale      ?? false,
    origen_ciudad:         initial.origen_ciudad          ?? '',
    destino_ciudad:        initial.destino_ciudad         ?? '',
    duracion_dias:         initial.duracion_dias          ?? '',
    duracion_noches:       initial.duracion_noches        ?? '',
    precio_single_recargo: initial.precio_single_recargo  ?? '50',
    itin_dias: Array.isArray(initial.itinerario)
      ? initial.itinerario.map(d => ({
          titulo:          d.titulo        || '',
          descripcion:     d.descripcion   || '',
          actividades_txt: Array.isArray(d.actividades) ? d.actividades.join('\n') : '',
        }))
      : [],
    fechas_lista: Array.isArray(initial.fechas_salida)
      ? initial.fechas_salida.map(f => ({
          fecha:  f.fecha  || '',
          estado: f.estado || 'disponible',
          precio: f.precio ?? '',
        }))
      : [],
    aloj_nombre:    initial.alojamiento?.nombre      ?? '',
    aloj_estrellas: initial.alojamiento?.estrellas   ?? '',
    aloj_desc:      initial.alojamiento?.descripcion ?? '',
    transporte_lista: Array.isArray(initial.opciones_transporte)
      ? initial.opciones_transporte.map(t => ({
          nombre:           t.nombre || t.tipo || '',
          precio_adicional: t.precio_adicional ?? t.precio ?? '',
          incluido:         t.incluido ?? false,
        }))
      : [],
    incluye_texto:    Array.isArray(initial.incluye)    ? initial.incluye.join('\n')    : '',
    no_incluye_texto: Array.isArray(initial.no_incluye) ? initial.no_incluye.join('\n') : '',
  }
}

// ── Keyboard guards ──────────────────────────────────
const NAV = ['Backspace','Delete','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Tab','Enter']

const onlyDigits = e => {
  if (!NAV.includes(e.key) && !/^\d$/.test(e.key)) e.preventDefault()
}
const onlyPrice = e => {                      // digits + comma + dot
  if (!NAV.includes(e.key) && !/^[\d.,]$/.test(e.key)) e.preventDefault()
}
const onlyLettersKey = e => {                 // letters, spaces, hyphens, accented
  if (!NAV.includes(e.key) && e.key !== ' ' && !/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'\-\.]$/.test(e.key)) e.preventDefault()
}

// ── Itinerary field rules ─────────────────────────────
const ITIN_RULES = {
  origen_ciudad:         { minLength: 2, maxLength: 80, pattern: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'\-.]+$/, patternMsg: 'Solo letras y espacios' },
  destino_ciudad:        { minLength: 2, maxLength: 80, pattern: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'\-.]+$/, patternMsg: 'Solo letras y espacios' },
  duracion_dias:         { min: 1, max: 60 },
  duracion_noches:       { min: 0, max: 60 },
  precio_single_recargo: { min: 0, max: 200 },
  aloj_nombre:           { minLength: 2, maxLength: 100 },
  aloj_estrellas:        { min: 0, max: 5 },
  aloj_desc:             { maxLength: 500 },
  incluye_texto:         { maxLength: 3000 },
  no_incluye_texto:      { maxLength: 3000 },
}
const DIA_RULES = {
  titulo:          { required: true, minLength: 3, maxLength: 100 },
  descripcion:     { required: true, minLength: 10, maxLength: 600 },
  actividades_txt: { maxLength: 1000 },
}
const TR_RULES = {
  nombre:           { required: true, minLength: 2, maxLength: 50 },
  precio_adicional: { min: 0 },
}

function runRule(value, rule) {
  if (rule.required && !String(value).trim()) return 'Campo requerido'
  if (!String(value).trim()) return null          // optional + empty → ok
  if (rule.minLength && String(value).trim().length < rule.minLength)
    return `Mínimo ${rule.minLength} caracteres`
  if (rule.maxLength && String(value).trim().length > rule.maxLength)
    return `Máximo ${rule.maxLength} caracteres`
  if (rule.min !== undefined && Number(value) < rule.min)
    return `Mínimo ${rule.min}`
  if (rule.max !== undefined && Number(value) > rule.max)
    return `Máximo ${rule.max}`
  if (rule.pattern && !rule.pattern.test(String(value).trim()))
    return rule.patternMsg || 'Formato inválido'
  return null
}

function validateItin(form) {
  const e = {}
  // Basic itin fields
  Object.entries(ITIN_RULES).forEach(([k, rule]) => {
    const msg = runRule(form[k], rule)
    if (msg) e[k] = msg
  })
  // Days
  form.itin_dias.forEach((dia, i) => {
    Object.entries(DIA_RULES).forEach(([k, rule]) => {
      const msg = runRule(dia[k], rule)
      if (msg) e[`dia_${i}_${k}`] = msg
    })
  })
  // Transporte
  form.transporte_lista.forEach((t, i) => {
    Object.entries(TR_RULES).forEach(([k, rule]) => {
      const msg = runRule(t[k], rule)
      if (msg) e[`tr_${i}_${k}`] = msg
    })
  })
  return e
}

export default function ProductForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(() => initial ? fromInitial(initial) : { ...EMPTY })
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(initial?.imagen_url ?? '')
  const [uploading, setUploading] = useState(false)
  const [videoFile, setVideoFile] = useState(null)
  const [videoPreview, setVideoPreview] = useState(initial?.video_url ?? '')
  const [uploadingVideo, setUploadingVideo] = useState(false)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})
  const [itinErr, setItinErr] = useState({})

  // ── Helpers listas dinámicas ──
  const listSet = (key, i, field, val) =>
    setForm(f => { const a = [...f[key]]; a[i] = { ...a[i], [field]: val }; return { ...f, [key]: a } })
  const listAdd = (key, empty) =>
    setForm(f => ({ ...f, [key]: [...f[key], { ...empty }] }))
  const listDel = (key, i) =>
    setForm(f => ({ ...f, [key]: f[key].filter((_, j) => j !== i) }))

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }))
  }

  const handleFile = e => {
    const selected = e.target.files[0]
    if (!selected) return
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
    setForm(prev => ({ ...prev, imagen_url: '' }))
  }

  const handleVideoFile = e => {
    const selected = e.target.files[0]
    if (!selected) return
    if (selected.size > VIDEO_MAX_BYTES) {
      setErrors(prev => ({ ...prev, video: 'El video supera el tamaño máximo de 100 MB' }))
      return
    }
    setErrors(prev => ({ ...prev, video: false }))
    setVideoFile(selected)
    setVideoPreview(URL.createObjectURL(selected))
    setForm(prev => ({ ...prev, video_url: '' }))
  }

  const clearVideo = () => {
    setVideoFile(null)
    setVideoPreview('')
    setForm(prev => ({ ...prev, video_url: '' }))
  }

  const parsePrice = str => {
    // Acepta formato argentino "85.000,50" y también "85000"
    const cleaned = String(str).trim().replace(/\./g, '').replace(',', '.')
    return Number(cleaned)
  }

  const validate = () => {
    const errs = {}
    if (!form.nombre.trim()) errs.nombre = true
    if (form.categoria === 'nacional' || form.categoria === 'egresados') {
      const n = parsePrice(form.precio)
      if (!form.precio || isNaN(n) || n <= 0) errs.precio = true
    }
    if (form.categoria === 'egresados' && !form.subcategoria) errs.subcategoria = true
    return errs
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    const ie = validateItin(form)
    if (Object.keys(ie).length) {
      setItinErr(ie)
      const firstKey = Object.keys(ie)[0]
      const firstMsg = ie[firstKey]
      toast.error(`Error en itinerario: ${firstMsg} (${firstKey})`)
      return
    }
    setItinErr({})

    let imageUrl = form.imagen_url
    let videoUrl = form.video_url

    if (file) {
      setUploading(true)
      try {
        imageUrl = await uploadToCloudinary(file)
      } catch (err) {
        setErrors(prev => ({ ...prev, imagen: err.message }))
        setUploading(false)
        return
      }
      setUploading(false)
    }

    if (videoFile) {
      setUploadingVideo(true)
      try {
        videoUrl = await uploadVideoToCloudinary(videoFile)
      } catch (err) {
        setErrors(prev => ({ ...prev, video: err.message }))
        setUploadingVideo(false)
        return
      }
      setUploadingVideo(false)
    }

    const safeLines = str => (str || '').split('\n').map(l => l.trim()).filter(Boolean)

    setSaving(true)
    await onSave({
      nombre:        form.nombre.trim(),
      precio:        (form.categoria === 'nacional' || form.categoria === 'egresados') ? parsePrice(form.precio) : 0,
      precio_desde:  form.precio_desde,
      descripcion:   form.descripcion,
      imagen_url:    imageUrl,
      video_url:     videoUrl,
      categoria:     form.categoria,
      subcategoria:  form.subcategoria,
      hot_sale:      form.hot_sale,
      origen_ciudad:         form.origen_ciudad  || null,
      destino_ciudad:        form.destino_ciudad || null,
      duracion_dias:         form.duracion_dias    ? parseInt(form.duracion_dias)    : null,
      duracion_noches:       form.duracion_noches  ? parseInt(form.duracion_noches)  : null,
      precio_single_recargo: form.precio_single_recargo ? Number(form.precio_single_recargo) : 50,
      itinerario: form.itin_dias.map((d, i) => ({
        dia:          i + 1,
        titulo:       d.titulo.trim(),
        descripcion:  d.descripcion.trim(),
        actividades:  safeLines(d.actividades_txt),
      })),
      fechas_salida: form.fechas_lista
        .filter(f => f.fecha)
        .map(f => ({
          fecha:  f.fecha,
          estado: f.estado,
          ...(f.precio !== '' ? { precio: Number(f.precio) } : {}),
        })),
      alojamiento: form.aloj_nombre.trim()
        ? {
            nombre:      form.aloj_nombre.trim(),
            estrellas:   form.aloj_estrellas ? Number(form.aloj_estrellas) : undefined,
            descripcion: form.aloj_desc.trim() || undefined,
          }
        : null,
      incluye:    safeLines(form.incluye_texto),
      no_incluye: safeLines(form.no_incluye_texto),
      opciones_transporte: form.transporte_lista
        .filter(t => t.nombre.trim())
        .map(t => ({
          nombre:           t.nombre.trim(),
          precio_adicional: t.precio_adicional !== '' ? Number(t.precio_adicional) : 0,
          incluido:         t.incluido,
        })),
    })
    setSaving(false)
  }

  const busy = uploading || uploadingVideo || saving

  return (
    <form className="product-form" onSubmit={handleSubmit} noValidate>
      <div className="form__group">
        <label htmlFor="pf-nombre">Nombre *</label>
        <input
          id="pf-nombre" name="nombre" type="text"
          placeholder="Ej: Tour por Marruecos"
          value={form.nombre} onChange={handleChange}
          className={errors.nombre ? 'error' : ''}
        />
        {errors.nombre && <span className="product-form__field-error">El nombre es obligatorio</span>}
      </div>

      <div className="form__group">
        <label htmlFor="pf-categoria">Categoría *</label>
        <select id="pf-categoria" name="categoria" value={form.categoria} onChange={handleChange}>
          <option value="nacional">Nacional</option>
          <option value="internacional">Internacional</option>
          <option value="egresados">Viajes de Egresados</option>
        </select>
      </div>

      {form.categoria === 'egresados' && (
        <div className="form__group">
          <label htmlFor="pf-subcategoria">Nivel *</label>
          <select id="pf-subcategoria" name="subcategoria" value={form.subcategoria} onChange={handleChange}>
            <option value="">— Seleccioná un nivel —</option>
            <option value="primario">Primario</option>
            <option value="secundario">Secundario</option>
          </select>
          {errors.subcategoria && <span className="product-form__field-error">Seleccioná un nivel</span>}
        </div>
      )}

      {(form.categoria === 'nacional' || form.categoria === 'egresados') ? (
        <div className="form__group">
          <label htmlFor="pf-precio">Precio en pesos (ARS) *</label>
          <input
            id="pf-precio" name="precio" type="text"
            inputMode="numeric"
            placeholder="ej: 85000 o 85.000"
            value={form.precio} onChange={handleChange}
            className={errors.precio ? 'error' : ''}
          />
          {errors.precio && <span className="product-form__field-error">Introduce un precio válido en pesos</span>}
        </div>
      ) : (
        <div className="form__group">
          {getMoneda(form.nombre) === 'USD' ? (
            <>
              <label htmlFor="pf-precio-desde">Precio (USD)</label>
              <input
                id="pf-precio-desde" name="precio_desde" type="text"
                placeholder="ej: 1.200"
                value={form.precio_desde} onChange={handleChange}
              />
              <span className="product-form__hint">No escribas USD — se agrega automáticamente según el destino.</span>
            </>
          ) : (
            <>
              <label htmlFor="pf-precio-desde">Precio desde (opcional)</label>
              <input
                id="pf-precio-desde" name="precio_desde" type="text"
                placeholder="ej: 1.200.000"
                value={form.precio_desde} onChange={handleChange}
              />
              <span className="product-form__hint">No escribas $ — se agrega automáticamente.</span>
            </>
          )}
        </div>
      )}

      <div className="form__group">
        <label htmlFor="pf-desc">Descripción</label>
        <textarea
          id="pf-desc" name="descripcion" rows="4"
          placeholder="Describe el producto o paquete…"
          value={form.descripcion} onChange={handleChange}
        />
      </div>

      <div className="form__group">
        <label htmlFor="pf-url">URL de imagen (opcional)</label>
        <input
          id="pf-url" name="imagen_url" type="url"
          placeholder="https://..."
          value={form.imagen_url}
          onChange={e => {
            handleChange(e)
            if (e.target.value) { setPreview(e.target.value); setFile(null) }
          }}
        />
      </div>

      <div className="form__group">
        <label htmlFor="pf-file">O sube una imagen — se convertirá a WebP</label>
        <input
          id="pf-file" type="file" accept="image/*"
          onChange={handleFile}
          className="product-form__file-input"
        />
        {uploading && <p className="product-form__status">Subiendo imagen a Cloudinary…</p>}
        {errors.imagen && <span className="product-form__field-error">{errors.imagen}</span>}
      </div>

      {preview && (
        <div className="product-form__preview">
          <img src={preview} alt="Vista previa" />
        </div>
      )}

      <div className="form__group">
        <label htmlFor="pf-video-url">URL de video (opcional)</label>
        <input
          id="pf-video-url" name="video_url" type="url"
          placeholder="https://youtube.com/watch?v=... o URL directa"
          value={form.video_url}
          onChange={e => {
            handleChange(e)
            if (e.target.value) { setVideoPreview(e.target.value); setVideoFile(null) }
            else { setVideoPreview('') }
          }}
        />
      </div>

      <div className="form__group">
        <label htmlFor="pf-video-file">O sube un video — MP4, WebM (máx. 100 MB)</label>
        <input
          id="pf-video-file" type="file" accept="video/mp4,video/webm,video/*"
          onChange={handleVideoFile}
          className="product-form__file-input"
        />
        {uploadingVideo && <p className="product-form__status">Subiendo video a Cloudinary…</p>}
        {errors.video && <span className="product-form__field-error">{errors.video}</span>}
      </div>

      {videoPreview && (
        <div className="product-form__preview product-form__preview--video">
          <video src={videoPreview} controls muted preload="metadata" />
          <button type="button" className="product-form__clear-media" onClick={clearVideo}>
            Quitar video
          </button>
        </div>
      )}

      <div className="product-form__hot-sale">
        <label className="product-form__toggle-label">
          <input
            type="checkbox"
            name="hot_sale"
            checked={form.hot_sale}
            onChange={handleChange}
            className="product-form__toggle-input"
          />
          <span className="product-form__toggle-track">
            <span className="product-form__toggle-thumb" />
          </span>
          <span className="product-form__toggle-text">
            🔥 Activar Hot Sale <span className="product-form__toggle-pct">— 40% OFF</span>
          </span>
        </label>
        {form.hot_sale && (
          <p className="product-form__hot-sale-preview">
            El badge <strong>"🔥 HOT SALE · 40% OFF"</strong> se mostrará en el modal del producto.
          </p>
        )}
      </div>

      {/* ── Itinerary section ── */}
      <details className="product-form__itin-section">
        <summary className="product-form__itin-summary">
          📍 Datos de itinerario (opcional)
        </summary>
        <div className="product-form__itin-body">

          {/* Origen / Destino */}
          <div className="form__row">
            <div className="form__group">
              <label>Ciudad de origen</label>
              <input name="origen_ciudad" type="text" placeholder="San Miguel de Tucumán"
                value={form.origen_ciudad}
                maxLength={80}
                onKeyDown={onlyLettersKey}
                onChange={handleChange}
                onBlur={e => { const m = runRule(e.target.value, ITIN_RULES.origen_ciudad); setItinErr(p => ({ ...p, origen_ciudad: m })) }}
                className={itinErr.origen_ciudad ? 'error' : ''}
              />
              {itinErr.origen_ciudad && <span className="product-form__field-error">{itinErr.origen_ciudad}</span>}
            </div>
            <div className="form__group">
              <label>Ciudad de destino</label>
              <input name="destino_ciudad" type="text" placeholder="Mar del Plata"
                value={form.destino_ciudad}
                maxLength={80}
                onKeyDown={onlyLettersKey}
                onChange={handleChange}
                onBlur={e => { const m = runRule(e.target.value, ITIN_RULES.destino_ciudad); setItinErr(p => ({ ...p, destino_ciudad: m })) }}
                className={itinErr.destino_ciudad ? 'error' : ''}
              />
              {itinErr.destino_ciudad && <span className="product-form__field-error">{itinErr.destino_ciudad}</span>}
            </div>
          </div>

          {/* Duración / Recargo */}
          <div className="form__row">
            <div className="form__group">
              <label>Duración (días) *</label>
              <input name="duracion_dias" type="number" min="1" max="60" placeholder="10"
                value={form.duracion_dias}
                onKeyDown={onlyDigits}
                onChange={handleChange}
                onBlur={e => { const m = runRule(e.target.value, ITIN_RULES.duracion_dias); setItinErr(p => ({ ...p, duracion_dias: m })) }}
                className={itinErr.duracion_dias ? 'error' : ''}
              />
              {itinErr.duracion_dias && <span className="product-form__field-error">{itinErr.duracion_dias}</span>}
            </div>
            <div className="form__group">
              <label>Duración (noches) *</label>
              <input name="duracion_noches" type="number" min="0" max="60" placeholder="9"
                value={form.duracion_noches}
                onKeyDown={onlyDigits}
                onChange={handleChange}
                onBlur={e => { const m = runRule(e.target.value, ITIN_RULES.duracion_noches); setItinErr(p => ({ ...p, duracion_noches: m })) }}
                className={itinErr.duracion_noches ? 'error' : ''}
              />
              {itinErr.duracion_noches && <span className="product-form__field-error">{itinErr.duracion_noches}</span>}
            </div>
            <div className="form__group">
              <label>Recargo single (%)</label>
              <input name="precio_single_recargo" type="number" min="0" max="200" placeholder="50"
                value={form.precio_single_recargo}
                onKeyDown={onlyDigits}
                onChange={handleChange}
                onBlur={e => { const m = runRule(e.target.value, ITIN_RULES.precio_single_recargo); setItinErr(p => ({ ...p, precio_single_recargo: m })) }}
                className={itinErr.precio_single_recargo ? 'error' : ''}
              />
              {itinErr.precio_single_recargo && <span className="product-form__field-error">{itinErr.precio_single_recargo}</span>}
            </div>
          </div>

          {/* ── Días del itinerario ── */}
          <div className="form__group">
            <label>Días del itinerario</label>
            {form.itin_dias.map((dia, i) => (
              <div key={i} className="pf-itin-dia">
                <div className="pf-itin-dia__head">
                  <span className="pf-itin-dia__num">Día {i + 1}</span>
                  <button type="button" className="btn btn--danger btn--sm" onClick={() => listDel('itin_dias', i)}>
                    <HiTrash />
                  </button>
                </div>
                <div className="form__group">
                  <input
                    type="text" placeholder="Título del día *"
                    value={dia.titulo}
                    maxLength={100}
                    onChange={e => { listSet('itin_dias', i, 'titulo', e.target.value); setItinErr(p => ({ ...p, [`dia_${i}_titulo`]: null })) }}
                    onBlur={e => { const m = runRule(e.target.value, DIA_RULES.titulo); setItinErr(p => ({ ...p, [`dia_${i}_titulo`]: m })) }}
                    className={itinErr[`dia_${i}_titulo`] ? 'error' : ''}
                  />
                  {itinErr[`dia_${i}_titulo`] && <span className="product-form__field-error">{itinErr[`dia_${i}_titulo`]}</span>}
                </div>
                <div className="form__group">
                  <textarea
                    rows={2} placeholder="Descripción del día * (mín. 10 caracteres)"
                    value={dia.descripcion}
                    maxLength={600}
                    onChange={e => { listSet('itin_dias', i, 'descripcion', e.target.value); setItinErr(p => ({ ...p, [`dia_${i}_descripcion`]: null })) }}
                    onBlur={e => { const m = runRule(e.target.value, DIA_RULES.descripcion); setItinErr(p => ({ ...p, [`dia_${i}_descripcion`]: m })) }}
                    className={itinErr[`dia_${i}_descripcion`] ? 'error' : ''}
                  />
                  {itinErr[`dia_${i}_descripcion`] && <span className="product-form__field-error">{itinErr[`dia_${i}_descripcion`]}</span>}
                </div>
                <div className="form__group">
                  <textarea
                    rows={2} placeholder={"Actividades (una por línea)\nCity Tour\nAlojamiento en hotel"}
                    value={dia.actividades_txt}
                    maxLength={1000}
                    onChange={e => { listSet('itin_dias', i, 'actividades_txt', e.target.value); setItinErr(p => ({ ...p, [`dia_${i}_actividades_txt`]: null })) }}
                    onBlur={e => { const m = runRule(e.target.value, DIA_RULES.actividades_txt); setItinErr(p => ({ ...p, [`dia_${i}_actividades_txt`]: m })) }}
                    className={itinErr[`dia_${i}_actividades_txt`] ? 'error' : ''}
                  />
                  {itinErr[`dia_${i}_actividades_txt`] && <span className="product-form__field-error">{itinErr[`dia_${i}_actividades_txt`]}</span>}
                </div>
              </div>
            ))}
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => listAdd('itin_dias', EMPTY_DIA)}>
              <HiPlus /> Agregar día
            </button>
          </div>

          {/* ── Fechas de salida ── */}
          <div className="form__group">
            <label>Fechas de salida</label>
            {form.fechas_lista.map((f, i) => (
              <div key={i} className="pf-fecha-row">
                <input
                  type="date" value={f.fecha}
                  required
                  onChange={e => listSet('fechas_lista', i, 'fecha', e.target.value)}
                />
                <select
                  value={f.estado}
                  onChange={e => listSet('fechas_lista', i, 'estado', e.target.value)}
                >
                  <option value="disponible">Disponible</option>
                  <option value="ultimos_lugares">Últimos lugares</option>
                  <option value="agotado">Agotado</option>
                </select>
                <input
                  type="number" placeholder="Precio (opcional)" min="0"
                  value={f.precio}
                  onKeyDown={onlyDigits}
                  onChange={e => listSet('fechas_lista', i, 'precio', e.target.value)}
                />
                <button type="button" className="btn btn--danger btn--sm" onClick={() => listDel('fechas_lista', i)}>
                  <HiTrash />
                </button>
              </div>
            ))}
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => listAdd('fechas_lista', EMPTY_FECHA)}>
              <HiPlus /> Agregar fecha
            </button>
          </div>

          {/* ── Alojamiento ── */}
          <div className="form__group">
            <label>Alojamiento</label>
            <div className="form__row">
              <div className="form__group" style={{ flex: 1 }}>
                <input
                  type="text" placeholder="Nombre del hotel"
                  value={form.aloj_nombre}
                  maxLength={100}
                  onChange={e => { setForm(f => ({ ...f, aloj_nombre: e.target.value })); setItinErr(p => ({ ...p, aloj_nombre: null })) }}
                  onBlur={e => { const m = runRule(e.target.value, ITIN_RULES.aloj_nombre); setItinErr(p => ({ ...p, aloj_nombre: m })) }}
                  className={itinErr.aloj_nombre ? 'error' : ''}
                />
                {itinErr.aloj_nombre && <span className="product-form__field-error">{itinErr.aloj_nombre}</span>}
              </div>
              <div className="form__group" style={{ maxWidth: '140px' }}>
                <input
                  type="number" min="1" max="5" placeholder="Estrellas (1-5)"
                  value={form.aloj_estrellas}
                  onKeyDown={onlyDigits}
                  onChange={e => { setForm(f => ({ ...f, aloj_estrellas: e.target.value })); setItinErr(p => ({ ...p, aloj_estrellas: null })) }}
                  onBlur={e => { const m = runRule(e.target.value, ITIN_RULES.aloj_estrellas); setItinErr(p => ({ ...p, aloj_estrellas: m })) }}
                  className={itinErr.aloj_estrellas ? 'error' : ''}
                />
                {itinErr.aloj_estrellas && <span className="product-form__field-error">{itinErr.aloj_estrellas}</span>}
              </div>
            </div>
            <textarea
              rows={2} placeholder="Descripción del alojamiento"
              value={form.aloj_desc}
              maxLength={500}
              onChange={e => { setForm(f => ({ ...f, aloj_desc: e.target.value })); setItinErr(p => ({ ...p, aloj_desc: null })) }}
              onBlur={e => { const m = runRule(e.target.value, ITIN_RULES.aloj_desc); setItinErr(p => ({ ...p, aloj_desc: m })) }}
              className={itinErr.aloj_desc ? 'error' : ''}
            />
            {itinErr.aloj_desc && <span className="product-form__field-error">{itinErr.aloj_desc}</span>}
          </div>

          {/* ── Incluye / No incluye ── */}
          <div className="form__row">
            <div className="form__group">
              <label>Incluye (uno por línea)</label>
              <textarea name="incluye_texto" rows="5"
                placeholder={"BUS IDA Y VUELTA\nCOORDINACIÓN\n7 NOCHES DE HOTEL\nMEDIA PENSIÓN"}
                value={form.incluye_texto}
                maxLength={3000}
                onChange={handleChange}
                onBlur={e => { const m = runRule(e.target.value, ITIN_RULES.incluye_texto); setItinErr(p => ({ ...p, incluye_texto: m })) }}
                className={itinErr.incluye_texto ? 'error' : ''}
              />
              {itinErr.incluye_texto && <span className="product-form__field-error">{itinErr.incluye_texto}</span>}
            </div>
            <div className="form__group">
              <label>No incluye (uno por línea)</label>
              <textarea name="no_incluye_texto" rows="5"
                placeholder={"ASISTENCIA AL VIAJERO\nEXCURSIONES OPCIONALES"}
                value={form.no_incluye_texto}
                maxLength={3000}
                onChange={handleChange}
                onBlur={e => { const m = runRule(e.target.value, ITIN_RULES.no_incluye_texto); setItinErr(p => ({ ...p, no_incluye_texto: m })) }}
                className={itinErr.no_incluye_texto ? 'error' : ''}
              />
              {itinErr.no_incluye_texto && <span className="product-form__field-error">{itinErr.no_incluye_texto}</span>}
            </div>
          </div>

          {/* ── Opciones de transporte ── */}
          <div className="form__group">
            <label>Opciones de transporte</label>
            {form.transporte_lista.map((t, i) => (
              <div key={i} className="pf-fecha-row pf-fecha-row--col">
                <div className="pf-fecha-row__inputs">
                  <div className="form__group" style={{ flex: 1 }}>
                    <input
                      type="text" placeholder="Ej: Coche Cama *"
                      value={t.nombre}
                      maxLength={50}
                      onChange={e => { listSet('transporte_lista', i, 'nombre', e.target.value); setItinErr(p => ({ ...p, [`tr_${i}_nombre`]: null })) }}
                      onBlur={e => { const m = runRule(e.target.value, TR_RULES.nombre); setItinErr(p => ({ ...p, [`tr_${i}_nombre`]: m })) }}
                      className={itinErr[`tr_${i}_nombre`] ? 'error' : ''}
                    />
                    {itinErr[`tr_${i}_nombre`] && <span className="product-form__field-error">{itinErr[`tr_${i}_nombre`]}</span>}
                  </div>
                  <div className="form__group" style={{ maxWidth: '160px' }}>
                    <input
                      type="number" min="0" placeholder="Adicional ($)"
                      value={t.precio_adicional}
                      onKeyDown={onlyDigits}
                      onChange={e => { listSet('transporte_lista', i, 'precio_adicional', e.target.value); setItinErr(p => ({ ...p, [`tr_${i}_precio_adicional`]: null })) }}
                      onBlur={e => { const m = runRule(e.target.value, TR_RULES.precio_adicional); setItinErr(p => ({ ...p, [`tr_${i}_precio_adicional`]: m })) }}
                      className={itinErr[`tr_${i}_precio_adicional`] ? 'error' : ''}
                    />
                    {itinErr[`tr_${i}_precio_adicional`] && <span className="product-form__field-error">{itinErr[`tr_${i}_precio_adicional`]}</span>}
                  </div>
                  <label style={{ display:'flex', alignItems:'center', gap:'.35rem', fontSize:'.82rem', whiteSpace:'nowrap', cursor:'pointer' }}>
                    <input
                      type="checkbox" checked={t.incluido}
                      onChange={e => listSet('transporte_lista', i, 'incluido', e.target.checked)}
                      style={{ width:'auto' }}
                    />
                    Incluido
                  </label>
                  <button type="button" className="btn btn--danger btn--sm" onClick={() => listDel('transporte_lista', i)}>
                    <HiTrash />
                  </button>
                </div>
              </div>
            ))}
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => listAdd('transporte_lista', EMPTY_TRANSPORTE)}>
              <HiPlus /> Agregar transporte
            </button>
          </div>

        </div>
      </details>

      <div className="product-form__actions">
        <button type="button" className="btn btn--outline btn--sm" onClick={onCancel} disabled={busy}>
          Cancelar
        </button>
        <button type="submit" className="btn btn--primary btn--sm" disabled={busy}>
          {saving ? 'Guardando…' : initial ? 'Actualizar' : 'Crear producto'}
        </button>
      </div>
    </form>
  )
}
