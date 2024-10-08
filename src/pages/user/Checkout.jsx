import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder } from '../../services/orderServices';
import { useAuth } from '../../contexts/AuthContext';
import DeliveryAddress from '../../components/user/Checkout/DeliveryAddress';
import PaymentCheckout from '../../components/user/Checkout/PaymentChackout';
import useAddress from '../../hooks/user/useAddress';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const selectedItems = location.state?.selectedCartItems || [];
    const [cart, setCart] = useState({ items: [], totalAmount: 0, totalQuantity: 0 });


    const { selectedAddress, defaultAddress } = useAddress();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedMethod = localStorage.getItem('selectedPaymentMethod');
        if (storedMethod) {
            setSelectedPaymentMethod(JSON.parse(storedMethod));
        }
    }, []);

    // Function to clear the cart from localStorage
    const clearCart = () => {
        try {
            // ถ้าไม่จำเป็นต้องใช้ setCart อาจลบส่วนนี้ออก
            setCart({ items: [], totalAmount: 0, totalQuantity: 0 }); // ต้องแน่ใจว่า setCart มีการกำหนดไว้ในคอมโพเนนต์นี้
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };



    const handlePlaceOrder = async () => {
        setError(null);
        const shippingAddress = selectedAddress || defaultAddress;

        if (!shippingAddress || !selectedPaymentMethod) {
            setError('Please provide a shipping address and payment method.');
            return;
        }

        try {
            const orderData = {
                items: selectedItems.map(item => ({
                    product: item.product._id,
                    quantity: item.quantity,
                    price: item.product.price,
                })),
                totalAmount: calculateTotal(),
                status: 'pending',
                shippingAddress: {
                    name: shippingAddress.name,
                    phone: shippingAddress.phone,
                    street: shippingAddress.street,
                    city: shippingAddress.city,
                    country: shippingAddress.country,
                    state: shippingAddress.state,
                    postalCode: shippingAddress.postalCode,
                },
                paymentMethod: {
                    type: selectedPaymentMethod.type,
                    details: selectedPaymentMethod.details,
                },
            };

            const response = await createOrder(orderData);
            if (response && response.order) {
                console.log('Order created successfully:', response);

                // Clear cart and navigate to confirmation page
                clearCart(); // Call clearCart function here
                navigate('/order-confirmation', { state: { orderId: response.order._id } });
            } else {
                console.error('Order creation failed:', response);
            }
        } catch (error) {
            console.error('Error creating order:', error);
            setError(error.message || 'An error occurred while creating the order.');
        }
    };

    const calculateTotal = () => {
        return selectedItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Checkout</h1>

            <DeliveryAddress />

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Selected Items</h2>
                {selectedItems.length === 0 ? (
                    <p className="text-lg text-gray-600">No items selected.</p>
                ) : (
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        {selectedItems.map((item) => (
                            <div key={item.product._id} className="flex justify-between mb-4">
                                <div className="flex items-center">
                                    <img
                                        src={item.product.images[0]?.url}
                                        alt={item.product.name}
                                        className="w-16 h-16 object-cover rounded-md mr-4"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
                                        <p className="text-gray-600 text-lg">{item.product.price.toFixed(2)} USD</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <span className="mx-2 text-lg font-semibold">x {item.quantity}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Order Summary</h2>
                    <div className="flex justify-between text-lg mb-4">
                        <span className="text-gray-800">Total:</span>
                        <span className="text-gray-800">{calculateTotal().toFixed(2)} USD</span>
                    </div>
                </div>
            </div>

            <PaymentCheckout />

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Error:</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            )}

            <button
                onClick={handlePlaceOrder}
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300 mt-8 w-full">
                Confirm Order
            </button>
        </div>
    );
};

export default Checkout;
