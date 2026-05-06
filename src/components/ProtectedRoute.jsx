import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, requiredRole }) {
  const { session, role, loading } = useAuth()

  if (loading) return null
  if (!session) return <Navigate to="/admin/login" replace />

  if (requiredRole && role !== requiredRole) {
    const redirect = role === 'cliente' ? '/cliente' : '/admin'
    return <Navigate to={redirect} replace />
  }

  return children
}
