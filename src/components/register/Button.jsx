import React from 'react'

const Button = ({ type, onClick, children }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="w-full py-2 px-4 font-semibold rounded-md hover:bg-secondary-color text-white bg-primary-color transition-all duration-300"
        >
            {children}
        </button>
    )
}

export default Button;