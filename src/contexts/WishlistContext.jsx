import React, { createContext, useContext, useState, useEffect } from 'react';
import { getWishlistItems } from '../services/wishlistServices';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuth();

    const fetchWishlist = async () => {
        if (!isAuthenticated) {
            setWishlistItems([]);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const items = await getWishlistItems();
            setWishlistItems(items || []);
        } catch (error) {
            if (isAuthenticated) {
                setError(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchWishlist();
        } else {
            setWishlistItems([]);
            setError(null);
        }
    }, [isAuthenticated]);

    const isInWishlist = (productId) => {
        return wishlistItems.some(item => item._id === productId);
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
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};