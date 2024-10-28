import React from 'react';
import { useWishlist } from '../../../contexts/WishlistContext';
import { useAuth } from '../../../contexts/AuthContext';
import ProductCard from './ProductCard';

const WishlistPage = () => {
    const { wishlistItems, isLoading, error } = useWishlist();
    const { isLoggedIn } = useAuth();


    if (!isLoggedIn) {
        return (
            <div className="text-center p-24">
                <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>
                <p>Please login to view your wishlist</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="text-center p-24">
                <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-24">
                <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-screen-laptopl mx-auto mt-24 p-8 custom-bg tablet:rounded-lg">
            <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>
            <div className="grid grid-cols-1 tablet:grid-cols-4 gap-4 p-8 custom-galssmorpuism">
                {wishlistItems.length === 0 ? (
                    <p>Your wishlist is empty.</p>
                ) : (
                    wishlistItems.map(item => (
                        <ProductCard
                            key={item.id}
                            product={item} />
                    ))
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
