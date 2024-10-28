import axiosInstance from '../utils/axiosInstance';

const API_ENDPOINTS = {
    WISHLIST: '/wishlist'  // Make sure this matches your backend route
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