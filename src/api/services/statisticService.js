import { apiClient } from '../utils/apiClient.js';
import { ENDPOINTS } from '../constants/endpoints.js';

export class StatisticsService {
    static async getTopProductsSales(limit = 10, period = '30d') {
        try {
            const url = `${ENDPOINTS.STATISTICS.TOP_PRODUCTS_SALES}?limit=${limit}&period=${period}`;
            const response = await apiClient.get(url);
            return response;
        } catch (error) {
            throw new Error(`Error al obtener productos con más salidas: ${error.message}`);
        }
    }

    static async getTopProductsEntries(limit = 10, period = '30d') {
        try {
            const url = `${ENDPOINTS.STATISTICS.TOP_PRODUCTS_ENTRIES}?limit=${limit}&period=${period}`;
            const response = await apiClient.get(url);
            return response;
        } catch (error) {
            throw new Error(`Error al obtener productos con más entradas: ${error.message}`);
        }
    }

    static async getProductMovementsVolume(period = '30d') {
        try {
            const url = `${ENDPOINTS.STATISTICS.PRODUCT_MOVEMENTS_VOLUME}?period=${period}`;
            const response = await apiClient.get(url);
            return response;
        } catch (error) {
            throw new Error(`Error al obtener volumen de movimientos: ${error.message}`);
        }
    }

    static async getMonthlyMovements(year = new Date().getFullYear()) {
        try {
            const url = `${ENDPOINTS.STATISTICS.MONTHLY_MOVEMENTS}?year=${year}`;
            const response = await apiClient.get(url);
            return response;
        } catch (error) {
            throw new Error(`Error al obtener movimientos mensuales: ${error.message}`);
        }
    }
}