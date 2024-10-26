import axiosInstance from '../utils/axiosInstance';

const API_ENDPOINTS = {
    WISHLIST: '/wishlist'  // ตรวจสอบว่าตรงกับ backend endpoint
};

const handleApiCall = async (method, endpoint, data = null) => {
    try {
        const response = await axiosInstance [method](endpoint, data);
        return response.data
    } catch (error) {
        console.error('API call error:', error.response || error);
        if (error.response) {
            if (error.response.status === 404) {
                throw new Error('Product not found or you don\'t have permission to access it');
            }
            if (error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            }
        }
        throw new Error('An unexpected error occurred. Please try again later');
    }
};

export const addWishlistItem = async (data) => {
    const response = await handleApiCall('post', API_ENDPOINTS.WISHLIST, data);
    return response;
};


export const toggleWishlistItem = async (productId) => {
    try {
        const response = await axiosInstance.post(`${API_ENDPOINTS.WISHLIST}/toggle`, {
            productId
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const getWishlistItems = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.WISHLIST);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};
