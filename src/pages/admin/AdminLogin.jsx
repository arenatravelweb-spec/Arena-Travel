import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AdminLogin() {
  const { signIn, session, role } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!session) return
    navigate(role === 'cliente' ? '/cliente' : '/admin', { replace: true })
  }, [session, role, navigate])

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: authError } = await signIn(form.email, form.password)
    setLoading(false)
    if (authError) setError('Credenciales incorrectas. Verifica tu email y contraseña.')
  }

  return (
    <div className="al-wrap">

      {/* ── Panel izquierdo: imagen de marca ── */}
      <div className="al-hero">
        <img
          src="https://i.pinimg.com/736x/52/46/c8/5246c823117c5689f8527064e126de9f.jpg"
          alt=""
          className="al-hero__img"
        />
        <div className="al-hero__overlay" />
        <div className="al-hero__content">
          <div className="al-hero__logo">
            <span style={{ color: 'var(--color-primary)' }}>✦</span>
            Arena Travel
          </div>
          <p className="al-hero__agency">Agencia de viajes</p>
          <div className="al-hero__divider" />
          <p className="al-hero__text">
            Gestiona destinos, paquetes y experiencias desde el panel de administración.
          </p>
        </div>
      </div>

      {/* ── Panel derecho: formulario ── */}
      <div className="al-form-side">
        <div className="al-box">
          <h1 className="al-box__title">Acceso al panel</h1>
          <p className="al-box__sub">Introduce tus credenciales para continuar</p>

          <form onSubmit={handleSubmit} noValidate className="al-form">
            <div className="form__group">
              <label htmlFor="email">Email</label>
              <input
                type="email" id="email" name="email"
                placeholder="admin@nomadaagencia.com"
                value={form.email} onChange={handleChange} required
              />
            </div>
            <div className="form__group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password" id="password" name="password"
                placeholder="••••••••"
                value={form.password} onChange={handleChange} required
              />
            </div>

            {error && <p className="al-error">{error}</p>}

            <button type="submit" className="btn btn--primary btn--full" disabled={loading}>
              {loading ? 'Verificando…' : 'Entrar al panel'}
            </button>
          </form>

          <a href="/" className="al-back">← Volver a la web</a>
        </div>
      </div>

    </div>
  )
}
