import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/logout');
            navigate('/'); // Redirect to home after logout
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    //เก็บ state ของ drowdown in navbar
    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axiosInstance.get('/check');
            } catch (error) {
                navigate('/login'); // Redirect to login if not authenticated
            }
        };

        checkAuth();
    }, [navigate]);

    return {
        isDropdownOpen,
        toggleDropdown,
        handleLogout
    };
};

export default useAuth;
