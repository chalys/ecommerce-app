import { useCart } from '../../context/CartContext'

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-4">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-16 h-16 object-contain" 
        />
        <div>
          <h3 className="font-semibold text-gray-800">{item.title}</h3>
          <p className="text-gray-600">${item.price}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center border rounded-lg">
          <button 
            className="px-3 py-1 hover:bg-gray-100"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            -
          </button>
          <span className="px-3 py-1 border-x">{item.quantity}</span>
          <button 
            className="px-3 py-1 hover:bg-gray-100"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
        
        <button 
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700"
          aria-label="Eliminar"
        >
          🗑️
        </button>
      </div>
      
      <div className="font-bold text-lg">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  )
}

export default CartItem
