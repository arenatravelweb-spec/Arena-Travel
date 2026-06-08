import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import ProductForm from './ProductForm'
import RifaForm from './RifaForm'

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

export default function AdminDashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const [tab, setTab]           = useState('productos')
  const [products, setProducts] = useState([])
  const [compras, setCompras]   = useState([])
  const [rifas, setRifas]       = useState([])
  const [rifaPartic, setRifaPartic] = useState([])
  const [rifaDetalle, setRifaDetalle] = useState(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')
  const [mode, setMode]         = useState('list')
  const [editing, setEditing]   = useState(null)

  const fetchProducts = async () => {
    setLoading(true); setError('')
    const { data, error: dbErr } = await supabase
      .from('productos').select('*').order('created_at', { ascending: false })
    if (dbErr) setError(dbErr.message)
    else setProducts(data)
    setLoading(false)
  }

  const fetchCompras = async () => {
    setLoading(true)
    const { data, error: dbErr } = await supabase
      .from('compras').select('*').order('created_at', { ascending: false })
    if (dbErr) setError(dbErr.message)
    else setCompras(data)
    setLoading(false)
  }

  const fetchRifas = async () => {
    setLoading(true); setError('')
    const { data, error: dbErr } = await supabase
      .from('rifas').select('*').order('created_at', { ascending: false })
    if (dbErr) setError(dbErr.message)
    else setRifas(data || [])
    setLoading(false)
  }

  const fetchRifaPartic = async (rifaId) => {
    const { data } = await supabase
      .from('rifa_participaciones')
      .select('*')
      .eq('rifa_id', rifaId)
      .order('created_at', { ascending: false })
    setRifaPartic(data || [])
  }

  useEffect(() => { fetchProducts() }, [])

  useEffect(() => {
    if (tab === 'compras')   fetchCompras()
    if (tab === 'productos') fetchProducts()
    if (tab === 'rifas')     { fetchRifas(); setMode('list'); setRifaDetalle(null) }
  }, [tab])

  // Realtime: notificar nuevas compras aprobadas
  useEffect(() => {
    const channel = supabase
      .channel('compras-realtime')
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
          if (tab === 'compras') fetchCompras()
        }
      })
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [tab])

  const handleSignOut = async () => {
    const result = await Swal.fire({
      ...swalBase,
      title: '¿Cerrás sesión?', text: 'Vas a salir del panel de administración.',
      icon: 'question', showCancelButton: true,
      confirmButtonText: 'Sí, salir', cancelButtonText: 'Cancelar',
    })
    if (!result.isConfirmed) return
    await signOut(); navigate('/admin/login')
  }

  const handleSave = async (productData) => {
    if (mode === 'edit') {
      const { error: dbErr } = await supabase.from('productos').update(productData).eq('id', editing.id)
      if (dbErr) { Swal.fire({ ...swalBase, icon: 'error', title: 'Error', text: dbErr.message }); return }
      await Swal.fire({ ...swalBase, icon: 'success', title: '¡Producto actualizado!', text: `"${productData.nombre}" fue guardado correctamente.`, confirmButtonText: 'Aceptar', timer: 2500, timerProgressBar: true })
    } else {
      const { error: dbErr } = await supabase.from('productos').insert([productData])
      if (dbErr) { Swal.fire({ ...swalBase, icon: 'error', title: 'Error', text: dbErr.message }); return }
      await Swal.fire({ ...swalBase, icon: 'success', title: '¡Producto creado!', text: `"${productData.nombre}" fue agregado al catálogo.`, confirmButtonText: 'Aceptar', timer: 2500, timerProgressBar: true })
    }
    setMode('list'); setEditing(null); fetchProducts()
  }

  const handleEdit   = (p) => { setEditing(p); setMode('edit') }
  const handleCancel = ()  => { setMode('list'); setEditing(null) }

  const handleDelete = async (p) => {
    const result = await Swal.fire({
      ...swalBase, title: `¿Eliminás "${p.nombre}"?`, text: 'Esta acción no se puede deshacer.',
      icon: 'warning', showCancelButton: true, confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar', confirmButtonColor: '#e53e3e',
    })
    if (!result.isConfirmed) return
    const { error: dbErr } = await supabase.from('productos').delete().eq('id', p.id)
    if (dbErr) { Swal.fire({ ...swalBase, icon: 'error', title: 'Error', text: dbErr.message }); return }
    fetchProducts()
  }

  // ── Rifas handlers ──
  const handleRifaSave = async (rifaData) => {
    if (mode === 'edit') {
      const { error: dbErr } = await supabase.from('rifas').update(rifaData).eq('id', editing.id)
      if (dbErr) { Swal.fire({ ...swalBase, icon: 'error', title: 'Error', text: dbErr.message }); return }
      await Swal.fire({ ...swalBase, icon: 'success', title: '¡Rifa actualizada!', timer: 2000, timerProgressBar: true })
    } else {
      const { error: dbErr } = await supabase.from('rifas').insert([{ ...rifaData, numeros_vendidos: 0 }])
      if (dbErr) { Swal.fire({ ...swalBase, icon: 'error', title: 'Error', text: dbErr.message }); return }
      await Swal.fire({ ...swalBase, icon: 'success', title: '¡Rifa creada!', timer: 2000, timerProgressBar: true })
    }
    setMode('list'); setEditing(null); fetchRifas()
  }

  const handleRifaDelete = async (r) => {
    const result = await Swal.fire({
      ...swalBase, title: `¿Eliminás "${r.titulo}"?`, text: 'Se eliminarán también todas las participaciones.',
      icon: 'warning', showCancelButton: true, confirmButtonText: 'Sí, eliminar',
      cancelButtonColor: '#e53e3e',
    })
    if (!result.isConfirmed) return
    const { error: dbErr } = await supabase.from('rifas').delete().eq('id', r.id)
    if (dbErr) { Swal.fire({ ...swalBase, icon: 'error', title: 'Error', text: dbErr.message }); return }
    fetchRifas()
  }

  const handleVerPartic = async (r) => {
    setRifaDetalle(r)
    await fetchRifaPartic(r.id)
  }

  return (
    <div className="adm-layout">

      <header className="adm-header">
        <div className="adm-header__left">
          <a href="/" className="adm-header__logo">
            <span className="nav__logo-icon">✦</span> Arena Travel
          </a>
          <span className="adm-header__sep" aria-hidden="true">·</span>
          <span className="adm-header__area">Administración</span>
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
            <button className={`adm-tab${tab === 'productos' ? ' active' : ''}`} onClick={() => { setTab('productos'); setMode('list') }}>Productos</button>
            <button className={`adm-tab${tab === 'compras'   ? ' active' : ''}`} onClick={() => setTab('compras')}>Compras</button>
            <button className={`adm-tab${tab === 'rifas'     ? ' active' : ''}`} onClick={() => setTab('rifas')}>Rifas 🎟</button>
          </div>

          {/* ── TAB PRODUCTOS ── */}
          {tab === 'productos' && (
            <>
              {mode === 'list' && (
                <>
                  <div className="adm-toolbar">
                    <div>
                      <h1 className="adm-toolbar__title">Productos</h1>
                      {!loading && <span className="adm-toolbar__count">{products.length} {products.length === 1 ? 'producto' : 'productos'}</span>}
                    </div>
                    <button className="btn btn--primary" onClick={() => setMode('create')}>+ Nuevo producto</button>
                  </div>

                  {loading && <div className="adm-feedback"><div className="adm-spinner" /><span>Cargando…</span></div>}
                  {error   && <p className="adm-feedback adm-feedback--error">{error}</p>}

                  {!loading && products.length === 0 && (
                    <div className="adm-empty">
                      <p className="adm-empty__icon">🗺</p>
                      <h3>Sin productos todavía</h3>
                      <p>Crea el primero para que aparezca en la web.</p>
                      <button className="btn btn--primary" onClick={() => setMode('create')}>+ Crear producto</button>
                    </div>
                  )}

                  {!loading && products.length > 0 && (
                    <div className="adm-table-wrap">
                      <table className="adm-table">
                        <thead><tr><th>Imagen</th><th>Nombre</th><th>Precio</th><th>Descripción</th><th>Acciones</th></tr></thead>
                        <tbody>
                          {products.map(p => (
                            <tr key={p.id}>
                              <td data-label="Imagen">{p.imagen_url ? <img src={p.imagen_url} alt={p.nombre} className="adm-table__thumb" /> : <div className="adm-table__no-img">sin img</div>}</td>
                              <td data-label="Nombre" className="adm-table__name">{p.nombre}</td>
                              <td data-label="Precio" className="adm-table__price">$ {Number(p.precio).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</td>
                              <td data-label="Descripción" className="adm-table__desc">{p.descripcion ? p.descripcion.slice(0, 72) + (p.descripcion.length > 72 ? '…' : '') : <span style={{ color: 'var(--color-text-light)', fontStyle: 'italic' }}>—</span>}</td>
                              <td data-label="Acciones">
                                <div className="adm-table__actions">
                                  <button className="btn btn--outline btn--sm" onClick={() => handleEdit(p)}>Editar</button>
                                  <button className="btn btn--danger btn--sm"  onClick={() => handleDelete(p)}>Eliminar</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}

              {(mode === 'create' || mode === 'edit') && (
                <div className="adm-form-wrap">
                  <h1 className="adm-toolbar__title" style={{ marginBottom: '1.75rem' }}>
                    {mode === 'create' ? 'Nuevo producto' : 'Editar producto'}
                  </h1>
                  <ProductForm initial={editing} onSave={handleSave} onCancel={handleCancel} />
                </div>
              )}
            </>
          )}

          {/* ── TAB COMPRAS ── */}
          {tab === 'compras' && (
            <>
              <div className="adm-toolbar">
                <div>
                  <h1 className="adm-toolbar__title">Compras</h1>
                  {!loading && <span className="adm-toolbar__count">{compras.length} {compras.length === 1 ? 'compra' : 'compras'}</span>}
                </div>
                <button className="btn btn--ghost btn--sm" onClick={fetchCompras}>↻ Actualizar</button>
              </div>

              {loading && <div className="adm-feedback"><div className="adm-spinner" /><span>Cargando…</span></div>}

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
                    <thead><tr><th>Cliente</th><th>Email</th><th>Teléfono</th><th>Producto</th><th>Precio</th><th>Estado</th><th>Fecha</th></tr></thead>
                    <tbody>
                      {compras.map(c => {
                        const badge = ESTADO_BADGE[c.estado] ?? { label: c.estado, color: '#6b7280' }
                        return (
                          <tr key={c.id}>
                            <td data-label="Cliente" className="adm-table__name">{c.nombre}</td>
                            <td data-label="Email">{c.email}</td>
                            <td data-label="Teléfono">{c.telefono || '—'}</td>
                            <td data-label="Producto">{c.producto_nombre}</td>
                            <td data-label="Precio" className="adm-table__price">$ {Number(c.precio).toLocaleString('es-AR')}</td>
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
              {/* Detalle de participaciones */}
              {rifaDetalle && mode === 'list' && (
                <>
                  <div className="adm-toolbar">
                    <div>
                      <button className="btn btn--ghost btn--sm" onClick={() => setRifaDetalle(null)} style={{ marginBottom: '.5rem' }}>← Volver</button>
                      <h1 className="adm-toolbar__title">Participaciones — {rifaDetalle.titulo}</h1>
                      <span className="adm-toolbar__count">{rifaPartic.length} participaciones · {rifaDetalle.numeros_vendidos}/{rifaDetalle.total_numeros} números</span>
                    </div>
                    <button className="btn btn--ghost btn--sm" onClick={() => fetchRifaPartic(rifaDetalle.id)}>↻ Actualizar</button>
                  </div>

                  {rifaPartic.length === 0 ? (
                    <div className="adm-empty">
                      <p className="adm-empty__icon">🎟</p>
                      <h3>Sin participaciones todavía</h3>
                    </div>
                  ) : (
                    <div className="adm-table-wrap">
                      <table className="adm-table">
                        <thead><tr><th>Nombre</th><th>Email</th><th>Teléfono</th><th>Números</th><th>Total</th><th>Estado</th><th>Fecha</th></tr></thead>
                        <tbody>
                          {rifaPartic.map(p => {
                            const badge = ESTADO_BADGE[p.estado] ?? { label: p.estado, color: '#6b7280' }
                            return (
                              <tr key={p.id}>
                                <td data-label="Nombre" className="adm-table__name">{p.nombre}</td>
                                <td data-label="Email">{p.email}</td>
                                <td data-label="Teléfono">{p.telefono || '—'}</td>
                                <td data-label="Números">{p.cantidad_numeros}</td>
                                <td data-label="Total" className="adm-table__price">$ {Number(p.monto_total).toLocaleString('es-AR')}</td>
                                <td data-label="Estado">
                                  <span className="adm-badge" style={{ '--badge-color': badge.color }}>{badge.label}</span>
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

              {/* Lista de rifas */}
              {!rifaDetalle && mode === 'list' && (
                <>
                  <div className="adm-toolbar">
                    <div>
                      <h1 className="adm-toolbar__title">Rifas</h1>
                      {!loading && <span className="adm-toolbar__count">{rifas.length} {rifas.length === 1 ? 'rifa' : 'rifas'}</span>}
                    </div>
                    <button className="btn btn--primary" onClick={() => setMode('create')}>+ Nueva rifa</button>
                  </div>

                  {loading && <div className="adm-feedback"><div className="adm-spinner" /><span>Cargando…</span></div>}
                  {error   && <p className="adm-feedback adm-feedback--error">{error}</p>}

                  {!loading && rifas.length === 0 && (
                    <div className="adm-empty">
                      <p className="adm-empty__icon">🎟</p>
                      <h3>Sin rifas todavía</h3>
                      <p>Creá la primera para que aparezca en el sitio.</p>
                      <button className="btn btn--primary" onClick={() => setMode('create')}>+ Crear rifa</button>
                    </div>
                  )}

                  {!loading && rifas.length > 0 && (
                    <div className="adm-table-wrap">
                      <table className="adm-table">
                        <thead><tr><th>Título</th><th>Precio/nro</th><th>Vendidos</th><th>Total</th><th>Estado</th><th>Acciones</th></tr></thead>
                        <tbody>
                          {rifas.map(r => (
                            <tr key={r.id}>
                              <td data-label="Título" className="adm-table__name">{r.titulo}</td>
                              <td data-label="Precio">$ {Number(r.precio_numero).toLocaleString('es-AR')}</td>
                              <td data-label="Vendidos">{r.numeros_vendidos}</td>
                              <td data-label="Total">{r.total_numeros}</td>
                              <td data-label="Estado">
                                <span className="adm-badge" style={{ '--badge-color': r.activa ? '#22c55e' : '#6b7280' }}>
                                  {r.activa ? 'Activa' : 'Inactiva'}
                                </span>
                              </td>
                              <td data-label="Acciones">
                                <div className="adm-table__actions">
                                  <button className="btn btn--ghost btn--sm" onClick={() => handleVerPartic(r)}>Participaciones</button>
                                  <button className="btn btn--outline btn--sm" onClick={() => { setEditing(r); setMode('edit') }}>Editar</button>
                                  <button className="btn btn--danger btn--sm"  onClick={() => handleRifaDelete(r)}>Eliminar</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}

              {(mode === 'create' || mode === 'edit') && (
                <div className="adm-form-wrap">
                  <h1 className="adm-toolbar__title" style={{ marginBottom: '1.75rem' }}>
                    {mode === 'create' ? 'Nueva rifa' : 'Editar rifa'}
                  </h1>
                  <RifaForm
                    initial={editing}
                    onSave={handleRifaSave}
                    onCancel={() => { setMode('list'); setEditing(null) }}
                  />
                </div>
              )}
            </>
          )}

        </div>
      </main>
    </div>
  )
}
