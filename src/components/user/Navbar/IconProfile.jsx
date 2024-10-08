import React, { useEffect, useRef } from 'react';
import DropdownMenu from './DropdownMenu';
import useDropdown from '../../../hooks/user/useDropdown';

const IconProfile = () => {
    const { isOpen, toggleDropdown, closeDropdown } = useDropdown();
    const profileRef = useRef(null); // ใช้เพื่ออ้างอิงถึง div

    // ใช้ useEffect เพื่อจับการคลิกนอกเมนูและปิด dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                closeDropdown(); // ปิด dropdown ถ้าคลิกนอก element ที่ห่อหุ้ม
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
            <img
                src='/images/icon-profile.svg'
                alt='Profile'
                className='h-6 w-6 tablet:h-7 tablet:w-7 laptop:h-8 laptop:w-8 cursor-pointer'
                onClick={toggleDropdown} // เปิดหรือปิด dropdown เมื่อคลิกที่ไอคอน
            />
            <DropdownMenu
                isOpen={isOpen}
                onClose={closeDropdown} // ปิด dropdown เมื่อเลือกบางอย่างในเมนู
            />
        </div>
    );
};

export default IconProfile;

