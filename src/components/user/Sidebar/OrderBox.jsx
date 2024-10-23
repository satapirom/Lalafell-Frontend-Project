import React from 'react';
import { FaBoxOpen } from "react-icons/fa";
import useCartCount from '../../../hooks/user/useCartCount';

const OrderBox = () => {
    const itemCount = useCartCount();

    return (
        <div className="relative inline-block">
            <div className="flex items-center space-x-3 pt-2 ">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                        <path d="M13 21H10.9325C8.18162 21 6.8062 21 5.8516 20.2402C4.55052 19.1942 4.46138 17.0725 4.20066 15.5878L3.60807 12.2134C3.50177 11.6081 3.09673 11.0876 2.51841 10.8132C2.37896 10.747 2.27952 10.6235 2.24894 10.4784C2.07874 9.67075 1.6264 8.5469 2.63812 8.10084C2.86684 8 3.17922 8 3.80397 8H7.5M11.5 8H20.196C20.8208 8 21.1332 8 21.3619 8.10084C22.3736 8.5469 21.9213 9.67075 21.7511 10.4784C21.7205 10.6235 21.621 10.747 21.4816 10.8132C21.1491 10.971 20.8738 11.2102 20.6797 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M15 17.5H22M18.5 21L18.5 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M6.5 11L10 3M15 3L17.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                </span>
                <span className="text-lg">Orders</span>
            </div>
            {itemCount > 0 && (
                <span className="absolute top-0 left-4 -mt-1 -mr-1 animate-bounce bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                    {itemCount}
                </span>
            )}
        </div>
    );
};

export default OrderBox;