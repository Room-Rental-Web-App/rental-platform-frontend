import axios from "axios";

const isLocal = window.location.hostname === "localhost";

const Api = axios.create({
    baseURL: isLocal
        ? "http://localhost:8080/api"
        : "https://rental-platform-backend-esyq.onrender.com/api"
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
