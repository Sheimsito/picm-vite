import { apiClient } from '../utils/apiClient.js';
import { ENDPOINTS } from '../constants/endpoints.js';

export class ReportService {
    static async downloadProductReportById(id){
        try{
            const url = `${ENDPOINTS.REPORTS.DOWNLOAD_PRODUCT_REPORT_BY_ID(id)}`
            const response = await apiClient.get(url, {responseType: 'blob'})
            return response
        }catch(error){
            throw new Error(`${error.message}`);
        }
    }

    static async downloadSupplyReportById(id){
        try{
            const url = `${ENDPOINTS.REPORTS.DOWNLOAD_SUPPLY_REPORT_BY_ID(id)}`
            const response = await apiClient.get(url, {responseType: 'blob'})
            return response
        }catch(error){
            throw new Error(`${error.message}`);
        }
    }

    static openPDF(blob){
        try{
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'report.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
        // Optional: revoke object URL after a delay to free memory
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        }catch(error){
            throw new Error(`${error.message}`);
        }
    }
}
