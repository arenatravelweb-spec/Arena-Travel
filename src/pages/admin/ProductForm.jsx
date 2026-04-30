import { useState } from 'react'
import { uploadToCloudinary, uploadVideoToCloudinary, VIDEO_MAX_BYTES } from '../../lib/cloudinary'

const EMPTY = { nombre: '', precio: '', precio_desde: '', descripcion: '', imagen_url: '', video_url: '', categoria: 'nacional' }

export default function ProductForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial ? {
    nombre:       initial.nombre,
    precio:       initial.precio ?? '',
    precio_desde: initial.precio_desde ?? '',
    descripcion:  initial.descripcion ?? '',
    imagen_url:   initial.imagen_url ?? '',
    video_url:    initial.video_url ?? '',
    categoria:    initial.categoria ?? 'nacional',
  } : EMPTY)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(initial?.imagen_url ?? '')
  const [uploading, setUploading] = useState(false)
  const [videoFile, setVideoFile] = useState(null)
  const [videoPreview, setVideoPreview] = useState(initial?.video_url ?? '')
  const [uploadingVideo, setUploadingVideo] = useState(false)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
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
    if (form.categoria === 'nacional') {
      const n = parsePrice(form.precio)
      if (!form.precio || isNaN(n) || n <= 0) errs.precio = true
    }
    return errs
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

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

    setSaving(true)
    await onSave({
      ...form,
      precio:     form.categoria === 'nacional' ? parsePrice(form.precio) : 0,
      imagen_url: imageUrl,
      video_url:  videoUrl,
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
        </select>
      </div>

      {form.categoria === 'nacional' ? (
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
          <label htmlFor="pf-precio-desde">Precio desde (opcional)</label>
          <input
            id="pf-precio-desde" name="precio_desde" type="text"
            placeholder="ej: USD 1.200 por persona"
            value={form.precio_desde} onChange={handleChange}
          />
          <span className="product-form__hint">Este texto se mostrará como "Precio: desde …" en la web.</span>
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
