import React, { createContext, useState, useEffect, useContext } from 'react';
import { toggleWishlistItem, getWishlistItems } from '../services/wishlistServices';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWishlist = async () => {
            setIsLoading(true); // เริ่มต้นการโหลด
            try {
                const items = await getWishlistItems();
                // ตรวจสอบว่าข้อมูลมีรูปแบบตามที่คาดหวัง
                setWishlist(new Set(items.map(item => item.product._id))); // เปลี่ยนเป็น item.product._id
            } catch (error) {
                console.error('Failed to fetch wishlist:', error);
            } finally {
                setIsLoading(false); // สิ้นสุดการโหลด
            }
        };

        fetchWishlist();
    }, []);

    const toggleItem = async (productId) => {
        try {
            await toggleWishlistItem(productId); // เรียก API เพื่อเพิ่ม/ลบสินค้า
            setWishlist(prevWishlist => {
                const newWishlist = new Set(prevWishlist);
                if (newWishlist.has(productId)) {
                    newWishlist.delete(productId); // ลบสินค้า
                } else {
                    newWishlist.add(productId); // เพิ่มสินค้า
                }
                return newWishlist; // คืนค่า new Set ที่อัปเดต
            });
        } catch (error) {
            console.error('Failed to toggle wishlist item:', error);
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleItem, isLoading }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
