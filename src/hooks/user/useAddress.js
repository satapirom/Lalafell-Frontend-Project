import { useState, useEffect } from 'react';
import { getAddresses } from '../../services/adressServices';

const useAddress = () => {
    // Initialize states with safer defaults
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(() => {
        try {
            const saved = localStorage.getItem('selectedAddress');
            return saved ? JSON.parse(saved) : null;
        } catch (error) {
            console.error('Error parsing saved address:', error);
            localStorage.removeItem('selectedAddress');
            return null;
        }
    });
    const [defaultAddress, setDefaultAddress] = useState(null);
    const [error, setError] = useState(null);

    const fetchAddresses = async () => {
        try {
            setError(null);
            const response = await getAddresses();

            if (!response || !response.addresses) {
                throw new Error('Invalid response format');
            }

            setAddresses(response.addresses);
            const defaultAddr = response.addresses.find(address => address.isDefault);
            setDefaultAddress(defaultAddr || null);

            // Only set selected address if none is currently selected
            if (!selectedAddress && defaultAddr) {
                selectAddress(defaultAddr);
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
            setError(error.message || 'Error fetching addresses');
            setAddresses([]);
            setDefaultAddress(null);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []); // Clean dependency array since we handle selectedAddress check inside fetchAddresses

    const selectAddress = (address) => {
        try {
            if (!address) {
                setSelectedAddress(null);
                localStorage.removeItem('selectedAddress');
                return;
            }

            setSelectedAddress(address);
            localStorage.setItem('selectedAddress', JSON.stringify(address));
        } catch (error) {
            console.error('Error selecting address:', error);
            setError('Error selecting address');
        }
    };

    // Add function to clear selected address
    const clearSelectedAddress = () => {
        setSelectedAddress(null);
        localStorage.removeItem('selectedAddress');
    };

    // Add function to validate address format
    const isValidAddress = (address) => {
        return address &&
            typeof address === 'object' &&
            'street' in address &&
            'city' in address &&
            'country' in address;
    };

    return {
        addresses,
        selectedAddress,
        defaultAddress,
        selectAddress,
        fetchAddresses,
        clearSelectedAddress,
        error,
        isValidAddress
    };
};

export default useAddress;