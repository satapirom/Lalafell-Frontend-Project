import React, { useEffect, useState } from 'react';
import { useWishlist } from '../../../contexts/WishlistContext';
import ProductCard from './ProductCard';
import { getWishlistItems } from "../../../services/wishlistServices";

const WishlistPage = () => {
    const { isLoading } = useWishlist();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchWishlistProducts = async () => {
            try {
                const items = await getWishlistItems();
                console.log(items);
                setProducts(items);
            } catch (error) {
                console.error('Failed to fetch wishlist products:', error);
            }
        };

        fetchWishlistProducts();
    }, []);

    if (isLoading) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>;
    }

    return (
        <div className="container max-w-screen-laptopl custom-bg rounded-lg mt-20 mx-auto  p-8">
            <div className='flex gap-2 '>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                    <path d="M7.76872 7.99708C9.10954 7.17461 10.2798 7.50606 10.9828 8.03401C11.2711 8.25048 11.4152 8.35871 11.5 8.35871C11.5848 8.35871 11.7289 8.25048 12.0172 8.03401C12.7202 7.50606 13.8905 7.17461 15.2313 7.99708C16.991 9.07647 17.3891 12.6374 13.3302 15.6417C12.5571 16.2139 12.1706 16.5 11.5 16.5C10.8294 16.5 10.4429 16.2139 9.66976 15.6417C5.61086 12.6374 6.00903 9.07647 7.76872 7.99708Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M2 12C2 7.52166 2 5.28249 3.39124 3.89124C4.78249 2.5 7.02166 2.5 11.5 2.5C15.9783 2.5 18.2175 2.5 19.6088 3.89124C21 5.28249 21 7.52166 21 12C21 16.4783 21 18.7175 19.6088 20.1088C18.2175 21.5 15.9783 21.5 11.5 21.5C7.02166 21.5 4.78249 21.5 3.39124 20.1088C2 18.7175 2 16.4783 2 12Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                </svg>
                <h1 className="text-3xl font-bold  mb-4">My Wishlist</h1>
            </div>
            <div className='custom-glassp custom-galssmorpuism p-8 '>
                {products.length === 0 ? (
                    <p className="text-gray-500">Your wishlist is empty.</p>
                ) : (
                    <div className="grid grid-cols-1 tablet:grid-cols-4  gap-6">
                        {products.map(item => (
                            <ProductCard key={item.product._id} product={item.product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;