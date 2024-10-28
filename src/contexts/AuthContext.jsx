import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    // Check authentication status on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setIsLoggedIn(false);
                    setIsLoading(false);
                    return;
                }

                // Only check auth status if we have a token
                await axiosInstance.get('/check');
                setIsLoggedIn(true);
            } catch (error) {
                setIsLoggedIn(false);
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = async () => {
        try {
            await axiosInstance.post('/logout');
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            setIsLoggedIn(false);
            setIsDropdownOpen(false);
            navigate('/');
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    // Don't render children until initial auth check is complete
    if (isLoading) {
        return <div>Loading...</div>; // Or your loading component
    }

    return (
        <AuthContext.Provider 
            value={{ 
                isLoggedIn, 
                login, 
                logout,
                isDropdownOpen,
                toggleDropdown
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};




