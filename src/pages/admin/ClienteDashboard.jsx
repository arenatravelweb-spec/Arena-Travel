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
  approved:  { label: 'Aprobado',   color: '#22c55e' },
  pending:   { label: 'Pendiente',  color: '#f59e0b' },
  pendiente: { label: 'Pendiente',  color: '#f59e0b' },
  rejected:  { label: 'Rechazado',  color: '#ef4444' },
}

function fmt(n) {
  return Number(n).toLocaleString('es-AR')
}

export default function ClienteDashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const [tab, setTab]           = useState('compras')
  const [compras, setCompras]   = useState([])
  const [rifaPartic, setRifaPartic] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')

  const fetchCompras = async () => {
    setLoading(true); setError('')
    const { data, error: dbErr } = await supabase
      .from('compras').select('*').order('created_at', { ascending: false })
    if (dbErr) setError(dbErr.message)
    else setCompras(data || [])
    setLoading(false)
  }

  const fetchRifaPartic = async () => {
    setLoading(true); setError('')
    const { data, error: dbErr } = await supabase
      .from('rifa_participaciones')
      .select('*, rifas(titulo, precio_numero, total_numeros)')
      .order('created_at', { ascending: false })
    if (dbErr) setError(dbErr.message)
    else setRifaPartic(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchCompras() }, [])

  useEffect(() => {
    if (tab === 'compras') fetchCompras()
    if (tab === 'rifas')   fetchRifaPartic()
  }, [tab])

  // Realtime — nuevas compras aprobadas
  useEffect(() => {
    const channel = supabase
      .channel('cliente-realtime')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'compras' }, payload => {
        if (payload.new.estado === 'approved') {
          Swal.fire({
            ...swalBase,
            icon: 'success',
            title: '¡Nuevo pago recibido!',
            text:  `${payload.new.nombre} pagó por ${payload.new.producto_nombre}.`,
            timer: 5000,
            timerProgressBar: true,
          })
          if (tab === 'compras') fetchCompras()
        }
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'rifa_participaciones' }, payload => {
        if (payload.new.estado === 'approved') {
          Swal.fire({
            ...swalBase,
            icon: 'success',
            title: '¡Pago de rifa recibido!',
            text:  `${payload.new.nombre} compró ${payload.new.cantidad_numeros} número${payload.new.cantidad_numeros > 1 ? 's' : ''}.`,
            timer: 5000,
            timerProgressBar: true,
          })
          if (tab === 'rifas') fetchRifaPartic()
        }
      })
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [tab])

  const handleSignOut = async () => {
    const result = await Swal.fire({
      ...swalBase,
      title: '¿Cerrás sesión?', text: 'Vas a salir del panel.',
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
          <span className="adm-header__area">Panel de ventas</span>
        </div>
        <div className="adm-header__right">
          <span className="adm-header__email">{user?.email}</span>
          <a href="/" target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--sm">Ver sitio ↗</a>
          <button className="btn btn--ghost btn--sm" onClick={handleSignOut}>Cerrar sesión</button>
        </div>
      </header>

      <main className="adm-main">
        <div className="container">

          {/* Tabs */}
          <div className="adm-tabs">
            <button className={`adm-tab${tab === 'compras' ? ' active' : ''}`} onClick={() => setTab('compras')}>
              Compras
            </button>
            <button className={`adm-tab${tab === 'rifas' ? ' active' : ''}`} onClick={() => setTab('rifas')}>
              Rifas 🎟
            </button>
          </div>

          {/* ── TAB COMPRAS ── */}
          {tab === 'compras' && (
            <>
              <div className="adm-toolbar">
                <div>
                  <h1 className="adm-toolbar__title">Compras de paquetes</h1>
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
                            <td data-label="Cliente" className="adm-table__name">{c.nombre}</td>
                            <td data-label="Email">{c.email}</td>
                            <td data-label="Teléfono">{c.telefono || '—'}</td>
                            <td data-label="Producto">{c.producto_nombre}</td>
                            <td data-label="Precio" className="adm-table__price">$ {fmt(c.precio)}</td>
                            <td data-label="Estado">
                              <span className="adm-badge" style={{ '--badge-color': badge.color }}>
                                {badge.label}
                              </span>
                            </td>
                            <td data-label="Fecha" style={{ fontSize: '.8rem', color: 'var(--color-text-light)' }}>
                              {new Date(c.created_at).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* ── TAB RIFAS ── */}
          {tab === 'rifas' && (
            <>
              <div className="adm-toolbar">
                <div>
                  <h1 className="adm-toolbar__title">Participaciones en rifas</h1>
                  {!loading && (
                    <span className="adm-toolbar__count">
                      {rifaPartic.length} {rifaPartic.length === 1 ? 'participación' : 'participaciones'}
                      {rifaPartic.filter(p => p.estado === 'approved').length > 0 && (
                        <> · <span style={{ color: '#22c55e' }}>
                          {rifaPartic.filter(p => p.estado === 'approved').length} pagadas
                        </span></>
                      )}
                    </span>
                  )}
                </div>
                <button className="btn btn--ghost btn--sm" onClick={fetchRifaPartic}>↻ Actualizar</button>
              </div>

              {loading && <div className="adm-feedback"><div className="adm-spinner" /><span>Cargando…</span></div>}
              {error   && <p className="adm-feedback adm-feedback--error">{error}</p>}

              {!loading && rifaPartic.length === 0 && (
                <div className="adm-empty">
                  <p className="adm-empty__icon">🎟</p>
                  <h3>Sin participaciones todavía</h3>
                  <p>Acá vas a ver los números de rifa comprados por los clientes.</p>
                </div>
              )}

              {!loading && rifaPartic.length > 0 && (
                <div className="adm-table-wrap">
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Cliente</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Rifa</th>
                        <th>Números</th>
                        <th>Total pagado</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rifaPartic.map(p => {
                        const badge = ESTADO_BADGE[p.estado] ?? { label: p.estado, color: '#6b7280' }
                        return (
                          <tr key={p.id}>
                            <td data-label="Cliente" className="adm-table__name">{p.nombre}</td>
                            <td data-label="Email">{p.email}</td>
                            <td data-label="Teléfono">{p.telefono || '—'}</td>
                            <td data-label="Rifa">{p.rifas?.titulo ?? '—'}</td>
                            <td data-label="Números" style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                              {p.cantidad_numeros}
                            </td>
                            <td data-label="Total" className="adm-table__price">
                              $ {fmt(p.monto_total)}
                            </td>
                            <td data-label="Estado">
                              <span className="adm-badge" style={{ '--badge-color': badge.color }}>
                                {badge.label}
                              </span>
                            </td>
                            <td data-label="Fecha" style={{ fontSize: '.8rem', color: 'var(--color-text-light)' }}>
                              {new Date(p.created_at).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

        </div>
      </main>
    </div>
  )
}
