import React, { useEffect, useRef, useState } from 'react';
import DropdownMenu from './DropdownMenu';
import useDropdown from '../../../hooks/user/useDropdown';
import { useAuth } from '../../../contexts/AuthContext';
import axiosInstance from '../../../utils/axiosInstance';

const icon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffffff"} fill={"none"}>
        <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

const IconProfile = () => {
    const { isOpen, toggleDropdown, closeDropdown } = useDropdown();
    const profileRef = useRef(null);
    const { isLoggedIn, logout } = useAuth();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (isLoggedIn) {
                try {
                    const response = await axiosInstance.get('/users/profile');
                    setProfile(response.data.myUser);
                } catch (error) {
                    console.error('Error fetching profile:', error);
                    setProfile(null);
                }
            } else {
                setProfile(null);
            }
        };

        fetchProfile();
    }, [isLoggedIn]);

    const handleLogout = () => {
        logout();
        closeDropdown();
    };

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

    const renderProfileImage = () => {
        if (!isLoggedIn || !profile) {
            return (
                <div className='w-10 h-10 bg-primary-color rounded-full flex items-center justify-center'>
                    {icon}
                </div>
            );
        }

        const imageUrl = profile.profileImage && profile.profileImage[0]?.url;
        if (!imageUrl) {
            return (
                <div className='w-10 h-10 bg-primary-color rounded-full flex items-center justify-center text-white font-bold'>
                    {profile.username ? profile.username[0].toUpperCase() : '?'}
                </div>
            );
        }

        return (
            <img
                src={imageUrl}
                alt={profile.username || 'User'}
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '../images/avatar-profile.png';
                }}
            />
        );
    };

    return (
        <div className="relative flex items-center" ref={profileRef}>
            <div
                className="cursor-pointer transition-all duration-300 hover:scale-110"
                onClick={toggleDropdown}
            >
                {renderProfileImage()}
            </div>
            <DropdownMenu
                isOpen={isOpen}
                onClose={closeDropdown}
                profile={profile}
                onLogout={handleLogout}
            />
        </div>
    );
};

export default IconProfile;

