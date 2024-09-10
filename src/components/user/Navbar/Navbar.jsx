import { useState } from 'react';
import IconSearch from './IconSearch';
import IconProfile from './IconProfile';
import IconCarts from '../Navbar/IconCarst';
import Sidebar from '../Sidebar/Sidebar';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // state การล็อกอิน

    return (
        <div className="relative z-100 shadow-lg rounded-b-3xl bg-white">
            <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
                <div className="container mx-auto max-w-screen-laptopl px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <img
                                onClick={() => setIsOpen(!isOpen)}
                                src='/images/icon-menu.svg'
                                className='cursor-pointer h-7 w-7 tablet:h-8 tablet:w-8 laptop:h-10 laptop:w-10'
                                alt="Menu"
                            />
                            <div className="flex flex-1 justify-center items-center">
                                <a href='#'>
                                    <h2 className='text-lg tablet:text-xl laptop:text-2xl font-bold text-gray-800'>
                                        Lalafell
                                    </h2>
                                </a>
                            </div>
                        </div>
                        <div className="flex space-x-4 items-center">
                            <IconSearch />
                            <IconCarts />
                            <IconProfile />
                        </div>
                    </div>
                </div>
                {isOpen && (
                    <div
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300"
                    />
                )}

                {/* ส่ง isLoggedIn และ setIsLoggedIn ไปที่ Sidebar */}
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

