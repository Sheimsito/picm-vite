// Configuration for the API
export const API_CONFIG = {
    // URL of the API
    BASE_URL: {
      development: 'http://localhost:8000/api', // Typical port for Django
      production: 'https://picm-django-rest.onrender.com/api', // Production domain
      staging: 'https://staging.tu-dominio.com/api', // Staging domain
    },
    
    TIMEOUT: 10000,
    
    // Specific headers for Django REST
    DEFAULT_HEADERS: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest' // For Django CSRF
    }
  };
  
  export const getBaseURL = () => {
    const env = import.meta.env.MODE || 'production';
    return API_CONFIG.BASE_URL[env] || API_CONFIG.BASE_URL.production;
  };