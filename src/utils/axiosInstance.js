import axios from "axios";
import { BASE_URL, PROD_URL } from "../utils/constants"; // นำเข้าค่าจาก constants

// ใช้ค่าจาก environment variables
const isDevelopment = import.meta.env.MODE === 'development'; // ตรวจสอบว่าอยู่ในโหมดพัฒนา
const baseUrl = isDevelopment ? BASE_URL : PROD_URL; // กำหนด base URL

// สร้าง axios instance
const axiosInstance = axios.create({
    baseURL: baseUrl, // กำหนด base URL
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

// ตรวจสอบค่า baseUrl
console.log("Base URL:", baseUrl);

export default axiosInstance;
