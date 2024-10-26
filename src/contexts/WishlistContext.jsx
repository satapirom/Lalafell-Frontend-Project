import React, { createContext, useContext, useState, useEffect } from 'react';
import { getWishlistItems } from '../services/wishlistServices';
import { useAuth } from '../contexts/AuthContext';

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
            const items = await getWishlistItems();
            setWishlistItems(items || []);
        } catch (error) {
            if (isLoggedIn) {  // Use isLoggedIn instead of isAuthenticated
                setError(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };
    

    useEffect(() => {
        if (isLoggedIn) {
            fetchWishlist();
        } else {
            setWishlistItems([]);
            setError(null);
        }
    }, [isLoggedIn]);

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