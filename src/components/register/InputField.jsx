import React from 'react';
import usePasswordVisibility from '../../hooks/user/usePasswordVisibility';

const InputField = ({
    label, // รับค่า label ผ่าน props
    type,
    placeholder,
    name,
    value,
    validation,
    onChange,
    error,
    maxLength
}) => {
    const { isVisible, toggleVisibility } = usePasswordVisibility();

    return (
        <div className="relative mb-4 lg:mb-6 w-full">
            <label className="block text-sm text-gray-600 mb-1"> {/* ใช้ mb-1 เพื่อเว้นระยะ */}
                {label}
            </label>
            <div className="flex items-center w-full">
                <input
                    type={type === "password" && !isVisible ? "password" : type === "password" && isVisible ? "text" : type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    validation
                    onChange={onChange}
                    className={`w-full px-4 py-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-md focus:outline-none ${error ? 'border-red-500' : 'border border-gray-300'}`}
                    maxLength={maxLength}
                    required
                />
                {type === "password" && (
                    <div className="absolute right-3 flex items-center h-full">
                        <img
                            src={isVisible ? "../images/icon-eye-open.svg" : "../images/icon-eye-close.svg"}
                            alt={isVisible ? "Hide password" : "Show password"}
                            className="cursor-pointer w-6 h-6 transition-all duration-300"
                            onClick={toggleVisibility}
                        />
                    </div>
                )}
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default InputField;

