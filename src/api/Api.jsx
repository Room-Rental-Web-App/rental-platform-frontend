import axios from "axios";
import Cookies from "js-cookie";
const Api = axios.create({
    baseURL: "https://rental-platform-backend-esyq.onrender.com/api"
});


// Add token from localStorage to every request
Api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default Api;
