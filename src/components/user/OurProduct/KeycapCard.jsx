import React from 'react'
import { Link } from 'react-router-dom'
const KeycapCard = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg relative mx-auto my-4 flex flex-col h-40 laptop:h-52 w-full overflow-hidden">
            <Link to='/products/catagory?category=keycap' className="relative">
                <img
                    src="../images/keycap.jpg"
                    alt="Keyboard"
                    className="w-full h-40 laptop:h-52 object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-700 hover:bg-[#E9E4D6]/40 bg-[#E9E4D6]/70 p-4 bg-gradient-to-t from-purple-800/30 via-transparent to-transparent">
                    <h3 className="font-bold text-xl labtop:text-2xl mb-2 text-center">Key Caps</h3>
                    <p className="text-sm labtop:text-lg italic mb-4 text-center">"Elevate your keyboard with unique keycap designs."</p>
                    <div className="flex items-center ">
                        <span className="text-yellow-500 text-base mr-1">★</span>
                        <span className="text-xs labtop:text-base">Rating</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default KeycapCard