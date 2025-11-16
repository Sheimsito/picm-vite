import { apiClient } from '../utils/apiClient.js';
import { ENDPOINTS } from '../constants/endpoints.js';

export class chatbotService{
    static async talk(message){
        try{
            let url = ENDPOINTS.CHATBOT.TALK;
            const response = await apiClient.post(url, { message });
            return response;
        }
        catch(error){
            console.error('Error al consultar con el asistente virtual:', error);
            throw error;
        }
    }
}