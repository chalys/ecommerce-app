import { createContext, useState, useEffect, useContext } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Cargar usuario desde localStorage al inicializar
  useEffect(() => {
    const savedUser = localStorage.getItem('ecommerce-user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing user from localStorage", error)
        localStorage.removeItem('ecommerce-user')
      }
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulación de login - En una app real harías una petición a tu API
      setTimeout(() => {
        if (email === 'admin@test.com' && password === '123456') {
          const userData = {
            id: 1,
            email: email,
            name: 'Administrador',
            role: 'admin'
          }
          setUser(userData)
          localStorage.setItem('ecommerce-user', JSON.stringify(userData))
          resolve(userData)
        } else if (email === 'user@test.com' && password === '123456') {
          const userData = {
            id: 2,
            email: email,
            name: 'Usuario Regular',
            role: 'user'
          }
          setUser(userData)
          localStorage.setItem('ecommerce-user', JSON.stringify(userData))
          resolve(userData)
        } else {
          reject(new Error('Credenciales incorrectas'))
        }
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('ecommerce-user')
    // Opcional: Limpiar el carrito de invitado al salir si queremos que empiece vacío
    // Pero si el usuario reporta que "corresponde al usuario user@test.com", 
    // es posible que el ID no se esté actualizando o que el localStorage de guest tenga los items del user.
    // Vamos a forzar un clear del estado de auth.
  }

  const register = (userData) => {
    return new Promise((resolve, reject) => {
      // Simulación de registro
      setTimeout(() => {
        const newUser = {
          id: Date.now(),
          ...userData,
          role: 'user'
        }
        setUser(newUser)
        localStorage.setItem('ecommerce-user', JSON.stringify(newUser))
        resolve(newUser)
      }, 1000)
    })
  }

  const isAuthenticated = () => {
    return !!user
  }

  const isAdmin = () => {
    return user?.role === 'admin'
  }

  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated,
    isAdmin,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}