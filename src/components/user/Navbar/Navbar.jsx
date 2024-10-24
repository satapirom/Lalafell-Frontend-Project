import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IconSearch from './IconSearch';
import IconProfile from './IconProfile';
import IconCarts from '../Navbar/IconCarst';
import Sidebar from '../Sidebar/Sidebar';
import useAuthForNavigate from '../../../hooks/user/useAuthForNavigate';
import Logo from '../Banner/Logo';

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffffff"} fill={"none"}>
        <path d="M4 8.5L20 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 15.5L20 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useAuthForNavigate();

    return (
        <div className="relative z-100">
            <div className="fixed top-0 left-0 right-0 z-50 bg-white/70 shadow-sm rounded-b-3xl">
                <div className="container mx-auto max-w-screen-laptopl px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div
                                onClick={() => setIsOpen(!isOpen)}
                                className="cursor-pointer bg-primary-color p-2 rounded-md shadow-md transition-colors duration-300 transform hover:scale-110"
                            >
                                <MenuIcon />
                            </div>
                            <div className="flex flex-1 justify-center items-center">
                                <Link to="/" className="transform hover:scale-110 transition-transform duration-300">
                                    <Logo />
                                </Link>
                            </div>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <IconSearch />
                            <IconCarts />
                            <IconProfile onClose={() => setIsOpen(false)} />
                        </div>
                    </div>
                </div>
                {isOpen && (
                    <div
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300"
                    />
                )}
                <Sidebar
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                />
            </div>
        </div>
    );
};

export default Navbar;


