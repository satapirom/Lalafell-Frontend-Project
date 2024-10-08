import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token'); // ดึง token จาก localStorage
        if (token) {
            setIsLoggedIn(true); // ถ้ามี token ให้ตั้งค่า isLoggedIn เป็น true
        }
    }, []); // ทำงานแค่ครั้งเดียวเมื่อโหลดคอมโพเนนต์

    const login = () => setIsLoggedIn(true);
    const logout = () => {
        localStorage.removeItem('token'); // ลบ token ออกจาก localStorage เมื่อออกจากระบบ
        localStorage.removeItem('refreshToken');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);




