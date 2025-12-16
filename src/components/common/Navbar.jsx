import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaSignInAlt, FaTshirt, FaHome, FaCog } from 'react-icons/fa';

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  color: ${props => props.$active ? '#1d4ed8' : '#4b5563'};
  background-color: ${props => props.$active ? '#dbeafe' : 'transparent'};

  &:hover {
    color: #111827;
    background-color: #f3f4f6;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ef4444;
  color: white;
  font-size: 0.75rem;
  border-radius: 9999px;
  height: 1.25rem;
  width: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Navbar = () => {
  const location = useLocation();
  const { getTotalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <NavContainer>
      <NavLink to="/" $active={isActive('/')}>
        <FaHome /> Inicio
      </NavLink>
      <NavLink to="/fashion" $active={isActive('/fashion')}>
        <FaTshirt /> Moda
      </NavLink>
      
      {isAuthenticated() && user?.role === 'admin' && (
        <NavLink to="/admin" $active={isActive('/admin')}>
          <FaCog /> Admin
        </NavLink>
      )}

      {isAuthenticated() ? (
        <>
          <NavLink to="/profile" $active={isActive('/profile')}>
            <FaUser /> {user?.name}
          </NavLink>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaSignOutAlt /> Cerrar Sesión
          </button>
        </>
      ) : (
        <NavLink to="/login" $active={isActive('/login')}>
          <FaSignInAlt /> Iniciar Sesión
        </NavLink>
      )}
      
      <NavLink to="/cart" $active={isActive('/cart')} style={{ position: 'relative' }}>
        <FaShoppingCart /> Carrito
        {getTotalItems() > 0 && (
          <CartBadge>{getTotalItems()}</CartBadge>
        )}
      </NavLink>
    </NavContainer>
  );
};

export default Navbar;