import axiosInstance from "../utils/axiosInstance";

const API_ENDPOINTS = {
    USER_BANK_ACCOUNTS: '/payment/bank-accounts',
    USER_CREDIT_CARDS: '/payment/credit-cards',
};

const handleApiCall = async (method, endpoint, data = null) => {
    try {
        const response = await axiosInstance[method](endpoint, data);
        return response.data;
    } catch (error) {
        console.error(`Error with ${method.toUpperCase()} request to ${endpoint}:`, error);
        if (error.response) {
            console.log('Error status:', error.response.status);
            console.log('Error data:', error.response.data);
        } else if (error.request) {
            console.log('Error request:', error.request);
        } else {
            console.log('Error message:', error.message);
        }
        throw error;
    }
};

const sanitizeData = (data) => {
    const sanitized = {};
    for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string') {
            sanitized[key] = value.replace(/[^\x20-\x7E]/g, '').trim();
        } else {
            sanitized[key] = value;
        }
    }
    return sanitized;
};

export const createBankAccount = async (data) => {
    console.log('Sending data to create bank account:', data);
    const sanitizedData = sanitizeData(data);
    return await handleApiCall('post', API_ENDPOINTS.USER_BANK_ACCOUNTS, sanitizedData);
};

export const createCreditCard = async (data) => {
    console.log('Sending data to create credit card:', data);
    const sanitizedData = sanitizeData(data);
    return await handleApiCall('post', API_ENDPOINTS.USER_CREDIT_CARDS, sanitizedData);
};

export const getBankAccounts = async () => {
    return await handleApiCall('get', API_ENDPOINTS.USER_BANK_ACCOUNTS);
};

export const getCreditCards = async () => {
    return await handleApiCall('get', API_ENDPOINTS.USER_CREDIT_CARDS);
};

export const updateBankAccount = async (id, data) => {
    console.log('Updating bank account with ID:', id);
    const sanitizedData = sanitizeData(data);
    return await handleApiCall('patch', `${API_ENDPOINTS.USER_BANK_ACCOUNTS}/${id}`, sanitizedData);
};

export const updateCreditCard = async (id, data) => {
    try {
        const response = await axios.patch(`/payment/credit-cards/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating credit card:', error);
        throw error;
    }
};

export const deleteBankAccount = async (id) => {
    try {
        const result = await axiosInstance.delete(`${API_ENDPOINTS.USER_BANK_ACCOUNTS}/${id}`, {
            data: { type: 'Bank Account' }
        });
        console.log('Delete bank account result:', result.data);
        return result.data;
    } catch (error) {
        console.error('Error in deleteBankAccount:', error);
        throw error;
    }
};

export const deleteCreditCard = async (id, data) => {
    try {
        const response = await axios.delete(`/payment/credit-cards/${id}`, { data });
        return response.data;
    } catch (error) {
        console.error('Error deleting credit card:', error);
        throw error;
    }
};

