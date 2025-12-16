import { createContext, useState, useEffect, useContext } from 'react'
import { api } from '../utils/api'

const ProductContext = createContext()

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts debe ser usado dentro de un ProductProvider')
  }
  return context
}

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Cargar todos los productos
  const loadProducts = () => {
    setLoading(true)
    setError(null)
    
    api.getProducts()
      .then(data => {
        setProducts(data)
        // Productos destacados (primeros 4)
        setFeaturedProducts(data.slice(0, 4))
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }

  // Cargar productos por categoría
  const loadProductsByCategory = (category) => {
    setLoading(true)
    setError(null)
    
    return api.getProductsByCategory(category)
      .then(data => {
        setLoading(false)
        return data
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
        throw err
      })
  }

  // Cargar producto por ID
  const loadProductById = (id) => {
    setLoading(true)
    setError(null)
    
    return api.getProductById(id)
      .then(data => {
        setLoading(false)
        return data
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
        throw err
      })
  }

  // Cargar categorías
  const loadCategories = () => {
    // En una API real, tendrías un endpoint para categorías
    const hardcodedCategories = [
      "electronics",
      "jewelery", 
      "men's clothing",
      "women's clothing"
    ]
    setCategories(hardcodedCategories)
  }

  // Buscar productos
  const searchProducts = (query) => {
    if (!query) return products
    
    return products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    )
  }

  // Cargar datos iniciales
  useEffect(() => {
    loadProducts()
    loadCategories()
  }, [])

  const value = {
    products,
    featuredProducts,
    categories,
    loading,
    error,
    loadProducts,
    loadProductsByCategory,
    loadProductById,
    searchProducts,
    addProduct: (product) => {
      setLoading(true)
      return api.addProduct(product)
        .then(newProduct => {
          // FakeStoreAPI siempre devuelve id: 21, así que simulamos un ID único para el estado local
          const productWithId = { ...product, id: Date.now(), ...newProduct }
          setProducts(prev => [...prev, productWithId])
          setLoading(false)
          return productWithId
        })
        .catch(err => {
          setError(err.message)
          setLoading(false)
          throw err
        })
    },
    updateProduct: (id, productData) => {
      setLoading(true)
      return api.updateProduct(id, productData)
        .then(updatedData => {
          setProducts(prev => prev.map(p => p.id === id ? { ...p, ...productData } : p))
          setLoading(false)
          return updatedData
        })
        .catch(err => {
          setError(err.message)
          setLoading(false)
          throw err
        })
    },
    deleteProduct: (id) => {
      setLoading(true)
      return api.deleteProduct(id)
        .then(() => {
          setProducts(prev => prev.filter(p => p.id !== id))
          setLoading(false)
        })
        .catch(err => {
          setError(err.message)
          setLoading(false)
          throw err
        })
    }
  }

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}