import React, { useState, useEffect } from 'react';
import { ShoppingCart, Trash, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    createCart,
    getCart,
    updateCart,
    deleteCart
} from '../../services/cartServices';

const AddToCartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    const fetchCartItems = async () => {
        try {
            const response = await getCart();
            setCartItems(response.cart.items);
        } catch (error) {
            console.error('Failed to fetch cart items:', error);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleAddToCart = async (productId, quantity = 1) => {
        try {
            const response = await createCart({ productId, quantity });
            setCartItems(response.cart.items);
        } catch (error) {
            console.error('Failed to add product to cart:', error);
        }
    };

    const handleRemoveFromCart = async (productId) => {
        try {
            await deleteCart(productId);
            setCartItems(cartItems.filter(item => item.product._id !== productId));
        } catch (error) {
            console.error('Failed to remove product from cart:', error);
        }
    };

    const updateQuantity = async (productId, change) => {
        const currentItem = cartItems.find(item => item.product._id === productId);
        const newQuantity = Math.max(1, currentItem.quantity + change);

        try {
            const response = await updateCart(productId, { quantity: newQuantity });
            setCartItems(response.cart.items);
        } catch (error) {
            console.error('Failed to update product quantity:', error);
        }
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                        <ShoppingCart className="w-6 h-6 text-primary-color animate-bounce" />
                        <span>Your Shopping Cart</span>
                    </h2>
                    {cartItems.length === 0 ? (
                        <div className="text-center py-16">
                            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-pulse" />
                            <p className="text-xl text-gray-600">Your cart is empty</p>
                            <Link to="/products" className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200">
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-6">
                                {cartItems.map(item => (
                                    <div key={item.product._id} className="flex items-center justify-between border-b pb-6">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={item.product.images[0]?.url} // เปลี่ยนไปใช้ images[0].url
                                                alt={item.product.name}
                                                className="w-24 h-24 object-cover rounded-md transition-transform duration-200 hover:scale-105"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-gray-800 text-lg">{item.product.name}</h3>
                                                <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center border rounded-md">
                                                <button onClick={() => updateQuantity(item.product._id, -1)} className="p-2 text-gray-500 hover:text-gray-700">
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="px-4 py-2 text-center">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.product._id, 1)} className="p-2 text-gray-500 hover:text-gray-700">
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <button onClick={() => handleRemoveFromCart(item.product._id)} className="text-red-500 hover:text-red-700 transition-transform duration-200 hover:scale-110">
                                                <Trash className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                            </div>
                            <div className="mt-8 flex justify-between items-center">
                                <div>
                                    <span className="text-gray-600">Total Items:</span>
                                    <span className="text-xl font-bold text-gray-800 ml-2">{cart.totalQuantity}</span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Subtotal:</span>
                                    <span className="text-2xl font-bold text-gray-800 ml-2">${cart.totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-between items-center">
                                <div>
                                    <span className="text-gray-600">Subtotal:</span>
                                    <span className="text-2xl font-bold text-gray-800 ml-2">${calculateTotalPrice().toFixed(2)}</span>
                                </div>
                                <Link to="/checkout" className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold flex items-center space-x-2 hover:bg-blue-700 transition-colors duration-200">
                                    <span>Proceed to Checkout</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddToCartPage;

