
import React, { useState } from 'react';
import { useWishlist } from '../../../contexts/WishlistContext';
import { toggleWishlistItem } from '../../../services/wishlistServices';
import { useAuth } from '../../../contexts/AuthContext';
import { toast } from 'react-toastify';

const FavoriteButton = ({ productId }) => {
    const { isInWishlist, fetchWishlist } = useWishlist();
    const { isLoggedIn } = useAuth();
    const [localLoading, setLocalLoading] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    
    const isFavorited = isInWishlist(productId);

    const handleClick = async () => {
        if (!isLoggedIn) {
            toast.error('Please login to add items to your wishlist');
            return;
        }

        if (localLoading) return;

        setLocalLoading(true);
        setIsAnimating(true);

        try {
            await toggleWishlistItem(productId);
            toast.success(isFavorited ? 'Removed from wishlist' : 'Added to wishlist');
            await fetchWishlist();
        } catch (error) {
            console.error('Error updating wishlist:', error);
            toast.error(error.message || 'Error updating wishlist');
        } finally {
            setLocalLoading(false);
            setTimeout(() => setIsAnimating(false), 300);
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`flex items-center justify-center p-2 rounded-lg transition-all duration-300 bg-primary-color/15
                ${isFavorited ? 'text-red-500' : 'text-gray-500'}
                ${isAnimating ? 'scale-110' : 'scale-100'}
                ${localLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            disabled={localLoading}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-4 h-4 tablet:w-6 tablet:h-6"
                fill={isFavorited ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
            >
                <path
                    d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"
                />
            </svg>
        </button>
    );
};

export default FavoriteButton;





