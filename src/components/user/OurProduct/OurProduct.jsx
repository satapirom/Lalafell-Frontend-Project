import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import KeyboardCard from './KeyboardCard';
import KeycapCard from './KeycapCard';
import SwichesCard from './SwichesCard';

const OurProduct = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: false,
        });
    }, []);

    return (
        <div className="relative container mx-auto p-8 rounded-lg mt-8 max-w-screen-laptopl custom-bg">
            {/* Floating Background Elements */}
            <div className="absolute top-10 left-5 w-32 h-32 bg-[#7986CB]/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-5 w-32 h-32 bg-[#5C6BC0]/40 rounded-full blur-2xl"></div>

            <div className="flex flex-col items-center justify-center" data-aos="fade-up">
                <div className="relative mb-6">
                    {/* Sticker-style image with rotation and shadow */}
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 -rotate-12 w-60 h-60">
                        <img
                            src="../images/busy.png"
                            alt="Keyboard"
                            className="w-full h-full object-contain drop-shadow-xl transform hover:rotate-12 transition-transform duration-300"
                            style={{
                                filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25))',
                                animation: 'float 6s ease-in-out infinite'
                            }}
                        />
                    </div>
                </div>
                <Link to='/products'>
                    <h1 className="relative text-2xl tablet:text-4xl font-bold mb-4 z-10 mt-24">
                        <span className="relative inline-block text-black transform hover:scale-105 transition-transform duration-300">
                            Our
                            <span className="absolute -top-1 -right-1 text-[#7986CB] text-sm animate-bounce">✧</span>
                        </span>
                        {" "}
                        <span className="relative inline-block transform hover:-rotate-3 transition-transform duration-300">
                            Lovely
                            <span className="absolute -top-2 -left-2 text-[#5C6BC0] text-sm animate-ping">♡</span>
                        </span>
                        {" "}
                        <span className="relative inline-block transform hover:rotate-3 transition-transform duration-300">
                            Products
                            <span className="absolute -top-1 -right-2 text-[#7986CB] text-sm animate-bounce delay-75">★</span>
                        </span>
                        {/* Wavy underline */}
                        <svg className="absolute -bottom-2 left-0 w-full" height="5" viewBox="0 0 200 5" preserveAspectRatio="none">
                            <path
                                d="M0 2.5C50 2.5 50 4.5 100 4.5C150 4.5 150 2.5 200 2.5"
                                stroke="#7986CB"
                                stroke-width="2"
                                fill="none"
                                stroke-linejoin="round"
                                className="animate-wave"
                            />
                        </svg>

                    </h1>
                </Link>
                <p className="text-gray-600 text-center text:md tablet:text-lg mt-2 relative">
                    <span className="inline-block transform hover:scale-105 transition-transform duration-300">
                        ✧ Discover
                    </span>
                    {" "}
                    <span className="inline-block transform hover:-rotate-3 transition-transform duration-300">
                        the perfect
                    </span>
                    {" "}
                    <span className="inline-block transform hover:rotate-3 transition-transform duration-300">
                        keyboard magic! ✧
                    </span>
                </p>
            </div>

            <div className="grid grid-cols-1 tablet:grid-cols-3 tablet:gap-4 ">
                <Link to='/products?category=keyboard'>
                    <div
                        data-aos="fade-up"
                        data-aos-offset="50"
                        data-aos-delay="50"
                        data-aos-duration="700"
                        className="transform hover:scale-105 transition-transform duration-300"
                    >
                        <KeyboardCard />
                    </div>
                </Link>
                <Link to='/products?category=keycap'>
                    <div
                        data-aos="fade-up"
                        data-aos-offset="50"
                        data-aos-delay="100"
                        data-aos-duration="900"
                        className="transform hover:scale-105 transition-transform duration-300"
                    >
                        <KeycapCard />
                    </div>
                </Link>
                <Link to='/products?category=switch'>
                    <div
                        data-aos="fade-up"
                        data-aos-offset="50"
                        data-aos-delay="150"
                        data-aos-duration="1000"
                        className="transform hover:scale-105 transition-transform duration-300"
                    >
                        <SwichesCard />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default OurProduct;
