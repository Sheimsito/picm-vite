
export const ENDPOINTS = {

    AUTH: {
      LOGIN: '/auth/login', 
      LOGOUT: '/auth/logout', 
      REFRESH: '/auth/token/refresh/',
      REGISTER: '/auth/registration/',
      PASSWORD_RESET: '/auth/password-reset',
      PASSWORD_RESET_CONFIRM: '/auth/confirm-reset-password',
      USER: '/auth/user/'
    },
 
    PRODUCTS: {
      // PRODUCTS ENDPOINTS
      GET_PRODUCTS: '/products/get',
      CREATE_PRODUCT: '/products/create',
      GET_ALL_PRODUCTS: '/products/total-stock',
      GET_ALL_VALUE: '/products/total-stock-value',
      BY_ID: (id) => `/products/get/${id}`,
      UPDATE_PRODUCT: (id) => `/products/update/${id}`,
      DELETE_PRODUCT: (id) => `/products/delete/${id}`,
      SEARCH:  `/products/search/ `,

      // CATEGORY ENDPOINTS
      GET_CATEGORIES:  `/products/get-categories `,
      GET_CATEGORIES_BY_ID: (id) => `/products/get-category/${id}`,
      GET_CATEGORIES_ALL: `/products/get-categories-all`,
      CREATE_CATEGORY:  `/products/create-category`,
      UPDATE_CATEGORY: (id) => `/products/update-category/${id}`,
      DELETE_CATEGORY: (id) => `/products/delete-category/${id}`


    },
      
    // -> Unificar Proveedores y Insumos DESPUÉS
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