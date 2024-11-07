import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
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
            {!isLoggedIn ? (
                <>
                    <Link
                        to="/login"
                        onClick={onClose}
                        className="flex items-center px-4 py-2 text-white hover:text-primary-color hover:bg-white rounded-md transition-all duration-300"
                    >
                        <span className="ml-2">Login</span>
                    </Link>

                    <Link
                        to="/register"
                        onClick={onClose}
                        className="flex items-center px-4 py-2 text-white hover:text-primary-color hover:bg-white rounded-md transition-all duration-300"
                    >
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

