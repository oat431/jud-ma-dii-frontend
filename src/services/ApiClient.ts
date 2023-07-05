import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://sahachan-sandbox-server.herokuapp.com/api/v1/',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json'
    }
});

export default apiClient;
