import React from 'react'

const Button = ({ type, onClick, children }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800"
        >
            {children}
        </button>
    )
}

export default Button;