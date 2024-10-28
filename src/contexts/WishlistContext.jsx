import React, { createContext, useContext, useState, useEffect } from 'react';
import { getWishlistItems } from '../services/wishlistServices';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isLoggedIn } = useAuth();

    const fetchWishlist = async () => {
        if (!isLoggedIn) {
            setWishlistItems([]);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const data = await getWishlistItems();
            setWishlistItems(data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching wishlist:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchWishlist();
        }
    }, [isLoggedIn]);

    const isInWishlist = (productId) => {
        return wishlistItems.some(item => item.product._id === productId);
    };

    return (
        <WishlistContext.Provider value={{
            wishlistItems,
            isLoading,
            error,
            fetchWishlist,
            isInWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

