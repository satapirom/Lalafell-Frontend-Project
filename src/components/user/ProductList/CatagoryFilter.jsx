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
            <div className='flex items-center cursor-pointer' onClick={toggleSize}>
                <label className="flex items-center mr-2 hover:text-gray-800 hover:underline underline-custom cursor-pointer">
                    Category: {selectedCategory || 'All'}
                    <IoIosArrowDropdown size={20} className='ml-2' />
                </label>
            </div>
            {isSizeOpen && (
                <div className='absolute top-full left-0 mt-2 z-30'>
                    <div className="mb-4 bg-white p-4 rounded-lg w-80 shadow-md">
                        <h4
                            className='block mr-2 cursor-pointer hover:bg-[#E9E4D6]/80 rounded-md py-2 px-4 text-gray-800'
                            onClick={() => handleClick('')}
                        >
                            All Products
                        </h4>
                        <h4
                            className='block mr-2 cursor-pointer hover:bg-[#E9E4D6]/80 rounded-md py-2 px-4 text-gray-800'
                            onClick={() => handleClick('keyboard')}
                        >
                            Keyboards
                        </h4>
                        <h4
                            className='block mr-2 cursor-pointer hover:bg-[#E9E4D6]/80 rounded-md py-2 px-4 text-gray-800'
                            onClick={() => handleClick('keycap')}
                        >
                            Key Caps
                        </h4>
                        <h4
                            className='block mr-2 cursor-pointer hover:bg-[#E9E4D6]/80 rounded-md py-2 px-4 text-gray-800'
                            onClick={() => handleClick('switch')}
                        >
                            Switch
                        </h4>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryFilter;


