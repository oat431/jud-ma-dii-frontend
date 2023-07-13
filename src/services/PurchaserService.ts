import apiClientH from "./ApiClientH";

export default {
    getRequests(page: number, size: number) {
        return apiClientH.get(`/purchaser/?_page=${page}&_size=${size}`);
    },
    getPurchasingRequests(page: number, size: number) {
        return apiClientH.get(`/purchaser/?_page=${page}&_size=${size}&_status=PURCHASING`);
    },
    getRequest(id: string) {
        return apiClientH.get(`/purchaser/${id}`);
    },
    purchaserAction(id: string, action: string, location:any) {
        return apiClientH.post(`/purchaser/${id}?action=${action}`, location);
    }
}