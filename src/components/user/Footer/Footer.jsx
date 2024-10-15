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
            <li className='text-gray-800 text-sm mb-2'>Address: 123 Lalafell St, City, Country</li>
            <li className='text-gray-800 text-sm mb-2'>Phone: (123) 456-7890</li>
            <li className='text-gray-800 text-sm mb-2'>Email: support@lalafellkeyboards.com</li>
        </ul>
    </div>
);

const SocialIcons = () => (
    <div className='flex justify-start tablet:justify-end space-x-3 mt-4 laptop:mt-0'>
        {[AiFillGithub, AiFillInstagram, AiFillLinkedin, AiFillTwitterCircle, AiFillFacebook].map((Icon, index) => (
            <Icon key={index} size={24} className="hover:text-gray-600" />
        ))}
    </div>
);

const Footer = () => {
    return (
        <footer className="rounded-lg mt-8 py-8 px-6 container mx-auto max-w-screen-laptopl">
            <div className="max-w-screen-desktopส mx-auto custom-galssmorpuism p-8 rounded-lg shadow-md">
                <div className="grid grid-cols-1 tablet:grid-cols-5 gap-6 content-around">
                    <div className='col-span-2 mb-4 tablet:mb-0'>
                        <h1
                            className="font-bold text-lg text-gray-800 cursor-pointer"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            Lalafell Keyboard
                        </h1>
                    </div>
                    <div className='col-span-3'>
                        <div className="grid grid-cols-2 tablet:grid-cols-3 gap-6">
                            <QuickLinks />
                            <Policies />
                            <ContactInfo />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col laptop:flex-row justify-between items-center ">
                    <p className="text-xs text-gray-600">&copy; 2024 Lalafell Keyboard. All rights reserved.</p>
                    <SocialIcons />
                </div>
            </div>
        </footer>
    );
}

export default Footer;

