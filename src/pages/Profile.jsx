import { useAuth } from '../context/AuthContext'
import ProtectedRoute from '../components/common/ProtectedRoute'

const Profile = () => {
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Mi Perfil</h1>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <p className="mt-1 text-lg text-gray-900">{user?.name}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-lg text-gray-900">{user?.email}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Rol</label>
              <p className="mt-1 text-lg text-gray-900 capitalize">{user?.role}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">ID de Usuario</label>
              <p className="mt-1 text-lg text-gray-900">{user?.id}</p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Profile