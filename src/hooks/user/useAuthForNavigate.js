import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance'; // หรือ path ที่ถูกต้อง

const useAuthForNavigate = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const logout = async () => {
        try {
            await axiosInstance.post('/api/v1/logout'); // ส่งคำขอ POST ไปยัง endpoint logout
        } catch (error) {
            console.log("Logout failed: ", error.message);
        }
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return { isLoggedIn, setIsLoggedIn, login, logout };
};

export default useAuthForNavigate;

