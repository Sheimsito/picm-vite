import { getBaseURL, API_CONFIG } from '../config/apiConfig.js';

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

  
    const token = this.getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }

    if(!token){
      setTimeout(() => {
        window.location.href = '#/login';
      }, 1000);
    }

    const csrfToken = this.getCSRFToken();
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        // Try to parse error as JSON; if not JSON, fall back to text
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const contentType = response.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.error || errorData.message || errorMessage;
          } else {
            const text = await response.text();
            errorMessage = text || errorMessage;
          }
        } catch (_) {
          // ignore parsing errors, use default error message
        }
        throw new Error(errorMessage);
      }

      // Success path: honor explicit responseType if provided
      if (config.responseType === 'blob') {
        return await response.blob();
      }

      // Otherwise, infer by content-type header
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        return await response.json();
      }
      if (
        contentType.includes('application/pdf') ||
        contentType.includes('application/octet-stream')
      ) {
        return await response.blob();
      }

      // Fallback to text
      return await response.text();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // HTTP Methods
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

  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  setAuthToken(token) {
    localStorage.setItem('authToken', token);
  }
  
  setRefreshToken(token) {
    localStorage.setItem('refreshToken', token);
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  removeAuthToken() {
    localStorage.removeItem('authToken');
  }

  getCSRFToken() {
    return document.querySelector('[name=csrfmiddlewaretoken]')?.value;
  }
}

export const apiClient = new ApiClient();