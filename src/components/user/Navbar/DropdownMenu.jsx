import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { useAuth } from "../../../contexts/AuthContext";

const DropdownMenu = ({ isOpen, onClose }) => {
    const { isLoggedIn, logout } = useAuth();

    if (!isOpen) return null;

    const handleLogout = () => {
        logout();
        onClose();
    };

    return (
        <div className="absolute top-12 right-0 mt-2 p-2 w-48 bg-primary-color/80 rounded-md shadow-lg z-50">
            {/* สำหรับผู้ใช้ที่ยังไม่ได้ล็อกอิน */}
            {!isLoggedIn ? (
                <>
                    <Link
                        to="/login"
                        onClick={onClose}
                        className="flex items-center px-4 py-2 text-white hover:text-primary-color hover:bg-white rounded-md transition-all duration-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="none"
                        >
                            <path
                                d="M14 3.09502C13.543 3.03241 13.0755 3 12.6 3C7.29807 3 3 7.02944 3 12C3 16.9706 7.29807 21 12.6 21C13.0755 21 13.543 20.9676 14 20.905"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                            <path
                                d="M13.5 14.5C12.9943 14.0085 11 12.7002 11 12M13.5 9.5C12.9943 9.99153 11 11.2998 11 12M11 12L21 12"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <span className="ml-2">Login</span>
                    </Link>

                    <Link
                        to="/register"
                        onClick={onClose}
                        className="flex items-center px-4 py-2 text-white hover:text-primary-color hover:bg-white rounded-md transition-all duration-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="none"
                        >
                            <path
                                d="M13.5 16.0001V14.0623C15.2808 12.6685 16.5 11 16.5 7.41681C16.5 5.09719 16.0769 3 13.5385 3C13.5385 3 12.6433 2 10.4923 2C7.45474 2 5.5 3.82696 5.5 7.41681C5.5 11 6.71916 12.6686 8.5 14.0623V16.0001L4.78401 17.1179C3.39659 17.5424 2.36593 18.6554 2.02375 20.0101C1.88845 20.5457 2.35107 21.0001 2.90639 21.0001H13.0936"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M18.5 22L18.5 15M15 18.5H22"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <span className="ml-2">Register</span>
                    </Link>


                </>
            ) : (
                <>
                    <Link
                        to="/profile"
                        onClick={onClose}
                        className="flex items-center px-4 py-2 text-white hover:text-primary-color hover:bg-white rounded-md transition-all duration-300"
                    >
                        <FaUser className="mr-2" />
                        <span>View Profile</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-white hover:text-primary-color hover:bg-white rounded-md transition-all duration-300"
                    >
                        Logout
                    </button>
                </>
            )}
        </div>
    );
};

export default DropdownMenu;

