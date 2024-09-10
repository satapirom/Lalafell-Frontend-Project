// IconProfile.jsx
import React from 'react';
import { FaUser } from 'react-icons/fa';
import DropdownMenu from './DropdownMenu';
import useDropdown from '../../../hooks/user/ีuseDropdown'; // ใช้ custom hook ที่สร้าง

const IconProfile = () => {
    const { isOpen, toggleDropdown, closeDropdown } = useDropdown();

    return (
        <div className="relative flex items-center">
            <div>
                <img
                    src='/images/icon-profile.svg'
                    alt='Profile'
                    className='h-6 w-6 tablet:h-7 tablet:w-7 laptop:h-8 laptop:w-8 cursor-pointer'
                    onClick={toggleDropdown}
                />
                <DropdownMenu isOpen={isOpen} onClose={closeDropdown} />
            </div>
        </div>
    );
};

export default IconProfile;
