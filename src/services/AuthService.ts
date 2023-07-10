import apiClient from "./ApiClient";

export default {
    login(username: string, password: string) {
        return apiClient.post('/auth', {
            "username": username,
            "password": password
        });
    }
}