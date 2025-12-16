import ProductList from "../components/products/ProductList"

const Fashion = () => {
  return (
    <div>
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Moda</h1>
            <p className="text-xl text-gray-600">Las últimas tendencias en ropa y accesorios</p>
        </div>
        <section>
            <h2 className="text-2xl font-bold mb-6">Productos de Moda</h2>
            <ProductList category="women's clothing" />
        </section>
    </div>
  )
}

export default Fashion