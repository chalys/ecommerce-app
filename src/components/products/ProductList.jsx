import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import Loading from '../common/Loading'
import { useProducts } from '../../context/ProductContext'

const ProductList = ({ category = null }) => {
  const [localProducts, setLocalProducts] = useState([])
  const [localLoading, setLocalLoading] = useState(false)
  const [localError, setLocalError] = useState(null)
  
  const { products, loading, error, loadProductsByCategory } = useProducts()

  useEffect(() => {
    if (category) {
      setLocalLoading(true)
      setLocalError(null)
      
      loadProductsByCategory(category)
        .then(data => {
          setLocalProducts(data)
        })
        .catch(err => {
          setLocalError(err.message)
        })
        .finally(() => {
          setLocalLoading(false)
        })
    } else {
      setLocalProducts(products)
    }
  }, [category, products, loadProductsByCategory])

  const displayProducts = category ? localProducts : products
  const displayLoading = category ? localLoading : loading
  const displayError = category ? localError : error

  if (displayLoading) return <Loading />
  if (displayError) return <div className="text-red-500 text-center py-8">{displayError}</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {displayProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList