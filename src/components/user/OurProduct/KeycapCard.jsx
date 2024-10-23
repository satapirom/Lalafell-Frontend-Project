import React from 'react';
import { Link } from 'react-router-dom';

const KeycapCard = () => {
    return (
        <Link to='/products/catagory?category=keycap' className="group">
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative mx-auto my-4 h-40 laptop:h-52 w-full overflow-hidden border border-gray-100">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-white to-violet-100 opacity-50" />

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4">
                    <span className="text-2xl">🎯</span>
                </div>

                {/* Content Container */}
                <div className="relative h-full flex flex-col items-center justify-center p-6 group-hover:transform group-hover:scale-105 transition-transform duration-300">
                    {/* Title */}
                    <h3 className="font-bold text-xl laptop:text-2xl mb-3 text-gray-800">
                        Key Caps
                    </h3>

                    {/* Divider */}
                    <div className="w-12 h-0.5 bg-gradient-to-r from-pink-400 to-violet-400 mb-3" />

                    {/* Subtitle */}
                    <p className="text-sm laptop:text-base text-gray-600 mb-4 text-center">
                        "Elevate your keyboard with unique keycap designs"
                    </p>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm">Rating</span>
                    </div>

                    {/* Hover Effect Decoration */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-violet-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
            </div>
        </Link>
    );
}

export default KeycapCard;