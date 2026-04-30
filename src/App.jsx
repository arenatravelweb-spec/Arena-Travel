import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'

function ScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    const observe = () => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el))
    }

    observe()

    const mutObs = new MutationObserver(observe)
    mutObs.observe(document.body, { childList: true, subtree: true })

    return () => {
      obs.disconnect()
      mutObs.disconnect()
    }
  }, [])

  return null
}

function PagoToast() {
  const [params, setParams] = useSearchParams()

  useEffect(() => {
    const pago       = params.get('pago')
    const paymentId  = params.get('payment_id')
    if (!pago) return

    if (pago === 'exitoso') {
      toast.success('¡Pago realizado con éxito! Te contactaremos pronto.', { duration: 6000 })
      if (paymentId) {
        fetch('/api/verificar-pago', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ payment_id: paymentId }),
        }).catch(() => {})
      }
    }
    if (pago === 'fallido')   toast.error('Hubo un problema con el pago. Intentá de nuevo.', { duration: 6000 })
    if (pago === 'pendiente') toast.info('Tu pago está siendo procesado. Te avisaremos cuando se confirme.', { duration: 6000 })

    params.delete('pago')
    params.delete('payment_id')
    params.delete('status')
    params.delete('merchant_order_id')
    setParams(params, { replace: true })
  }, [])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollReveal />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              fontFamily: 'Inter, sans-serif',
              borderRadius: '12px',
              fontSize: '0.95rem',
            },
            success: { style: { background: '#F7931E', color: '#fff' } },
          }}
        />
        <Routes>
          <Route path="/" element={<><PagoToast /><Home /></>} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
