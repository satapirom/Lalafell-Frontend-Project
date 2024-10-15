import axiosInstance from "../utils/axiosInstance";

const API_ENDPOINTS = {
    REVIEWS: (productId) => `/products/${productId}/reviews`,
};

const handleApiCall = async (method, url, data) => {
    try {
        const response = await axiosInstance[method](url, data);
        return response.data;
    } catch (error) {
        console.error(`Error ${method}ing review: ${error.message}`);
        if (error.response) {
            if (error.response.status === 404) {
                throw new Error('Review not found or you don\'t have permission to access it.');
            }
            if (error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            }
        }
        throw new Error('An unexpected error occurred. Please try again later.');
    }
};

export const getReviews = async (productId) => {
    const response = await handleApiCall('get', API_ENDPOINTS.REVIEWS(productId));
    return response;
};
