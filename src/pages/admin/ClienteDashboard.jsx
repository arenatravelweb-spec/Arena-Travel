import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

const swalBase = {
  confirmButtonColor: '#F7931E',
  cancelButtonColor:  '#6B6B6B',
  background:         '#FFFDF8',
  color:              '#1A1A1A',
  customClass: {
    confirmButton: 'swal-btn-confirm',
    cancelButton:  'swal-btn-cancel',
    popup:         'swal-popup-arena',
  },
}

const ESTADO_BADGE = {
  approved: { label: 'Aprobado',  color: '#22c55e' },
  pending:  { label: 'Pendiente', color: '#f59e0b' },
  rejected: { label: 'Rechazado', color: '#ef4444' },
}

export default function ClienteDashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [compras, setCompras]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')

  const fetchCompras = async () => {
    setLoading(true)
    const { data, error: dbErr } = await supabase
      .from('compras').select('*').order('created_at', { ascending: false })
    if (dbErr) setError(dbErr.message)
    else setCompras(data)
    setLoading(false)
  }

  useEffect(() => { fetchCompras() }, [])

  useEffect(() => {
    const channel = supabase
      .channel('compras-cliente-realtime')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'compras' }, payload => {
        if (payload.new.estado === 'approved') {
          Swal.fire({
            ...swalBase,
            icon:  'success',
            title: '¡Nuevo pago recibido!',
            text:  `${payload.new.nombre} pagó por ${payload.new.producto_nombre}.`,
            timer: 5000,
            timerProgressBar: true,
          })
          fetchCompras()
        }
      })
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [])

  const handleSignOut = async () => {
    const result = await Swal.fire({
      ...swalBase,
      title: '¿Cerrás sesión?', text: 'Vas a salir del panel de compras.',
      icon: 'question', showCancelButton: true,
      confirmButtonText: 'Sí, salir', cancelButtonText: 'Cancelar',
    })
    if (!result.isConfirmed) return
    await signOut(); navigate('/admin/login')
  }

  return (
    <div className="adm-layout">

      <header className="adm-header">
        <div className="adm-header__left">
          <a href="/" className="adm-header__logo">
            <span className="nav__logo-icon">✦</span> Arena Travel
          </a>
          <span className="adm-header__sep" aria-hidden="true">·</span>
          <span className="adm-header__area">Panel de compras</span>
        </div>
        <div className="adm-header__right">
          <span className="adm-header__email">{user?.email}</span>
          <a href="/" target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--sm">Ver sitio ↗</a>
          <button className="btn btn--ghost btn--sm" onClick={handleSignOut}>Cerrar sesión</button>
        </div>
      </header>

      <main className="adm-main">
        <div className="container">

          <div className="adm-toolbar">
            <div>
              <h1 className="adm-toolbar__title">Compras</h1>
              {!loading && <span className="adm-toolbar__count">{compras.length} {compras.length === 1 ? 'compra' : 'compras'}</span>}
            </div>
            <button className="btn btn--ghost btn--sm" onClick={fetchCompras}>↻ Actualizar</button>
          </div>

          {loading && <div className="adm-feedback"><div className="adm-spinner" /><span>Cargando…</span></div>}
          {error   && <p className="adm-feedback adm-feedback--error">{error}</p>}

          {!loading && compras.length === 0 && (
            <div className="adm-empty">
              <p className="adm-empty__icon">💳</p>
              <h3>Sin compras todavía</h3>
              <p>Acá vas a ver los pagos realizados por los clientes.</p>
            </div>
          )}

          {!loading && compras.length > 0 && (
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {compras.map(c => {
                    const badge = ESTADO_BADGE[c.estado] ?? { label: c.estado, color: '#6b7280' }
                    return (
                      <tr key={c.id}>
                        <td className="adm-table__name">{c.nombre}</td>
                        <td>{c.email}</td>
                        <td>{c.telefono || '—'}</td>
                        <td>{c.producto_nombre}</td>
                        <td className="adm-table__price">$ {Number(c.precio).toLocaleString('es-AR')}</td>
                        <td>
                          <span className="adm-badge" style={{ '--badge-color': badge.color }}>
                            {badge.label}
                          </span>
                        </td>
                        <td style={{ fontSize: '.8rem', color: 'var(--color-text-light)' }}>
                          {new Date(c.created_at).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
