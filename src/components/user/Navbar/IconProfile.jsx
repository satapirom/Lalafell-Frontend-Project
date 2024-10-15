import React, { useEffect, useRef } from 'react';
import DropdownMenu from './DropdownMenu';
import useDropdown from '../../../hooks/user/useDropdown';

const ElegantFlowerFrame = ({ children }) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FFD1DC', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#FF69B4', stopOpacity: 1 }} />
            </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="23" fill="white" stroke="url(#grad1)" strokeWidth="2" />
        <path d="M24 5C28 5 31 8 31 12C31 16 28 19 24 19C20 19 17 16 17 12C17 8 20 5 24 5Z" fill="url(#grad1)" />
        <path d="M43 24C43 28 40 31 36 31C32 31 29 28 29 24C29 20 32 17 36 17C40 17 43 20 43 24Z" fill="url(#grad1)" />
        <path d="M24 43C20 43 17 40 17 36C17 32 20 29 24 29C28 29 31 32 31 36C31 40 28 43 24 43Z" fill="url(#grad1)" />
        <path d="M5 24C5 20 8 17 12 17C16 17 19 20 19 24C19 28 16 31 12 31C8 31 5 28 5 24Z" fill="url(#grad1)" />
        {children}
    </svg>
);

const IconProfile = () => {
    const { isOpen, toggleDropdown, closeDropdown } = useDropdown();
    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                closeDropdown();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, closeDropdown]);

    return (
        <div className="relative flex items-center" ref={profileRef}>
            <div
                className="cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-[15deg]"
                onClick={toggleDropdown}
            >
                <ElegantFlowerFrame>
                    <circle cx="24" cy="24" r="15" fill="white" />
                    <image
                        href="/images/icon-profile.svg"
                        x="14"
                        y="14"
                        width="20"
                        height="20"
                        className="transition-all duration-300 hover:saturate-150"
                    />
                </ElegantFlowerFrame>
            </div>
            <DropdownMenu
                isOpen={isOpen}
                onClose={closeDropdown}
            />
        </div>
    );
};

export default IconProfile;

