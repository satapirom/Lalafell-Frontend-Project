import React, { useEffect, useState } from 'react';
import { useWishlist } from '../../../contexts/WishlistContext';
import ProductCard from './ProductCard';
import { getWishlistItems } from "../../../services/wishlistServices";

const WishlistPage = () => {
    const { isLoading } = useWishlist(); // แก้ไข: เอา wishlist ออกเพราะไม่จำเป็น
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchWishlistProducts = async () => {
            try {
                const items = await getWishlistItems();
                console.log(items); // สำหรับการดีบัก
                setProducts(items);
            } catch (error) {
                console.error('Failed to fetch wishlist products:', error);
            }
        };

        fetchWishlistProducts();
    }, []); // แก้ไข: ลบ dependency [wishlist] ออกไปเพื่อไม่ให้เรียกซ้ำ

    if (isLoading) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
            {products.length === 0 ? (
                <p className="text-gray-500">Your wishlist is empty.</p>
            ) : (
                <div className="grid grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-4  gap-6">
                    {products.map(item => (
                        <ProductCard key={item.product._id} product={item.product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
