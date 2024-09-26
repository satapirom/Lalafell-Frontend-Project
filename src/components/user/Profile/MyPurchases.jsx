import React from 'react';
import { FaCreditCard, FaTruck, FaBoxOpen, FaStar, FaUndoAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Component สำหรับแสดงไอคอนที่มีสีและพื้นหลัง โดยส่งไอคอนผ่าน props แทน children
const ColorfulIcon = ({ icon, color }) => {
    return (
        <div className={`w-12 h-12 flex items-center justify-center rounded-full ${color}`}>
            {icon}
        </div>
    );
};

// ข้อมูลสำหรับรายการซื้อ แต่ละรายการมีไอคอนและชื่อ
const purchaseItems = [
    {
        icon: <FaCreditCard className="w-6 h-6 text-yellow-500" />,
        label: 'Payment',
        bgColor: 'bg-yellow-100',
    },
    {
        icon: <FaTruck className="w-6 h-6 text-blue-500" />,
        label: 'To Ship',
        bgColor: 'bg-blue-100',
    },
    {
        icon: <FaBoxOpen className="w-6 h-6 text-green-500" />,
        label: 'To Receive',
        bgColor: 'bg-green-100',
    },
    {
        icon: <FaStar className="w-6 h-6 text-purple-500" />,
        label: 'To Rate',
        bgColor: 'bg-purple-100',
    },
    {
        icon: <FaUndoAlt className="w-6 h-6 text-indigo-500" />,
        label: 'Refund/Return',
        bgColor: 'bg-indigo-100',
    },
    {
        icon: <FaCheckCircle className="w-6 h-6 text-pink-500" />,
        label: 'Completed',
        bgColor: 'bg-pink-100',
    },
    {
        icon: <FaTimesCircle className="w-6 h-6 text-red-500" />,
        label: 'Cancelled',
        bgColor: 'bg-red-100',
    },
];

const MyPurchases = () => {
    return (
        <div className="p-4">
            {/* ส่วนของการแสดงรายการการซื้อ */}
            <div className="flex overflow-x-auto items-center justify-start tablet:justify-center space-x-4">
                {purchaseItems.map((item, index) => (
                    <div key={index} className="flex flex-col items-center justify-center text-center transition-transform duration-300 ease-in-out cursor-pointer hover:-translate-y-1 min-w-[80px]">
                        {/* ใช้ ColorfulIcon เพื่อกำหนดสีพื้นหลังและแสดงไอคอน */}
                        <ColorfulIcon icon={item.icon} color={item.bgColor} />
                        {/* แสดงชื่อของแต่ละไอคอน */}
                        <p className="mt-2 text-sm font-medium text-gray-600">{item.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyPurchases;


