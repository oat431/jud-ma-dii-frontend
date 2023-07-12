import apiClientH from "./ApiClientH";

export default {
    getRequests(page: number, size: number) {
        return apiClientH.get(`/purchaser/?_page=${page}&_size=${size}`);
    },
    purchaserAction(id: string, action: boolean) {
        return apiClientH.post(`/purchaser/${id}?action=${action}`, {
            address: "string",
            city: "string",
            state: "string",
            country: "string",
            zip: "string"
        });
    }
}