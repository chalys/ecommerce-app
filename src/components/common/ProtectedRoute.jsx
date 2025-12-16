import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Loading from './Loading'

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth()

  if (loading) {
    return <Loading />
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  if (requireAdmin && !isAdmin()) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Acceso Denegado</h2>
        <p className="text-gray-600">No tienes permisos para acceder a esta página.</p>
      </div>
    )
  }

  return children
}

export default ProtectedRoute