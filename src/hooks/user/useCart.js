// useCart.js
import { useState, useEffect } from 'react';
import { createCart, getCart, updateCart, deleteCart } from '../../services/cartServices';

const useCart = () => {
    const [cart, setCart] = useState({ items: [], totalAmount: 0, totalQuantity: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedItems, setSelectedItems] = useState(new Set());

    const fetchCart = async () => {
        setIsLoading(true);
        try {
            const response = await getCart();
            setCart(response.cart);
            setSelectedItems(new Set());
        } catch (error) {
            setError('Failed to fetch cart. Please try again later.');
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleAddToCart = async (productId, quantity = 1) => {
        try {
            const response = await createCart(productId, quantity);
            setCart(response.cart);
            setSelectedItems(new Set());
        } catch (error) {
            setError('Error adding item to cart.');
        }
    };

    const handleUpdateQuantity = async (productId, change) => {
        const currentItem = cart.items.find(item => item.product._id === productId);
        const newQuantityValue = Math.max(1, currentItem.quantity + change);
        try {
            const response = await updateCart(productId, { quantity: newQuantityValue });
            setCart(response.cart);
        } catch (error) {
            setError('Error updating item quantity.');
        }
    };

    const handleRemoveItem = async (productId) => {
        try {
            await deleteCart(productId);
            setCart(prevCart => ({
                ...prevCart,
                items: prevCart.items.filter(item => item.product._id !== productId)
            }));
            setSelectedItems(prevSelected => {
                const newSelected = new Set(prevSelected);
                newSelected.delete(productId);
                return newSelected;
            });
        } catch (error) {
            setError('Error removing item.');
        }
    };

    const handleSelectItem = (productId) => {
        setSelectedItems(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(productId)) {
                newSelected.delete(productId);
            } else {
                newSelected.add(productId);
            }
            return newSelected;
        });
    };

    const handleSelectAll = () => {
        if (selectedItems.size === cart.items.length) {
            setSelectedItems(new Set());
        } else {
            setSelectedItems(new Set(cart.items.map(item => item.product._id)));
        }
    };

    const handleRemoveSelectedItems = async () => {
        for (const productId of selectedItems) {
            await handleRemoveItem(productId);
        }
        setSelectedItems(new Set());
    };

    const calculateTotal = () => {
        let total = 0;
        selectedItems.forEach((itemId) => {
            const item = cart.items.find((item) => item.product._id === itemId);
            if (item) {
                total += item.product.price * item.quantity;
            }
        });
        return total;
    };

    return {
        cart,
        isLoading,
        error,
        selectedItems,
        handleAddToCart,
        handleUpdateQuantity,
        handleRemoveItem,
        handleSelectItem,
        handleSelectAll,
        handleRemoveSelectedItems,
        calculateTotal,
        fetchCart
    };
};

export default useCart;
