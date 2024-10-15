import React from 'react';
import { Link } from 'react-router-dom';

const icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffffff"} fill={"none"}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 11L8.5 9.5M8.5 9.5L7 8M8.5 9.5L7 11M8.5 9.5L10 8M17 11L15.5 9.5M15.5 9.5L14 8M15.5 9.5L14 11M15.5 9.5L17 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 17C8.91212 15.7856 10.3643 15 12 15C13.6357 15 15.0879 15.7856 16 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>

const Logo = () => {
    return (
        <Link to="/" >
            <div
                className="relative w-28 h-10 rounded-full bg-[#2727E6] overflow-hidden cursor-pointer transition-all duration-300 ease-in-out"
            >
                <div className="absolute inset-0 flex items-center justify-center nerko-one-regular text-white font-bold text-xl mx-2 ">
                    <span className="animate-pulse custom-font-logo mr-2">{icon}</span>
                    <span className="animate-bounce custom-font-logo">L</span>
                    <span className="animate-pulse custom-font-logo">a</span>
                    <span className="animate-bounce custom-font-logo">l</span>
                    <span className="animate-bounce custom-font-logo">a</span>
                    <span className="animate-bounce custom-font-logo">f</span>
                    <span className="animate-pulse custom-font-logo">e</span>
                    <span className="animate-bounce custom-font-logo">l</span>
                    <span className="animate-pulse custom-font-logo">l</span>
                </div>
            </div>
        </Link>
    );
};

export default Logo;

