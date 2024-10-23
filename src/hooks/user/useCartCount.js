import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

// สร้าง custom event emitter สำหรับจัดการ cart updates
export const cartEventEmitter = {
    listeners: new Set(),
    emit() {
        this.listeners.forEach(listener => listener());
    },
    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }
};

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

        // Subscribe to cart updates
        const unsubscribe = cartEventEmitter.subscribe(updateItemCount);

        // Handle storage events from other tabs
        const handleStorageChange = (event) => {
            if (event.key === 'cart') {
                updateItemCount();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            unsubscribe();
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [isLoggedIn, location]);

    return itemCount;
};

export default useCartCount;