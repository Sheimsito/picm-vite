// Endpoints típicos de Django REST Framework
export const ENDPOINTS = {
    // Autenticación (Django REST Auth)
    AUTH: {
      LOGIN: '/auth/login', // Cambiado de /auth/login/ a /auth/login QUITAR LA BARRA FINAL
      LOGOUT: '/auth/logout', // Cambiado de /auth/logout/ a /auth/logout QUITAR LA BARRA FINAL
      REFRESH: '/auth/token/refresh/',
      REGISTER: '/auth/registration/',
      PASSWORD_RESET: '/auth/password-reset',
      PASSWORD_RESET_CONFIRM: '/auth/confirm-reset-password',
      USER: '/auth/user/'
    },
    
    // Productos
    PRODUCTS: {
      GET_PRODUCTS: '/products/get',
      CREATE_PRODUCT: '/products/create',
      GET_ALL_PRODUCTS: '/products/total-stock',
      GET_ALL_VALUE: '/products/total-stock-value',
      GET_CATEGORIES: '/products/get-categories',
      BY_ID: (id) => `/products/get/${id}`,
      UPDATE_PRODUCT: (id) => `/products/update/${id}`,
      DELETE_PRODUCT: (id) => `/products/delete/${id}`,
      SEARCH: '/products/search/'
    },
    
    // Categorías
    CATEGORIES: {
      BASE: '/categories/',
      BY_ID: (id) => `/categories/${id}/`
    },
    
    // Proveedores
    SUPPLIERS: {
      BASE: '/suppliers/',
      BY_ID: (id) => `/suppliers/${id}/`
    },
    
    // Insumos
    SUPPLIES: {
      BASE: '/supplies/',
      BY_ID: (id) => `/supplies/${id}/`
    },
    
    // Movimientos
    MOVEMENTS: {
      BASE: '/movements/',
      BY_ID: (id) => `/movements/${id}/`
    }
  };