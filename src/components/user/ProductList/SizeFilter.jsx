import React, { useRef, useEffect } from 'react';
import { IoIosArrowDropdown } from "react-icons/io";

const SizeFilter = ({ isSizeOpen, toggleSize, handleSizeSelect, selectedSize, onClose }) => {
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

    const handleClick = (size) => {
        handleSizeSelect(size);
        onClose();
    };

    return (
        <div ref={filterRef} className="relative">
            <div className='flex items-center cursor-pointer' onClick={toggleSize}>
                <div className="flex items-center mx-4 hover:text-gray-800 hover:underline underline-custom cursor-pointer">
                    Product Size: {selectedSize || 'All'}
                    <IoIosArrowDropdown size={20} className='ml-2' />
                </div>
            </div>
            {isSizeOpen && (
                <div className='absolute top-full left-0 mt-2 z-30'>
                    <div className="mb-4 bg-white p-4 rounded-lg w-80 shadow-md">
                        <h4
                            className='block mr-2 cursor-pointer hover:bg-[#E9E4D6]/80 rounded-md py-2 px-4 text-gray-800'
                            onClick={() => handleClick('')}
                        >
                            All Sizes
                        </h4>
                        <h4
                            className='block mr-2 cursor-pointer hover:bg-[#E9E4D6]/80 rounded-md py-2 px-4 text-gray-800'
                            onClick={() => handleClick('100')}
                        >
                            Full Size 100%
                        </h4>
                        <h4
                            className='block mr-2 cursor-pointer hover:bg-[#E9E4D6]/80 rounded-md py-2 px-4 text-gray-800'
                            onClick={() => handleClick('96')}
                        >
                            Size 96%
                        </h4>
                        <h4
                            className='block mr-2 cursor-pointer hover:bg-[#E9E4D6]/80 rounded-md py-2 px-4 text-gray-800'
                            onClick={() => handleClick('80')}
                        >
                            Size 80%
                        </h4>
                        <h4
                            className='block mr-2 cursor-pointer hover:bg-[#E9E4D6]/80 rounded-md py-2 px-4 text-gray-800'
                            onClick={() => handleClick('75')}
                        >
                            Size 75%
                        </h4>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SizeFilter;





