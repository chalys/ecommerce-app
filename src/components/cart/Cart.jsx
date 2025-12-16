import { useCart } from '../../context/CartContext'
import CartItem from './CartItem'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { cart, getTotalPrice, clearCart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h2>
        <p className="text-gray-600 mb-8">¡Agrega algunos productos para empezar!</p>
        <Link 
          to="/" 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Ver Productos
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-4 border-b bg-gray-50 font-semibold grid grid-cols-4 gap-4">
          <div className="col-span-2">Producto</div>
          <div className="text-center">Cantidad</div>
          <div className="text-right">Subtotal</div>
        </div>
        
        <div className="divide-y">
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50 p-6 rounded-lg">
        <button 
          onClick={clearCart}
          className="text-red-600 hover:text-red-800 font-medium"
        >
          Vaciar Carrito
        </button>
        
        <div className="text-right">
          <p className="text-gray-600 mb-1">Total:</p>
          <p className="text-3xl font-bold text-gray-900">${getTotalPrice().toFixed(2)}</p>
          <button className="mt-4 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition w-full md:w-auto font-bold shadow-lg">
            Proceder al Pago
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
