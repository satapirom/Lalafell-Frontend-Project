// axiosInstance.js
import axios from 'axios';

const CONFIG = {
    baseURL: import.meta.env.VITE_BASE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
};

const AUTH_ENDPOINTS = {
    refresh: '/api/v1/refresh',
    login: '/login',
    logout: '/api/v1/logout'
};

const PUBLIC_PATHS = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/verify-email'
];

const axiosInstance = axios.create(CONFIG);

// Token Service
const TokenService = {
    getAccessToken: () => localStorage.getItem('token'),
    getRefreshToken: () => localStorage.getItem('refreshToken'),
    setTokens: (accessToken, refreshToken) => {
        localStorage.setItem('token', accessToken);
        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        }
    },
    clearTokens: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    },
    hasValidTokens: () => {
        return !!localStorage.getItem('token') && !!localStorage.getItem('refreshToken');
    }
};

// Auth Service
export const AuthService = {
    login: async (credentials) => {
        const response = await axiosInstance.post(AUTH_ENDPOINTS.login, credentials);
        const { accessToken, refreshToken } = response.data;
        TokenService.setTokens(accessToken, refreshToken);
        return response;
    },

    logout: async () => {
        try {
            if (TokenService.hasValidTokens()) {
                await axiosInstance.post(AUTH_ENDPOINTS.logout);
            }
        } finally {
            TokenService.clearTokens();
        }
    },

    refreshTokens: async () => {
        const refreshToken = TokenService.getRefreshToken();
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        try {
            const response = await axios.post(
                `${CONFIG.baseURL}${AUTH_ENDPOINTS.refresh}`,
                { refreshToken }
            );
            const { accessToken, newRefreshToken } = response.data;
            TokenService.setTokens(accessToken, newRefreshToken);
            return accessToken;
        } catch (error) {
            TokenService.clearTokens();
            throw error;
        }
    }
};

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = TokenService.getAccessToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        return axiosInstance(originalRequest);
                    })
                    .catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const newAccessToken = await AuthService.refreshTokens();
                processQueue(null, newAccessToken);
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                // ถ้าไม่ได้อยู่ในหน้า public ให้ redirect ไป login
                if (!window.location.pathname.startsWith('/login')) {
                    const returnUrl = encodeURIComponent(window.location.pathname);
                    window.location.href = `/login?returnUrl=${returnUrl}`;
                }
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;


