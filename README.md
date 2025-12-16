# 🛍️ E-commerce React + Vite

Una aplicación completa de comercio electrónico desarrollada con **React** y **Vite**, incorporando prácticas modernas de desarrollo, gestión de estado global, autenticación simulada y optimización SEO.

## ✨ Características Principales

### 🛒 Gestión de Carrito (Shopping Cart)
- **Persistencia de Datos**: El carrito se guarda automáticamente en `localStorage`.
- **Lógica Inteligente**: Separación estricta entre carritos de "Invitado" y "Usuario Registrado".
- **Funcionalidades**: Agregar productos, actualizar cantidades, eliminar ítems y vaciar carrito.
- **Feedback Visual**: Notificaciones tipo "Toast" para cada acción.

### 🔐 Autenticación y Seguridad
- **Auth Context**: Gestión de sesión de usuario con `localStorage`.
- **Rutas Protegidas**: Componente `ProtectedRoute` para asegurar accesos a:
    - `/cart` (Carrito de compras)
    - `/profile` (Perfil de usuario)
    - `/admin` (Panel de administración - *solo rol admin*)
- **Gestión de Roles**: Distinción entre usuarios normales y administradores.

### ⚙️ Panel de Administración (CRUD)
- **Gestión de Productos**: Interfaz para Crear, Leer, Actualizar y Eliminar productos.
- **Validación de Formularios**: Control de errores en tiempo real antes de enviar datos.
- **Modales Interactivos**: Confirmaciones de eliminación y formularios de edición.

### 🎨 UI/UX Avanzado
- **Styled Components**: Componentes modulares y personalizados (ej. Navbar).
- **React Icons**: Iconografía profesional para una mejor experiencia visual.
- **React Toastify**: Sistema de notificaciones elegante para feedback del usuario.
- **Diseño Responsivo**: Adaptado a móviles y escritorio usando **Tailwind CSS**.

### 🔍 SEO y Accesibilidad
- **React Helmet Async**: Títulos y metadatos dinámicos por página para mejorar el SEO.
- **Error Boundary**: Captura de errores en tiempo de ejecución para evitar pantallas en blanco.

## 🚀 Tecnologías Utilizadas

- **Core**: React 18, Vite
- **Estilos**: Tailwind CSS, Styled Components
- **Navegación**: React Router DOM
- **Estado Global**: Context API (AuthContext, CartContext, ProductContext)
- **Datos**: MockAPI / FakeStoreAPI
- **Utilidades**: React Icons, React Toastify, React Helmet Async

## 📦 Instalación y Ejecución

1.  **Clonar el repositorio**
    ```bash
    git clone https://github.com/chalys/ecommerce-app.git
    cd ecommerce-app
    ```

2.  **Instalar dependencias**
    ```bash
    npm install
    ```
    *Nota: Si encuentras conflictos de dependencias, intenta con `npm install --legacy-peer-deps`.*

3.  **Ejecutar en desarrollo**
    ```bash
    npm run dev
    ```

4.  **Construir para producción**
    ```bash
    npm run build
    ```

## 🏗️ Estructura del Proyecto

```text
src/
├── components/
│   ├── auth/           # Login, Registro
│   ├── cart/           # Cart, CartItem
│   ├── common/         # Navbar, Header, Footer, Modal, ProtectedRoute, Loading
│   └── products/       # ProductList, ProductCard, ProductDetail
├── context/            # AuthContext, CartContext, ProductContext
├── pages/              # Home, Admin, Profile, ProductDetailPage
├── utils/              # API calls, helpers
├── App.jsx             # Configuración de rutas y providers
└── main.jsx            # Punto de entrada (ReactDOM)
```

## 👥 Usuarios de Prueba

Puedes usar cualquier credencial, pero para probar las roles:
- **Admin**: El sistema simula roles. Puedes modificar `AuthContext.jsx` o el `localStorage` para probar el rol `admin`.