import { apiClient } from '../utils/apiClient.js';
import { ENDPOINTS } from '../constants/endpoints.js';

    // TODO: MUST REFACTOR THE SERVICES ( bcs is a lot of DRY tho)

export class SupplyService {

    // SUPPLIES FUNCTIONS

    static async getSupplies(page = 1, pageSize = 5, search = '', filter = '', supplier = '') {
        try{
            const url = `${ENDPOINTS.SUPPLIES.GET_SUPPLIES}?page=${page}&page_size=${pageSize}&search=${search}&filter=${filter}&supplier=${supplier}`;
            const response = await apiClient.get(url);
            return response;
        }catch(error){
            throw new Error(`${error.message}`);
        }
    }

    static async getSuppliesById(id){
        try{
            const response = await apiClient.get(ENDPOINTS.SUPPLIES.BY_ID(id));
            return response;
        }catch(error){
            throw new Error(`${error.message}`);
        }
    }

    static async updateSupply(id,data){
        try{
            const response = await apiClient.put(ENDPOINTS.SUPPLIES.UPDATE_SUPPLY(id),data);
            return response;
        }catch(error){
            throw new Error(`${error.message}`);
        }
    }

    static async deleteSupply(id){
        try{
            const response = await apiClient.delete(ENDPOINTS.SUPPLIES.DELETE_SUPPLY(id));
            return response;
        }catch(error){
            throw new Error(`${error.message}`);
        }
    }
    
    static async createSupply(data) {
        try {
            const response = await apiClient.post(ENDPOINTS.SUPPLIES.CREATE_SUPPLY, data);
            return response;
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }

    static async getTotalSupplies() {
        try {
            const response = await apiClient.get(ENDPOINTS.SUPPLIES.GET_SUPPLIES_TOTAL_STOCK);
            const {total_stock} = response
            return total_stock;
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }

    static async getTotalValue() {
        try {
            const response = await apiClient.get(ENDPOINTS.SUPPLIES.GET_SUPPLIES_ALL_VALUE);
            const {total_inventory_value} = response
            return total_inventory_value;
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }

    // SUPPLIER FUNCTIONS

     static async getSuppliers() {
        try {
            const response = await apiClient.get(ENDPOINTS.SUPPLIES.GET_SUPPLIER);
            const names = response.map(item => item.name);
            return names;
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }

    static async getSuppliersPaginated(page = 1, pageSize = 5, search = '', filter = '') {
        try {
            const url = `${ENDPOINTS.SUPPLIES.GET_SUPPLIER_PAGINATED}?page=${page}&page_size=${pageSize}&search=${search}&filter=${filter}`;
            const response = await apiClient.get(url);
            return response;
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }

    static async getSuppliersById(id){
        try {
            const response = await apiClient.get(ENDPOINTS.SUPPLIES.GET_SUPPLIER_BY_ID(id));
            return response;
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }

    static async createSupplier(data){
        try {
            const response = await apiClient.post(ENDPOINTS.SUPPLIES.CREATE_SUPPLIER, data);
            return response;
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }

    static async updateSupplier(id,data){
        try {
            const response = await apiClient.put(ENDPOINTS.SUPPLIES.UPDATE_SUPPLIER(id),data);
            return response;
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }

    static async deleteSupplier(id){
        try {
            const response = await apiClient.delete(ENDPOINTS.SUPPLIES.DELETE_SUPPLIER(id));
            return response;
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }


}

