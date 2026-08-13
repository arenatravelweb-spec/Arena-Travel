import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, requiredRole }) {
  const { session, role, loading } = useAuth()

  if (loading) return null
  if (!session) return <Navigate to="/admin/login" replace />

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return children
}
