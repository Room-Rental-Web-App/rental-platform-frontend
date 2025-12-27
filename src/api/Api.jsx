import axios from "axios";
import Cookies from "js-cookie";
const Api = axios.create({
    baseURL: "http://localhost:8080/api"

});

// Add token from localStorage to every request
Api.interceptors.request.use((config) => {
    const token = Cookies.get("rentalRoom-token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default Api;
