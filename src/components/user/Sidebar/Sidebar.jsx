import { FaHome, FaShoppingCart, FaHeart, FaBoxOpen, FaUser, FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext"; // ปรับ path ตามที่คุณใช้
import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import OrderBox from "./OrderBox";

const Sidebar = ({ isOpen, onClose }) => {
    const { isLoggedIn, logout } = useAuth();
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get('/users/profile');
                setProfile(response.data.myUser);
            } catch (error) {
                console.error(error);
            }
        };

        if (isLoggedIn) {
            fetchProfile();
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        logout();
        onClose();
    };


    return (
        <div className={`fixed top-0 left-0 w-80 transform h-full bg-black/90 text-white shadow-lg p-6 transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="relative">
                <button
                    onClick={onClose}
                    className="absolute right-2 h-8 w-8 flex items-center justify-center text-white hover:text-gray-400 transition-colors"
                >
                    ✖️
                </button>
                <div className="flex flex-col space-y-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <Link to="/"
                            onClick={onClose}>
                            <span className="text-2xl font-semibold">Lalafell Keyboard</span>
                        </Link>
                    </div>

                    <ul className="space-y-4">
                        <Link to="/"
                            onClick={onClose}
                            className="flex items-center space-x-3 text-white hover:text-gray-700 hover:bg-[#E9E4D6] p-3 rounded-lg cursor-pointer transition-colors">
                            <FaHome size={22} />
                            <span className="text-lg">Home</span>
                        </Link>
                        <Link to="/products"
                            onClick={onClose}
                            className="flex items-center space-x-3 text-white hover:text-gray-700 hover:bg-[#E9E4D6] p-3 rounded-lg cursor-pointer transition-colors">
                            <FaShoppingCart size={22} />
                            <span className="text-lg">Shoping</span>
                        </Link>

                        {/* เมนูสำหรับผู้ใช้ที่ยังไม่ได้ล็อกอิน */}
                        {!isLoggedIn && (
                            <>
                                <Link to="/login"
                                    onClick={onClose}
                                    className="flex items-center space-x-3 text-white hover:text-gray-700 hover:bg-[#E9E4D6] p-3 rounded-lg cursor-pointer transition-colors">
                                    <FaSignInAlt size={22} />
                                    <span className="text-lg">Login</span>
                                </Link>
                                <Link to="/register"
                                    onClick={onClose}
                                    className="flex items-center space-x-3 text-white hover:text-gray-700 hover:bg-[#E9E4D6] p-3 rounded-lg cursor-pointer transition-colors">
                                    <FaUserPlus size={22} />
                                    <span className="text-lg">Sign Up</span>
                                </Link>
                            </>
                        )}

                        {/* เมนูสำหรับผู้ใช้ที่ล็อกอินแล้ว */}
                        {isLoggedIn && (
                            <>
                                <Link to="/profile"
                                    onClick={onClose}
                                    className="flex items-center space-x-3 text-white hover:text-gray-700 hover:bg-[#E9E4D6] p-3 rounded-lg cursor-pointer transition-colors">
                                    <FaUser size={22} />
                                    <span className="text-lg">Profile</span>
                                </Link>
                                <Link to="/wishlist"
                                    onClick={onClose}
                                    className="flex items-center space-x-3 text-white hover:text-gray-700 hover:bg-[#E9E4D6] p-3 rounded-lg cursor-pointer transition-colors">
                                    <FaHeart size={22} />
                                    <span className="text-lg">Wishlist</span>
                                </Link>
                                <li>
                                    <Link to="/cartpage"
                                        onClick={onClose}
                                        className="flex items-center text-white hover:text-gray-700 hover:bg-[#E9E4D6] p-3 rounded-lg cursor-pointer transition-colors">
                                        <OrderBox />
                                    </Link>
                                </li>
                                <li
                                    className="flex items-center space-x-3 text-white hover:text-gray-700 hover:bg-[#E9E4D6] p-3 rounded-lg cursor-pointer transition-colors" onClick={handleLogout}>
                                    <FaSignOutAlt size={22} />
                                    <span className="text-lg">Logout</span>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* เมนูโปรไฟล์สำหรับผู้ที่ล็อกอินแล้ว */}
                    {isLoggedIn && profile && (
                        <div className="flex items-center space-x-3 mt-6">
                            <img
                                src={profile.profileImage && profile.profileImage[0]?.url || '../images/avata-profile.png'}
                                alt={profile.username || 'User'}
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <p className="text-lg font-semibold">{profile.username || 'User'}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
