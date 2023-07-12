import apiClientH from "./ApiClientH";

export default {
    getRequests(page: number, size: number) {
        return apiClientH.get(`/approver/?_page=${page}&_size=${size}`);
    },
    ApproverAction(id: string, action: boolean) {
        return apiClientH.patch(`/approver/${id}?approved=${action}`);
    }
}
