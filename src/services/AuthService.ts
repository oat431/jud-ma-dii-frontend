import apiClient from "./ApiClient";
import apiClientH from "./ApiClientH";
import { RegisterForm } from "../model/RegisterForm";

export default {
    login(username: string, password: string) {
        return apiClient.post('/auth/', {
            username: username,
            password: password
        });
    },
    register(user: RegisterForm) {
        return apiClient.post('/auth/signup', user);
    },
    getCredentials() {
        return apiClientH.get('/auth/credentials');
    },
    logout() {
        localStorage.removeItem('token');
    }
}