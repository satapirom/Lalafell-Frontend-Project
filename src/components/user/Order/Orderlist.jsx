import { useState, useEffect } from 'react';
import { getOrders } from '../../../services/orderServices'; // Adjust the import path as needed

const Orderlist = ({ selectedStatus }) => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [expandedOrders, setExpandedOrders] = useState({});

    useEffect(() => {
        const fetchOrderHistory = async () => {
            setLoading(true);
            try {
                const response = await getOrders();
                console.log('Fetched orders:', response);
                if (response && response.orders && Array.isArray(response.orders)) {
                    // Filter orders based on selected status
                    const filteredOrders = response.orders.filter(order => {
                        if (selectedStatus) {
                            return order.status.toLowerCase() === selectedStatus.toLowerCase();
                        }
                        return true; // If no status is selected, return all orders
                    });
                    setOrderHistory(filteredOrders);
                } else {
                    console.error('Unexpected response format:', response);
                    setError('ข้อมูลคำสั่งซื้อไม่ถูกต้อง');
                    setOrderHistory([]);
                }
            } catch (error) {
                console.error('Error fetching order history:', error);
                setError(error.message || 'ไม่สามารถดึงข้อมูลคำสั่งซื้อได้');
                setOrderHistory([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, [selectedStatus]); // Fetch orders whenever selectedStatus changes

    const toggleExpand = (orderNumber) => {
        setExpandedOrders((prev) => ({
            ...prev,
            [orderNumber]: !prev[orderNumber],
        }));
    };

    if (loading) {
        return <p>กำลังโหลด...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container mx-auto  px-4  max-w-screen-laptopl">
            <div className="max-w-screen-laptopl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                    {!loading && !error && orderHistory.length === 0 && (
                        <p className="text-center text-gray-500">ไม่พบคำสั่งซื้อ</p>
                    )}
                    {orderHistory.map((order) => {
                        if (!order.items) {
                            console.error('Order items are undefined for order:', order);
                            return null; // Skip this order if items are undefined
                        }

                        const subtotal = order.items.reduce(
                            (sum, item) => sum + (item.quantity * item.price || 0),
                            0
                        );
                        const tax = subtotal * 0.07; // Assuming 7% tax rate
                        const total = subtotal + tax;
                        const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0); // Calculate total quantity

                        return (
                            <div key={order._id} className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
                                <h2 className="text-lg font-semibold mb-2 text-orange-600">Order Number: {order._id}</h2>
                                <h2 className="text-lg font-semibold mb-2 text-orange-600">Order Date: {new Date(order.createdAt).toLocaleDateString()}</h2>
                                <p className="text-sm mb-2">Status: <span className="font-semibold text-blue-600">{order.status}</span></p>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left pb-2">Item</th>
                                                <th className="text-center pb-2">QTY</th>
                                                <th className="text-right pb-2">Price</th>
                                                <th className="text-right pb-2">Total Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.items.slice(0, expandedOrders[order._id] ? order.items.length : 1).map((item, index) => {
                                                const product = item.product; // Access the product directly

                                                return (
                                                    <tr key={product._id || index} className="border-b last:border-b-0">
                                                        <td className="py-3 flex items-center">
                                                            {Array.isArray(product.images) && product.images.length > 0 ? (
                                                                <img
                                                                    src={product.images[0].url} // Access the first image URL
                                                                    alt={product.name || 'Product image'}
                                                                    className="w-12 h-12 object-cover rounded mr-3"
                                                                />
                                                            ) : (
                                                                <div className="w-12 h-12 bg-gray-200 rounded mr-3"></div> // Fallback if no image
                                                            )}
                                                            <div>
                                                                <p className="font-medium">{product.name || 'Unknown Product'}</p>
                                                                <p className="text-xs text-gray-500">Color: {product.color || 'N/A'}</p>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">{item.quantity}</td>
                                                        <td className="text-right">${item.price?.toFixed(2) || '0.00'}</td>
                                                        <td className="text-right">${(item.quantity * item.price || 0).toFixed(2)}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                {order.items.length > 1 && (
                                    <button
                                        onClick={() => toggleExpand(order._id)}
                                        className="mt-2 text-blue-600 hover:underline"
                                    >
                                        {expandedOrders[order._id] ? 'ดูน้อยลง' : 'ดูเพิ่มเติม'}
                                    </button>
                                )}

                                <div className="mt-4 border-t pt-4">
                                    <p className="font-semibold">Subtotal: ${subtotal.toFixed(2)}</p>
                                    <p className="font-semibold">Tax (7%): ${tax.toFixed(2)}</p>
                                    <p className="font-semibold">Total: ${total.toFixed(2)}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Orderlist;


















