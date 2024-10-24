import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDropdown } from 'react-icons/io';

const CustomSelect = ({ options, value, onChange, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        if (isOpen && onClose) onClose();
        setIsOpen(!isOpen);
    };

    const handleSelectOption = (option) => {
        onChange(option.value);
        setIsOpen(false);
        if (onClose) onClose();
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false); // ปิด dropdown เมื่อคลิกนอก component
            if (onClose) onClose();
        }
    };

    useEffect(() => {
        // เพิ่ม event listener สำหรับตรวจจับการคลิกนอก component
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            // ลบ event listener เมื่อ component ถูก unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative min-w-[160px]" ref={dropdownRef}>
            <div
                className="flex items-center justify-between px-4 py-1 border border-gray-300 rounded-full bg-white/30 cursor-pointer"
                onClick={toggleDropdown}
            >
                <span className="text-gray-700">{value}</span>
                <IoIosArrowDropdown size={20} className="text-gray-500" />
            </div>
            {isOpen && (
                <ul className="absolute z-10 w-48 p-2 mt-1 border border-gray-300 rounded-lg custom-galssmorpuism shadow-lg">
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

export default CustomSelect;