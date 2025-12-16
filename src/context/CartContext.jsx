import { createContext, useState, useEffect, useContext } from 'react'
import { useAuth } from './AuthContext'
import { toast } from 'react-toastify'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const { user } = useAuth()

  // Cargar carrito desde localStorage al inicializar
  useEffect(() => {
    // Si no hay usuario, usamos la key 'guest'. 
    // IMPORTANTE: user.id debe estar presente. Si el objeto usuario existe pero no tiene ID, podría haber conflictos.
    const cartKey = (user && user.id) ? `ecommerce-cart-${user.id}` : 'ecommerce-cart-guest'
    
    // Al cambiar de usuario (o logout), primero limpiamos el estado del carrito para no mostrar datos antiguos mientras carga
    // setCart([]) // Comentado porque causa parpadeo, pero el else de abajo maneja el caso vacío.

    const savedCart = localStorage.getItem(cartKey)
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error parsing cart from localStorage", error)
        localStorage.removeItem(cartKey)
        setCart([])
      }
    } else {
      setCart([])
    }
  }, [user])

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    const cartKey = user ? `ecommerce-cart-${user.id}` : 'ecommerce-cart-guest'
    localStorage.setItem(cartKey, JSON.stringify(cart))
  }, [cart, user])

  const addToCart = (product) => {
    // Verificamos si ya existe para mostrar el mensaje correcto
    // Nota: Esto lee del estado actual 'cart'
    const existingItem = cart.find(item => item.id === product.id)

    if (existingItem) {
        toast.info(`Cantidad actualizada: ${product.title}`)
        setCart(prevCart => prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ))
    } else {
        toast.success(`Producto agregado: ${product.title}`)
        setCart(prevCart => [...prevCart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
    toast.error("Producto eliminado del carrito")
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
    toast.info("Carrito vaciado")
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const isInCart = (productId) => {
    return cart.some(item => item.id === productId)
  }

  const getItemQuantity = (productId) => {
    const item = cart.find(item => item.id === productId)
    return item ? item.quantity : 0
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isInCart,
    getItemQuantity
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}