import { FaHome, FaShoppingCart, FaHeart, FaUser, FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import OrderBox from "./OrderBox";

const cancelIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#ffffff"} fill={"none"}>
    <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>
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
        <div className={`fixed top-0 left-0 w-80 max-w-screen-lg transform h-full bg-white/20 backdrop-blur-md border-b border-gray-200 text-white shadow-lg p-6 transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="relative">
                <button
                    onClick={onClose}
                    className="absolute right-2 h-8 w-8 flex items-center justify-center text-white hover:text-gray-400 transition-colors"
                >
                    {cancelIcon}
                </button>
                <div className="flex flex-col space-y-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <Link to="/"
                            onClick={onClose}>
                            <span className="text-2xl font-semibold ">Lalafell Keyboard</span>
                        </Link>
                    </div>

                    <ul className="space-y-4">
                        <Link to="/"
                            onClick={onClose}
                            className="flex items-center space-x-3 text-white hover:bg-primary-color/50 p-3 rounded-lg cursor-pointer transition-colors">
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    color="#ffffff"
                                    fill="none">
                                    <path d="M8.9995 22L8.74887 18.4911C8.61412 16.6046 10.1082 15 11.9995 15C13.8908 15 15.3849 16.6046 15.2501 18.4911L14.9995 22" stroke="currentColor" stroke-width="1.5" />
                                    <path d="M2.35157 13.2135C1.99855 10.9162 1.82204 9.76763 2.25635 8.74938C2.69065 7.73112 3.65421 7.03443 5.58132 5.64106L7.02117 4.6C9.41847 2.86667 10.6171 2 12.0002 2C13.3832 2 14.5819 2.86667 16.9792 4.6L18.419 5.64106C20.3462 7.03443 21.3097 7.73112 21.744 8.74938C22.1783 9.76763 22.0018 10.9162 21.6488 13.2135L21.3478 15.1724C20.8473 18.4289 20.5971 20.0572 19.4292 21.0286C18.2613 22 16.5538 22 13.139 22H10.8614C7.44652 22 5.73909 22 4.57118 21.0286C3.40327 20.0572 3.15305 18.4289 2.65261 15.1724L2.35157 13.2135Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                </svg>
                            </span>
                            <span className="text-lg">Home</span>
                        </Link>
                        <Link to="/products"
                            onClick={onClose}
                            className="flex items-center space-x-3 text-white hover:bg-primary-color/50  p-3 rounded-lg cursor-pointer transition-colors">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                    <path d="M8 16H15.2632C19.7508 16 20.4333 13.1808 21.261 9.06908C21.4998 7.88311 21.6192 7.29013 21.3321 6.89507C21.045 6.5 20.4947 6.5 19.3941 6.5H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M8 16L5.37873 3.51493C5.15615 2.62459 4.35618 2 3.43845 2H2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M8.88 16H8.46857C7.10522 16 6 17.1513 6 18.5714C6 18.8081 6.1842 19 6.41143 19H17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <circle cx="10.5" cy="20.5" r="1.5" stroke="currentColor" stroke-width="1.5" />
                                    <circle cx="17.5" cy="20.5" r="1.5" stroke="currentColor" stroke-width="1.5" />
                                </svg>
                            </span>

                            <span className="text-lg">Shop</span>
                        </Link>

                        {!isLoggedIn && (
                            <>
                                <Link to="/login"
                                    onClick={onClose}
                                    className="flex items-center space-x-3 text-white hover:bg-primary-color/50 p-3 rounded-lg cursor-pointer transition-colors">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                            <path d="M14 3.09502C13.543 3.03241 13.0755 3 12.6 3C7.29807 3 3 7.02944 3 12C3 16.9706 7.29807 21 12.6 21C13.0755 21 13.543 20.9676 14 20.905" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M13.5 14.5C12.9943 14.0085 11 12.7002 11 12M13.5 9.5C12.9943 9.99153 11 11.2998 11 12M11 12L21 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </span>
                                    <span className="text-lg">Login</span>
                                </Link>
                                <Link to="/register"
                                    onClick={onClose}
                                    className="flex items-center space-x-3 text-white hover:bg-primary-color/50  p-3 rounded-lg cursor-pointer transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                        <path d="M13.5 16.0001V14.0623C15.2808 12.6685 16.5 11 16.5 7.41681C16.5 5.09719 16.0769 3 13.5385 3C13.5385 3 12.6433 2 10.4923 2C7.45474 2 5.5 3.82696 5.5 7.41681C5.5 11 6.71916 12.6686 8.5 14.0623V16.0001L4.78401 17.1179C3.39659 17.5424 2.36593 18.6554 2.02375 20.0101C1.88845 20.5457 2.35107 21.0001 2.90639 21.0001H13.0936" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M18.5 22L18.5 15M15 18.5H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span className="text-lg">Sign Up</span>
                                </Link>
                            </>
                        )}

                        {isLoggedIn && (
                            <>
                                <Link to="/profile"
                                    onClick={onClose}
                                    className="flex items-center space-x-3 text-white hover:bg-primary-color/50  p-3 rounded-lg cursor-pointer transition-colors">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                            <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" stroke-width="1.5" />
                                        </svg>
                                    </span>
                                    <span className="text-lg">Profile</span>
                                </Link>
                                <Link to="/wishlist"
                                    onClick={onClose}
                                    className="flex items-center space-x-3 text-white hover:bg-primary-color/50  p-3 rounded-lg cursor-pointer transition-colors">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                                            <path d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        </svg>
                                    </span>
                                    <span className="text-lg">Wishlist</span>
                                </Link>
                                <li>
                                    <Link to="/cartpage"
                                        onClick={onClose}
                                        className="flex items-center text-white hover:bg-primary-color/50  p-3 rounded-lg cursor-pointer transition-colors">
                                        <OrderBox />
                                    </Link>
                                </li>
                                <li
                                    className="flex items-center space-x-3 text-white hover:bg-primary-color/50 p-3 rounded-lg cursor-pointer transition-colors duration-300"
                                    onClick={handleLogout}
                                >
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-white"
                                        >
                                            <path d="M14 3.095C13.543 3.032 13.075 3 12.6 3 7.298 3 3 7.03 3 12c0 4.971 4.298 9 9.6 9 .475 0 .943-.032 1.4-.095" />
                                            <path d="M21 12H11M21 12c0-.7-1.994-2.008-2.5-2.5M21 12c0 .7-1.994 2.008-2.5 2.5" />
                                        </svg>
                                    </span>
                                    <span className="text-lg">Logout</span>
                                </li>

                            </>
                        )}
                    </ul>
                    {isLoggedIn && profile && (
                        <Link to="/profile" onClick={onClose} className="block">
                            <div className="flex items-center space-x-3 mt-6 bg-primary-color/50 p-3 rounded-lg">
                                <img
                                    src={profile.profileImage && profile.profileImage[0]?.url || '../images/avata-profile.png'}
                                    alt={profile.username || 'User'}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="text-lg font-semibold">{profile.username || 'user name'}</p>
                                    <p className="text-white text-sm">{profile.email}</p>
                                </div>
                            </div>
                        </Link>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Sidebar;

