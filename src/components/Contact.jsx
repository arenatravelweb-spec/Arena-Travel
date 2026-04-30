import { useState } from 'react'
import { z } from 'zod'
import { toast } from 'sonner'
import emailjs from '@emailjs/browser'
import AnimatedButton from './AnimatedButton'

const WA = 'https://wa.me/5493815477147'

const CONTACT_DETAILS = [
  { icon: '📍', label: 'Oficina',  info: 'Junín 155, local 19, San Miguel de Tucumán, Argentina' },
  { icon: '📞', label: 'Teléfono', info: '+54 9 3815 47-7147', href: WA },
  { icon: '🕐', label: 'Horario',  info: 'Lunes – Viernes: 10:00 – 18:00' },
]

const SOCIALS = [
  {
    name: 'instagram', label: 'Instagram',
    href: 'https://www.instagram.com/arenatravelviajes?igsh=dHd4c2RieGs5aW95',
    icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
  },
  {
    name: 'facebook', label: 'Facebook',
    href: 'https://www.facebook.com/share/1Hg4nUEaMX/?mibextid=wwXIfr',
    icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
  {
    name: 'whatsapp', label: 'WhatsApp',
    href: WA,
    icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  },
]

const contactSchema = z.object({
  nombre: z
    .string()
    .min(3,  'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede superar los 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/, 'El nombre solo puede contener letras'),
  email: z
    .string()
    .min(1, 'El email es obligatorio')
    .max(100, 'El email no puede superar los 100 caracteres')
    .email('Ingresá un email válido'),
  destino: z.string().optional(),
  mensaje: z
    .string()
    .min(10,  'El mensaje debe tener al menos 10 caracteres')
    .max(500, 'El mensaje no puede superar los 500 caracteres'),
})

export default function Contact() {
  const [form, setForm] = useState({ nombre: '', email: '', destino: '', mensaje: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const result = contactSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors = {}
      result.error.issues.forEach(err => {
        const field = err.path[0]
        if (!fieldErrors[field]) fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      toast.error('Por favor completá correctamente todos los campos requeridos.', {
        style: { background: '#7f1d1d', color: '#fff' },
        duration: 4000,
      })
      return
    }
    setErrors({})

    setStatus('sending')

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        nombre:  form.nombre,
        email:   form.email,
        destino: form.destino || 'No especificado',
        mensaje: form.mensaje,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        setStatus('sent')
        setForm({ nombre: '', email: '', destino: '', mensaje: '' })
        toast.success('¡Mensaje enviado! Te respondemos a la brevedad.', { duration: 5000 })
        setTimeout(() => setStatus('idle'), 4000)
      })
      .catch(() => {
        setStatus('error')
        toast.error('No pudimos enviar tu mensaje. Intentá de nuevo o escribinos por WhatsApp.', {
          style: { background: '#7f1d1d', color: '#fff' },
          duration: 6000,
        })
        setTimeout(() => setStatus('idle'), 4000)
      })
  }

  return (
    <section className="section contacto" id="contacto">
      <div className="container contacto__container">
        <div className="contacto__info reveal">
          <p className="section__label">Escríbenos</p>
          <h2 className="section__title">Hablemos de<br />tu viaje ideal</h2>
          <p className="contacto__desc">
            Nuestras expertas están listas para ayudarte a crear el itinerario perfecto para vos.
          </p>

          <ul className="contacto__details">
            {CONTACT_DETAILS.map(({ icon, label, info, href }) => (
              <li key={label}>
                <span className="contacto__icon">{icon}</span>
                <div>
                  <strong>{label}</strong>
                  {href
                    ? <p><a href={href} target="_blank" rel="noopener noreferrer">{info}</a></p>
                    : <p>{info}</p>
                  }
                </div>
              </li>
            ))}
          </ul>

          <ul className="social-list">
            {SOCIALS.map(({ name, label, href, icon }) => (
              <li key={name} className="social-list__item">
                <a href={href} data-social={name} aria-label={label} target="_blank" rel="noopener noreferrer">
                  <span className="social-list__filled" />
                  {icon}
                </a>
                <span className="social-list__tooltip">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <form className="contacto__form reveal" onSubmit={handleSubmit} noValidate>
          <div className="form__row">
            <div className="form__group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text" id="nombre" name="nombre"
                placeholder="Tu nombre"
                value={form.nombre} onChange={handleChange}
                className={errors.nombre ? 'error' : ''}
              />
              {errors.nombre && <span className="form__error">{errors.nombre}</span>}
            </div>
            <div className="form__group">
              <label htmlFor="email">Email</label>
              <input
                type="email" id="email" name="email"
                placeholder="tu@email.com"
                value={form.email} onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="form__error">{errors.email}</span>}
            </div>
          </div>

          <div className="form__group">
            <label htmlFor="destino">Destino de interés</label>
            <select id="destino" name="destino" value={form.destino} onChange={handleChange}>
              <option value="">Selecciona un destino</option>
              <option>Europa</option>
              <option>Asia</option>
              <option>América</option>
              <option>África</option>
              <option>Oceanía</option>
              <option>No sé, ¡sorpréndeme!</option>
            </select>
          </div>

          <div className="form__group">
            <label htmlFor="mensaje">Contanos tu sueño</label>
            <textarea
              id="mensaje" name="mensaje" rows="5"
              placeholder="Describe el viaje que siempre quisiste hacer..."
              value={form.mensaje} onChange={handleChange}
              className={errors.mensaje ? 'error' : ''}
            />
            {errors.mensaje && <span className="form__error">{errors.mensaje}</span>}
          </div>

          <AnimatedButton
            type="submit"
            text={
              status === 'sending' ? 'Enviando…' :
              status === 'sent'    ? '¡Mensaje enviado! ✓' :
              status === 'error'   ? 'Error al enviar, reintentá' :
              'Enviar consulta'
            }
            disabled={status === 'sending'}
            style={{ width: '100%', textAlign: 'center' }}
          />
        </form>
      </div>
    </section>
  )
}
