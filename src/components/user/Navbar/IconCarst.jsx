import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext'; // Adjust the import path as needed

const IconCarts = () => {
    const [itemCount, setItemCount] = useState(0);
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    const updateItemCount = () => {
        if (isLoggedIn) {
            const cartData = JSON.parse(localStorage.getItem('cart') || '{"totalQuantity": 0}');
            setItemCount(cartData.totalQuantity);
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

        const handleCartUpdated = () => {
            updateItemCount();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('cartUpdated', handleCartUpdated);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('cartUpdated', handleCartUpdated);
        };
    }, [isLoggedIn]);

    useEffect(() => {
        // Clear cart when navigating away from cart or checkout pages
        if (location.pathname !== '/cartpage' && location.pathname !== '/checkout') {
            localStorage.removeItem('cart');
            setItemCount(0);
        }
    }, [location]);

    return (
        <div className="relative">
            <Link to='/cartpage' className="block">
                <ShoppingCart
                    className="h-6 w-6 tablet:h-7 tablet:w-7 laptop:h-8 laptop:w-8 cursor-pointer text-gray-800"
                />
                {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {itemCount}
                    </span>
                )}
            </Link>
        </div>
    );
};

export default IconCarts;
