import { useState } from 'react'

const CONTACT_DETAILS = [
  { icon: '📍', label: 'Oficina',  info: 'Calle Gran Vía 45, Madrid, España' },
  { icon: '📞', label: 'Teléfono', info: '+34 91 123 45 67' },
  { icon: '✉',  label: 'Email',    info: 'hola@nomadaagencia.com' },
  { icon: '🕐', label: 'Horario',  info: 'Lunes – Viernes: 9:00 – 19:00' },
]

const REQUIRED_FIELDS = ['nombre', 'email', 'mensaje']

export default function Contact() {
  const [form, setForm] = useState({ nombre: '', email: '', destino: '', mensaje: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const newErrors = {}
    REQUIRED_FIELDS.forEach(f => { if (!form[f].trim()) newErrors[f] = true })
    if (Object.keys(newErrors).length) { setErrors(newErrors); return }

    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
      setForm({ nombre: '', email: '', destino: '', mensaje: '' })
      setTimeout(() => setStatus('idle'), 4000)
    }, 1200)
  }

  return (
    <section className="section contacto" id="contacto">
      <div className="container contacto__container">
        <div className="contacto__info reveal">
          <p className="section__label">Escríbenos</p>
          <h2 className="section__title">Hablemos de<br />tu viaje ideal</h2>
          <p className="contacto__desc">
            Nuestros expertos están listos para ayudarte a crear el itinerario perfecto para ti.
          </p>

          <ul className="contacto__details">
            {CONTACT_DETAILS.map(({ icon, label, info }) => (
              <li key={label}>
                <span className="contacto__icon">{icon}</span>
                <div>
                  <strong>{label}</strong>
                  <p>{info}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="contacto__social">
            <a href="#" className="social-btn">Instagram</a>
            <a href="#" className="social-btn">Facebook</a>
            <a href="#" className="social-btn">WhatsApp</a>
          </div>
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
            </div>
            <div className="form__group">
              <label htmlFor="email">Email</label>
              <input
                type="email" id="email" name="email"
                placeholder="tu@email.com"
                value={form.email} onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
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
            <label htmlFor="mensaje">Cuéntanos tu sueño</label>
            <textarea
              id="mensaje" name="mensaje" rows="5"
              placeholder="Describe el viaje que siempre quisiste hacer..."
              value={form.mensaje} onChange={handleChange}
              className={errors.mensaje ? 'error' : ''}
            />
          </div>

          <button
            type="submit"
            className="btn btn--primary btn--full"
            disabled={status === 'sending'}
            style={status === 'sent' ? { background: '#2d9c6e' } : undefined}
          >
            {status === 'sending' ? 'Enviando…' : status === 'sent' ? '¡Mensaje enviado! ✓' : 'Enviar consulta'}
          </button>
          <p className="form__note">Respuesta garantizada en menos de 24 horas.</p>
        </form>
      </div>
    </section>
  )
}
