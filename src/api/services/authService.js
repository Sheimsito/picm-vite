import { apiClient } from '../utils/apiClient.js';
import { ENDPOINTS } from '../constants/endpoints.js';

export class AuthService {
  // Login con Django REST Auth
  static async login(credentials) {
    try {
      const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
      
      // Django REST Auth devuelve el token directamente
      if (response.key) { // Token key
        apiClient.setAuthToken(response.key);
      }
      
      return response;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  // Logout
  static async logout() {
    try {
      await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      apiClient.removeAuthToken();
    }
  }

  // Obtener información del usuario
  static async getUserInfo() {
    try {
      return await apiClient.get(ENDPOINTS.AUTH.USER);
    } catch (error) {
      throw new Error(`Failed to get user info: ${error.message}`);
    }
  }

  // Reset de contraseña
  static async resetPassword(email) {
    try {
      return await apiClient.post(ENDPOINTS.AUTH.PASSWORD_RESET, { email });
    } catch (error) {
      throw new Error(`Error al enviar el correo de recuperación: ${error.message}`);
    }
  }

  // Confirmar reset de contraseña
  static async resetPasswordConfirm({ userId, newPassword, token }) {
    try {
      return await apiClient.post(ENDPOINTS.AUTH.PASSWORD_RESET_CONFIRM, { 
        uid: userId, 
        token: token, // En un caso real, esto sería un token temporal
        new_password: newPassword
      });
    } catch (error) {
      throw new Error(`Error al reestablecer la contraseña: ${error.message}`);
    }
  }

  // Verificar autenticación
  static isAuthenticated() {
    return !!apiClient.getAuthToken();
  }
}