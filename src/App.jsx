import "./App.css";
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProductProvider } from './context/ProductContext'
import { CartProvider } from './context/CartContext'
import Layout from './components/common/Layout'
import Home from './pages/Home'
import Fashion from './pages/Fashion'
import ProductDetailPage from './pages/ProductDetailPage'
import Cart from './components/cart/Cart'
import Login from './components/auth/Login'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import ProtectedRoute from './components/common/ProtectedRoute'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HelmetProvider } from 'react-helmet-async';

const App = () => {
 return (
    <HelmetProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/fashion" element={<Fashion />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={<Admin />} />
              </Routes>
              <ToastContainer position="bottom-right" autoClose={3000} />
            </Layout>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </HelmetProvider>
  )
};

export default App;
