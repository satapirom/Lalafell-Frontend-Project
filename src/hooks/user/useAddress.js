import { useState, useEffect } from 'react';
import { getAddresses } from '../../services/adressServices';

const useAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(() => {
        const saved = localStorage.getItem('selectedAddress');
        return saved ? JSON.parse(saved) : null;
    });
    const [defaultAddress, setDefaultAddress] = useState(null);

    const fetchAddresses = async () => {
        try {
            const response = await getAddresses();
            setAddresses(response.addresses);
            const defaultAddr = response.addresses.find(address => address.isDefault);
            setDefaultAddress(defaultAddr || null);
            if (!selectedAddress) {
                selectAddress(defaultAddr);
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const selectAddress = (address) => {
        setSelectedAddress(address);
        localStorage.setItem('selectedAddress', JSON.stringify(address));
    };

    return {
        addresses,
        selectedAddress,
        defaultAddress,
        selectAddress,
        fetchAddresses
    };
};

export default useAddress;