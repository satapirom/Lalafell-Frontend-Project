import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { useAuth } from "../../../contexts/AuthContext";

const DropdownMenu = ({ isOpen, onClose }) => {
    const { isLoggedIn, logout } = useAuth(); // ใช้ useAuth เพื่อดึงข้อมูลการล็อกอินและฟังก์ชัน logout

    if (!isOpen) return null;

    const handleLogout = () => {
        logout();
        onClose();
    };

    return (
        <div className="absolute top-12 right-0 mt-2 p-2 w-48 bg-black/90 rounded-md shadow-lg z-50">
            {/* สำหรับผู้ใช้ที่ยังไม่ได้ล็อกอิน */}
            {!isLoggedIn ? (
                <>
                    <Link
                        to="/login"
                        onClick={onClose}
                        className="flex items-center px-4 py-2 text-white hover:text-gray-700 hover:bg-[#E9E4D6] rounded-md"
                    >
                        <FaSignInAlt className="mr-2" />
                        <span>Login</span>
                    </Link>
                    <Link
                        to="/register"
                        onClick={onClose}
                        className="flex items-center px-4 py-2 text-white hover:text-gray-700 hover:bg-[#E9E4D6] rounded-md"
                    >
                        <FaUserPlus className="mr-2" />
                        <span>Sign Up</span>
                    </Link>
                </>
            ) : (
                <>
                    <Link
                        to="/profile"
                        onClick={onClose}
                        className="flex items-center px-4 py-2 text-white hover:text-gray-700 hover:bg-[#E9E4D6] rounded-md"
                    >
                        <FaUser className="mr-2" />
                        <span>View Profile</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-white hover:text-gray-700 hover:bg-[#E9E4D6] rounded-md"
                    >
                        Logout
                    </button>
                </>
            )}
        </div>
    );
};

export default DropdownMenu;
