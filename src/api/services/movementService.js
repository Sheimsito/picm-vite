import { apiClient } from '../utils/apiClient.js';
import { ENDPOINTS } from '../constants/endpoints.js';

export class MovementService {
    static async getMovements(page, pageSize, search = '', filter = '', movementType = '', fechaDesde = '', fechaHasta = '',tipoMovimiento) {
        try {
            let url = `${ENDPOINTS.MOVEMENTS.GET_MOVEMENTS}?page=${page}&limit=${pageSize}`;
          
            if (search) {
                url += `&search=${encodeURIComponent(search)}`;
            }
            if (filter) {
                url += `&filter=${encodeURIComponent(filter)}`;
            }
            if (movementType) {
                url += `&movement_type=${encodeURIComponent(movementType)}`;
            }
            if (fechaDesde) {
                url += `&fecha_desde=${encodeURIComponent(fechaDesde)}`;
            }
            if (fechaHasta) {
                url += `&fecha_hasta=${encodeURIComponent(fechaHasta)}`;
            }
           
            url += `&tipo_movimiento=${encodeURIComponent(tipoMovimiento)}`;

            const response = await apiClient.get(url);
            return response;
        } catch (error) {
            console.error('Error al obtener movimientos de productos:', error);
            throw error;
        }
    }
    static async getMovementById(id,tipoMovimiento) {
        try {
            const response = await apiClient.get(ENDPOINTS.MOVEMENTS.GET_MOVEMENT_BY_ID(id,tipoMovimiento));
            return response;
        } catch (error) {
            console.error('Error al obtener movimiento de producto:', error);
            throw error;
        }
    }

    static async createMovement(tipoMovimiento, payload) {
        try {
            const response = await apiClient.post(ENDPOINTS.MOVEMENTS.CREATE_MOVEMENT(tipoMovimiento), payload);
            return response;
        } catch (error) {
            console.error('Error al crear movimiento de producto:', error);
            throw error;
        }
    }

    static async updateMovement(id,tipoMovimiento, payload) {
        try {
            const response = await apiClient.put(ENDPOINTS.MOVEMENTS.UPDATE_MOVEMENT(id,tipoMovimiento), payload);
            return response;
        } catch (error) {
            console.error('Error al actualizar movimiento de producto:', error);
            throw error;
        }
    }

    static async deleteMovement(id,tipoMovimiento) {
        try {
            const response = await apiClient.delete(ENDPOINTS.MOVEMENTS.DELETE_MOVEMENT(id,tipoMovimiento));
            return response;
        } catch (error) {
            console.error('Error al eliminar movimiento de producto:', error);
            throw error;
        }
    }
  
}