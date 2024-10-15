import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

const useCartCount = () => {
    const [itemCount, setItemCount] = useState(0);
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    const updateItemCount = () => {
        const cartData = JSON.parse(localStorage.getItem('cart') || '{"totalQuantity": 0}');
        if (isLoggedIn) {
            setItemCount(cartData.totalQuantity || 0);
        } else {
            setItemCount(0);
        }
    };

    useEffect(() => {
        updateItemCount();

        const handleStorageChange = (event) => {
            if (event.key === 'cart') {
                updateItemCount();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('itemInserted', updateItemCount);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('itemInserted', updateItemCount);
        };
    }, [isLoggedIn, location]);

    return itemCount;
};

export default useCartCount;