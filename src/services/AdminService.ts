import apiClientH from "./ApiClientH";

export default {
    getUser(uuid: String) {
        return apiClientH.get(`/admin/${uuid}`);
    },
    getUsers(page: number, size: number,locked: boolean) {
        return apiClientH.get(`/admin/?_page=${page}&_size=${size}&_locked_account=${locked}`);
    },
    assignRole(uuid: String, role: String) {
        return apiClientH.patch(`/admin/${uuid}?role=${role}`)
    }
}