import axios from "axios";
import { BASE_URL } from "../utils/constants"; // นำเข้าค่าจาก constants

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // กำหนดเวลา timeout
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
                // const refreshToken = localStorage.getItem('refreshToken');
                // const response = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
                // localStorage.setItem('token', response.data.accessToken);
                // error.config.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
                // return axiosInstance(error.config);

                // การรีเฟรชไม่สำเร็จ
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

export default axiosInstance;

