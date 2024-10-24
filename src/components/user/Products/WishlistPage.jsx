import React from 'react';
import { useWishlist } from '../../../contexts/WishlistContext';
import { useAuth } from '../../../contexts/AuthContext';
import ProductCard from './ProductCard';

const WishlistPage = () => {
    const { wishlistItems, isLoading, error } = useWishlist();
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
            <div className="text-center p-8">
                <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>
                <p>Please login to view your wishlist</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="text-center p-8">
                <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8">
                <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.length === 0 ? (
                    <p>Your wishlist is empty.</p>
                ) : (
                    wishlistItems.map(item => (
                        <ProductCard key={item.id} product={item} />
                    ))
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
