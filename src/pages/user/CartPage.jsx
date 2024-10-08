import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash, Plus, Minus, ArrowLeft, ArrowRight } from 'lucide-react';
import { createCart, getCart, updateCart, deleteCart } from '../../services/cartServices';

const CartPage = () => {
    const [cart, setCart] = useState({ items: [], totalAmount: 0, totalQuantity: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedItems, setSelectedItems] = useState(new Set());

    const navigate = useNavigate();

    const fetchCart = async () => {
        setIsLoading(true);
        try {
            const response = await getCart();
            setCart(response.cart);
            // Reset selected items when cart is fetched
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
            setSelectedItems(new Set()); // Reset selected items after adding new product
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
            // Update the cart state immediately after deletion
            setCart(prevCart => ({
                ...prevCart,
                items: prevCart.items.filter(item => item.product._id !== productId)
            }));
            // Remove the item from selectedItems if it was selected
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
            // If all items are selected, deselect all
            setSelectedItems(new Set());
        } else {
            // Otherwise, select all items
            setSelectedItems(new Set(cart.items.map(item => item.product._id)));
        }
    };

    const handleRemoveSelectedItems = async () => {
        for (const productId of selectedItems) {
            await handleRemoveItem(productId);
        }
        setSelectedItems(new Set());
    };

    const handleProceedToCheckout = () => {
        if (selectedItems.size === 0) {
            alert('Please select at least one item to proceed.');
            return;
        }
        const selectedCartItems = Array.from(selectedItems).map(itemId =>
            cart.items.find(item => item.product._id === itemId)
        );
        navigate('/checkout', { state: { selectedCartItems } });
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

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-600 border-b-4 border-transparent"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-8 flex items-center text-gray-800">
                <ShoppingCart className="mr-2 text-blue-600" /> Your Shopping Cart
            </h1>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            {cart.items.length === 0 ? (
                <div className="text-center py-16">
                    <ShoppingCart className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                    <p className="text-2xl text-gray-600 mb-4">Your cart is empty</p>
                    <Link to="/products" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
                        <div className="p-4 border-b border-gray-200">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.size === cart.items.length}
                                    onChange={handleSelectAll}
                                    className="mr-2"
                                />
                                <span className="text-lg font-semibold">Select All</span>
                            </label>
                        </div>
                        {cart.items.map((item) => (
                            <div key={item.product._id} className="flex items-center border-b border-gray-200 py-4 px-6 hover:bg-gray-50 transition duration-150">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.has(item.product._id)}
                                    onChange={() => handleSelectItem(item.product._id)}
                                    className="mr-4"
                                />
                                <img
                                    src={item.product.images[0]?.url}
                                    alt={item.product.name}
                                    className="w-20 h-20 object-cover rounded-md mr-6 shadow-md"
                                />
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
                                    <p className="text-gray-600 text-lg">${item.product.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleUpdateQuantity(item.product._id, -1)}
                                        className={`text-gray-500 hover:text-gray-700 mr-2 ${item.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus className="w-5 h-5" />
                                    </button>
                                    <span className="mx-2 text-lg font-semibold">{item.quantity}</span>
                                    <button
                                        onClick={() => handleUpdateQuantity(item.product._id, 1)}
                                        className="text-gray-500 hover:text-gray-700 ml-2"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(item.product._id)}
                                    className="text-red-500 hover:text-red-700 ml-6 transition duration-200"
                                >
                                    <Trash className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow-md">
                        <button
                            onClick={handleRemoveSelectedItems}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                        >
                            Remove Selected Items
                        </button>
                    </div>
                    <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-md">
                        <div className="text-xl">
                            <span className="font-semibold">Total Selected Items:</span> {selectedItems.size}
                        </div>
                        <div className="text-2xl">
                            <span className="font-semibold">Total:</span> ${calculateTotal().toFixed(2)}
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <Link to="/products" className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition duration-300 flex items-center">
                            <ArrowLeft className="mr-2" /> Continue Shopping
                        </Link>
                        <button onClick={handleProceedToCheckout} className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300 flex items-center">
                            Proceed to Checkout <ArrowRight className="ml-2" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;





