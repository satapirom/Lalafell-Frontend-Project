import React, { useEffect, useRef } from 'react';
import { IoIosArrowDropdown } from "react-icons/io";

const CategoryFilter = ({ isSizeOpen, toggleSize, handleCategorySelect, selectedCategory, onClose }) => {
    const filterRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const handleClick = (category) => {
        handleCategorySelect(category);
        onClose();
    };

    return (
        <div ref={filterRef} className="relative">
            <div
                className="flex items-center cursor-pointer bg-white/50 hover:bg-primary-color/15 text-gray-700  py-2 px-4 rounded-full transition duration-300 ease-in-out shadow-sm"
                onClick={toggleSize}
            >
                <label className="flex items-center cursor-pointer">
                    <span className="mr-2 hover:text-primary-color ">
                        Category: {selectedCategory || 'All'}
                    </span>
                    <IoIosArrowDropdown size={20} className="ml-1" />
                </label>
            </div>

            {isSizeOpen && (
                <div className='absolute top-full left-0 mt-2 z-30'>
                    <ul className="mb-4 custom-galssmorpuism p-4 rounded-lg w-80 shadow-md">
                        <li
                            className='block mr-2 cursor-pointer hover:bg-primary-color/80  rounded-md py-2 px-4 text-gray-800 hover:text-white'
                            onClick={() => handleClick('')}
                        >
                            All Products
                        </li>
                        <li
                            className='block mr-2 cursor-pointer hover:bg-primary-color/80 rounded-md py-2 px-4 text-gray-800 hover:text-white'
                            onClick={() => handleClick('keyboard')}
                        >
                            Keyboards
                        </li>
                        <li
                            className='block mr-2 cursor-pointer hover:bg-primary-color/80 rounded-md py-2 px-4 text-gray-800 hover:text-white'
                            onClick={() => handleClick('keycap')}
                        >
                            Key Caps
                        </li>
                        <li
                            className='block mr-2 cursor-pointer hover:bg-primary-color/80 rounded-md py-2 px-4 text-gray-800 hover:text-white'
                            onClick={() => handleClick('switch')}
                        >
                            Switch
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CategoryFilter;


