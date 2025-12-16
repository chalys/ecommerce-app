import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../utils/api";
import Loading from "../components/common/Loading";
import ProductDetail from "../components/products/ProductDetail"
import { Helmet } from 'react-helmet-async';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = () => {
      if (!id) return;
      setLoading(true);
      setError(null);

      api
        .getProductById(id)
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;
  if (!product)
    return <div className="text-cemter py-8"> Producto no encontrado</div>;

  return (
    <>
      <Helmet>
        <title>{product.title} | Mi Tienda</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <ProductDetail product={product} />
    </>
  );
};
export default ProductDetailPage;
