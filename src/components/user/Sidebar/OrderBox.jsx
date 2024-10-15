import React from 'react';
import { FaBoxOpen } from "react-icons/fa";
import useCartCount from '../../../hooks/user/useCartCount';

const OrderBox = () => {
    const itemCount = useCartCount();

    return (
        <div className="relative inline-block">
            <div className="flex items-center space-x-3 pt-2 ">
                <FaBoxOpen size={22} />
                <span className="text-lg">Orders</span>
            </div>
            {itemCount > 0 && (
                <span className="absolute top-0 left-4 -mt-1 -mr-1 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                    {itemCount}
                </span>
            )}
        </div>
    );
};

export default OrderBox;