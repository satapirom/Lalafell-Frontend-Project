import React from 'react';
import { useWishlist } from '../../../contexts/WishlistContext';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const favoriteIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
    <path d="M12.0027 21C7.28739 21 4.92973 21 3.46487 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38042 4.53806C2.6516 4.05227 3.05255 3.65142 3.53848 3.38032C4.22017 3 5.12865 3 6.94562 3C8.10968 3 8.69172 3 9.20122 3.19101C10.3645 3.62712 10.8442 4.68358 11.3691 5.73313L12.0027 7M8.00163 7H16.754C18.8613 7 19.9149 7 20.6718 7.50559C20.9995 7.72447 21.2808 8.00572 21.4997 8.33329C21.8937 8.92282 21.9808 9.69244 22 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20.586 13.331C18.7898 12.3795 17.5 13.7821 17.5 13.7821C17.5 13.7821 16.2102 12.3795 14.4139 13.331C12.2383 14.4834 12.0821 18.9964 17.5 21C22.9179 18.9964 22.7616 14.4834 20.586 13.331Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
);

const WishlistPage = () => {
    const { wishlistItems, isLoading, error } = useWishlist();
    const { isLoggedIn } = useAuth();
<<<<<<< HEAD


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
=======

    return (
        <div className="max-w-screen-laptopl mx-auto custom-bg p-4 tablet:p-8 mt-20 tablet:rounded-lg">
           <div className='flex items-center space-x-2'>
                <span>{favoriteIcon}</span>
                <h2 className="text-xl tablet:text-2xl font-semibold">My Wishlist</h2>
>>>>>>> 1b26c91523b6efc228ca6b865d019f7f9d4f057f
            </div>
            {isLoading ? (
                <div className="text-center">Loading...</div>
            ) : wishlistItems.length === 0 ? (
                <div className="text-center bg-white rounded-lg shadow-sm p-8">
                    <p className="text-gray-600 mb-4">Your wishlist is empty.</p>
                    <Link 
                        to="/products" 
                        className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="transition-opacity duration-300 opacity-100">
                    <div className="flex flex-wrap products-container">
                        {wishlistItems.map((item) => (
                            <div className="w-full p-2 tablet:w-1/4 mobile:w-1/2" key={item.product._id}>
                                <ProductCard product={item.product} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {error && (
                <div className="text-red-500 text-center mt-4">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default WishlistPage;



