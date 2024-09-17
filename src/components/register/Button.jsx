import React from 'react'

const Button = ({ type, onClick, children }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="w-full py-2 px-4 font-semibold rounded-md hover:bg-black hover:text-white text-gray-700 bg-[#E9E4D6]"
        >
            {children}
        </button>
    )
}

export default Button;