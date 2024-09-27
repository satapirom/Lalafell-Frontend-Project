import axiosInstance from '../utils/axiosInstance';

const API_ENDPOINTS = {
    USER_ADDRESS: '/address/user',
};

const handleApiCall = async (method, endpoint, data = null) => {
    try {
        console.log(`Making ${method.toUpperCase()} request to ${endpoint}`, data);
        const response = await axiosInstance[method](endpoint, data);
        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error with ${method.toUpperCase()} request to ${endpoint}:`, error);
        console.log('Full error object:', JSON.stringify(error, null, 2));
        if (error.response) {
            console.log('Error response:', error.response);
            console.log('Error response data:', error.response.data);
            if (error.response.status === 404) {
                throw new Error('Address not found or you don\'t have permission to access it');
            }
            if (error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            }
        }
        throw new Error('An unexpected error occurred. Please try again later.');
    }
};


const getAddresses = async () => {
    return handleApiCall('get', API_ENDPOINTS.USER_ADDRESS);
};

const createAddress = async (data) => {
    return handleApiCall('post', API_ENDPOINTS.USER_ADDRESS, data);
};

const updateAddress = async (id, data) => {
    console.log('Updating address with ID:', id);
    return handleApiCall('patch', `${API_ENDPOINTS.USER_ADDRESS}/${id}`, data);
};

const deleteAddress = async (id) => {
    return handleApiCall('delete', `${API_ENDPOINTS.USER_ADDRESS}/${id}`);
};

export { createAddress, updateAddress, getAddresses, deleteAddress };