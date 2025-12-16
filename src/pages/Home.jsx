import ProductList from "../components/products/ProductList";
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Mi Tienda | Inicio</title>
        <meta name="description" content="Bienvenido a la mejor tienda de comercio electrónico. Encuentra productos increíbles a los mejores precios." />
      </Helmet>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Bienvenido a Nuestra Tienda</h1>
        <p className="text-xl text-gray-600">Descubre los mejores productos con precios increibles</p>
      </div>
      <section>
        <h2 className="text-2xl font-bold mb-6"> Todos los productos</h2>
        <ProductList />
      </section>
    </div>
  );
};

export default Home;
