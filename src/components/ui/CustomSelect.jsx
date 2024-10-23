import { useState } from 'react';
import { IoIosArrowDropdown } from 'react-icons/io';
const CustomSelect = ({ options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelectOption = (option) => {
        onChange(option.value);
        setIsOpen(false);
    };

    return (
        <div className="relative min-w-[160px]">
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
