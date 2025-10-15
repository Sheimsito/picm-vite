import { apiClient } from '../utils/apiClient.js';
import { ENDPOINTS } from '../constants/endpoints.js';


export class ProductService {
    
    static async getProducts(page = 1, pageSize = 5, search = '', filter = '', category = '') {
        try {
            let url = `${ENDPOINTS.PRODUCTS.GET_PRODUCTS}?page=${page}&limit=${pageSize}`;
            
            if (search) {
                url += `&search=${encodeURIComponent(search)}`;
            }
            if (filter) {
                url += `&filter=${encodeURIComponent(filter)}`;
            }
            if(category){
                url += `&category=${encodeURIComponent(category)}`
            }        
            const response = await apiClient.get(url);
            return response;
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }

    static async updateProduct(id,data){
        try{
            const url = `${ENDPOINTS.PRODUCTS.UPDATE_PRODUCT(id)}`
            const response = await apiClient.put(url,data)
            return response
        }catch(error){
            throw new Error(`${error.message}`);
        }
    }

    static async deleteProduct(id){
        try{
            const url = `${ENDPOINTS.PRODUCTS.DELETE_PRODUCT(id)}`
            const response = await apiClient.delete(url)
            return response
        }catch(error){
            throw new Error(`${error.message}`);
        }
    }

    static async getProductById(id){
        try{
            const url = `${ENDPOINTS.PRODUCTS.BY_ID(id)}`
            const response = await apiClient.get(url)
            return response
        }catch(error){
            throw new Error(`${error.message}`);
        }
    }

    static async getTotalProducts(){
        try{
            let url = `${ENDPOINTS.PRODUCTS.GET_ALL_PRODUCTS}`
            const response = await apiClient.get(url)
            console.log(response)
            const {total_products} = response
            return total_products
        } catch(error){
            throw new Error(`${error.message}`);
        }

    }

    static async getTotalValue(){
        try{
            let url = `${ENDPOINTS.PRODUCTS.GET_ALL_VALUE}`
            const response = await apiClient.get(url)
            const {total_stock_value} = response
            return total_stock_value
        } catch(error){
            throw new Error(`${error.message}`);
        }

    }

    static async getCategories(){
        try{
            const url =  `${ENDPOINTS.PRODUCTS.GET_CATEGORIES}`
            const response = await apiClient.get(url)
            const names = response.map(item => item.name);
            return names
        }catch(error){
            throw new Error(`${error.message}`);
        }
    }

    static async createProduct(data){
        try{
            const response = await apiClient.post(ENDPOINTS.PRODUCTS.CREATE_PRODUCT, data);
            return response
        }
        catch(error){
            throw new Error(`${error.message}`);
        }
    }
}