import apiClientH from "./ApiClientH";

export default {
    getRequests(page: number, size: number) {
        return apiClientH.get(`/requester/?_page=${page}&_size=${size}`);
    }
}