import axiosInstance from "../utils/axiosInstance";

const API_ENDPOINTS = {
    USER_WISHLIST: '/wishlist',
};

const handleApiCall = async (method, endpoint, data = null) => {
    try {
        const response = await axiosInstance[method](endpoint, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                throw new Error('Product not found or you don\'t have permission to access it');
            }
            if (error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            }
        } else if (error.request) {
            throw new Error('Network error. Please check your internet connection and try again.');
        } else {
            throw new Error('An unexpected error occurred. Please try again later');
        }
    }
};

export const toggleWishlistItem = async (productId) => {
    if (!productId) {
        throw new Error('Invalid product ID');
    }
    try {
        const response = await handleApiCall('post', `${API_ENDPOINTS.USER_WISHLIST}/wishlist/toggle`, { productId });
        return response;
    } catch (error) {
        console.error('Error toggling wishlist item:', error);
        throw error;
    }
};

export const getWishlistItems = async () => {
    try {
        const response = await handleApiCall('get', API_ENDPOINTS.USER_WISHLIST);
        return response;
    } catch (error) {
        console.error('Error fetching wishlist items:', error);
        throw error;
    }
};