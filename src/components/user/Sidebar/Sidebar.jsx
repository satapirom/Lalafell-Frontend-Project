import { FaHome, FaShoppingCart, FaHeart, FaBoxOpen, FaUser, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const Sidebar = ({ isOpen, onClose, isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate(); // ใช้ navigate เพื่อเปลี่ยนหน้า

    console.log("isLoggedIn: ", isLoggedIn); // ตรวจสอบค่าของ isLoggedIn

    return (
        <div
            className={`fixed top-0 left-0 w-80 transform h-full bg-black/90 text-white shadow-lg p-6 transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
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
                        <li className="flex items-center space-x-3 hover:bg-gray-800 p-3 rounded-lg cursor-pointer transition-colors">
                            <FaHome size={22} />
                            <span className="text-lg">Home</span>
                        </li>
                        <li className="flex items-center space-x-3 hover:bg-gray-800 p-3 rounded-lg cursor-pointer transition-colors">
                            <FaShoppingCart size={22} />
                            <span className="text-lg">Products</span>
                        </li>

                        {!isLoggedIn ? (
                            <>
                                <div
                                    onClick={() => {
                                        setIsLoggedIn(true); // อัปเดต state isLoggedIn
                                        navigate('/login');
                                        onClose();
                                    }}
                                    className="flex items-center space-x-3 hover:bg-gray-800 p-3 rounded-lg cursor-pointer transition-colors">
                                    <FaSignInAlt size={22} />
                                    <span className="text-lg">Login</span>
                                </div>
                                <div
                                    onClick={() => {
                                        navigate('/register');
                                        onClose();
                                    }}
                                    className="flex items-center space-x-3 hover:bg-gray-800 p-3 rounded-lg cursor-pointer transition-colors">
                                    <FaUserPlus size={22} />
                                    <span className="text-lg">Sign Up</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <li className="flex items-center space-x-3 hover:bg-gray-800 p-3 rounded-lg cursor-pointer transition-colors">
                                    <FaUser size={22} />
                                    <span className="text-lg">Profile</span>
                                </li>
                                <li className="flex items-center space-x-3 hover:bg-gray-800 p-3 rounded-lg cursor-pointer transition-colors">
                                    <FaHeart size={22} />
                                    <span className="text-lg">Wishlist</span>
                                </li>
                                <li className="flex items-center space-x-3 hover:bg-gray-800 p-3 rounded-lg cursor-pointer transition-colors">
                                    <FaBoxOpen size={22} />
                                    <span className="text-lg">Orders</span>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

