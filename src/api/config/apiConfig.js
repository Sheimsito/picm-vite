// Configuración para Django REST Framework
export const API_CONFIG = {
    // URL de tu API de Django
    BASE_URL: {
      development: 'http://localhost:8000/api', // Puerto típico de Django
      production: 'https://tu-dominio.com/api',
      staging: 'https://staging.tu-dominio.com/api'
    },
    
    TIMEOUT: 10000,
    
    // Headers específicos para Django REST
    DEFAULT_HEADERS: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest' // Para Django CSRF
    }
  };
  
  export const getBaseURL = () => {
    const env = import.meta.env.MODE || 'development';
    return API_CONFIG.BASE_URL[env] || API_CONFIG.BASE_URL.development;
  };