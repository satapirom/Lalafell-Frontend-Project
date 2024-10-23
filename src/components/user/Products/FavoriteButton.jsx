import React, { useState } from 'react';
import { useWishlist } from '../../../contexts/WishlistContext';

const FavoriteButton = ({ productId }) => {
    const { wishlist, toggleItem, isLoading } = useWishlist();
    const [isAnimating, setIsAnimating] = useState(false);
    const [hovered, setHovered] = useState(false);
    const isFavorited = wishlist.has(productId);

    const handleClick = () => {
        if (isLoading) return;
        setIsAnimating(true);
        toggleItem(productId);
        setTimeout(() => setIsAnimating(false), 300);
    };

    const handleMouseEnter = () => {
        setTimeout(() => setHovered(true), 200);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <div className="mt-2 items-center ">
            <button
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`flex items-center justify-center p-2 border w-full bg-primary-color/15 rounded-lg focus:outline-none transition-transform ease-in-out duration-300 ${isFavorited ? 'text-red-500' : 'text-gray-500'} ${isAnimating ? 'scale-125' : 'scale-100'} ${isLoading ? 'opacity-50' : 'opacity-100'}`}
                disabled={isLoading}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className={`w-4 h-4 tablet:w-6 tablet:h-6  text-current transition-transform duration-500 ease-out ${hovered ? 'scale-110 animate-bounce' : ''}`}
                    fill={isFavorited ? "currentColor" : "none"}
                >
                    <path
                        d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
            </button>
        </div>
    );
};

export default FavoriteButton;






