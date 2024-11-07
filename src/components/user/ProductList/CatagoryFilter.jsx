import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowDropdown } from "react-icons/io";

const CategoryFilter = ({ selectedCategory, handleCategorySelect, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);
    const filterRef = useRef(null);

    const options = [
        { label: "All Products", value: '' },
        { label: "Keyboards", value: 'keyboard' },
        { label: "Key Caps", value: 'keycap' },
        { label: "Switch", value: 'switch' },
    ];

    const toggleCategoryDropdown = () => {
        setIsOpen(prev => !prev);
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
        handleCategorySelect(option.value);
        setIsOpen(false);
        if (onClose) onClose();
    };

    return (
        <div ref={filterRef} className="relative min-w-[160px]">
            <div
                className="flex items-center cursor-pointer bg-gray-100 hover:bg-primary-color/10 text-gray-700 py-2 px-4 rounded-full transition-all duration-300"
                onClick={toggleCategoryDropdown}
            >
                <span className="mr-2">
                    Category: {selectedCategory || 'All'}
                </span>
                <IoIosArrowDropdown size={20} className="text-gray-500" />
            </div>

            {isOpen && (
                <ul className="absolute z-30 w-48 p-2 mt-1 border border-gray-300 rounded-lg custom-galssmorpuism shadow-lg">
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

export default CategoryFilter;


