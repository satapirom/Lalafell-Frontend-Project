import axiosInstance from "../utils/axiosInstance";

const API_ENDPOINTS = {
    PRODUCT: '/products',
    SEARCH: '/products/search'
};

const handleApiCall = async (method, endpoint, data = null) => {
    try {
        const response = await axiosInstance[method](endpoint, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                throw new Error('Product not found or you don\'t have permission to access it.');
            }
            if (error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            }
        } else if (error.request) {
            throw new Error('Network error. Please check your internet connection and try again.');
        } else {
            throw new Error('An unexpected error occurred. Please try again later.');
        }
    }
};

export const getProducts = async () => {
    try {
        const response = await handleApiCall('get', API_ENDPOINTS.PRODUCT);
        const products = response.products;
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export const getProduct = async (productId) => {
    try {
        const response = await handleApiCall('get', `${API_ENDPOINTS.PRODUCT}/${productId}`);
        const product = response.product;
        return product;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
}

export const searchProducts = async (query) => {
    try {
        if (!query) {
            throw new Error('Search query is required');
        }

        const response = await handleApiCall('get', `${API_ENDPOINTS.SEARCH}?q=${encodeURIComponent(query)}`);
        return response.products; // Ensure this returns only the products array
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};