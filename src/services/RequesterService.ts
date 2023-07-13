import apiClientH from "./ApiClientH";

export default {
    getRequests(page: number, size: number) {
        return apiClientH.get(`/requester/?_page=${page}&_size=${size}`);
    },
    getRequest(id: number) {
        return apiClientH.get(`/requester/${id}`);
    },
    createRequest(request: any) {
        return apiClientH.post(`/requester/`, request);
    },
    updateRequest(id:number,request: any) {
        return apiClientH.put(`/requester/${id}`, request);
    },
    deleteRequest(id: number) {
        return apiClientH.delete(`/requester/${id}`);
    }
}