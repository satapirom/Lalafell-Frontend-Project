import React, { useEffect, useState } from 'react';

const Banner = () => {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true);
    }, []);

    return (
<<<<<<< HEAD
        <div className="bg-[#f5f5f5] h-96 max-w-screen-laptopl mx-auto flex justify-center items-center text-center tablet:rounded-lg p-5 relative overflow-hidden">
            <div
                className={`absolute inset-0 bg-cover  bg-top transition-opacity duration-1000 ease-in-out ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
                style={{ backgroundImage: 'url(../images/newbanner.jpg)', backgroundPosition: 'center 18%', backgroundSize: 'cover' }}
            />
            <div className={`absolute inset-0 bg-black opacity-50 transition-opacity duration-1000 ease-in-out ${fadeIn ? 'opacity-20' : 'opacity-0'}`} />
            <div className={`relative max-w-xl text-gray-200 transform transition-opacity duration-1000 ease-in-out ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <h1 className="text-3xl tablet:text-4xl font-bold mb-3 text-white">Lalafell Keyboard</h1>
                <p className="text-smtablet:text-lg mb-6">Discover the best creations from the community</p>
=======
        <div className="bg-[#f5f5f5] h-96 max-w-screen-laptopl mx-auto flex justify-center items-center text-center rounded-lg p-5 relative overflow-hidden">
            <div className={`absolute inset-0 custom-bg opacity-50 transition-opacity duration-1000 ease-in-out ${fadeIn ? 'opacity-20' : 'opacity-0'}`} />
            <div className={`relative max-w-xl text-gray-200 transform transition-opacity duration-1000 ease-in-out ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <h1 className="text-2xl tablet:text-4xl font-bold mb-3 text-gray-800">Welcome to Lalafell Keyboard</h1>
                <p className="text-sm tablet:text-lg text-gray-800 mb-6">Unleash your creativity and explore unique keyboard designs made by passionate fans.</p>
>>>>>>> 1b26c91523b6efc228ca6b865d019f7f9d4f057f
                <button className="bg-primary-color text-white py-2 px-4 rounded-md transition-transform transform hover:scale-105">
                    Discover More
                </button>
            </div>
        </div>
    );
}

export default Banner;









