import { FaHome, FaShoppingCart, FaHeart, FaBoxOpen, FaUser, FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext"; // ปรับ path ตามที่คุณใช้

const Sidebar = ({ isOpen, onClose }) => {
    const { isLoggedIn, logout } = useAuth();

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
                        <span className="text-2xl font-semibold">Lalafell Keyboard</span>
                    </div>

                    <ul className="space-y-4">
                        <Link to="/"
                            onClick={onClose}
                            className="flex items-center space-x-3 text-white hover:text-gray-700 hover:bg-[#E9E4D6] p-3 rounded-lg cursor-pointer transition-colors">
                            <FaHome size={22} />
                            <span className="text-lg">Home</span>
                        </Link>
                        <li className="flex items-center space-x-3 text-white hover:text-gray-700 hover:bg-[#E9E4D6] p-3 rounded-lg cursor-pointer transition-colors">
                            <FaShoppingCart size={22} />
                            <span className="text-lg">Products</span>
                        </li>

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
                                <li className="flex items-center space-x-3 text-white hover:text-gray-700 hover:bg-[#E9E4D6] p-3 rounded-lg cursor-pointer transition-colors">
                                    <FaUser size={22} />
                                    <span className="text-lg">Profile</span>
                                </li>
                                <li className="flex items-center space-x-3 text-white hover:text-gray-700 hover:bg-[#E9E4D6] p-3 rounded-lg cursor-pointer transition-colors">
                                    <FaHeart size={22} />
                                    <span className="text-lg">Wishlist</span>
                                </li>
                                <li className="flex items-center space-x-3 text-white hover:text-gray-700 hover:bg-[#E9E4D6] p-3 rounded-lg cursor-pointer transition-colors">
                                    <FaBoxOpen size={22} />
                                    <span className="text-lg">Orders</span>
                                </li>
                                <li className="flex items-center space-x-3 text-white hover:text-gray-700 hover:bg-[#E9E4D6] p-3 rounded-lg cursor-pointer transition-colors" onClick={handleLogout}>
                                    <FaSignOutAlt size={22} />
                                    <span className="text-lg">Logout</span>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* เมนูโปรไฟล์สำหรับผู้ที่ล็อกอินแล้ว */}
                    {isLoggedIn && (
                        <div className="flex items-center space-x-3 mt-6">
                            <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full" />
                            <div>
                                <p className="text-lg font-semibold">Dianne Robertson</p>
                                <p className="text-sm text-gray-400">View Profile</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
