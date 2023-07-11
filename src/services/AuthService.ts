import apiClient from "./ApiClient";
import apiClientH from "./ApiClientH";

export default {
    login(username: string, password: string) {
        return apiClient.post('/auth/', {
            username: username,
            password: password
        });
    },
    getCredentials() {
        return apiClientH.get('/auth/credentials');
    },
    logout() {
        localStorage.removeItem('token');
    }
}