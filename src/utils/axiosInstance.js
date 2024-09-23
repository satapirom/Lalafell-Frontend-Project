import axios from "axios";
import { BASE_URL, PROD_URL } from "../utils/constants"; // นำเข้าค่าจาก constants

// ใช้ค่าจาก environment variables
const baseUrl = import.meta.env.VITE_BASE_URL || BASE_URL;
const prodUrl = import.meta.env.VITE_PROD_URL || PROD_URL;

// สร้าง axios instance
const axiosInstance = axios.create({
    baseURL: baseUrl || prodUrl, // กำหนด base URL
    timeout: 10000, // กำหนดเวลา timeout
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            // Token หมดอายุ
            try {
                // ถ้าต้องการรีเฟรช token สามารถทำได้ที่นี่
                console.error("Token refresh failed");
            } catch (refreshError) {
                console.error("Token refresh error", refreshError);
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

// ตรวจสอบค่า baseUrl และ prodUrl
console.log("Base URL:", baseUrl);
console.log("Prod URL:", prodUrl);

export default axiosInstance;


