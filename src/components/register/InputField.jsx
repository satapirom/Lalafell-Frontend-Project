import React from 'react';
import usePasswordVisibility from '../../hooks/user/usePasswordVisibility';

const openEye = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        color="#5c6bc0"
        fill="none">
        <path d="M2 8C2 8 6.47715 3 12 3C17.5228 3 22 8 22 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        <path d="M21.544 13.045C21.848 13.4713 22 13.6845 22 14C22 14.3155 21.848 14.5287 21.544 14.955C20.1779 16.8706 16.6892 21 12 21C7.31078 21 3.8221 16.8706 2.45604 14.955C2.15201 14.5287 2 14.3155 2 14C2 13.6845 2.15201 13.4713 2.45604 13.045C3.8221 11.1294 7.31078 7 12 7C16.6892 7 20.1779 11.1294 21.544 13.045Z" stroke="currentColor" stroke-width="1.5" />
        <path d="M15 14C15 12.3431 13.6569 11 12 11C10.3431 11 9 12.3431 9 14C9 15.6569 10.3431 17 12 17C13.6569 17 15 15.6569 15 14Z" stroke="currentColor" stroke-width="1.5" />
    </svg>
);

const closeEye = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#5c6bc0" fill="none">
        <path d="M22 8C22 8 18 14 12 14C6 14 2 8 2 8" stroke="currentColor" stroke-width="1.5" stroke-Linecap="round" />
        <path d="M15 13.5L16.5 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M20 11L22 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M2 13L4 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M9 13.5L7.5 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
);

const InputField = ({
    label,
    type,
    placeholder,
    name,
    value,
    error,
    onChange,
    maxLength
}) => {
    const { isVisible, toggleVisibility } = usePasswordVisibility();

    return (
        <div className="relative mb-4 lg:mb-6 w-full">
            <label className="block text-sm text-gray-600 mb-1">
                {label}
            </label>
            <div className="flex items-center w-full">
                <input
                    type={type === "password" && !isVisible ? "password" : type === "password" && isVisible ? "text" : type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`w-full px-4 py-2 outline-none border border-gray-300 rounded-lg transition-all duration-300 bg-white text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-primary-color focus:ring-opacity-50 ${error ? 'border-red-500' : 'border-gray-300'}`}
                    maxLength={maxLength}
                    required
                />
                {type === "password" && (
                    <div className="absolute right-3 flex items-center h-full cursor-pointer" onClick={toggleVisibility}>
                        {isVisible ? openEye : closeEye}
                    </div>
                )}
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default InputField;



