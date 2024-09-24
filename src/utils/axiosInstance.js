import axios from "axios";

// ใช้ค่าจาก environment variables
const baseApiUrl = import.meta.env.VITE_BASE_API_URL;
console.log("Base API URL:", baseApiUrl);
console.log(import.meta.env);  // ตรวจสอบว่ามี VITE_BASE_API_URL หรือไม่



// สร้าง axios instance
const axiosInstance = axios.create({
    baseURL: baseApiUrl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
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
console.log("Base API URL:", baseApiUrl);

export default axiosInstance;


