import axiosInstance from "../utils/axiosInstance";

const API_ENDPOINTS = {
    USER_ORDERS: '/orders',
};

const handleApiCall = async (method, endpoint, data) => {
    try {
        const response = await axiosInstance[method](endpoint, data);
        return response.data;
    } catch (error) {
        console.error(`Error ${method}ing order: ${error.message}`);
        if (error.response) {
            if (error.response.status === 404) {
                throw new Error('Order not found or you don\'t have permission to access it');
            }
            if (error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            }
        }
        throw new Error('An unexpected error occurred. Please try again later');
    }
};

export const createOrder = async (data) => {
    const response = await handleApiCall('post', API_ENDPOINTS.USER_ORDERS, data);
    return response;

};

export const getOrders = async () => {
    const response = await handleApiCall('get', API_ENDPOINTS.USER_ORDERS);
    return response;
};

export const getOrder = async (id) => {
    const response = await handleApiCall('get', `${API_ENDPOINTS.USER_ORDERS}/${id}`);
    return response;
};

export const updateOrder = async (id, data) => {
    const response = await handleApiCall('patch', `${API_ENDPOINTS.USER_ORDERS}/${id}`, data);
    return response;
};

export const deleteOrder = async (id) => {
    const response = await handleApiCall('delete', `${API_ENDPOINTS.USER_ORDERS}/${id}`);
    return response;
};


