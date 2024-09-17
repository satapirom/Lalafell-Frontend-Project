import React from 'react';

const Banner = () => {
    return (
        <div className="container mx-auto px-4 py-4 my-8 max-w-screen-laptopl z-10">
            <div className="relative w-full">
                <img
                    src="../images/hero-banner-1.png"
                    className="object-cover w-full h-[200px] tablet:h-[300px] laptop:h-[400px] max-h-full"
                    alt="Hero Banner"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/50 text-center">
                    <h1 className="text-2xl mobile:text-3xl tablet:text-4xl laptop:text-5xl laptopl:text-6xl font-bold text-white">
                        LALAFELL KEYBOARD
                    </h1>
                    <p className="text-lg mobile:text-xl tablet:text-2xl laptop:text-3xl laptopl:text-4xl my-4 text-white">
                        Custom Keyboard For Anime Fans
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Banner;


