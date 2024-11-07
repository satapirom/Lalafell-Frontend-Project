import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/logout');
            setUser(null);
            setIsAuthenticated(false);
            navigate('/');
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
                const response = await axiosInstance.get('/check');
                if (response.data && response.data.user) {
                    setUser(response.data.user);
                    setIsAuthenticated(true);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                    navigate('/login');
                }
            } catch (error) {
                console.error('Auth check error:', error);
                setUser(null);
                setIsAuthenticated(false);
                navigate('/login');
            }
        };

        checkAuth();
    }, [navigate]);

    return {
        user,
        isAuthenticated,
        isDropdownOpen,
        toggleDropdown,
        handleLogout
    };
};

export default useAuth;