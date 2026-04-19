import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import ProductForm from './ProductForm'

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

export default function AdminDashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [mode, setMode] = useState('list')
  const [editing, setEditing] = useState(null)

  const fetchProducts = async () => {
    setLoading(true)
    setError('')
    const { data, error: dbErr } = await supabase
      .from('productos')
      .select('*')
      .order('created_at', { ascending: false })
    if (dbErr) setError(dbErr.message)
    else setProducts(data)
    setLoading(false)
  }

  useEffect(() => { fetchProducts() }, [])

  const handleSignOut = async () => {
    const result = await Swal.fire({
      ...swalBase,
      title:              '¿Cerrás sesión?',
      text:               'Vas a salir del panel de administración.',
      icon:               'question',
      showCancelButton:   true,
      confirmButtonText:  'Sí, salir',
      cancelButtonText:   'Cancelar',
    })
    if (!result.isConfirmed) return
    await signOut()
    navigate('/admin/login')
  }

  const handleSave = async (productData) => {
    if (mode === 'edit') {
      const { error: dbErr } = await supabase
        .from('productos').update(productData).eq('id', editing.id)
      if (dbErr) {
        Swal.fire({ ...swalBase, icon: 'error', title: 'Error', text: dbErr.message })
        return
      }
      await Swal.fire({
        ...swalBase,
        icon:              'success',
        title:             '¡Producto actualizado!',
        text:              `"${productData.nombre}" fue guardado correctamente.`,
        confirmButtonText: 'Aceptar',
        timer:             2500,
        timerProgressBar:  true,
      })
    } else {
      const { error: dbErr } = await supabase
        .from('productos').insert([productData])
      if (dbErr) {
        Swal.fire({ ...swalBase, icon: 'error', title: 'Error', text: dbErr.message })
        return
      }
      await Swal.fire({
        ...swalBase,
        icon:              'success',
        title:             '¡Producto creado!',
        text:              `"${productData.nombre}" fue agregado al catálogo.`,
        confirmButtonText: 'Aceptar',
        timer:             2500,
        timerProgressBar:  true,
      })
    }
    setMode('list')
    setEditing(null)
    fetchProducts()
  }

  const handleEdit = (p) => { setEditing(p); setMode('edit') }
  const handleCancel = () => { setMode('list'); setEditing(null) }

  const handleDelete = async (p) => {
    const result = await Swal.fire({
      ...swalBase,
      title:              `¿Eliminás "${p.nombre}"?`,
      text:               'Esta acción no se puede deshacer.',
      icon:               'warning',
      showCancelButton:   true,
      confirmButtonText:  'Sí, eliminar',
      cancelButtonText:   'Cancelar',
      confirmButtonColor: '#e53e3e',
    })
    if (!result.isConfirmed) return
    const { error: dbErr } = await supabase.from('productos').delete().eq('id', p.id)
    if (dbErr) {
      Swal.fire({ ...swalBase, icon: 'error', title: 'Error', text: dbErr.message })
      return
    }
    fetchProducts()
  }

  return (
    <div className="adm-layout">

      {/* ── Header ── */}
      <header className="adm-header">
        <div className="adm-header__left">
          <a href="/" className="adm-header__logo">
            <span className="nav__logo-icon">✦</span>
            Arena Travel
          </a>
          <span className="adm-header__sep" aria-hidden="true">·</span>
          <span className="adm-header__area">Administración</span>
        </div>
        <div className="adm-header__right">
          <span className="adm-header__email">{user?.email}</span>
          <a href="/" target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--sm">
            Ver sitio ↗
          </a>
          <button className="btn btn--ghost btn--sm" onClick={handleSignOut}>
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="adm-main">
        <div className="container">

          {/* Breadcrumb */}
          <p className="adm-breadcrumb">
            {mode === 'list'
              ? 'Productos'
              : mode === 'create'
              ? 'Productos · Nuevo'
              : 'Productos · Editar'}
          </p>

          {/* ── VISTA: lista ── */}
          {mode === 'list' && (
            <>
              <div className="adm-toolbar">
                <div>
                  <h1 className="adm-toolbar__title">Productos</h1>
                  {!loading && (
                    <span className="adm-toolbar__count">
                      {products.length} {products.length === 1 ? 'producto' : 'productos'}
                    </span>
                  )}
                </div>
                <button className="btn btn--primary" onClick={() => setMode('create')}>
                  + Nuevo producto
                </button>
              </div>

              {loading && (
                <div className="adm-feedback">
                  <div className="adm-spinner" />
                  <span>Cargando productos…</span>
                </div>
              )}
              {error && <p className="adm-feedback adm-feedback--error">{error}</p>}

              {!loading && !error && products.length === 0 && (
                <div className="adm-empty">
                  <p className="adm-empty__icon">🗺</p>
                  <h3>Sin productos todavía</h3>
                  <p>Crea el primero para que aparezca en la web.</p>
                  <button className="btn btn--primary" onClick={() => setMode('create')}>
                    + Crear producto
                  </button>
                </div>
              )}

              {!loading && products.length > 0 && (
                <div className="adm-table-wrap">
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p.id}>
                          <td>
                            {p.imagen_url
                              ? <img src={p.imagen_url} alt={p.nombre} className="adm-table__thumb" />
                              : <div className="adm-table__no-img">sin img</div>
                            }
                          </td>
                          <td className="adm-table__name">{p.nombre}</td>
                          <td className="adm-table__price">€ {Number(p.precio).toFixed(2)}</td>
                          <td className="adm-table__desc">
                            {p.descripcion
                              ? p.descripcion.slice(0, 72) + (p.descripcion.length > 72 ? '…' : '')
                              : <span style={{ color: 'var(--color-text-light)', fontStyle: 'italic' }}>—</span>}
                          </td>
                          <td>
                            <div className="adm-table__actions">
                              <button className="btn btn--outline btn--sm" onClick={() => handleEdit(p)}>
                                Editar
                              </button>
                              <button className="btn btn--danger btn--sm" onClick={() => handleDelete(p)}>
                                Eliminar
                              </button>
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

          {/* ── VISTA: formulario ── */}
          {(mode === 'create' || mode === 'edit') && (
            <div className="adm-form-wrap">
              <h1 className="adm-toolbar__title" style={{ marginBottom: '1.75rem' }}>
                {mode === 'create' ? 'Nuevo producto' : 'Editar producto'}
              </h1>
              <ProductForm initial={editing} onSave={handleSave} onCancel={handleCancel} />
            </div>
          )}

        </div>
      </main>

    </div>
  )
}
