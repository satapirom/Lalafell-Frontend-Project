import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDropdown } from "react-icons/io";

const SizeFilter = ({ selectedSize, handleSizeSelect, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);
    const filterRef = useRef(null);

    const options = [
        { label: "All Sizes", value: '' },
        { label: "Full Size 100%", value: '100' },
        { label: "Size 96%", value: '96' },
        { label: "Size 80%", value: '80' },
        { label: "Size 75%", value: '75' },
        { label: "Size 60%", value: '60' },
    ];

    const toggleSizeDropdown = () => {
        setIsOpen(prev => !prev);
        if (isOpen && onClose) onClose();
    };

    const handleClickOutside = (event) => {
        if (filterRef.current && !filterRef.current.contains(event.target)) {
            setIsOpen(false);
            if (onClose) onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelectOption = (option) => {
        handleSizeSelect(option.value);
        setIsOpen(false);
        if (onClose) onClose();
    };

    return (
        <div ref={filterRef} className="relative min-w-[160px]">
            <div className="flex items-center cursor-pointer" onClick={toggleSizeDropdown}>
                <div className="flex items-center px-4 py-2 bg-gray-100 rounded-full hover:bg-primary-color/10 transition-all duration-300">
                    <span className="text-gray-700">
                        Product Size: {selectedSize || 'All'}
                    </span>
                    <IoIosArrowDropdown size={20} className="ml-2 text-gray-500" />
                </div>
            </div>

            {isOpen && (
                <ul className='absolute z-30 w-48 p-2 mt-1 border border-gray-300 rounded-lg custom-galssmorpuism shadow-lg'>
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 hover:bg-primary-color hover:text-white rounded-lg cursor-pointer transition-all"
                            onClick={() => handleSelectOption(option)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SizeFilter;






