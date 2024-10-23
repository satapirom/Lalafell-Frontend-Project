import React, { useEffect, useState } from 'react';

const Banner = () => {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true);
    }, []);

    return (
        <div className="bg-[#f5f5f5] h-96 max-w-screen-laptopl mx-auto flex justify-center items-center text-center rounded-lg p-5">
            <div className={`max-w-xl text-gray-800 transform transition-opacity duration-1000 ease-in-out ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <h1 className="text-4xl font-bold mb-3 text-gray-900">Lalafell Keyboard</h1>
                <p className="text-lg mb-6">Discover the best creations from the community</p>
                <button className="bg-primary-color text-white py-2 px-4 rounded-md transition-transform transform hover:scale-105">
                    Explore Now
                </button>
            </div>
        </div>
    );
}

export default Banner;



