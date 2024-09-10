import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('/api/logout');
            navigate('/'); // Redirect to home after logout
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get('/api/auth/check');
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
