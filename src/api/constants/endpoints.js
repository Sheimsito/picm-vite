
export const ENDPOINTS = {

    AUTH: {
      LOGIN: '/auth/login', 
      LOGOUT: '/auth/logout', 
      REFRESH: '/auth/refresh-token',
      REGISTER: '/auth/registration/',
      PASSWORD_RESET: '/auth/password-reset',
      PASSWORD_RESET_CONFIRM: '/auth/confirm-reset-password',
      USER: '/auth/user',
      GET_USERS: '/auth/get-users-name',
    },
 
    PRODUCTS: {
      // PRODUCTS ENDPOINTS
      GET_PRODUCTS: '/products/get',
      GET_PRODUCTS_NAME: '/products/get-products-name',
      CREATE_PRODUCT: '/products/create',
      GET_ALL_PRODUCTS: '/products/total-stock',
      GET_ALL_VALUE: '/products/total-stock-value',
      BY_ID: (id) => `/products/get/${id}`,
      UPDATE_PRODUCT: (id) => `/products/update/${id}`,
      UPDATE_STOCK: (id) => `/products/update-stock/${id}`,
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
      
    
    SUPPLIES: {

      // SUPPLIES ENDPOINTS
      GET_SUPPLIES: `/supplies/get-paginated`,
      CREATE_SUPPLY: `/supplies/create`,
      GET_SUPPLIES_TOTAL_STOCK: `/supplies/total-stock`,
      GET_SUPPLIES_ALL_VALUE: `/supplies/total-inventory-value`,
      GET_SUPPLIES_NAME: `/supplies/get-supplies-name`,
      BY_ID: (id) => `/supplies/get/${id}`,
      UPDATE_SUPPLY: (id) => `/supplies/update/${id}`,
      UPDATE_STOCK: (id) => `/supplies/update-stock/${id}`,
      DELETE_SUPPLY: (id) => `/supplies/delete/${id}`,

      // SUPPLIER ENDPOINTS
      GET_SUPPLIER: `/supplies/get-suppliers`,
      GET_SUPPLIER_PAGINATED: `/supplies/get-suppliers-paginated`,
      GET_SUPPLIER_BY_ID: (id) => `/supplies/get-supplier/${id}`,
      CREATE_SUPPLIER: `/supplies/create-supplier`,
      UPDATE_SUPPLIER: (id) => `/supplies/update-supplier/${id}`,
      DELETE_SUPPLIER: (id) => `/supplies/delete-supplier/${id}`,
    },
    
    //  MOVEMENT ENDPOINTS
    MOVEMENTS: {
      GET_MOVEMENTS: `/movements/get-movements`,
      CREATE_MOVEMENT: `/movements/create-movement`,
      GET_MOVEMENT_BY_ID: (id,tipoMovimiento) => `/movements/get-movement/${id}/${tipoMovimiento}`,
      UPDATE_MOVEMENT: (id,tipoMovimiento) => `/movements/update-movement/${id}/${tipoMovimiento}`,
      CREATE_MOVEMENT: (tipoMovimiento) => `/movements/create-movement/${tipoMovimiento}`,
      DELETE_MOVEMENT: (id,tipoMovimiento) => `/movements/delete-movement/${id}/${tipoMovimiento}`,
    },
    
   
    STATISTICS: {
      // PRODUCT STATISTICS
      TOP_PRODUCTS_SALES: '/statistics/top-products-sales',
      TOP_PRODUCTS_ENTRIES: '/statistics/top-products-entries',
      PRODUCT_MOVEMENTS_VOLUME: '/statistics/product-movements-volume',
      
      // SUPPLY STATISTICS
      TOP_SUPPLIES_SALES: '/statistics/top-supplies-sales',
      TOP_SUPPLIES_ENTRIES: '/statistics/top-supplies-entries',
      SUPPLY_MOVEMENTS_VOLUME: '/statistics/supply-movements-volume',
      
      // GENERAL STATISTICS
      MONTHLY_MOVEMENTS: '/statistics/monthly-movements',
      CATEGORY_DISTRIBUTION: '/statistics/category-distribution'
    },

    REPORTS:{
      DOWNLOAD_PRODUCT_REPORT_BY_ID: (id) => `/reports/download-product-report/${id}`,
      DOWNLOAD_SUPPLY_REPORT_BY_ID: (id) => `/reports/download-supply-report/${id}`,
    },
    CHATBOT:{
      TALK: '/chatbot/chat',
    },
  };