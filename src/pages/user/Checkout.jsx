import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder } from '../../services/orderServices';
import { useAuth } from '../../contexts/AuthContext';
import DeliveryAddress from '../../components/user/Checkout/DeliveryAddress';
import PaymentCheckout from '../../components/user/Checkout/PaymentChackout';
import useAddress from '../../hooks/user/useAddress';
import YouMayAlsoLike from '../../components/user/YouMayAlsoLike/YouMayAlsoLike';


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

    const clearCart = () => {
        try {
            // Clear cart state
            setCart({ items: [], totalAmount: 0, totalQuantity: 0 });

            // Clear the cart in localStorage
            localStorage.removeItem('cart'); // Make sure to clear the cart from localStorage as well
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

                clearCart();
                navigate('/order-confirmation', { state: { orderId: response.order._id } });
            } else {
                console.error('Order creation failed:', response);
            }
        } catch (error) {
            console.error('Error creating order:', error);
            setError(error.message || 'An error occurred while creating the order.');
        }
    };

    const handleCancelOrder = () => {
        // Clear the cart and navigate to another page or reset the state
        clearCart();
        navigate('/'); // Navigate to the homepage or any other desired page
    };

    const calculateTotal = () => {
        return selectedItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    const calculateTotalQuantity = () => {
        return selectedItems.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <div className="container mx-auto mt-20">
            <h1 className="text-2xl tablet:text-3xl font-semibold text-gray-800 mx-2 mb-4">Checkout</h1>
            <div className='custom-bg mt-8 p-8 rounded-lg'>
                <h2 className="text-lg font-normal pb-6">Items Detail</h2>
                <div className="custom-glassmorphism shadow-sm">
                    {selectedItems.length === 0 ? (
                        <p className="text-lg text-gray-600">No items selected.</p>
                    ) : (
                        <div className="px-8">
                            {selectedItems.map((item) => (
                                <div key={item.product._id} className="items-center border-b border-gray-200 py-4 pr-8 rounded-lg transition duration-150 hover:bg-gray-50">
                                    <div className="flex justify-between mb-4">
                                        <div className="flex items-center">
                                            <img
                                                src={item.product.images[0]?.url}
                                                alt={item.product.name}
                                                className="w-16 h-16 object-cover rounded-md mr-4"
                                            />
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
                                                <p className="text-gray-600 text-lg">฿ {item.product.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="mx-2 text-lg font-normal bg-primary-color/15 py-2 px-4 rounded-full">x {item.quantity}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* รวมรายการสรุปของออเดอร์ */}
                            <div className="my-8 mr-6">
                                <div className="flex justify-between text-lg mb-2">
                                    <span className="text-gray-800">Total Quantity:</span>
                                    <span className="text-gray-800">{calculateTotalQuantity()}</span>
                                </div>
                                <div className="flex justify-between text-lg">
                                    <span className="text-gray-800">Total Price:</span>
                                    <span className="text-gray-800">฿ {calculateTotal().toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={handleCancelOrder} // เพิ่มฟังก์ชันการยกเลิก
                        className="border border-primary-color text-gray-800 hover:text-white px-6 py-3 rounded-md hover:bg-primary-color/70 transition duration-300 mt-8 ml-4">
                        Cancel
                    </button>
                    <button
                        onClick={handlePlaceOrder}
                        className="bg-primary-color text-white px-6 py-3 rounded-md hover:bg-primary-color/80 transition duration-300 mt-8">
                        Confirm Order
                    </button>
                </div>
            </div>
            <DeliveryAddress />
            <PaymentCheckout />
            <YouMayAlsoLike />

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Error:</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            )}
        </div>
    );
};

export default Checkout;