import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaUndoAlt, FaTruck } from 'react-icons/fa'; // ไอคอน

// ข้อมูลประวัติการซื้อ
const purchaseHistory = [
    { id: 1, Images: "../images/Switch.jpg", name: 'Lalafell Keyboard', price: 1290.90, quantity: 1, total: 1290.90, label: 'Completed', date: '2024-09-20', timestamp: '2024-09-20T10:30:00' },
    { id: 2, Images: "/path/to/image2.jpg", name: 'Lalafell Keyboard', price: 1290.90, quantity: 1, total: 1290.90, label: 'Cancelled', date: '2024-09-18', timestamp: '2024-09-18T12:00:00' },
    { id: 3, Images: "/path/to/image3.jpg", name: 'Lalafell Keyboard', price: 1290.90, quantity: 1, total: 1290.90, label: 'Refund/Return', date: '2024-09-15', timestamp: '2024-09-15T14:00:00' },
    { id: 4, Images: "/path/to/image4.jpg", name: 'Lalafell Keyboard', label: 'Receive Product', date: '2024-09-10', timestamp: '2024-09-10T16:30:00' },
];

const PurchaseHistory = () => {
    // เรียงตาม timestamp
    const sortedHistory = purchaseHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const recentHistory = sortedHistory.slice(0, 1); // แสดง 1 รายการล่าสุด

    const getStatusIcon = (label) => {
        switch (label) {
            case 'Completed':
                return <FaCheckCircle className="text-green-500 text-xl mr-2" />;
            case 'Cancelled':
                return <FaTimesCircle className="text-red-500 text-xl mr-2" />;
            case 'Refund/Return':
                return <FaUndoAlt className="text-yellow-500 text-xl mr-2" />;
            case 'Receive Product':
                return <FaTruck className="text-blue-500 text-xl mr-2" />;
            default:
                return null;
        }
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
            {purchaseHistory.length > 1 && (
                <Link to="/purchase-history" className="text-xl text-gray-800 font-bold hover:text-blue-600">
                    View Purchase History
                </Link>
            )}
            {recentHistory.length > 0 ? (
                <ul>
                    {recentHistory.map((history) => (
                        <li key={history.id} className="mb-4 mt-6">
                            <div className="flex items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 flex">
                                {/* แสดงรูปภาพของสินค้า */}
                                <img
                                    src={history.Images}
                                    alt={history.name}
                                    className="w-20 h-20 rounded-full object-cover mb-4 tablet:w-24 tablet:h-24 laptop:w-24 laptop:h-24 desktop:w-24 desktop:h-24 laptopl:w-24 laptopl:h-24 mr-4" // ปรับขนาดรูปภาพที่นี่
                                />
                                <div className="flex flex-col flex-1">
                                    {/* เงื่อนไขสำหรับ mobile */}

                                    {/* ชื่อสินค้า */}
                                    <h3 className="text-lg mobile:text-xl tablet:text-xl laptop:text-xl desktop:text-xl laptopl:text-xl font-semibold mb-2 text-gray-800">{history.name}</h3>
                                    <div className="hidden tablet:block"> {/* ซ่อนข้อมูลในมือถือ */}
                                        {/* รายละเอียด */}
                                        <p className="text-gray-600">
                                            <span className="font-medium text-md tablet:text-lg laptop:text-lg desktop:text-lg laptopl:text-lg">Price:</span> ${history.price ? history.price.toFixed(2) : 'N/A'}
                                            &nbsp;|&nbsp;
                                            <span className="font-medium text-md tablet:text-lg laptop:text-lg desktop:text-lg laptopl:text-lg">Quantity:</span> {history.quantity || 'N/A'}
                                            &nbsp;|&nbsp;
                                            <span className="font-medium text-md tablet:text-lg laptop:text-lg desktop:text-lg laptopl:text-lg">Total:</span> ${history.total ? history.total.toFixed(2) : 'N/A'}
                                        </p>
                                    </div>

                                    {/* สถานะการซื้อ */}
                                    <div className="flex items-center mt-2">
                                        {getStatusIcon(history.label)}
                                        <p className={`text-xs font-medium  tablet:text-lg laptop:text-lg desktop:text-lg laptopl:text-lg ${history.label === 'Completed' ? 'text-green-500' :
                                            history.label === 'Cancelled' ? 'text-red-500' :
                                                history.label === 'Refund/Return' ? 'text-yellow-500' :
                                                    'text-blue-500'
                                            }`}>
                                            {history.label} - {history.date}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex tablet:flex-col items-center">
                    <img src="../images/crying (1).png"
                        alt="No purchase"
                        className="w-8 tablet:w-16 h-8 tablet:h-16 rounded-full object-cover tablet:mb-4 mr-2 tablet:0"
                    />
                    <p className="text-gray-400 text-xs tablet:text-base text-center">No purchase history available at the moment.</p>
                </div>
            )}
        </div>
    );
};

export default PurchaseHistory;



