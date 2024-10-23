import React from 'react';
import { AiFillInstagram, AiFillGithub, AiFillLinkedin, AiFillTwitterCircle, AiFillFacebook } from "react-icons/ai";

const QuickLinks = () => (
    <div>
        <h3 className="font-bold text-gray-800 mb-2">Quick Links</h3>
        <ul>
            {['About Us', 'Services', 'Products', 'Blog', 'FAQ'].map((item) => (
                <li key={item}>
                    <a href={`/${item.toLowerCase().replace(' ', '')}`} className="text-gray-800 text-sm mb-2 hover:underline">
                        {item}
                    </a>
                </li>
            ))}
        </ul>
    </div>
);

const Policies = () => (
    <div>
        <h3 className="font-bold text-gray-800 mb-2">Policies</h3>
        <ul>
            {['Privacy Policy', 'Terms of Service', 'Return & Refund Policy'].map((item) => (
                <li key={item}>
                    <a href={`/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '')}`} className="text-gray-800 text-sm mb-2 hover:underline">
                        {item}
                    </a>
                </li>
            ))}
        </ul>
    </div>
);

const ContactInfo = () => (
    <div>
        <h3 className="font-bold text-gray-800 mb-2">Contact Us</h3>
        <ul>
            <li className='text-gray-800 text-sm mb-2 hover:underline cursor-pointer'>Address: 123 Lalafell St, City, Country</li>
            <li className='text-gray-800 text-sm mb-2 hover:underline cursor-pointer'>Phone: (123) 456-7890</li>
            <li className='text-gray-800 text-sm mb-2 hover:underline cursor-pointer'>Email: support@lalafellkeyboards.com</li>
        </ul>
    </div>
);

const SocialIcons = () => (
    <div className='flex justify-start tablet:justify-end space-x-3 mt-4 laptop:mt-0'>
        {[AiFillGithub, AiFillInstagram, AiFillLinkedin, AiFillTwitterCircle, AiFillFacebook].map((Icon, index) => (
            <Icon key={index} size={24} className="hover:text-primary-color cursor-pointer" />
        ))}
    </div>
);

const Footer = () => {
    return (
        <footer className="rounded-lg mt-8 py-8 px-6 container mx-auto max-w-screen-laptopl bg-gradient-to-r from-[#F3F4F6] to-[#E5E7EB]">
            <div className="max-w-screen-desktopส mx-auto custom-galssmorpuism p-8 rounded-lg shadow-md">
                <div className="grid grid-cols-1 tablet:grid-cols-6 gap-6 content-around">
                    <div className='col-span-2 mb-4 tablet:mb-0'>
                        <div className='flex items-center'>
                            <h1
                                className="font-bold text-xl text-primary-color cursor-pointer hover:underline"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            >
                                Lalafell Keyboard
                            </h1>
                            <span className='animate-bounce ml-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#5c6bc0" fill="none">
                                    <path d="M7.29469 17C3.53045 7.25 8.86313 2.9375 12 2C15.1369 2.9375 20.4696 7.25 16.7053 17C16.1369 16.6875 14.4 16.0625 12 16.0625C9.6 16.0625 7.86313 16.6875 7.29469 17Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11C13.1046 11 14 10.1046 14 9Z" stroke="currentColor" stroke-width="1.5" />
                                    <path d="M17.5 15.5576C18.9421 15.6908 20.7078 16.0822 21.9814 17C21.9814 17 22.5044 12.0642 18 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6.5 15.5576C5.05794 15.6908 3.29216 16.0822 2.01858 17C2.01858 17 1.49555 12.0642 6 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M9.5 19C9.5 19 9.91667 21.5 12 22C14.0833 21.5 14.5 19 14.5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div className='col-span-4'>
                        <div className="grid grid-cols-2 tablet:grid-cols-3 gap-6">
                            <QuickLinks />
                            <Policies />
                            <ContactInfo />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col laptop:flex-row justify-between items-center ">
                    <p className="text-sm text-gray-600">&copy; 2024 Lalafell Keyboard. All rights reserved.</p>
                    <SocialIcons />
                </div>
            </div>
        </footer>
    );
}

export default Footer;

