const API_BASE = "https://fakestoreapi.com";

export const api = {
  getProducts() {
    return fetch(`${API_BASE}/products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar productos");
        }
        return response.json();
      })
      .catch((error) => {
        throw new Error("Error de conexion: " + error.message);
      });
  },

  getProductById(id) {
    return fetch(`${API_BASE}/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Producto no encontrado");
        }
        return response.json();
      })
      .catch((error) => {
        throw new Error(`Error al cargar producto: ` + error.message);
      });
  },

  getProductsByCategory(category) {
    return fetch(`${API_BASE}/products/category/${category}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar categoría");
        }
        return response.json();
      })
      .catch((error) => {
        throw new Error("Error de conexión: " + error.message);
      });
  },

  addProduct(productData) {
    return fetch(`${API_BASE}/products`, {
      method: "POST",
      body: JSON.stringify(productData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al crear producto");
        return response.json();
      })
      .catch((error) => {
        throw new Error("Error de conexión: " + error.message);
      });
  },

  updateProduct(id, productData) {
    return fetch(`${API_BASE}/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al actualizar producto");
        return response.json();
      })
      .catch((error) => {
        throw new Error("Error de conexión: " + error.message);
      });
  },

  deleteProduct(id) {
    return fetch(`${API_BASE}/products/${id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al eliminar producto");
        return response.json();
      })
      .catch((error) => {
        throw new Error("Error de conexión: " + error.message);
      });
  }
};
