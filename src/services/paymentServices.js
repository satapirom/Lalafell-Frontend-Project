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
            console.log('Error response:', error.response);
            console.log('Error response data:', error.response.data);
            if (error.response.status === 404) {
                throw new Error('Payment method not found or you don\'t have permission to access it.');
            }
            if (error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            }
        }
        throw new Error('An unexpected error occurred. Please try again later.');
    }
};

const createBankAccount = async (data) => {
    return await handleApiCall('post', API_ENDPOINTS.USER_BANK_ACCOUNTS, data);
};

const createCreditCard = async (data) => {
    return await handleApiCall('post', API_ENDPOINTS.USER_CREDIT_CARDS, data);
};

const getBankAccounts = async () => {
    return await handleApiCall('get', API_ENDPOINTS.USER_BANK_ACCOUNTS);
};

const getCreditCards = async () => {
    return await handleApiCall('get', API_ENDPOINTS.USER_CREDIT_CARDS);
};

const updateBankAccount = async (id, data) => {
    console.log('Updating bank account with ID:', id);
    return await handleApiCall('patch', `${API_ENDPOINTS.USER_BANK_ACCOUNTS}/${id}`, data);
};

const updateCreditCard = async (id, data) => {
    console.log('Updating credit card with ID:', id);
    return await handleApiCall('patch', `${API_ENDPOINTS.USER_CREDIT_CARDS}/${id}`, data);
};

const deleteBankAccount = async (id) => {
    console.log('Deleting bank account with ID:', id);
    return await handleApiCall('delete', `${API_ENDPOINTS.USER_BANK_ACCOUNTS}/${id}`);
};

const deleteCreditCard = async (id) => {
    console.log('Deleting credit card with ID:', id);
    return await handleApiCall('delete', `${API_ENDPOINTS.USER_CREDIT_CARDS}/${id}`);
};

export {
    createBankAccount,
    createCreditCard,
    getBankAccounts,
    getCreditCards,
    updateBankAccount,
    updateCreditCard,
    deleteCreditCard,
    deleteBankAccount
};
