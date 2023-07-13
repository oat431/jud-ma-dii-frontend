import apiClientH from "./ApiClientH";

export default {
    getRequests(page: number, size: number) {
        return apiClientH.get(`/approver/?_page=${page}&_size=${size}`);
    },
    getRequest(id: number) {
        return apiClientH.get(`/approver/${id}`);
    },
    ApproverAction(id: string, action: boolean, reason:any) {
        return apiClientH.patch(`/approver/${id}?approved=${action}`, reason);
    }
}
