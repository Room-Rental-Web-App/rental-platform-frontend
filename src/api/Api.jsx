import axios from "axios";

import {API_BASE} from "../data/env"
const Api = axios.create({
    baseURL: API_BASE
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
