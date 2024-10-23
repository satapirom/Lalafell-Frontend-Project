import React from 'react';
import { Link } from 'react-router-dom';
import useCartCount from '../../../hooks/user/useCartCount';

const ShoppingCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffffff"} fill={"none"}>
        <path d="M11.5 22H9.62182C7.27396 22 6.10003 22 5.28565 21.2945C4.47127 20.5889 4.27181 19.3991 3.87289 17.0194L2.66933 9.83981C2.48735 8.75428 2.39637 8.21152 2.68773 7.85576C2.9791 7.5 3.51461 7.5 4.58564 7.5H19.4144C20.4854 7.5 21.0209 7.5 21.3123 7.85576C21.6036 8.21152 21.5126 8.75428 21.3307 9.83981L21.0524 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M13.6418 14.4418C14.8486 13.7108 15.9018 14.0054 16.5345 14.4747C16.794 14.6671 16.9237 14.7633 17 14.7633C17.0763 14.7633 17.206 14.6671 17.4655 14.4747C18.0982 14.0054 19.1514 13.7108 20.3582 14.4418C21.9419 15.4013 22.3002 18.5666 18.6472 21.237C17.9514 21.7457 17.6035 22 17 22C16.3965 22 16.0486 21.7457 15.3528 21.237C11.6998 18.5666 12.0581 15.4013 13.6418 14.4418Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M17.5 7.5C17.5 4.46243 15.0376 2 12 2C8.96243 2 6.5 4.46243 6.5 7.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

const IconCarts = () => {
    const itemCount = useCartCount();

    return (
        <div className="relative group">
            <Link to='/cartpage' className="block">
                <div className="p-2 bg-primary-color rounded-full shadow-md transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6 hover:shadow-lg hover:bg-secondary-color">
                    <ShoppingCartIcon className="w-6 h-6 cursor-pointer text-white transition-colors duration-300 group-hover:text-blue-100" />
                </div>
                {itemCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-[#ff5e5e] text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg transition-all duration-300 transform group-hover:scale-125 group-hover:-rotate-12">
                        <span>{itemCount}</span>
                    </div>
                )}
            </Link>
            {itemCount > 0 && (
                <div className="absolute -bottom-16 w-48 right-0 bg-primary-color text-white text-sm font-bold py-3 px-4 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform rotate-3">
                    <span className="border-b-2 border-white">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
                    <span className="block">in cart</span>
                </div>
            )}
        </div>
    );
};

export default IconCarts;







