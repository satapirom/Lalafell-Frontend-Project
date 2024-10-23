import axiosInstance from "../utils/axiosInstance";

const API_ENDPOINTS = {
    USER: '/users',
};

const handleApiCall = async (method, endpoint, data = null) => {
    try {
        const response = await axiosInstance[method](endpoint, data);
        return response.data;
    } catch (error) {
        console.error('API call error:', error.response || error);
        if (error.response) {
            if (error.response.status === 404) {
                throw new Error('User not found or you don\'t have permission to access it');
            }
            if (error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            }
        }
        throw new Error('An unexpected error occurred. Please try again later');
    }
};

export const getProfile = async () => {
    try {
        return await handleApiCall('get', `${API_ENDPOINTS.USER}/profile`);
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw new Error('Failed to fetch profile: ' + error.message);
    }
};