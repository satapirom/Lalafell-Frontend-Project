import { useState, useEffect } from 'react';
import { getOrders } from '../../../services/orderServices';

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
                    setError('invalid response format');
                    setOrderHistory([]);
                }
            } catch (error) {
                console.error('Error fetching order history:', error);
                setError(error.message || 'Failed to fetch order history');
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
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container mx-auto my-6 custom-bg rounded-lg max-w-screen-laptopl">
            <div className="max-w-screen-laptopl mx-auto overflow-hidden">
                <div className="p-6">
                    {!loading && !error && orderHistory.length === 0 && (
                        <p className="text-center text-gray-500">No orders found.</p>
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
                            <div key={order._id} className="mb-6 p-8 custom-galssmorpuism shadow-sm">
                                <h1 className="text-lg font-medium text-primary-color border bg-primary-color/15 rounded-md px-4 py-1">Order Number: {order._id}</h1>
                                <span className="text-lg  px-4 py-1">Order Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                                <span className="text-lg px-4 py-1">Status: <span className=" text-primary-color">{order.status}</span></span>

                                <div className="overflow-x-auto px-8  my-8">
                                    <table className="w-full text-lg ">
                                        <thead>
                                            <tr className="border-b ">
                                                <th className="text-left pb-2 font-normal">Item</th>
                                                <th className="text-center pb-2 font-normal">QTY</th>
                                                <th className="text-right pb-2 font-normal">Price</th>
                                                <th className="text-right pb-2 font-normal">Total Price</th>
                                            </tr>
                                        </thead>
                                        <tbody className='hover:bg-gray-50 rounded-lg cursor-pointer transition duration-300 '>
                                            {order.items.slice(0, expandedOrders[order._id] ? order.items.length : 1).map((item, index) => {
                                                const product = item.product; // Access the product directly

                                                return (
                                                    <tr key={product._id || index} className="border-b last:border-b-0 ">
                                                        <td className="py-3 flex items-center px-4 ">
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
                                                        <td className="text-right px-4">${(item.quantity * item.price || 0).toFixed(2)}</td>
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

                                <div className="flex flex-col items-end text-lg mt-4 border-t pt-4">
                                    <p>Subtotal: ${subtotal.toFixed(2)}</p>
                                    <p>Tax (7%): ${tax.toFixed(2)}</p>
                                    <p className='bg-primary-color/15 rounded-md px-4 py-1'>Total: ${total.toFixed(2)}</p>
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


















