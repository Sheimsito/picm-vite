import { apiClient } from '../utils/apiClient.js';
import { ENDPOINTS } from '../constants/endpoints.js';

export class AuthService {
  static async login(credentials) {
    try {
      const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
      
      // Django REST Auth returns the token directly
      if (response.key) {
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

  // Get user info
  static async getUserInfo() {
    try {
      return await apiClient.get(ENDPOINTS.AUTH.USER);
    } catch (error) {
      throw new Error(`Failed to get user info: ${error.message}`);
    }
  }

  // Reset password
  static async resetPassword(email) {
    try {
      return await apiClient.post(ENDPOINTS.AUTH.PASSWORD_RESET, { email });
    } catch (error) {
      throw new Error(`Error al enviar el correo de recuperación: ${error.message}`);
    }
  }

  // Confirm reset password
  static async resetPasswordConfirm({ userId, newPassword, token }) {
    try {
      return await apiClient.post(ENDPOINTS.AUTH.PASSWORD_RESET_CONFIRM, { 
        uid: userId, 
        token: token, // In a real case, this would be a temporary token
        new_password: newPassword
      });
    } catch (error) {
      throw new Error(`Error al reestablecer la contraseña: ${error.message}`);
    }
  }

  // Verify authentication
  static isAuthenticated() {
    return !!apiClient.getAuthToken();
  }
}