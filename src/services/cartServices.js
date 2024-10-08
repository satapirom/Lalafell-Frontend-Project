import axiosInstance from '../utils/axiosInstance';

const API_ENDPOINTS = {
    USER_CART: '/carts',
};

const handleApiCall = async (method, endpoint, data = null) => {
    try {
        const response = await axiosInstance[method](endpoint, data);
        return response.data;
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

const updateLocalStorageAndNotify = (cartData) => {
    localStorage.setItem('cart', JSON.stringify(cartData));
    window.dispatchEvent(new Event('cartUpdated'));
};

export const createCart = async (data) => {
    const response = await handleApiCall('post', API_ENDPOINTS.USER_CART, data);
    updateLocalStorageAndNotify(response.cart);
    return response;
};

export const getCart = async () => {
    const response = await handleApiCall('get', API_ENDPOINTS.USER_CART);
    updateLocalStorageAndNotify(response.cart);
    return response;
};

export const updateCart = async (productId, data) => {
    const response = await handleApiCall('patch', `${API_ENDPOINTS.USER_CART}/${productId}`, data);
    updateLocalStorageAndNotify(response.cart);
    return response;
};

export const deleteCart = async (productId) => {
    const response = await handleApiCall('delete', `${API_ENDPOINTS.USER_CART}/${productId}`);
    updateLocalStorageAndNotify(response.cart);
    return response;
};
