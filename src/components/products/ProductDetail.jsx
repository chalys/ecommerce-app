import { useCart } from '../../context/CartContext'

const ProductDetail = ({ product }) => {
  const { addToCart } = useCart()

  if (!product) return null;
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.titlte}
            className="w-full max-w-md object-cover rounded-lg"
          />
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.title}
            </h1>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-4xl font-bold text-green-600">
              ${product.price}
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {product.category}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-yellow-400">★★★★★</span>
            <span className="text-green-600">
              ({product.rating?.count} reviews)
            </span>
          </div>
          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors"
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
