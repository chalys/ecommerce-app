import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useProducts } from '../context/ProductContext'
import ProtectedRoute from '../components/common/ProtectedRoute'
import Modal from '../components/common/Modal'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'

const Admin = () => {
  const { user } = useAuth()
  const { products, loading, error, addProduct, updateProduct, deleteProduct } = useProducts()
  
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: 'electronics',
    image: 'https://i.pravatar.cc/150?u=fake@pravatar.com'
  })
  
  const [formErrors, setFormErrors] = useState({})
  const [actionLoading, setActionLoading] = useState(false)

  // Cargar datos al editar
  useEffect(() => {
    if (currentProduct) {
      setFormData({
        title: currentProduct.title,
        price: currentProduct.price,
        description: currentProduct.description,
        category: currentProduct.category,
        image: currentProduct.image || 'https://i.pravatar.cc/150?u=fake@pravatar.com'
      })
    } else {
      setFormData({
        title: '',
        price: '',
        description: '',
        category: 'electronics',
        image: 'https://i.pravatar.cc/150?u=fake@pravatar.com'
      })
    }
    setFormErrors({})
  }, [currentProduct])

  const validateForm = () => {
    const errors = {}
    if (!formData.title.trim()) errors.title = 'El nombre es obligatorio'
    if (!formData.price || Number(formData.price) <= 0) errors.price = 'El precio debe ser mayor a 0'
    if (formData.description.length < 10) errors.description = 'La descripción debe tener al menos 10 caracteres'
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setActionLoading(true)
    try {
      const dataToSend = {
        ...formData,
        price: Number(formData.price)
      }

      if (currentProduct) {
        await updateProduct(currentProduct.id, dataToSend)
        toast.success('Producto actualizado correctamente')
      } else {
        await addProduct(dataToSend)
        toast.success('Producto creado correctamente')
      }
      setIsFormOpen(false)
      setCurrentProduct(null)
    } catch (err) {
      toast.error(err.message || 'Error al guardar el producto')
    } finally {
      setActionLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!currentProduct) return
    setActionLoading(true)
    try {
      await deleteProduct(currentProduct.id)
      toast.success('Producto eliminado correctamente')
      setIsDeleteOpen(false)
      setCurrentProduct(null)
    } catch (err) {
      toast.error('Error al eliminar el producto')
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <ProtectedRoute requireAdmin={true}>
      <Helmet>
        <title>Panel de Administración | Mi Tienda</title>
      </Helmet>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
          <button 
            onClick={() => {
              setCurrentProduct(null)
              setIsFormOpen(true)
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Agregar Producto
          </button>
        </div>



        {/* Resumen de Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Productos</h3>
            <p className="text-3xl font-bold text-blue-600">{products.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Usuario</h3>
            <p className="text-xl text-gray-900">{user?.name}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Rol</h3>
            <p className="text-xl text-gray-900 capitalize">{user?.role}</p>
          </div>
        </div>

        {/* Tabla de Productos */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">Gestión de Productos</h2>
          </div>

          {error && (
            <div className="p-4 bg-red-100 text-red-700">
              Error: {error}
            </div>
          )}
          
          {loading ? (
            <div className="p-12 text-center text-gray-500">
              Cargando productos...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-xs" title={product.title}>
                              {product.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => {
                            setCurrentProduct(product)
                            setIsFormOpen(true)
                          }}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => {
                            setCurrentProduct(product)
                            setIsDeleteOpen(true)
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Formulario */}
        <Modal 
          isOpen={isFormOpen} 
          onClose={() => setIsFormOpen(false)}
          title={currentProduct ? "Editar Producto" : "Agregar Nuevo Producto"}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 ${formErrors.title ? 'border-red-500' : ''}`}
              />
              {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Precio</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 ${formErrors.price ? 'border-red-500' : ''}`}
              />
              {formErrors.price && <p className="text-red-500 text-xs mt-1">{formErrors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Categoría</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"
              >
                <option value="electronics">Electronics</option>
                <option value="jewelery">Jewelery</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="3"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 ${formErrors.description ? 'border-red-500' : ''}`}
              />
              {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={actionLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {actionLoading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </form>
        </Modal>

        {/* Modal Eliminación */}
        <Modal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          title="Confirmar Eliminación"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <span className="text-red-600 text-2xl">⚠️</span>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <p className="text-sm text-gray-500">
                  ¿Estás seguro de que quieres eliminar el producto "{currentProduct?.title}"? Esta acción no se puede deshacer.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
              onClick={handleDelete}
              disabled={actionLoading}
            >
              {actionLoading ? 'Eliminando...' : 'Eliminar'}
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => setIsDeleteOpen(false)}
              disabled={actionLoading}
            >
              Cancelar
            </button>
          </div>
        </Modal>
      </div>
    </ProtectedRoute>
  )
}

export default Admin