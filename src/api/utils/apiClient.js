import { getBaseURL, API_CONFIG } from '../config/apIConfig.js';

class ApiClient {
  constructor() {
    this.baseURL = getBaseURL();
    this.defaultHeaders = API_CONFIG.DEFAULT_HEADERS;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      method: 'GET',
      headers: {
        ...this.defaultHeaders,
        ...options.headers
      },
      ...options
    };

    // Token de Django REST Framework
    const token = this.getAuthToken();
    if (token) {
      config.headers.Authorization = `Token ${token}`; // Django usa 'Token' no 'Bearer'
    }

    // CSRF Token para Django (si lo necesitas)
    const csrfToken = this.getCSRFToken();
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        throw new Error(
          errorData.error ||
          errorData.message ||
          `HTTP error! status: ${response.status}`
        );
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Métodos HTTP
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async patch(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }

  // Manejo de tokens Django
  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  setAuthToken(token) {
    localStorage.setItem('authToken', token);
  }

  removeAuthToken() {
    localStorage.removeItem('authToken');
  }

  // CSRF Token (si lo necesitas)
  getCSRFToken() {
    return document.querySelector('[name=csrfmiddlewaretoken]')?.value;
  }
}

export const apiClient = new ApiClient();