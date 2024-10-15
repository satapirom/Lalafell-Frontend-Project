import React, { useState } from 'react';
import { PiHeartFill } from "react-icons/pi";
import { useWishlist } from '../../../contexts/WishlistContext';

const FavoriteButton = ({ productId }) => {
    const { wishlist, toggleItem, isLoading } = useWishlist();
    const [isAnimating, setIsAnimating] = useState(false);
    const isFavorited = wishlist.has(productId);

    const handleClick = () => {
        if (isLoading) return;
        setIsAnimating(true);
        toggleItem(productId);
        setTimeout(() => setIsAnimating(false), 300); // Reset animation after 300ms
    };

    return (
        <div className="absolute z-10 top-5 right-5">
            <button
                onClick={handleClick}
                className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-lg focus:outline-none"
                disabled={isLoading}
            >
                <PiHeartFill
                    className={`text-2xl transition-transform duration-300 
                        ${isFavorited ? 'text-red-500' : 'text-gray-400'}
                        ${isAnimating ? 'scale-125' : 'scale-100'}
                        ${isLoading ? 'opacity-50' : 'opacity-100'}
                    `}
                />
            </button>
        </div>
    );
};

export default FavoriteButton;


