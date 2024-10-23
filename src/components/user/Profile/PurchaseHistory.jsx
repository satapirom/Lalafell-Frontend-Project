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
        <div className="p-8 custom-bg rounded-lg ">
            {purchaseHistory.length > 1 && (
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="#000000" fill="none">
                        <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                        <path d="M11 7.5H17M8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11 12H17M8 12C8 12.2761 7.77614 12.5 7.5 12.5C7.22386 12.5 7 12.2761 7 12C7 11.7239 7.22386 11.5 7.5 11.5C7.77614 11.5 8 11.7239 8 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11 16.5H17M8 16.5C8 16.7761 7.77614 17 7.5 17C7.22386 17 7 16.7761 7 16.5C7 16.2239 7.22386 16 7.5 16C7.77614 16 8 16.2239 8 16.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <Link to="/orderlist" className="text-xl font-bold hover:text-primary-color ">
                        View Purchase
                    </Link>
                </div>
            )}
            {recentHistory.length > 0 ? (
                <ul>
                    {recentHistory.map((history) => (
                        <li key={history.id} className="mb-4 mt-6">
                            <div className="flex items-center custom-galssmorpuism shadow-sm p-4 rounded-lg  transition-shadow border ">
                                {/* แสดงรูปภาพของสินค้า */}
                                <img
                                    src={history.Images}
                                    alt={history.name}
                                    className="w-20 h-20 rounded-lg object-cover mb-4 tablet:w-24 tablet:h-24 laptop:w-24 laptop:h-24 desktop:w-24 desktop:h-24 laptopl:w-24 laptopl:h-24 mr-4" // ปรับขนาดรูปภาพที่นี่
                                />
                                <div className="flex flex-col flex-1">
                                    {/* เงื่อนไขสำหรับ mobile */}

                                    {/* ชื่อสินค้า */}
                                    <h3 className="text-lg mobile:text-xl tablet:text-xl laptop:text-xl desktop:text-xl laptopl:text-xl font-semibold mb-2 text-gray-800">{history.name}</h3>
                                    <div className="hidden tablet:block"> {/* ซ่อนข้อมูลในมือถือ */}
                                        {/* รายละเอียด */}
                                        <p className="text-gray-600">
                                            <span
                                                className="text-md tablet:text-lg laptop:text-lg desktop:text-lg laptopl:text-lg">
                                                Price:
                                            </span>
                                            ${history.price ? history.price.toFixed(2) : 'N/A'}
                                            &nbsp;|&nbsp;
                                            <span
                                                className=" text-md tablet:text-lg laptop:text-lg desktop:text-lg laptopl:text-lg">
                                                Quantity:
                                            </span>
                                            {history.quantity || 'N/A'}

                                            &nbsp;|&nbsp;
                                            <span
                                                className=" text-md tablet:text-lg laptop:text-lg desktop:text-lg laptopl:text-lg">
                                                Total:
                                            </span>
                                            ${history.total ? history.total.toFixed(2) : 'N/A'}
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



